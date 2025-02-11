import React, { useState } from 'react';
import type { NumericQuestion as NMQuestion } from '../types';
import type { QuestionResponse } from '../types';
import './NumericQuestion.css';

interface NumericQuestionProps {
  question: NMQuestion;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
}

export const NumericQuestion: React.FC<NumericQuestionProps> = ({
  question,
  onAnswer,
  disabled = false
}) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    if (numValue >= question.min && numValue <= question.max) {
      onAnswer({
        questionId: question.id,
        answer: numValue, // Send as number, not string
        value: numValue,  // Include both for type safety
        timestamp: Date.now()
      });
    }
  };

  return (
    <div className="numeric-question">
      <div className="question-text">{question.text}</div>
      <div className="input-container">
        <input
          type="number"
          min={question.min}
          max={question.max}
          step={question.step || 1}
          value={value}
          onChange={handleChange}
          onBlur={handleSubmit}
          disabled={disabled}
          aria-label={question.text}
        />
        {question.labels?.min && (
          <div className="min-label">{question.labels.min}</div>
        )}
        {question.labels?.max && (
          <div className="max-label">{question.labels.max}</div>
        )}
      </div>
    </div>
  );
}; 