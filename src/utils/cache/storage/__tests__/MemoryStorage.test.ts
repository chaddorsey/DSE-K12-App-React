/**
 * Tests for MemoryStorage strategy
 */

import { MemoryStorage } from '../MemoryStorage';
import { ICacheEntry } from '../../CacheManager';

describe('MemoryStorage', () => {
  let storage: MemoryStorage;
  const testEntry: ICacheEntry<unknown> = {
    data: { test: 'data' },
    timestamp: Date.now()
  };

  beforeEach(() => {
    storage = new MemoryStorage();
  });

  it('should store and retrieve entries', () => {
    storage.set('test', testEntry);
    expect(storage.get('test')).toEqual(testEntry);
  });

  it('should return undefined for missing keys', () => {
    expect(storage.get('missing')).toBeUndefined();
  });

  it('should delete entries', () => {
    storage.set('test', testEntry);
    storage.delete('test');
    expect(storage.get('test')).toBeUndefined();
  });

  it('should clear all entries', () => {
    storage.set('test1', testEntry);
    storage.set('test2', testEntry);
    storage.clear();
    expect(storage.size()).toBe(0);
  });

  it('should return correct size', () => {
    storage.set('test1', testEntry);
    storage.set('test2', testEntry);
    expect(storage.size()).toBe(2);
  });

  it('should return all entries', () => {
    storage.set('test1', testEntry);
    storage.set('test2', testEntry);
    const entries = storage.entries();
    expect(entries).toHaveLength(2);
    expect(entries).toEqual([
      ['test1', testEntry],
      ['test2', testEntry]
    ]);
  });
}); 