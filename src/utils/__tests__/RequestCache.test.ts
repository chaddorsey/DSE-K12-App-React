import { RequestCache } from '../RequestCache';
import { logger } from '../logger';

jest.mock('../logger');

describe('RequestCache', () => {
  let cache: RequestCache;

  beforeEach(() => {
    cache = new RequestCache({
      ttl: 5000, // 5 seconds
      maxEntries: 2
    });
    jest.clearAllMocks();
  });

  it('should cache and return responses', async () => {
    const key = 'test-key';
    const response = new Response(JSON.stringify({ data: 'test' }));
    const clonedResponse = response.clone();

    await cache.set(key, response);
    const cachedResponse = await cache.get(key);

    expect(await cachedResponse?.json()).toEqual(await clonedResponse.json());
  });

  it('should respect TTL', async () => {
    const key = 'test-key';
    const response = new Response(JSON.stringify({ data: 'test' }));

    await cache.set(key, response);
    
    // Move time forward beyond TTL
    jest.advanceTimersByTime(6000);
    
    const cachedResponse = await cache.get(key);
    expect(cachedResponse).toBeNull();
  });

  it('should respect max entries limit', async () => {
    const response = new Response(JSON.stringify({ data: 'test' }));

    // Add three entries (max is 2)
    await cache.set('key1', response.clone());
    await cache.set('key2', response.clone());
    await cache.set('key3', response.clone());

    // First entry should be evicted
    const firstResponse = await cache.get('key1');
    expect(firstResponse).toBeNull();

    // Later entries should exist
    expect(await cache.get('key2')).not.toBeNull();
    expect(await cache.get('key3')).not.toBeNull();
  });

  it('should invalidate specific entries', async () => {
    const response = new Response(JSON.stringify({ data: 'test' }));

    await cache.set('key1', response.clone());
    await cache.set('key2', response.clone());

    await cache.invalidate('key1');

    expect(await cache.get('key1')).toBeNull();
    expect(await cache.get('key2')).not.toBeNull();
  });

  it('should clear all entries', async () => {
    const response = new Response(JSON.stringify({ data: 'test' }));

    await cache.set('key1', response.clone());
    await cache.set('key2', response.clone());

    await cache.clear();

    expect(await cache.get('key1')).toBeNull();
    expect(await cache.get('key2')).toBeNull();
  });

  it('should log cache operations', async () => {
    const key = 'test-key';
    const response = new Response(JSON.stringify({ data: 'test' }));

    await cache.set(key, response);
    await cache.get(key);
    await cache.invalidate(key);

    expect(logger.debug).toHaveBeenCalledWith(
      'Cache set',
      expect.objectContaining({ key })
    );
    expect(logger.debug).toHaveBeenCalledWith(
      'Cache hit',
      expect.objectContaining({ key })
    );
    expect(logger.debug).toHaveBeenCalledWith(
      'Cache invalidated',
      expect.objectContaining({ key })
    );
  });
}); 