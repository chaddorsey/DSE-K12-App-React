/**
 * Centralized logging utility for application-wide logging
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerOptions {
  level: LogLevel;
  enabled: boolean;
  debugEnabled?: boolean;
}

class Logger {
  private options: LoggerOptions;

  constructor(options: LoggerOptions) {
    this.options = {
      ...options,
      debugEnabled: options.debugEnabled ?? (process.env.NODE_ENV === 'development')
    };
  }

  private formatMessage(level: LogLevel, message: string | Error, meta?: any): string {
    const timestamp = new Date().toISOString();
    const prefix = '[App]';
    const formattedMessage = message instanceof Error ? message.message : message;
    return `${timestamp}${prefix}[${level.toUpperCase()}] ${formattedMessage}`;
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.options.enabled) return false;
    if (level === 'debug' && !this.options.debugEnabled) return false;
    
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const configuredLevelIndex = levels.indexOf(this.options.level);
    const currentLevelIndex = levels.indexOf(level);
    
    return currentLevelIndex >= configuredLevelIndex;
  }

  debug(message: string, meta?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message), meta);
    }
  }

  info(message: string, meta?: any): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message), meta);
    }
  }

  warn(message: string, meta?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message), meta);
    }
  }

  error(message: string | Error, meta?: any): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message), meta);
      if (message instanceof Error && meta?.stack) {
        console.error(message.stack);
      }
    }
  }
}

// Create and export a single instance
export const logger = new Logger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  enabled: true,
  debugEnabled: true
}); 