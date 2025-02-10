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

export interface QuestionResponse {
  questionId: string;
  answer: string;
  timestamp: number;
} 