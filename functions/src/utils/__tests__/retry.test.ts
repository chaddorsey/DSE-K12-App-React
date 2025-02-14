import { withRetry, RetryableError } from '../retry';

describe('Retry Logic', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should retry failed operations', async () => {
    const operation = jest.fn()
      .mockRejectedValueOnce(new Error('Temporary failure'))
      .mockRejectedValueOnce(new Error('Another failure'))
      .mockResolvedValueOnce('success');

    const promise = withRetry(operation, {
      maxAttempts: 3,
      initialDelayMs: 1000,
      backoffMultiplier: 2
    });

    // Fast-forward through delays
    jest.runAllTimers();
    
    const result = await promise;
    expect(result).toBe('success');
    expect(operation).toHaveBeenCalledTimes(3);
  });

  it('should not retry non-retryable errors', async () => {
    const operation = jest.fn()
      .mockRejectedValue(new RetryableError('Bad data', new Error(), false));

    await expect(withRetry(operation)).rejects.toThrow('Bad data');
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it('should respect max attempts', async () => {
    const operation = jest.fn()
      .mockRejectedValue(new Error('Always fails'));

    const promise = withRetry(operation, { maxAttempts: 2 });
    jest.runAllTimers();

    await expect(promise).rejects.toThrow('Operation failed after 2 attempts');
    expect(operation).toHaveBeenCalledTimes(2);
  });

  it('should use exponential backoff', async () => {
    const operation = jest.fn()
      .mockRejectedValue(new Error('Fails'));
    
    const delays: number[] = [];
    jest.spyOn(global, 'setTimeout').mockImplementation((cb, delay) => {
      delays.push(delay as number);
      cb();
      return null as any;
    });

    try {
      await withRetry(operation, {
        maxAttempts: 3,
        initialDelayMs: 1000,
        backoffMultiplier: 2
      });
    } catch {}

    expect(delays).toEqual([1000, 2000]);
  });
}); 