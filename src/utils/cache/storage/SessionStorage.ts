/**
 * Session storage strategy for cache
 */

import { ICacheEntry } from '../CacheManager';
import { IStorageStrategy } from './IStorageStrategy';
import { logger } from '../../logger';

export class SessionStorage implements IStorageStrategy {
  private prefix: string;

  constructor(prefix = 'cache:') {
    this.prefix = prefix;
  }

  public get<T>(key: string): ICacheEntry<T> | undefined {
    try {
      const item = sessionStorage.getItem(this.getKey(key));
      return item ? JSON.parse(item) : undefined;
    } catch (err) {
      logger.error(`Failed to get from sessionStorage: ${key}`, err as Error);
      return undefined;
    }
  }

  public set<T>(key: string, entry: ICacheEntry<T>): void {
    try {
      sessionStorage.setItem(this.getKey(key), JSON.stringify(entry));
    } catch (err) {
      logger.error(`Failed to set in sessionStorage: ${key}`, err as Error);
      // If storage is full, clear it and try again
      if (err instanceof Error && err.name === 'QuotaExceededError') {
        this.clear();
        try {
          sessionStorage.setItem(this.getKey(key), JSON.stringify(entry));
        } catch (retryErr) {
          logger.error(`Failed to set in sessionStorage after clear: ${key}`, retryErr as Error);
        }
      }
    }
  }

  public delete(key: string): void {
    sessionStorage.removeItem(this.getKey(key));
  }

  public clear(): void {
    const keys = this.getAllKeys();
    keys.forEach(key => sessionStorage.removeItem(key));
  }

  public size(): number {
    return this.getAllKeys().length;
  }

  public entries(): Array<[string, ICacheEntry<unknown>]> {
    return this.getAllKeys().map(key => {
      const rawKey = key.slice(this.prefix.length);
      const entry = this.get(rawKey);
      return [rawKey, entry!] as [string, ICacheEntry<unknown>];
    }).filter(([, entry]) => entry !== undefined);
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  private getAllKeys(): string[] {
    return Object.keys(sessionStorage)
      .filter(key => key.startsWith(this.prefix));
  }
} 