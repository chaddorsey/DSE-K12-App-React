/**
 * Base class for API-related errors with standardized structure
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public userMessage: string,
    public status?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Specific error types for different scenarios
 */
export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(
      message,
      'VALIDATION_ERROR',
      'The provided data is invalid.',
      400,
      details
    );
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string) {
    super(
      message,
      'AUTH_ERROR',
      'Please sign in to continue.',
      401
    );
    this.name = 'AuthenticationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(
      `Resource not found: ${resource}`,
      'NOT_FOUND',
      'The requested information could not be found.',
      404
    );
    this.name = 'NotFoundError';
  }
}

export class ServerError extends ApiError {
  constructor(message: string) {
    super(
      message,
      'SERVER_ERROR',
      'Something went wrong. Please try again later.',
      500
    );
    this.name = 'ServerError';
  }
} 