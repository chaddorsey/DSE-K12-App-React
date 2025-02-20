import { ResponseService } from './ResponseService';
import { ResponseValidationService } from './ResponseValidationService';
import type { QuestionResponse } from '../types/response';
import { ResponseValidationError } from './ResponseValidationError';
import { BatchProcessingError } from '../types/errors';
import { ErrorReporter } from './ErrorReporter';
import { Timestamp } from 'firebase/firestore';

interface QueuedResponse extends QuestionResponse {
  retryCount?: number;
}

interface ProcessResult {
  successful: QueuedResponse[];
  failed: Array<{
    response: QueuedResponse;
    error: Error;
  }>;
}

export type BatchErrorCode = 'QUEUE_FULL' | 'OFFLINE' | 'STORAGE_FULL' | 'VALIDATION_FAILED' | 'PROCESSING_ERROR';

export class BatchProcessor {
  private static readonly STORAGE_KEY = 'response_queue';
  private static readonly MAX_QUEUE_SIZE = 1000;
  private static readonly MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
  private isProcessing = false;
  private readonly expirationSeconds = 7 * 24 * 60 * 60; // 7 days

  constructor(
    private responseService: ResponseService,
    private validationService: ResponseValidationService
  ) {
    this.loadQueueFromStorage();
    this.cleanupOldResponses();
    window.addEventListener('online', this.handleOnline);
  }

  private queue: QueuedResponse[] = [];

  async queueResponse(response: QuestionResponse): Promise<void> {
    try {
      this.validationService.validateResponse(response);
    } catch (error) {
      const processedError = this.handleError(error);
      await ErrorReporter.reportError(processedError, 'validation', {
        questionId: response.questionId,
        userId: response.userId
      });
      throw processedError;
    }

    if (this.queue.length >= BatchProcessor.MAX_QUEUE_SIZE) {
      const error = new BatchProcessingError('Response queue is full', 'QUEUE_FULL');
      await ErrorReporter.reportError(error, 'processing', {
        queueSize: this.queue.length
      });
      throw error;
    }

    // Add to queue
    this.queue.push(response);
    await this.saveQueueToStorage();

    // Try processing if online
    if (navigator.onLine) {
      this.processQueue().catch(console.error);
    }
  }

  async processQueue(): Promise<ProcessResult> {
    if (this.isProcessing) {
      return { successful: [], failed: [] };
    }

    if (!navigator.onLine) {
      return {
        successful: [],
        failed: this.queue.map(response => ({
          response,
          error: new BatchProcessingError('Device is offline', 'OFFLINE')
        }))
      };
    }

    try {
      this.isProcessing = true;
      const result: ProcessResult = { successful: [], failed: [] };

      // Process in batches
      const responses = [...this.queue];
      if (responses.length === 0) return result;

      try {
        const responseIds = await this.responseService.submitBatchResponses(responses);
        result.successful = responses;
        this.queue = this.queue.filter(r => !responseIds.includes(r.id));
      } catch (error) {
        // Mark all as failed and increment retry counts
        result.failed = responses.map(response => {
          const updatedResponse = {
            ...response,
            retryCount: (response.retryCount || 0) + 1
          };
          return {
            response: updatedResponse,
            error: error instanceof Error ? error : new Error('Unknown error')
          };
        });

        // Update retry counts in queue
        this.queue = this.queue.map(r => ({
          ...r,
          retryCount: (r.retryCount || 0) + 1
        }));
      }

      await this.saveQueueToStorage();
      return result;
    } finally {
      this.isProcessing = false;
    }
  }

  getQueuedResponses(): QueuedResponse[] {
    return [...this.queue];
  }

  private cleanupOldResponses(): void {
    const now = Timestamp.now();
    this.queue = this.queue.filter(response => {
      return !this.isExpired(response.timestamp);
    });
  }

  private async saveQueueToStorage(): Promise<void> {
    try {
      this.cleanupOldResponses();
      const queueString = JSON.stringify(this.queue);
      
      try {
        localStorage.setItem(BatchProcessor.STORAGE_KEY, queueString);
      } catch (error) {
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          // Remove oldest items until it fits
          while (this.queue.length > 0) {
            this.queue.shift();
            try {
              localStorage.setItem(BatchProcessor.STORAGE_KEY, JSON.stringify(this.queue));
              break;
            } catch (e) {
              if (this.queue.length === 0) throw e;
            }
          }
        } else {
          throw error;
        }
      }
    } catch (error) {
      await ErrorReporter.reportError(error, 'storage', {
        queueSize: this.queue.length
      });
    }
  }

  private loadQueueFromStorage(): void {
    try {
      const stored = localStorage.getItem(BatchProcessor.STORAGE_KEY);
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load queue from storage:', error);
      this.queue = [];
    }
  }

  private handleOnline = (): void => {
    this.processQueue().catch(console.error);
  };

  private isExpired(timestamp: Timestamp): boolean {
    const now = Timestamp.now();
    return now.seconds - timestamp.seconds > this.expirationSeconds;
  }

  private handleError(error: unknown): BatchProcessingError {
    if (error instanceof BatchProcessingError) {
      return error;
    }
    if (error instanceof Error) {
      return new BatchProcessingError(error.message, 'PROCESSING_ERROR');
    }
    return new BatchProcessingError('Unknown error', 'PROCESSING_ERROR');
  }
} 