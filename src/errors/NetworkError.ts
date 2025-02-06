import { ErrorCode } from './types';

/**
 * Base error class for network-related errors
 */
export class NetworkError extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Error thrown when network is offline
 */
export class OfflineError extends NetworkError {
  constructor(message = 'Network is offline') {
    super(message, 'OFFLINE');
    this.name = 'OfflineError';
  }
}

/**
 * Error thrown when a portal redirect is detected
 */
export class PortalRedirectError extends NetworkError {
  constructor(message = 'WiFi portal login required') {
    super(message, 'PORTAL_REDIRECT');
    this.name = 'PortalRedirectError';
  }
}

/**
 * Error thrown when HTTP request fails
 */
export class HttpError extends NetworkError {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message, 'HTTP_ERROR');
    this.name = 'HttpError';
  }
} 