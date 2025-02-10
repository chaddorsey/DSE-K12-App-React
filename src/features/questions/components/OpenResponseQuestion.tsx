import React, { useState } from 'react';
import type { OpenResponseQuestionType, QuestionResponse } from '../types';
import './OpenResponseQuestion.css';

interface OpenResponseQuestionProps {
  question: OpenResponseQuestionType;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const OpenResponseQuestion: React.FC<OpenResponseQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
  loading = false,
}) => {
  const [text, setText] = useState('');
  const remainingChars = question.maxLength - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onAnswer({
        questionId: question.id,
        answer: text,
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
      <div className="response-container">
        <textarea
          value={text}
          onChange={handleChange}
          maxLength={question.maxLength}
          disabled={disabled}
          className="response-input"
          rows={4}
          placeholder="Type your response here..."
        />
        <div className="response-footer">
          <div className="char-counter">
            {remainingChars} characters remaining
          </div>
          <button
            onClick={handleSubmit}
            disabled={disabled || !text.trim()}
            className="submit-button"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}; 