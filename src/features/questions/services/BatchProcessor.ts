import { ResponseService } from './ResponseService';
import { ResponseValidationService } from './ResponseValidationService';
import type { QuestionResponse } from '../types/response';
import { ResponseValidationError } from './ResponseValidationError';
import { BatchProcessingError } from './BatchProcessingError';

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

export class BatchProcessor {
  private static readonly STORAGE_KEY = 'response_queue';
  private static readonly MAX_QUEUE_SIZE = 1000;
  private static readonly MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
  private isProcessing = false;

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
    // Validate response
    this.validationService.validateResponse(response);

    // Respect max queue size
    if (this.queue.length >= BatchProcessor.MAX_QUEUE_SIZE) {
      throw new BatchProcessingError('Response queue is full', 'QUEUE_FULL');
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
    const now = Date.now();
    this.queue = this.queue.filter(response => {
      const age = now - response.timestamp.getTime();
      return age < BatchProcessor.MAX_AGE_MS;
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
      console.error('Failed to save queue to storage:', error);
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
} 