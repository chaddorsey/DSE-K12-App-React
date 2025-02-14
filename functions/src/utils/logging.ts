import * as functions from 'firebase-functions';
import { TriggerError } from './errors';

export const logger = functions.logger;

interface LogContext {
  functionName: string;
  operationId: string;
  [key: string]: unknown;
}

export function logError(error: Error | TriggerError, context: LogContext): void {
  if (error instanceof TriggerError) {
    logger.error('Trigger Error', {
      code: error.code,
      message: error.message,
      context: {
        ...context,
        ...error.context
      },
      stack: error.stack
    });
  } else {
    logger.error('Unexpected Error', {
      message: error.message,
      context,
      stack: error.stack
    });
  }
}

export function logInfo(message: string, context: LogContext): void {
  logger.info(message, context);
} 