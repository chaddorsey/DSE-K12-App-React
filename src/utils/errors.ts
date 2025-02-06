/**
 * Error handling utilities and custom error types
 */

export interface IAppError extends Error {
  code: string;
  context?: Record<string, unknown>;
  retry?: () => Promise<void>;
}

export class ValidationError extends Error implements IAppError {
  code = 'VALIDATION_ERROR';
  
  constructor(
    message: string,
    public fields: Record<string, string[]>,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Error implements IAppError {
  code = 'NETWORK_ERROR';
  
  constructor(
    message: string,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends Error implements IAppError {
  code = 'AUTH_ERROR';
  
  constructor(
    message: string,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export function isAppError(error: unknown): error is IAppError {
  return error instanceof Error && 'code' in error;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
} 