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
  selected?: string;
  correct?: boolean;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onAnswer,
  correctAnswer,
  disabled = false,
  selected,
  correct
}) => {
  const { highContrast, fontSize, keyboardMode } = useAccessibility();
  const [touchActive, setTouchActive] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { handleKeyDown } = useKeyboardNavigation({
    containerRef,
    itemSelector: '[role="option"]',
    onSelect: (element) => {
      const choiceId = element.getAttribute('data-choice-id');
      if (choiceId) {
        setTouchActive(choiceId);
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
    if (!correctAnswer || !selected) return 'default';
    if (option === correctAnswer) return 'correct';
    if (option === selected && option !== correctAnswer) return 'incorrect';
    return 'default';
  };

  const handleClick = (option: string) => {
    onAnswer({
      questionId: question.id,
      value: {
        type: 'MC',
        selectedOption: option
      },
      timestamp: Date.now()
    });
  };

  const getOptionClass = (option: string) => {
    if (!selected) return 'mc-option';
    
    const classes = ['mc-option'];
    if (selected === option) {
      classes.push(option === correctAnswer ? 'mc-option-correct' : 'mc-option-incorrect');
    } else if (option === correctAnswer && selected) {
      classes.push('mc-option-correct');
    }
    if (disabled) classes.push('mc-option-disabled');
    
    return classes.join(' ');
  };

  return (
    <div className="mc-question">
      <div className="mc-prompt">{question.text}</div>
      <div className="mc-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(option)}
            onClick={() => handleClick(option)}
            disabled={disabled}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export { MultipleChoiceQuestion as MultipleChoiceQuestionComponent }; 