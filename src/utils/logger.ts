/**
 * Centralized logging utility for application-wide logging
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface ILoggerOptions {
  level: LogLevel;
  timestamp?: boolean;
  prefix?: string;
}

class Logger {
  private static instance: Logger;
  private options: ILoggerOptions = {
    level: 'info',
    timestamp: true,
    prefix: '[App]'
  };

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, ...args: any[]): string {
    const timestamp = this.options.timestamp ? `[${new Date().toISOString()}]` : '';
    const prefix = this.options.prefix || '';
    return `${timestamp}${prefix}[${level.toUpperCase()}] ${message}`;
  }

  public info(message: string, ...args: any[]): void {
    if (process.env.NODE_ENV !== 'production') {
      console.info(this.formatMessage('info', message), ...args);
    }
  }

  public warn(message: string, ...args: any[]): void {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(this.formatMessage('warn', message), ...args);
    }
  }

  public error(message: string | Error, ...args: any[]): void {
    const errorMessage = message instanceof Error ? message.message : message;
    console.error(this.formatMessage('error', errorMessage), ...args);
    
    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
    }
  }

  public debug(message: string, ...args: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }

  public setOptions(options: Partial<ILoggerOptions>): void {
    this.options = { ...this.options, ...options };
  }
}

export const logger = Logger.getInstance(); 