import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { useAccessibility } from '../../accessibility/context/AccessibilityContext';
import { useVirtualKeyboard } from '../hooks/useVirtualKeyboard';
import type { OpenResponseQuestion as ORQuestion } from '../types';
import type { QuestionResponse } from '../types';
import './OpenResponseQuestion.css';

interface OpenResponseQuestionProps {
  question: ORQuestion;
  onAnswer: (response: QuestionResponse) => void;
  disabled?: boolean;
}

export const OpenResponseQuestion: React.FC<OpenResponseQuestionProps> = ({
  question,
  onAnswer,
  disabled = false,
}) => {
  const { highContrast, fontSize, keyboardMode } = useAccessibility();
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { isKeyboardVisible, keyboardHeight, viewportOffset } = useVirtualKeyboard();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= question.maxLength) {
      setAnswer(value);
      onAnswer({
        questionId: question.id,
        answer: value,
        timestamp: Date.now()
      });
    }
  };

  const getTransform = () => {
    if (isKeyboardVisible) {
      return `translateY(-${keyboardHeight + viewportOffset}px)`;
    }
    return 'translateY(0)';
  };

  return (
    <div 
      className={classNames('open-response-question', {
        'high-contrast': highContrast,
        [`font-size-${fontSize}`]: true,
        'keyboard-mode': keyboardMode
      })}
    >
      <div 
        className="prompt"
        id={`question-${question.id}-prompt`}
      >
        {question.text}
      </div>
      <div 
        className="input-container"
        style={{ transform: getTransform() }}
      >
        <textarea
          ref={inputRef}
          role="textbox"
          aria-labelledby={`question-${question.id}-prompt`}
          aria-describedby={`question-${question.id}-description`}
          value={answer}
          onChange={handleChange}
          disabled={disabled}
          maxLength={question.maxLength}
          rows={4}
        />
        <div 
          id={`question-${question.id}-description`} 
          className="character-count"
        >
          {answer.length} / {question.maxLength} characters
        </div>
      </div>
    </div>
  );
};

export { OpenResponseQuestion as OpenResponseQuestionComponent }; 