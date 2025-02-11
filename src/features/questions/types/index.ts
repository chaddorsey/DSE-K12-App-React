export type QuestionCategory = 
  | 'PERSONALITY'
  | 'INTERESTS'
  | 'PROFESSIONAL'
  | 'DEMOGRAPHIC'
  | 'BACKGROUND';

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

export interface QuestionResponse {
  questionId: string;
  answer?: string;
  value?: number;
  position?: {
    x: number;
    y: number;
  };
  timestamp: number;
}

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

export type DelightFactor = 
  | AnimationDelightFactor 
  | AttendeeStatsDelightFactor 
  | NumberAnimationDelightFactor;

export interface AttendeeStatsDelightFactor extends DelightFactor {
  type: 'STATS';
  content: {
    statType: 'PERCENTAGE' | 'COUNT';
    value: number;
    message: string;
  };
}

export interface NumberAnimationDelightFactor extends DelightFactor {
  type: 'NUMBER_ANIMATION';
  content: {
    number: number;
    color: string;
    duration: number;
  };
}

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

export type QuestionType = 
  | MultipleChoiceQuestion 
  | OpenResponseQuestion 
  | NumericQuestion 
  | SliderQuestion 
  | SegmentedSliderQuestionType;

export interface QuestionFormData {
  type: 'MC' | 'NM' | 'OP' | 'SCALE';
  text: string;
  label: string;
  category: QuestionCategory;
  options?: string[];
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

// Question type with all required fields
export type Question =
  | (MultipleChoiceQuestion & { requiredForOnboarding: boolean; includeInOnboarding: boolean })
  | (OpenResponseQuestion & { requiredForOnboarding: boolean; includeInOnboarding: boolean })
  | (NumericQuestion & { requiredForOnboarding: boolean; includeInOnboarding: boolean })
  | (SliderQuestion & { requiredForOnboarding: boolean; includeInOnboarding: boolean }); 