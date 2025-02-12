import React, { useState, useRef, useCallback } from 'react';
import type { MultipleChoiceQuestion as MCQuestion } from '../types';
import type { QuestionResponse } from '../types';
import classNames from 'classnames';
import './MultipleChoiceQuestion.css';
import { useAccessibility } from '../../accessibility/context/AccessibilityContext';
import { useKeyboardNavigation } from '../../accessibility/hooks/useKeyboardNavigation';

interface MultipleChoiceQuestionProps {
  question: MCQuestion;
  onAnswer: (response: QuestionResponse) => void;
  correctAnswer?: string;
  disabled?: boolean;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onAnswer,
  correctAnswer,
  disabled = false,
}) => {
  const { highContrast, fontSize, keyboardMode } = useAccessibility();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [touchActive, setTouchActive] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { handleKeyDown } = useKeyboardNavigation({
    containerRef,
    itemSelector: '[role="option"]',
    onSelect: (element) => {
      const choiceId = element.getAttribute('data-choice-id');
      if (choiceId) {
        setSelectedOption(choiceId);
        onAnswer({
          questionId: question.id,
          answer: choiceId,
          timestamp: Date.now()
        });
      }
    }
  });

  const handleTouchStart = useCallback((e: React.TouchEvent, option: string) => {
    e.preventDefault(); // Prevent scrolling
    setTouchActive(option);
  }, []);

  const handleTouchEnd = useCallback((option: string) => {
    setTouchActive(null);
    onAnswer({
      questionId: question.id,
      answer: option,
      timestamp: Date.now()
    });
  }, [onAnswer, question.id]);

  const handleTouchCancel = useCallback(() => {
    setTouchActive(null);
  }, []);

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
      role="listbox"
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
      aria-disabled={disabled}
    >
      <div 
        className="prompt"
        id={`question-${question.id}-prompt`}
      >
        {question.text}
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
            role="option"
            tabIndex={disabled ? -1 : 0}
            className={classNames('option', {
              'selected': selectedOption === option,
              'correct': getOptionStatus(option) === 'correct',
              'incorrect': getOptionStatus(option) === 'incorrect',
              'disabled': disabled,
              'touch-active': touchActive === option
            })}
            aria-selected={selectedOption === option}
            data-choice-id={option}
            onClick={() => !disabled && handleTouchEnd(option)}
            onTouchStart={(e) => handleTouchStart(e, option)}
            onTouchEnd={() => handleTouchEnd(option)}
            onTouchCancel={handleTouchCancel}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}; 