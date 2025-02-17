export type QuestionTypeString = 
  | 'MC'
  | 'OP'
  | 'NM'
  | 'SCALE'
  | 'SEGMENTED_SLIDER'
  | 'XY_CONTINUUM';

export type QuestionCategory = 
  | 'GENERAL'
  | 'TECHNICAL'
  | 'BEHAVIORAL'
  | 'PREFERENCES'
  | 'BACKGROUND';

export interface BaseQuestion {
  id: string;
  type: QuestionTypeString;
  prompt: string;
  text: string;
  label: string;
  category: QuestionCategory;
  number: number;
  requiredForOnboarding: boolean;
  includeInOnboarding: boolean;
  correctAnswer?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'MC';
  options: string[];
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
  leftOption: string;
  rightOption: string;
  defaultValue?: number;
}

// Update both interfaces to use the same segment type
type Segment = {
  value: number;
  label?: string;
};

export interface SegmentedSliderQuestion extends BaseQuestion {
  type: 'SEGMENTED_SLIDER';
  segments: Segment[];
  defaultSegment?: number;
  correctAnswer?: string;
}

export interface XYContinuumQuestion extends BaseQuestion {
  type: 'XY_CONTINUUM';
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

// Update QuestionType to be a discriminated union
export type QuestionType = 
  | MultipleChoiceQuestion 
  | OpenResponseQuestion 
  | NumericQuestion 
  | SliderQuestion 
  | SegmentedSliderQuestion 
  | XYContinuumQuestion;

// Update QuizQuestion to extend the base types
export interface QuizQuestion extends BaseQuestion {
  type: QuestionTypeString;
  correctAnswer: string;
  distractors?: string[];
  options?: string[];
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  leftOption?: string;
  rightOption?: string;
  defaultValue?: number;
  defaultSegment?: number;
  defaultPosition?: { x: number; y: number };
  segments?: Segment[];  // Use the same type
  xAxis?: {
    left: string;
    right: string;
  };
  yAxis?: {
    top: string;
    bottom: string;
  };
}

// Add context type
export interface QuestionContextValue {
  experience: 'ONBOARDING' | 'QUIZ' | 'HEAD_TO_HEAD';
  mode?: 'PRACTICE' | 'COMPETITION';
  subjectId?: string;
  timeLimit?: number;
  showFeedback: boolean;
  allowRetry: boolean;
  trackProgress: boolean;
}

// Update the Question type to be a single union type
export type Question = 
  | MultipleChoiceQuestion 
  | OpenResponseQuestion 
  | NumericQuestion 
  | SliderQuestion 
  | SegmentedSliderQuestion 
  | XYContinuumQuestion
  | QuizQuestion;

// Add these exports
export type { 
  QuestionResponse,
  QuizResponse 
} from './responses'; 