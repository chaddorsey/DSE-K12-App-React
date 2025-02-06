/**
 * Utility for retrying failed network requests with exponential backoff.
 * Designed for hotel/conference WiFi environments with intermittent connectivity.
 */

/**
 * Retry configuration interfaces
 */

export interface IRetryConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  timeout: number;
  shouldRetry?: (error: Error) => boolean;
}

export interface IRetryOptions extends Partial<IRetryConfig> {
  signal?: AbortSignal;
}

export class RetryError extends Error {
  constructor(
    message: string,
    public readonly attemptCount: number,
    public readonly lastError: Error
  ) {
    super(message);
    this.name = 'RetryError';
  }
}

const DEFAULT_CONFIG: IRetryConfig = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  timeout: 15000
};

/**
 * Calculate delay for next retry attempt using exponential backoff
 */
function calculateDelay(attempt: number, config: IRetryConfig): number {
  const delay = Math.min(
    config.initialDelay * Math.pow(2, attempt - 1),
    config.maxDelay
  );
  // Add jitter to prevent thundering herd
  return delay * (0.8 + Math.random() * 0.4);
}

/**
 * Wrap a request with retry logic
 * @param request Function that returns a Promise
 * @param options Retry configuration options
 * @returns Promise that resolves with the request result
 * @throws RetryError if all retry attempts fail
 */
export async function withRetry<T>(
  request: () => Promise<T>,
  options: IRetryOptions = {}
): Promise<T> {
  const config = { ...DEFAULT_CONFIG, ...options };
  let attempt = 1;
  let lastError: Error;

  while (attempt <= config.maxAttempts) {
    try {
      // Add timeout to the request
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Request timed out after ${config.timeout}ms`));
        }, config.timeout);
      });

      // Race between the request and timeout
      const result = await Promise.race([
        request(),
        timeoutPromise
      ]);

      return result;
    } catch (error) {
      lastError = error as Error;

      // Check if we should retry this error
      if (config.shouldRetry && !config.shouldRetry(lastError)) {
        break;
      }

      // Check if we've been aborted
      if (options.signal?.aborted) {
        throw new Error('Request aborted');
      }

      // If this was our last attempt, break
      if (attempt === config.maxAttempts) {
        break;
      }

      // Wait before retrying
      const delay = calculateDelay(attempt, config);
      await new Promise(resolve => setTimeout(resolve, delay));

      attempt++;
    }
  }

  throw new RetryError(
    `Failed after ${attempt} attempts`,
    attempt,
    lastError!
  );
} 