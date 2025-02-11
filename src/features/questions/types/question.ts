export type QuestionType = 'MC' | 'NM' | 'OP' | 'SCALE' | 'MATRIX';

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

export type Question = 
  | MultipleChoiceQuestion 
  | NumericQuestion 
  | OpenEndedQuestion 
  | ScaleQuestion;

export type QuestionCategory = 
  | 'DEMOGRAPHIC'
  | 'PROFESSIONAL'
  | 'PERSONALITY'
  | 'INTERESTS'
  | 'BACKGROUND';

export interface QuestionResponse {
  questionId: string;
  value: string | number | string[];
  timestamp: number;
  metadata?: Record<string, any>;
} 