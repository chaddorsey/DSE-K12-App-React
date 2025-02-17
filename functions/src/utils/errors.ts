export class TriggerError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'TriggerError';
  }
}

export const ErrorCodes = {
  INVALID_DATA: 'INVALID_DATA',
  TRANSACTION_FAILED: 'TRANSACTION_FAILED',
  METRICS_UPDATE_FAILED: 'METRICS_UPDATE_FAILED'
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes]; 