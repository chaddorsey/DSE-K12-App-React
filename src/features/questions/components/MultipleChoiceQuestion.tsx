import React, { useState, useRef, useCallback } from 'react';
import type { MultipleChoiceQuestion as MCQuestion } from '../types/questions';
import type { QuestionResponse, MCQuestionResponse } from '../types/responses';
import classNames from 'classnames';
import './MultipleChoiceQuestion.css';
import { useAccessibility } from '../../accessibility/AccessibilityContext';
import { useKeyboardNavigation } from '../../accessibility/hooks/useKeyboardNavigation';

// Extend MCQuestion to include selected answer
interface MCQuestionWithState extends MCQuestion {
  selected?: string;
}

interface Props {
  question: MCQuestionWithState;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
}

const MultipleChoiceQuestionComponent: React.FC<Props> = ({
  question,
  onAnswer,
  disabled
}) => {
  const { highContrast, fontSize } = useAccessibility();
  const [touchActive, setTouchActive] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTime = useRef(Date.now());
  const interactionCount = useRef(0);

  const createMetadata = () => ({
    timeToAnswer: Date.now() - startTime.current,
    interactionCount: interactionCount.current,
    device: {
      type: 'browser',
      input: 'mouse'
    }
  });

  const handleKeyDown = useKeyboardNavigation({
    containerRef,
    itemSelector: '[role="option"]',
    onSelect: (element) => {
      const choiceId = element.getAttribute('data-choice-id');
      if (choiceId) {
        interactionCount.current++;
        setTouchActive(choiceId);
        handleOptionClick(choiceId);
      }
    }
  });

  const handleTouchStart = useCallback((choiceId: string) => {
    if (!disabled) {
      interactionCount.current++;
      setTouchActive(choiceId);
      handleOptionClick(choiceId);
    }
  }, [disabled]);

  const handleTouchEnd = useCallback((option: string) => {
    interactionCount.current++;
    setTouchActive(null);
    handleOptionClick(option);
  }, []);

  const handleTouchCancel = useCallback(() => {
    setTouchActive(null);
  }, []);

  const handleOptionClick = (selectedOption: string) => {
    const response: MCQuestionResponse = {
      id: question.id,
      questionId: question.id,
      userId: '', // This will be filled in by the service
      timestamp: new Date(),
      value: {
        type: 'MC',
        selectedOption
      },
      metadata: {
        timeToAnswer: 0,
        interactionCount: interactionCount.current,
        device: {
          type: 'desktop',
          input: 'mouse'
        }
      }
    };

    onAnswer(response);
  };

  const getOptionStatus = (option: string) => {
    if (!question.correctAnswer || !question.selected) return 'default';
    if (option === question.correctAnswer) return 'correct';
    if (option === question.selected && option !== question.correctAnswer) return 'incorrect';
    return 'default';
  };

  const getOptionClass = (option: string) => {
    if (!question.selected) return 'mc-option';
    
    const classes = ['mc-option'];
    if (question.selected === option) {
      classes.push(option === question.correctAnswer ? 'mc-option-correct' : 'mc-option-incorrect');
    } else if (option === question.correctAnswer && question.selected) {
      classes.push('mc-option-correct');
    }
    if (disabled) classes.push('mc-option-disabled');
    if (touchActive === option) classes.push('mc-option-active');
    
    return classNames(classes);
  };

  return (
    <div className="mc-container">
      <div className="mc-prompt">{question.text}</div>
      <div className="mc-options">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            className={getOptionClass(option)}
            onClick={() => handleOptionClick(option)}
            disabled={disabled}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export { MultipleChoiceQuestionComponent }; 