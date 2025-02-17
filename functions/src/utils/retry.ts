interface RetryOptions {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
}

type RetryableOperation<T> = () => Promise<T>;

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
  operation: RetryableOperation<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  let lastError: Error | null = null;
  let delay = config.initialDelayMs;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (error instanceof RetryableError && !error.isRetryable) {
        throw error;
      }

      if (attempt === config.maxAttempts) {
        throw new RetryableError(
          `Operation failed after ${attempt} attempts`,
          lastError,
          false
        );
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * config.backoffMultiplier, config.maxDelayMs);
    }
  }

  throw lastError; // Shouldn't reach here, but TypeScript needs it
}

export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoffMultiplier = 2
  } = options;

  let attempts = 0;
  let lastError: Error | null = null;

  while (attempts < maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      attempts++;

      if (attempts === maxAttempts) {
        break;
      }

      await new Promise(resolve => 
        setTimeout(resolve, delayMs * Math.pow(backoffMultiplier, attempts - 1))
      );
    }
  }

  throw new Error(
    `Operation failed after ${attempts} attempts. ` +
    `Last error: ${lastError?.message}`
  );
} 