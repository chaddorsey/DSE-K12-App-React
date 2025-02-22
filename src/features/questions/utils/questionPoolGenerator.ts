import { 
  Question,
  QuestionType,
  MultipleChoiceQuestion,
  OpenResponseQuestion,
  NumericQuestion,
  SliderQuestion,
  XYContinuumQuestion
} from '../types/questions';

interface RawQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  category: string;
  required?: boolean;
  // MC specific
  options?: string[];
  // Numeric specific
  min?: number;
  max?: number;
  step?: number;
  // Slider specific
  leftLabel?: string;
  rightLabel?: string;
  // Open Response specific
  maxLength?: number;
  // XY specific
  xAxis?: {
    label: string;
    min: string;
    max: string;
  };
  yAxis?: {
    label: string;
    min: string;
    max: string;
  };
}

export const createQuestionPool = (rawQuestions: RawQuestion[]): Question[] => {
  return rawQuestions.map((raw): Question => {
    const baseQuestion = {
      id: raw.id,
      type: raw.type,
      prompt: raw.prompt,
      category: raw.category,
      requiredForOnboarding: raw.required ?? false
    };

    switch (raw.type) {
      case QuestionType.MC:
        if (!raw.options) {
          throw new Error(`Multiple choice question ${raw.id} must have options`);
        }
        return {
          ...baseQuestion,
          type: QuestionType.MC,
          options: raw.options
        } as MultipleChoiceQuestion;

      case QuestionType.NM:
        return {
          ...baseQuestion,
          type: QuestionType.NM,
          min: raw.min ?? 0,
          max: raw.max ?? 100,
          step: raw.step ?? 1
        } as NumericQuestion;

      case QuestionType.SLIDER:
        if (!raw.leftLabel || !raw.rightLabel) {
          throw new Error(`Slider question ${raw.id} must have labels`);
        }
        return {
          ...baseQuestion,
          type: QuestionType.SLIDER,
          leftLabel: raw.leftLabel,
          rightLabel: raw.rightLabel
        } as SliderQuestion;

      case QuestionType.OP:
        return {
          ...baseQuestion,
          type: QuestionType.OP,
          maxLength: raw.maxLength ?? 1000
        } as OpenResponseQuestion;

      case QuestionType.XY:
        if (!raw.xAxis || !raw.yAxis) {
          throw new Error(`XY question ${raw.id} must have axis definitions`);
        }
        return {
          ...baseQuestion,
          type: QuestionType.XY,
          xAxis: raw.xAxis,
          yAxis: raw.yAxis
        } as XYContinuumQuestion;

      default:
        throw new Error(`Unsupported question type: ${raw.type}`);
    }
  });
}; 