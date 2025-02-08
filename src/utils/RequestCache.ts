import { logger } from './logger';

interface ICacheEntry {
  response: Response;
  expiresAt: number;
}

interface ICacheConfig {
  ttl: number;
  maxEntries: number;
}

export class RequestCache {
  private cache = new Map<string, ICacheEntry>();

  constructor(private config: ICacheConfig) {}

  async get(key: string): Promise<Response | null> {
    const entry = this.cache.get(key);

    if (!entry) {
      logger.debug('Cache miss', { key });
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      logger.debug('Cache expired', { key });
      this.cache.delete(key);
      return null;
    }

    logger.debug('Cache hit', { key });
    return entry.response.clone();
  }

  async set(key: string, response: Response): Promise<void> {
    // Ensure we don't exceed max entries
    if (this.cache.size >= this.config.maxEntries) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
      logger.debug('Cache entry evicted', { key: oldestKey });
    }

    this.cache.set(key, {
      response: response.clone(),
      expiresAt: Date.now() + this.config.ttl
    });

    logger.debug('Cache set', { key });
  }

  async invalidate(key: string): Promise<void> {
    this.cache.delete(key);
    logger.debug('Cache invalidated', { key });
  }

  async clear(): Promise<void> {
    this.cache.clear();
    logger.debug('Cache cleared');
  }
} 