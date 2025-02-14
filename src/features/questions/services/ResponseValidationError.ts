export class ResponseValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ResponseValidationError';
  }
} 