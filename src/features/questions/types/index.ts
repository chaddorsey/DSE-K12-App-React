export interface BaseQuestionType {
  id: string;
  prompt: string;
  type: string;
}

export interface MultipleChoiceQuestionType extends BaseQuestionType {
  type: 'MULTIPLE_CHOICE';
  options: string[];
}

export interface OpenResponseQuestionType extends BaseQuestionType {
  type: 'OPEN_RESPONSE';
  maxLength: number;
}

export interface NumericQuestionType extends BaseQuestionType {
  type: 'NUMERIC';
  min: number;
  max: number;
  step: number;
}

export interface SliderQuestionType extends BaseQuestionType {
  type: 'SLIDER';
  leftOption: string;
  rightOption: string;
  defaultValue?: number;
}

export interface SegmentedSliderQuestionType extends BaseQuestionType {
  type: 'SEGMENTED_SLIDER';
  segments: {
    value: number;
    label?: string;
  }[];
  defaultSegment?: number;
}

export interface XYContinuumQuestionType extends BaseQuestionType {
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

export interface QuizQuestion extends QuestionType {
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
  | MultipleChoiceQuestionType 
  | OpenResponseQuestionType 
  | NumericQuestionType
  | SliderQuestionType
  | SegmentedSliderQuestionType
  | XYContinuumQuestionType; 