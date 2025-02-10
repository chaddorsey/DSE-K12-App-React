import React from 'react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OpenResponseQuestion } from './OpenResponseQuestion';
import { NumericQuestion } from './NumericQuestion';
import { SliderQuestion } from './SliderQuestion';
import { SegmentedSliderQuestion } from './SegmentedSliderQuestion';
import type { QuestionType, QuestionResponse } from '../types';

interface QuestionCardProps {
  question: QuestionType;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  disabled = false,
  loading = false
}) => {
  switch (question.type) {
    case 'MULTIPLE_CHOICE':
      return (
        <MultipleChoiceQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          loading={loading}
        />
      );
    case 'OPEN_RESPONSE':
      return (
        <OpenResponseQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          loading={loading}
        />
      );
    case 'NUMERIC':
      return (
        <NumericQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          loading={loading}
        />
      );
    case 'SLIDER':
      return (
        <SliderQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          loading={loading}
        />
      );
    case 'SEGMENTED_SLIDER':
      return (
        <SegmentedSliderQuestion
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          loading={loading}
        />
      );
    default:
      return <div>Unsupported question type: {question.type}</div>;
  }
}; 