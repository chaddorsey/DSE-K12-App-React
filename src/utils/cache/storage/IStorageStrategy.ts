/**
 * Interface for cache storage strategies
 */

import { ICacheEntry } from '../CacheManager';

export interface IStorageStrategy {
  /** Get value from storage */
  get<T>(key: string): ICacheEntry<T> | undefined;
  
  /** Set value in storage */
  set<T>(key: string, entry: ICacheEntry<T>): void;
  
  /** Remove value from storage */
  delete(key: string): void;
  
  /** Clear all values */
  clear(): void;
  
  /** Get current size */
  size(): number;
  
  /** Get all entries */
  entries(): Array<[string, ICacheEntry<unknown>]>;
} 