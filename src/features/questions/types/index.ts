export type { 
  QuestionCategory,
  Question,
  QuestionType
} from './question';

import type { QuestionCategory } from './question';
import { Timestamp } from 'firebase/firestore';

export interface BaseQuestion {
  id: string;
  text: string;
  type: string;
  label: string;
  category: QuestionCategory;
  number: number;
  requiredForOnboarding: boolean;
  includeInOnboarding: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'MC';
  options: string[];
  allowMultiple?: boolean;
  allowOther?: boolean;
}

export interface OpenResponseQuestion extends BaseQuestion {
  type: 'OP';
  maxLength: number;
}

export interface NumericQuestion extends BaseQuestion {
  type: 'NM';
  min: number;
  max: number;
  step: number;
}

export interface SliderQuestion extends BaseQuestion {
  type: 'SCALE';
  min: number;
  max: number;
  step: number;
  labels?: {
    min: string;
    max: string;
  };
}

export interface SegmentedSliderQuestionType extends BaseQuestion {
  type: 'SEGMENTED_SLIDER';
  segments: {
    value: number;
    label?: string;
  }[];
  defaultSegment?: number;
}

export interface XYContinuumQuestionType extends BaseQuestion {
  type: 'XY_CONTINUUM';
  xAxis: {
    left: string;
    right: string;
  };
  yAxis: {
    top: string;
    bottom: string;
  };
  defaultPosition?: {
    x: number;
    y: number;
  };
}

export type DeviceType = 'desktop' | 'mobile' | 'tablet';
export type InputType = 'mouse' | 'touch' | 'keyboard';

export interface Device {
  type: DeviceType;
  input: InputType;
}

export interface ResponseMetadata {
  timeToAnswer: number;
  interactionCount: number;
  confidence: number;
  device: Device;
}

export interface QuestionResponse {
  id: string;
  questionId: string;
  userId: string;
  value: GuessValue;
  metadata: ResponseMetadata;
  timestamp: Timestamp;
}

// DelightFactor types
export interface BaseDelightFactor {
  id: string;
  timing: 'PRE_ANSWER' | 'POST_ANSWER';
  trigger: 'IMMEDIATE' | 'DELAYED' | 'ON_CORRECT' | 'ON_INCORRECT';
}

export interface AnimationDelightFactor extends BaseDelightFactor {
  type: 'ANIMATION';
  animationType: 'CELEBRATION' | 'PROGRESS' | 'INSIGHT' | 'CUSTOM';
  content: {
    animation: string;
    duration: number;
    customParams?: Record<string, unknown>;
  };
  questionTypes: string[];
}

export interface AttendeeStatsDelightFactor extends BaseDelightFactor {
  type: 'STATS';
  content: {
    statType: 'PERCENTAGE' | 'COUNT';
    value: number;
    message: string;
  };
}

export interface NumberAnimationDelightFactor extends BaseDelightFactor {
  type: 'NUMBER_ANIMATION';
  content: {
    number: number;
    color: string;
    duration: number;
  };
}

export type DelightFactor = 
  | AnimationDelightFactor 
  | AttendeeStatsDelightFactor 
  | NumberAnimationDelightFactor;

export interface QuizQuestion extends BaseQuestion {
  correctAnswer: string;
  distractors: string[];
}

export interface QuizResponse {
  questionId: string;
  answer: string;   // All answers normalized to string for storage
  correct: boolean;
  timestamp: number;
}

export interface QuestionFormData {
  type: string;  // Change from QuestionType to avoid conflict
  text: string;
  label: string;
  category: QuestionCategory;
  options?: string[] | string;
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
  labels?: {
    min: string;
    max: string;
  };
  requiredForOnboarding: boolean;
  includeInOnboarding: boolean;
}

export interface Connection {
  id: string;
  users: [string, string];  // [requesterId, targetId]
  status: ConnectionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ConnectionStatus = 'pending' | 'accepted';

export interface XYValue {
  type: 'XY';
  coordinates: { x: number; y: number; };
  interactions: Array<{
    type: 'move' | 'click';
    position: { x: number; y: number; };
    timestamp: number;
  }>;
}

export interface MultipleChoiceValue {
  type: 'MULTIPLE_CHOICE';
  selectedOption: string;
}

export type GuessValue = XYValue | MultipleChoiceValue;

export interface GuessMetadata {
  timeToGuess: number;
  confidence: number;
  device: Device;
}

export interface GuessAccuracy {
  distance?: number;    // For XY
  correct?: boolean;    // For Multiple Choice
  score: number;       // Normalized 0-1
}

export interface GuessResponse {
  id: string;
  userId: string;
  targetUserId: string;
  questionId: string;
  value: GuessValue;
  metadata: GuessMetadata;
  timestamp: Timestamp;
  accuracy?: GuessAccuracy;
} 