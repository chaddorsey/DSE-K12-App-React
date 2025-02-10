import React, { useState } from 'react';
import type { NumericQuestionType, QuestionResponse } from '../types';
import './NumericQuestion.css';

interface NumericQuestionProps {
  question: NumericQuestionType;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const NumericQuestion: React.FC<NumericQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  loading = false,
}) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    const numValue = Number(newValue);
    if (numValue < question.min || numValue > question.max) {
      setError(`Value must be between ${question.min} and ${question.max}`);
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (value && !error) {
      onAnswer({
        questionId: question.id,
        answer: value,
        timestamp: Date.now()
      });
    }
  };

  if (loading) {
    return <div data-testid="question-loading">Loading...</div>;
  }

  return (
    <div className="question-container">
      <h3 className="question-prompt">{question.prompt}</h3>
      <div className="numeric-container">
        <div className="input-row">
          <input
            type="number"
            value={value}
            onChange={handleChange}
            min={question.min}
            max={question.max}
            step={question.step}
            disabled={disabled}
            className="numeric-input"
            aria-label="numeric response"
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !value || !!error}
            className="submit-button"
          >
            Submit
          </button>
        </div>
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}; 