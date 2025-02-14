import type { QuestionResponse } from '../types/response';

export interface ErrorReport {
  timestamp: Date;
  type: 'validation' | 'processing' | 'network' | 'storage';
  code: string;
  message: string;
  context?: {
    questionId?: string;
    userId?: string;
    retryCount?: number;
    queueSize?: number;
    deviceInfo?: {
      online: boolean;
      storageAvailable: boolean;
      userAgent: string;
    };
  };
  error: Error;
}

export class ErrorReporter {
  private static readonly MAX_REPORTS = 100;
  private static readonly STORAGE_KEY = 'error_reports';

  static async reportError(
    error: Error,
    type: ErrorReport['type'],
    context?: ErrorReport['context']
  ): Promise<void> {
    const report: ErrorReport = {
      timestamp: new Date(),
      type,
      code: error instanceof BatchProcessingError ? error.code : 'UNKNOWN',
      message: error.message,
      context: {
        ...context,
        deviceInfo: {
          online: navigator.onLine,
          storageAvailable: this.isStorageAvailable(),
          userAgent: navigator.userAgent
        }
      },
      error
    };

    await this.storeReport(report);
    console.error('Response System Error:', report);

    // Could add external error reporting here
    // await this.sendToErrorReporting(report);
  }

  static getStoredReports(): ErrorReport[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static clearReports(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private static async storeReport(report: ErrorReport): Promise<void> {
    try {
      const reports = this.getStoredReports();
      reports.unshift(report);
      
      // Keep only recent reports
      while (reports.length > this.MAX_REPORTS) {
        reports.pop();
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reports));
    } catch (error) {
      console.error('Failed to store error report:', error);
    }
  }

  private static isStorageAvailable(): boolean {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  }
} 