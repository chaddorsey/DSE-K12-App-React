interface RetryOptions {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxAttempts: 5,
  initialDelayMs: 1000,
  maxDelayMs: 32000,
  backoffMultiplier: 2
};

export class RetryableError extends Error {
  constructor(
    message: string,
    public readonly originalError: Error,
    public readonly isRetryable: boolean = true
  ) {
    super(message);
    this.name = 'RetryableError';
  }
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;
  let delay = config.initialDelayMs;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      // Don't retry if explicitly marked as non-retryable
      if (error instanceof RetryableError && !error.isRetryable) {
        throw error;
      }

      // Don't retry on last attempt
      if (attempt === config.maxAttempts) {
        throw new RetryableError(
          `Operation failed after ${attempt} attempts`,
          lastError,
          false
        );
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * config.backoffMultiplier, config.maxDelayMs);
    }
  }

  throw lastError; // Shouldn't reach here, but TypeScript needs it
} 