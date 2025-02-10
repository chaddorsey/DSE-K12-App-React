import React, { useState, useRef } from 'react';
import type { MultipleChoiceQuestionType, QuestionResponse } from '../types';
import classNames from 'classnames';
import './MultipleChoiceQuestion.css';
import { useAccessibility } from '../../../features/accessibility/context/AccessibilityContext';
import { useKeyboardNavigation } from '../../../features/accessibility/hooks/useKeyboardNavigation';

interface Props {
  question: MultipleChoiceQuestionType;
  onAnswer: (response: QuestionResponse) => void;
  correctAnswer?: string;
  disabled?: boolean;
}

export const MultipleChoiceQuestion: React.FC<Props> = ({
  question,
  onAnswer,
  correctAnswer,
  disabled = false,
}) => {
  const { highContrast, fontSize, keyboardMode } = useAccessibility();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useKeyboardNavigation({
    containerRef,
    selector: '[role="radio"]',
    vertical: true,
    horizontal: false,
    wrap: true,
    onEscape: () => setSelectedOption(null)
  });

  const handleOptionSelect = (option: string) => {
    if (disabled) return;
    setSelectedOption(option);
    onAnswer({
      questionId: question.id,
      answer: option,
      timestamp: Date.now()
    });
  };

  const getOptionStatus = (option: string) => {
    if (!correctAnswer || !selectedOption) return 'default';
    if (option === correctAnswer) return 'correct';
    if (option === selectedOption && option !== correctAnswer) return 'incorrect';
    return 'default';
  };

  return (
    <div 
      className={classNames('multiple-choice-question', {
        'high-contrast': highContrast,
        [`font-size-${fontSize}`]: true,
        'keyboard-mode': keyboardMode
      })}
      ref={containerRef}
    >
      <div 
        className="prompt"
        id={`question-${question.id}-prompt`}
      >
        {question.prompt}
      </div>
      <div
        role="radiogroup"
        aria-labelledby={`question-${question.id}-prompt`}
        aria-describedby={`question-${question.id}-description question-${question.id}-keyboard-help`}
        className={classNames('options-container', { 'high-contrast': highContrast })}
      >
        <div 
          id={`question-${question.id}-description`} 
          className="sr-only"
        >
          Select one of the following {question.options.length} options
        </div>
        <div className="sr-only" id={`question-${question.id}-keyboard-help`}>
          Use arrow keys to navigate between options, Space or Enter to select an option, 
          and Escape to clear your selection.
        </div>
        {question.options.map((option) => (
          <div
            key={option}
            role="radio"
            aria-checked={selectedOption === option}
            tabIndex={disabled ? -1 : 0}
            className={classNames('option', {
              'selected': selectedOption === option,
              'correct': getOptionStatus(option) === 'correct',
              'incorrect': getOptionStatus(option) === 'incorrect',
              'disabled': disabled
            })}
            onClick={() => handleOptionSelect(option)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                handleOptionSelect(option);
              }
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}; 