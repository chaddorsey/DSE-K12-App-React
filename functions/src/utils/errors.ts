export class TriggerError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly context: Record<string, unknown>
  ) {
    super(message);
    this.name = 'TriggerError';
  }
}

export const ErrorCodes = {
  RESPONSE: {
    INVALID_DATA: 'RESPONSE_INVALID_DATA',
    METRICS_UPDATE_FAILED: 'RESPONSE_METRICS_UPDATE_FAILED',
    USER_STATS_UPDATE_FAILED: 'USER_STATS_UPDATE_FAILED',
    QUIZ_METRICS_UPDATE_FAILED: 'QUIZ_METRICS_UPDATE_FAILED'
  },
  GUESS: {
    INVALID_DATA: 'GUESS_INVALID_DATA',
    METRICS_UPDATE_FAILED: 'GUESS_METRICS_UPDATE_FAILED',
    USER_STATS_UPDATE_FAILED: 'GUESS_USER_STATS_UPDATE_FAILED'
  }
} as const; 