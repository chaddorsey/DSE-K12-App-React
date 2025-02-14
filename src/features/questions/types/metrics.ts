import type { GuessResponse, QuestionResponse } from './index';

export interface MetricsSummary {
  totalResponses: number;
  averageAccuracy: number;
  averageConfidence: number;
  distributionByType: Record<string, number>;
  timeStats: {
    min: number;
    max: number;
    avg: number;
  };
}

export interface ResponseMetrics {
  accuracy: number;
  confidence: number;
  timeToAnswer: number;
  interactionCount: number;
  deviceType: string;
}

export interface GuessMetrics extends ResponseMetrics {
  targetAccuracy: number;
  targetConfidence: number;
}

interface ResponseMetrics {
  questionId: string;
  totalResponses: number;
  lastUpdated: Date;
  
  // For XY Questions
  xyMetrics?: {
    distribution: {
      quadrants: Record<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right', number>;
      grid: Record<string, number>; // "x,y" -> count for heatmap
    };
    average: {
      x: number;
      y: number;
    };
  };

  // For Multiple Choice
  multipleChoiceMetrics?: {
    optionCounts: Record<string, number>;
  };

  // For friend comparisons
  userResponses: {
    userId: string;
    response: {
      value: number | string | { x: number; y: number };
      timestamp: Date;
    };
  }[];
} 