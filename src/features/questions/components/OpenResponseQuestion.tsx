import React, { useState } from 'react';
import type { OpenResponseQuestion as OPQuestion } from '../types';
import type { QuestionResponse } from '../types';
import './OpenResponseQuestion.css';

interface OpenResponseQuestionProps {
  question: OPQuestion;
  onAnswer: (response: QuestionResponse) => void;
}

export const OpenResponseQuestion: React.FC<OpenResponseQuestionProps> = ({
  question,
  onAnswer
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onAnswer({
        id: `response_${question.id}`,
        userId: 'current_user_id',
        questionId: question.id,
        value: {
          type: 'OP',
          text: value.trim()
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
    <div className="open-response-question">
      <div className="question-text">{question.text}</div>
      <div className="input-container">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={question.maxLength}
          placeholder="Enter your response..."
          aria-label={question.text}
        />
        <button onClick={handleSubmit} disabled={!value.trim()}>
          Next
        </button>
      </div>
    </div>
  );
};

export { OpenResponseQuestion as OpenResponseQuestionComponent }; 