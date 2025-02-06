/**
 * Centralized logging utility for error tracking and monitoring
 */

import { NetworkError, HttpError } from '../errors/NetworkError';

type LogLevel = 'info' | 'warn' | 'error';

interface ILogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  code?: string;
  details?: unknown;
  stack?: string;
}

class Logger {
  private static instance: Logger;
  
  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public error(message: string, error?: Error): void {
    const entry: ILogEntry = {
      level: 'error',
      message,
      timestamp: new Date(),
      stack: error?.stack,
      code: error instanceof NetworkError ? error.code : undefined,
      details: error instanceof HttpError ? { status: error.status } : undefined
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(entry);
    }

    // TODO: Send to monitoring service in production
    this.sendToMonitoring(entry);
  }

  private sendToMonitoring(entry: ILogEntry): void {
    // Implementation for sending to monitoring service
    // e.g., Sentry, LogRocket, etc.
  }
}

export const logger = Logger.getInstance(); 