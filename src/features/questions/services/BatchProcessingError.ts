export class BatchProcessingError extends Error {
  constructor(
    message: string,
    public readonly code: 'QUEUE_FULL' | 'OFFLINE' | 'STORAGE_FULL' | 'VALIDATION_FAILED',
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'BatchProcessingError';
  }
} 