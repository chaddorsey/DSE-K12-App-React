import React, { useState } from 'react';
import type { NumericQuestion } from '../types/questions';
import type { QuestionResponse } from '../types/responses';
import './NumericQuestion.css';

interface Props {
  question: NumericQuestion;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

export const NumericQuestionComponent: React.FC<Props> = ({
  question,
  onAnswer,
  disabled = false,
  showFeedback = false
}) => {
  const [value, setValue] = useState<string>('');
  const [interactionCount, setInteractionCount] = useState(0);
  const startTime = React.useRef(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    setValue(e.target.value);
    setInteractionCount(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (!value || disabled) return;

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return;

    const response: QuestionResponse = {
      questionId: question.id,
      value: {
        type: 'NM',
        numericValue,
        unit: question.unit
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
    <div className="numeric-question">
      <div className="numeric-prompt">{question.prompt}</div>
      
      <div className="numeric-input-container">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={question.min}
          max={question.max}
          step={question.step}
          disabled={disabled}
          placeholder="Enter a number"
        />
        {question.unit && <span className="unit">{question.unit}</span>}
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!value || disabled}
      >
        Submit
      </button>
    </div>
  );
}; 