import { Timestamp } from 'firebase/firestore';

export interface QuestionResponse {
  id: string;
  userId: string;
  questionId: string;
  value: ResponseValue;
  metadata: ResponseMetadata;
  timestamp: Timestamp;
}

export type ResponseValue = 
  | MultipleChoiceResponseValue
  | XYResponseValue;

export interface MultipleChoiceResponseValue {
  type: 'MULTIPLE_CHOICE';
  selectedOption: string;
}

export interface XYResponseValue {
  type: 'XY';
  coordinates: {
    x: number;
    y: number;
  };
  interactions: Array<{
    type: 'move' | 'click';
    position: { x: number; y: number };
    timestamp: number;
  }>;
}

export interface ResponseMetadata {
  timeToAnswer: number;  // milliseconds
  interactionCount: number;
  confidence: number;    // 0-1 scale
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    input: 'mouse' | 'touch' | 'keyboard';
  };
}

export interface ResponseMetrics {
  questionId: string;
  totalResponses: number;
  averageTimeToAnswer: number;
  distribution: Record<string, number>;
  correlations?: Record<string, number>;
  lastUpdated: Timestamp;
} 