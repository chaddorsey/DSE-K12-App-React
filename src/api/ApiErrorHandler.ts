import { logger } from '../utils/logger';
import { 
  ApiError, 
  ValidationError, 
  AuthenticationError,
  NotFoundError,
  ServerError 
} from '../errors/ApiError';

export interface IErrorResponse {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
  status?: number;
}

export class ApiErrorHandler {
  /**
   * Converts raw errors into standardized ApiError instances
   */
  handleError(error: unknown, endpoint?: string): ApiError {
    logger.error('API Error occurred', { error, endpoint });

    // Already handled error
    if (error instanceof ApiError) {
      return error;
    }

    // Network or parsing error
    if (error instanceof Error) {
      return new ServerError(error.message);
    }

    // API error response
    if (this.isErrorResponse(error)) {
      return this.createFromResponse(error);
    }

    // Unknown error
    return new ServerError('An unexpected error occurred');
  }

  private isErrorResponse(error: unknown): error is IErrorResponse {
    return typeof error === 'object' && error !== null && 'error' in error;
  }

  private createFromResponse(response: IErrorResponse): ApiError {
    const { error, status } = response;

    if (!error) {
      return new ServerError('Unknown server error');
    }

    switch (status) {
      case 400:
        return new ValidationError(
          error.message || 'Validation failed',
          error.details
        );
      case 401:
        return new AuthenticationError(
          error.message || 'Authentication required'
        );
      case 404:
        return new NotFoundError(
          error.message || 'Resource'
        );
      default:
        return new ServerError(
          error.message || 'Server error'
        );
    }
  }

  /**
   * Gets user-friendly recovery action based on error type
   */
  getRecoveryAction(error: ApiError): (() => Promise<void>) | undefined {
    switch (error.code) {
      case 'AUTH_ERROR':
        return async () => {
          // Redirect to login
          window.location.href = '/login';
        };
      case 'SERVER_ERROR':
        return async () => {
          // Refresh the page
          window.location.reload();
        };
      default:
        return undefined;
    }
  }
} 