export enum QuestionType {
  MC = 'MC',
  OP = 'OP',
  NM = 'NM',
  SLIDER = 'SLIDER',
  XY = 'XY'
}

export enum QuestionContext {
  ONBOARDING = 'ONBOARDING',
  QUIZ = 'QUIZ',
  HEAD_TO_HEAD = 'HEAD_TO_HEAD'
}

export enum QuestionCategory {
  PREFERENCES = 'PREFERENCES',
  SKILLS = 'SKILLS',
  PERSONALITY = 'PERSONALITY',
  BACKGROUND = 'BACKGROUND'
}

// Base question interface
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  text: string;
  label: string;
  category: QuestionCategory;
  number: number;
  requiredForOnboarding: boolean;
  includeInOnboarding: boolean;
}

// Type-specific question interfaces
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MC;
  options: string[];
}

export interface OpenResponseQuestion extends BaseQuestion {
  type: QuestionType.OP;
  maxLength: number;
}

export interface NumericQuestion extends BaseQuestion {
  type: QuestionType.NM;
  min: number;
  max: number;
  step: number;
}

export interface SliderQuestion extends BaseQuestion {
  type: QuestionType.SLIDER;
  leftLabel: string;
  rightLabel: string;
  defaultValue?: number;
}

export interface XYContinuumQuestion extends BaseQuestion {
  type: QuestionType.XY;
  xAxis: {
    left: string;
    right: string;
  };
  yAxis: {
    top: string;
    bottom: string;
  };
  defaultPosition?: { x: number; y: number };
}

// Quiz-specific question interface
export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  text: string;
  label: string;
  category: QuestionCategory;
  number: number;
  correctAnswer?: string;
  distractors?: string[];
  explanation?: string;
  points?: number;
}

// Question context configuration
export interface QuestionContextConfig {
  experience: QuestionContext;
  mode?: 'PRACTICE' | 'COMPETITION';
  subjectId?: string;
  timeLimit?: number;
  showFeedback: boolean;
  allowRetry: boolean;
  trackProgress: boolean;
}

// Response types
export interface ResponseMetadata {
  timeToAnswer: number;
  interactionCount: number;
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    input: 'mouse' | 'touch' | 'keyboard';
  };
}

export interface BaseResponse {
  id: string;
  questionId: string;
  userId: string;
  timestamp: Date;
  metadata: ResponseMetadata;
  context: QuestionContext;
}

export interface QuestionValue {
  type: QuestionType;
  selectedOption?: string;
  position?: number;
  coordinates?: { x: number; y: number };
  segment?: number;
}

export interface OnboardingResponse extends BaseResponse {
  context: QuestionContext.ONBOARDING;
  value: QuestionValue;
}

export interface QuizResponse extends BaseResponse {
  context: QuestionContext.QUIZ;
  value: QuestionValue;
  targetUserId: string;
  isCorrect?: boolean;
  points?: number;
}

// Update the Question type to be a discriminated union
export type Question = 
  | MultipleChoiceQuestion 
  | OpenResponseQuestion 
  | NumericQuestion 
  | SliderQuestion 
  | XYContinuumQuestion;

export type QuestionResponse = OnboardingResponse | QuizResponse;

// Remove these lines since they're causing conflicts
// export type { 
//   QuestionResponse,
//   QuizResponse 
// } from './responses'; 