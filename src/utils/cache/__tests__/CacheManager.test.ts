/**
 * Tests for CacheManager
 */

import { CacheManager, ICacheConfig } from '../CacheManager';

describe('CacheManager', () => {
  let cache: CacheManager;
  const testData = { id: 1, name: 'test' };

  beforeEach(() => {
    cache = new CacheManager({
      ttl: 1000,
      maxEntries: 2,
      storage: 'memory'
    });
  });

  it('should store and retrieve values', () => {
    cache.set('test', testData);
    expect(cache.get('test')).toEqual(testData);
  });

  it('should return null for missing keys', () => {
    expect(cache.get('missing')).toBeNull();
  });

  it('should expire entries after TTL', () => {
    jest.useFakeTimers();
    cache.set('test', testData);
    
    jest.advanceTimersByTime(1100); // TTL + 100ms
    expect(cache.get('test')).toBeNull();
    
    jest.useRealTimers();
  });

  it('should evict oldest entry when max size reached', () => {
    cache.set('first', { id: 1 });
    cache.set('second', { id: 2 });
    cache.set('third', { id: 3 }); // Should evict 'first'

    expect(cache.get('first')).toBeNull();
    expect(cache.get('second')).toEqual({ id: 2 });
    expect(cache.get('third')).toEqual({ id: 3 });
  });

  it('should track metrics correctly', () => {
    cache.set('test', testData);
    cache.get('test'); // hit
    cache.get('missing'); // miss
    cache.get('test'); // hit

    const metrics = cache.getMetrics();
    expect(metrics.hits).toBe(2);
    expect(metrics.misses).toBe(1);
    expect(metrics.hitRate).toBe(2/3);
  });

  it('should clear all entries', () => {
    cache.set('test1', testData);
    cache.set('test2', testData);
    cache.clear();

    expect(cache.get('test1')).toBeNull();
    expect(cache.get('test2')).toBeNull();
    expect(cache.getMetrics().size).toBe(0);
  });
}); 