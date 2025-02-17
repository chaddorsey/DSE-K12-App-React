import { Timestamp } from 'firebase-admin/firestore';

export interface QuestionResponse {
  questionId: string;
  value: {
    type: string;
    [key: string]: any;
  };
  metadata: {
    timestamp: Timestamp;
  };
}

export interface GuessResponse {
  questionId: string;
  targetUserId: string;
  value: any;
  metadata: {
    timestamp: Timestamp;
  };
}

export interface MetricsUpdate {
  total: number;
  byType: {
    [key: string]: number;
  };
  lastUpdated: Timestamp;
} 