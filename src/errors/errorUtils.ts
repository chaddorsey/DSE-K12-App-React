import { ErrorCode, IErrorMessageTemplate } from './types';
import { NetworkError, HttpError } from './NetworkError';
import { errorMessages } from './errorMessages';

/**
 * Get user-friendly error message from error object
 * @param error - Error object to translate
 * @returns Formatted error message template
 */
export function getErrorMessage(error: Error): IErrorMessageTemplate {
  if (error instanceof NetworkError) {
    const template = errorMessages[error.code];
    if (error instanceof HttpError) {
      return {
        ...template,
        message: template.message.replace('{status}', error.status.toString())
      };
    }
    return template;
  }

  return errorMessages.UNKNOWN_ERROR;
} 