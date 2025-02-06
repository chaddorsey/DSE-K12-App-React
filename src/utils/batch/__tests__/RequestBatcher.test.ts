/**
 * Tests for RequestBatcher
 */

import { RequestBatcher, IBatchConfig } from '../RequestBatcher';

describe('RequestBatcher', () => {
  let batcher: RequestBatcher;
  let mockFetch: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    mockFetch = jest.spyOn(global, 'fetch').mockImplementation(async () => 
      new Response('{"test": true}', {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );

    batcher = new RequestBatcher({
      maxSize: 3,
      delay: 100
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    mockFetch.mockRestore();
  });

  it('should batch requests and process after delay', async () => {
    const request1 = new Request('http://api.test/data');
    const request2 = new Request('http://api.test/data');

    const promise1 = batcher.add(request1);
    const promise2 = batcher.add(request2);

    // Batch shouldn't be processed yet
    expect(mockFetch).not.toHaveBeenCalled();

    // Advance timers to trigger batch processing
    jest.advanceTimersByTime(100);
    await Promise.resolve(); // Let promises resolve

    expect(mockFetch).toHaveBeenCalledTimes(1);
    
    const [response1, response2] = await Promise.all([promise1, promise2]);
    expect(await response1.json()).toEqual({ test: true });
    expect(await response2.json()).toEqual({ test: true });
  });

  it('should process batch immediately when size limit reached', async () => {
    const requests = Array.from({ length: 3 }, () => 
      new Request('http://api.test/data')
    );

    const promises = requests.map(req => batcher.add(req));

    // Should process immediately when third request added
    expect(mockFetch).toHaveBeenCalledTimes(1);

    const responses = await Promise.all(promises);
    responses.forEach(async (response) => {
      expect(await response.json()).toEqual({ test: true });
    });
  });

  it('should group requests by URL', async () => {
    const request1 = new Request('http://api.test/data1');
    const request2 = new Request('http://api.test/data2');

    batcher.add(request1);
    batcher.add(request2);

    jest.advanceTimersByTime(100);
    await Promise.resolve();

    // Should make two separate requests
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenCalledWith(expect.objectContaining({
      url: 'http://api.test/data1'
    }));
    expect(mockFetch).toHaveBeenCalledWith(expect.objectContaining({
      url: 'http://api.test/data2'
    }));
  });

  it('should handle request failures', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const request = new Request('http://api.test/data');
    const promise = batcher.add(request);

    jest.advanceTimersByTime(100);

    await expect(promise).rejects.toThrow('Network error');
  });

  it('should flush batch on demand', async () => {
    const request = new Request('http://api.test/data');
    const promise = batcher.add(request);

    // Shouldn't be processed yet
    expect(mockFetch).not.toHaveBeenCalled();

    batcher.flush();
    await Promise.resolve();

    // Should be processed immediately after flush
    expect(mockFetch).toHaveBeenCalledTimes(1);
    await expect(promise).resolves.toBeDefined();
  });

  it('should combine similar requests', async () => {
    const requests = Array.from({ length: 3 }, () => 
      new Request('http://api.test/data', {
        method: 'POST',
        body: JSON.stringify({ id: 1 })
      })
    );

    const promises = requests.map(req => batcher.add(req));

    // Should only make one request for all three
    expect(mockFetch).toHaveBeenCalledTimes(1);

    const responses = await Promise.all(promises);
    expect(responses).toHaveLength(3);
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });

  it('should use custom grouping function', async () => {
    const config: IBatchConfig = {
      maxSize: 3,
      delay: 100,
      groupBy: (request) => request.headers.get('batch-group') || request.url
    };

    batcher = new RequestBatcher(config);

    const request1 = new Request('http://api.test/data', {
      headers: { 'batch-group': 'group1' }
    });
    const request2 = new Request('http://api.test/other', {
      headers: { 'batch-group': 'group1' }
    });

    batcher.add(request1);
    batcher.add(request2);

    jest.advanceTimersByTime(100);
    await Promise.resolve();

    // Should make only one request since they're in same group
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
}); 