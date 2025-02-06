/**
 * Configurable retry policies for different error scenarios
 */

import { NetworkError, OfflineError, PortalRedirectError, HttpError } from '../errors/NetworkError';

export interface IRetryPolicy {
  /** Maximum number of retry attempts */
  maxAttempts: number;
  /** Initial delay between retries in ms */
  initialDelay: number;
  /** Maximum delay between retries in ms */
  maxDelay: number;
  /** Whether to retry for a given error */
  shouldRetry: (error: Error) => boolean;
}

const defaultPolicy: IRetryPolicy = {
  maxAttempts: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  shouldRetry: (error: Error) => {
    // Don't retry portal redirects
    if (error instanceof PortalRedirectError) {
      return false;
    }

    // Always retry network errors
    if (error instanceof OfflineError) {
      return true;
    }

    // Retry 5xx errors
    if (error instanceof HttpError) {
      return error.status >= 500;
    }

    return false;
  }
};

export const retryPolicies = {
  default: defaultPolicy,
  aggressive: {
    ...defaultPolicy,
    maxAttempts: 5,
    maxDelay: 30000,
    shouldRetry: (error: Error) => {
      if (error instanceof PortalRedirectError) {
        return false;
      }
      return true;
    }
  },
  conservative: {
    ...defaultPolicy,
    maxAttempts: 2,
    maxDelay: 5000,
    shouldRetry: (error: Error) => {
      return error instanceof OfflineError;
    }
  }
}; 