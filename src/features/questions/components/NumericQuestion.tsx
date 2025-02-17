import React, { useState } from 'react';
import type { NumericQuestion as NMQuestion } from '../types';
import type { QuestionResponse } from '../types';
import './NumericQuestion.css';

interface NumericQuestionProps {
  question: NMQuestion;
  onAnswer: (response: QuestionResponse) => void;
}

export const NumericQuestion: React.FC<NumericQuestionProps> = ({
  question,
  onAnswer
}) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = () => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    if (numValue >= question.min && numValue <= question.max) {
      onAnswer({
        id: `response_${question.id}`,
        userId: 'current_user_id',
        questionId: question.id,
        value: {
          type: 'NM',
          number: numValue
        },
        correct: false,
        metadata: {
          timeToAnswer: 0,
          interactionCount: 1,
          device: {
            type: 'browser',
            input: 'keyboard'
          }
        },
        timestamp: new Date()
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
          onChange={(e) => setValue(e.target.value)}
          aria-label={question.text}
        />
        <button onClick={handleSubmit} disabled={!value}>
          Next
        </button>
      </div>
    </div>
  );
};

export { NumericQuestion as NumericQuestionComponent }; 