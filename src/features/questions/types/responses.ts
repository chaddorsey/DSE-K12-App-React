import { QuestionTypeString } from './questions';
import { Timestamp } from 'firebase/firestore';

export interface BaseResponse {
  id: string;
  userId: string;
  questionId: string;
  timestamp: Date;
  metadata: {
    timeToAnswer: number;
    interactionCount: number;
    device: {
      type: string;
      input: string;
    };
  };
}

export interface MultipleChoiceResponse extends BaseResponse {
  value: {
    type: 'MC';
    selectedOption: string;
  };
}

export interface OpenResponseResponse extends BaseResponse {
  value: {
    type: 'OP';
    text: string;
  };
}

export interface NumericResponse extends BaseResponse {
  value: {
    type: 'NM';
    number: number;
  };
}

export interface SliderResponse extends BaseResponse {
  value: {
    type: 'SCALE';
    position: number;
  };
}

export interface SegmentedSliderResponse extends BaseResponse {
  value: {
    type: 'SEGMENTED_SLIDER';
    segment: number;
  };
}

export interface XYContinuumResponse extends BaseResponse {
  value: {
    type: 'XY_CONTINUUM';
    coordinates: {
      x: number;
      y: number;
    };
  };
}

export interface QuizResponse extends BaseResponse {
  value: {
    type: QuestionTypeString;
    selectedOption?: string;
    text?: string;
    number?: number;
    position?: number;
    segment?: number;
    coordinates?: {
      x: number;
      y: number;
    };
  };
  correct: boolean;
  metadata: {
    timeToAnswer: number;
    interactionCount: number;
    device: {
      type: string;
      input: string;
    };
    confidence: number;
  };
}

export interface DelightFactor {
  id: string;
  type: 'ANIMATION' | 'STATS' | 'ACHIEVEMENT';
  timing: 'PRE_ANSWER' | 'POST_ANSWER';
  trigger: 'IMMEDIATE' | 'DELAYED' | 'ON_CORRECT' | 'ON_INCORRECT';
  content: Record<string, any>;
  questionTypes: QuestionTypeString[];
}

export type QuestionResponse =
  | MultipleChoiceResponse
  | OpenResponseResponse
  | NumericResponse
  | SliderResponse
  | SegmentedSliderResponse
  | XYContinuumResponse
  | QuizResponse; 