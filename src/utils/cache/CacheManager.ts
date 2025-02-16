/**
 * Cache manager for network requests with configurable storage strategies
 */

import { logger } from '../logger';
import { IStorageStrategy } from './storage/IStorageStrategy';
import { MemoryStorage } from './storage/MemoryStorage';
import { LocalStorage } from './storage/LocalStorage';
import { SessionStorage } from './storage/SessionStorage';

export interface ICacheConfig {
  /** Time-to-live in milliseconds */
  ttl: number;
  /** Maximum entries in cache */
  maxEntries: number;
  /** When to invalidate cache entries */
  invalidateOn?: (error: Error) => boolean;
  /** Storage strategy */
  storage: 'memory' | 'local' | 'session';
}

export interface ICacheEntry<T> {
  data: T;
  timestamp: number;
  etag?: string;
  headers?: Headers;
}

export interface ICacheMetrics {
  hits: number;
  misses: number;
  evictions: number;
  size: number;
  hitRate: number;
}

const defaultConfig: Required<ICacheConfig> = {
  ttl: 5 * 60 * 1000, // 5 minutes
  maxEntries: 100,
  storage: 'memory',
  invalidateOn: () => false
};

export const cacheConfig: ICacheConfig = {
  profiles: {
    ttl: 3600,
    invalidateOn: ['PROFILE_UPDATE']
  },
  profileImages: {
    ttl: 86400,
    storage: 'persistent'
  }
};

export class CacheManager {
  private storage: IStorageStrategy;
  private config: Required<ICacheConfig>;
  private metrics: ICacheMetrics;

  constructor(config: Partial<ICacheConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.storage = this.createStorage(this.config.storage);
    this.metrics = {
      hits: 0,
      misses: 0,
      evictions: 0,
      size: 0,
      hitRate: 0
    };
  }

  private createStorage(type: 'memory' | 'local' | 'session'): IStorageStrategy {
    switch (type) {
      case 'local':
        return new LocalStorage();
      case 'session':
        return new SessionStorage();
      case 'memory':
      default:
        return new MemoryStorage();
    }
  }

  /**
   * Get value from cache
   * @param key - Cache key
   * @returns Cached value or null if not found/expired
   */
  public get<T>(key: string): T | null {
    const entry = this.storage.get(key) as ICacheEntry<T> | undefined;

    if (!entry) {
      this.recordMiss();
      return null;
    }

    if (this.isExpired(entry)) {
      this.invalidate(key);
      this.recordMiss();
      return null;
    }

    this.recordHit();
    return entry.data;
  }

  /**
   * Set value in cache
   * @param key - Cache key
   * @param value - Value to cache
   * @param options - Cache options for this entry
   */
  public set<T>(key: string, value: T, options: Partial<ICacheConfig> = {}): void {
    this.evictIfNeeded();

    const entry: ICacheEntry<T> = {
      data: value,
      timestamp: Date.now(),
      etag: options.etag,
      headers: options.headers
    };

    this.storage.set(key, entry);
    this.metrics.size = this.storage.size();
    logger.info(`Cache set: ${key}`);
  }

  /**
   * Remove entry from cache
   * @param key - Cache key
   */
  public invalidate(key: string): void {
    this.storage.delete(key);
    this.metrics.size = this.storage.size();
    logger.info(`Cache invalidated: ${key}`);
  }

  /**
   * Clear all entries from cache
   */
  public clear(): void {
    this.storage.clear();
    this.metrics.size = 0;
    logger.info('Cache cleared');
  }

  /**
   * Get current cache metrics
   */
  public getMetrics(): ICacheMetrics {
    return { ...this.metrics };
  }

  private isExpired(entry: ICacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp > this.config.ttl;
  }

  private evictIfNeeded(): void {
    if (this.storage.size() >= this.config.maxEntries) {
      const oldestKey = Array.from(this.storage.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0];
      
      this.invalidate(oldestKey);
      this.metrics.evictions++;
      logger.info(`Cache eviction: ${oldestKey}`);
    }
  }

  private recordHit(): void {
    this.metrics.hits++;
    this.updateHitRate();
  }

  private recordMiss(): void {
    this.metrics.misses++;
    this.updateHitRate();
  }

  private updateHitRate(): void {
    const total = this.metrics.hits + this.metrics.misses;
    this.metrics.hitRate = total > 0 ? this.metrics.hits / total : 0;
  }
} 