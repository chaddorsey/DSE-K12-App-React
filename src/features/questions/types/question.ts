export type QuestionType = 
  | 'MC'          // Multiple Choice
  | 'NM'          // Numeric
  | 'OP'          // Open Response
  | 'SCALE'       // Scale
  | 'XY'          // XY Continuum
  | 'SLIDER';     // Unified Slider

export const QuestionCategory = {
  DEMOGRAPHIC: 'DEMOGRAPHIC',
  PROFESSIONAL: 'PROFESSIONAL',
  PERSONALITY: 'PERSONALITY',
  INTERESTS: 'INTERESTS',
  BACKGROUND: 'BACKGROUND'
} as const;

export type QuestionCategory = typeof QuestionCategory[keyof typeof QuestionCategory];

export interface BaseQuestion {
  id: string;
  number: number;
  type: QuestionType;
  label: string;
  text: string;
  category: QuestionCategory;
  tags?: string[];
  required?: boolean;
  metadata?: Record<string, any>;
  requiredForOnboarding?: boolean;
  includeInOnboarding?: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'MC';
  options: string[];
  allowMultiple?: boolean;
  allowOther?: boolean;
}

export interface NumericQuestion extends BaseQuestion {
  type: 'NM';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface OpenEndedQuestion extends BaseQuestion {
  type: 'OP';
  maxLength?: number;
  format?: 'text' | 'email' | 'url';
}

export interface ScaleQuestion extends BaseQuestion {
  type: 'SCALE';
  min: number;
  max: number;
  labels?: Record<number, string>;
}

export interface XYQuestion extends BaseQuestion {
  type: 'XY';
  config: {
    xAxis: {
      min: number;
      max: number;
      labels?: Record<number, string>;
    };
    yAxis: {
      min: number;
      max: number;
      labels?: Record<number, string>;
    };
  };
}

export interface PolarQuestionConfig {
  type: 'discrete' | 'continuous' | 'segmented-continuous';
  // For segmented-continuous mode
  segments: Array<{
    id: string;
    label: string;
    description?: string;
    color?: string;
  }>;
  intensity?: {
    label: string;
    min: number;
    max: number;
    defaultValue?: number;
    labels?: Record<number, string>; // e.g., {0: 'Low', 0.5: 'Medium', 1: 'High'}
  };
}

export interface PolarSelection {
  segmentId: string;
  intensity: number;
}

export type Question = 
  | MultipleChoiceQuestion 
  | NumericQuestion 
  | OpenEndedQuestion 
  | ScaleQuestion
  | XYQuestion;

export interface QuestionResponse {
  questionId: string;
  value: string | number | string[];
  timestamp: number;
  metadata?: Record<string, any>;
} 