import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useFormNavigation } from '../hooks/useFormNavigation';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OpenResponseQuestion } from './OpenResponseQuestion';
import { useAccessibility } from '../../../features/accessibility/context/AccessibilityContext';
import type { Question, QuestionResponse } from '../types';
import './QuestionForm.css';

interface Props {
  questions: Question[];
  onComplete: () => void;
  onAnswer: (response: QuestionResponse) => void;
}

export const QuestionForm: React.FC<Props> = ({
  questions,
  onComplete,
  onAnswer,
}) => {
  const { highContrast, fontSize, keyboardMode } = useAccessibility();
  const {
    currentQuestion,
    isFirstQuestion,
    isLastQuestion,
    answeredQuestions,
    goToNext,
    goToPrevious,
    markAnswered,
    handleKeyDown
  } = useFormNavigation({ questions, onComplete });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleAnswer = (response: QuestionResponse) => {
    onAnswer(response);
    markAnswered(response.questionId);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'MULTIPLE_CHOICE':
        return (
          <MultipleChoiceQuestion
            question={question}
            onAnswer={handleAnswer}
          />
        );
      case 'OPEN_RESPONSE':
        return (
          <OpenResponseQuestion
            question={question}
            onAnswer={handleAnswer}
          />
        );
      default:
        return null;
    }
  };

  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div 
      className={classNames('question-form', {
        'high-contrast': highContrast,
        [`font-size-${fontSize}`]: true,
        'keyboard-mode': keyboardMode
      })}
    >
      <div 
        role="progressbar" 
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="progress-bar"
      >
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {currentQuestion && renderQuestion(currentQuestion)}

      <div className="navigation-buttons">
        <button
          onClick={goToPrevious}
          disabled={isFirstQuestion}
          className="nav-button prev"
        >
          Previous
        </button>
        <button
          onClick={goToNext}
          disabled={isLastQuestion}
          className="nav-button next"
        >
          Next
        </button>
      </div>
    </div>
  );
}; 