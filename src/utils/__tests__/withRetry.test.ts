import { withRetry, RetryError } from '../withRetry';

describe('withRetry', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return successful result immediately', async () => {
    const request = jest.fn().mockResolvedValue('success');
    
    const promise = withRetry(request);
    jest.runAllTimers();
    const result = await promise;

    expect(result).toBe('success');
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('should retry failed requests', async () => {
    const request = jest.fn()
      .mockRejectedValueOnce(new Error('Failed 1'))
      .mockRejectedValueOnce(new Error('Failed 2'))
      .mockResolvedValue('success');
    
    const promise = withRetry(request);
    
    // Run timers for initial attempt and two retries
    jest.runAllTimers();
    const result = await promise;

    expect(result).toBe('success');
    expect(request).toHaveBeenCalledTimes(3);
  });

  it('should respect maxAttempts', async () => {
    const error = new Error('Failed');
    const request = jest.fn().mockRejectedValue(error);
    
    const promise = withRetry(request, { maxAttempts: 2 });
    
    jest.runAllTimers();
    await expect(promise).rejects.toThrow(RetryError);
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('should handle timeouts', async () => {
    const request = jest.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 20000))
    );
    
    const promise = withRetry(request, { timeout: 5000 });
    
    jest.advanceTimersByTime(5000);
    await expect(promise).rejects.toThrow('Request timed out');
  });

  it('should respect abort signal', async () => {
    const controller = new AbortController();
    const request = jest.fn().mockRejectedValue(new Error('Failed'));
    
    const promise = withRetry(request, { signal: controller.signal });
    
    // Abort after first failure
    jest.runOnlyPendingTimers();
    controller.abort();
    jest.runAllTimers();

    await expect(promise).rejects.toThrow('Request aborted');
  });

  it('should use exponential backoff', async () => {
    const request = jest.fn()
      .mockRejectedValueOnce(new Error('Failed 1'))
      .mockRejectedValueOnce(new Error('Failed 2'))
      .mockResolvedValue('success');
    
    const promise = withRetry(request, { initialDelay: 1000 });
    
    // First attempt fails immediately
    jest.advanceTimersByTime(0);
    expect(request).toHaveBeenCalledTimes(1);
    
    // Second attempt should happen after ~1000ms
    jest.advanceTimersByTime(1000);
    expect(request).toHaveBeenCalledTimes(2);
    
    // Third attempt should happen after ~2000ms
    jest.advanceTimersByTime(2000);
    expect(request).toHaveBeenCalledTimes(3);
    
    const result = await promise;
    expect(result).toBe('success');
  });
}); 