/**
 * In-memory storage strategy for cache
 */

import { ICacheEntry } from '../CacheManager';
import { IStorageStrategy } from './IStorageStrategy';

export class MemoryStorage implements IStorageStrategy {
  private storage: Map<string, ICacheEntry<unknown>>;

  constructor() {
    this.storage = new Map();
  }

  public get<T>(key: string): ICacheEntry<T> | undefined {
    return this.storage.get(key) as ICacheEntry<T> | undefined;
  }

  public set<T>(key: string, entry: ICacheEntry<T>): void {
    this.storage.set(key, entry);
  }

  public delete(key: string): void {
    this.storage.delete(key);
  }

  public clear(): void {
    this.storage.clear();
  }

  public size(): number {
    return this.storage.size;
  }

  public entries(): Array<[string, ICacheEntry<unknown>]> {
    return Array.from(this.storage.entries());
  }
} 