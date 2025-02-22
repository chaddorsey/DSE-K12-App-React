import React, { useState, useRef } from 'react';
import type { SliderQuestion } from '../types/questions';
import type { QuestionResponse } from '../types/responses';
import './SliderQuestion.css';

interface Props {
  question: SliderQuestion;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

export const SliderQuestionComponent: React.FC<Props> = ({
  question,
  onAnswer,
  disabled = false,
  showFeedback = false
}) => {
  const [value, setValue] = useState(question.defaultValue || 50);
  const [interactionCount, setInteractionCount] = useState(0);
  const startTime = useRef(Date.now());
  const sliderRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    setValue(Number(e.target.value));
    setInteractionCount(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (disabled) return;

    const response: QuestionResponse = {
      questionId: question.id,
      value: {
        type: 'SLIDER',
        value,
        normalizedValue: value / 100
      },
      metadata: {
        timeToAnswer: Date.now() - startTime.current,
        interactionCount,
        device: {
          type: 'desktop',
          input: 'mouse'
        }
      }
    };

    onAnswer(response);
  };

  return (
    <div className="slider-question">
      <div className="slider-prompt">{question.prompt}</div>
      
      <div className="slider-container">
        <div className="slider-labels">
          <span>{question.leftLabel}</span>
          <span>{question.rightLabel}</span>
        </div>
        
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="slider-input"
        />
        
        <div className="slider-value">
          {value}%
        </div>
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={disabled}
      >
        Submit
      </button>
    </div>
  );
}; 