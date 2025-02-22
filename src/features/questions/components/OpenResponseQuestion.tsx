import React, { useState } from 'react';
import type { OpenResponseQuestion } from '../types/questions';
import type { QuestionResponse } from '../types/responses';
import './OpenResponseQuestion.css';

interface Props {
  question: OpenResponseQuestion;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

export const OpenResponseQuestionComponent: React.FC<Props> = ({
  question,
  onAnswer,
  disabled = false,
  showFeedback = false
}) => {
  const [text, setText] = useState('');
  const [interactionCount, setInteractionCount] = useState(0);
  const startTime = React.useRef(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    
    setText(e.target.value);
    setInteractionCount(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (!text || disabled) return;

    const response: QuestionResponse = {
      questionId: question.id,
      value: {
        type: 'OP',
        text,
        length: text.length
      },
      metadata: {
        timeToAnswer: Date.now() - startTime.current,
        interactionCount,
        device: {
          type: 'desktop',
          input: 'keyboard'
        }
      }
    };

    onAnswer(response);
  };

  return (
    <div className="open-response-question">
      <div className="open-prompt">{question.prompt}</div>
      
      <div className="open-input-container">
        <textarea
          value={text}
          onChange={handleChange}
          maxLength={question.maxLength}
          disabled={disabled}
          placeholder="Enter your response"
          rows={5}
        />
        <div className="character-count">
          {text.length} / {question.maxLength}
        </div>
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!text || disabled}
      >
        Submit
      </button>
    </div>
  );
}; 