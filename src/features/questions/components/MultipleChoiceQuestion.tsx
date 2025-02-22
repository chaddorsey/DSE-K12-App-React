import React, { useState } from 'react';
import type { MultipleChoiceQuestion } from '../types/questions';
import type { QuestionResponse } from '../types/responses';
import './MultipleChoiceQuestion.css';

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
  showFeedback?: boolean;
}

export const MultipleChoiceQuestionComponent: React.FC<Props> = ({
  question,
  onAnswer,
  disabled = false,
  showFeedback = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [interactionCount, setInteractionCount] = useState(0);
  const startTime = React.useRef(Date.now());

  const handleOptionSelect = (option: string) => {
    if (disabled) return;
    
    setSelectedOption(option);
    setInteractionCount(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (!selectedOption || disabled) return;

    const response: QuestionResponse = {
      questionId: question.id,
      value: {
        type: 'MC',
        selectedOption
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
    <div className="mc-question">
      <div className="mc-prompt">{question.prompt}</div>
      
      <div className="mc-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`mc-option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
            disabled={disabled}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!selectedOption || disabled}
      >
        Submit
      </button>
    </div>
  );
}; 