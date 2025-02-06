/**
 * Error message translations and formatting
 */

import { ErrorCode, IErrorMessageTemplate } from './types';

export const errorMessages: Record<ErrorCode, IErrorMessageTemplate> = {
  OFFLINE: {
    title: 'No Internet Connection',
    message: 'Please check your internet connection and try again.',
    action: 'Retry'
  },
  PORTAL_REDIRECT: {
    title: 'WiFi Login Required',
    message: 'Please log in to the WiFi network to continue.',
    action: 'Open Login Page'
  },
  HTTP_ERROR: {
    title: 'Request Failed',
    message: 'The server returned an error: {status}',
    action: 'Try Again'
  },
  UNKNOWN_ERROR: {
    title: 'Unexpected Error',
    message: 'An unexpected error occurred. Please try again.',
    action: 'Retry'
  }
}; 