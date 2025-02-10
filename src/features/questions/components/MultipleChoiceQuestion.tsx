import React from 'react';
import type { MultipleChoiceQuestionType, QuestionResponse } from '../types';
import './MultipleChoiceQuestion.css';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  loading = false,
}) => {
  const handleOptionClick = (option: string) => {
    onAnswer({
      questionId: question.id,
      answer: option,
      timestamp: Date.now()
    });
  };

  if (loading) {
    return <div data-testid="question-loading">Loading...</div>;
  }

  return (
    <div className="question-container">
      <h3 className="question-prompt">{question.prompt}</h3>
      <div className="options-container">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={disabled}
            className="option-button"
            aria-label={option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}; 