import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useFormNavigation } from '../hooks/useFormNavigation';
import { useQuestionValidation } from '../hooks/useQuestionValidation';
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
    currentQuestionIndex,
    isFirstQuestion,
    isLastQuestion,
    answeredQuestions,
    goToNext,
    goToPrevious,
    markAnswered,
    handleKeyDown
  } = useFormNavigation({ questions, onComplete });

  const {
    errors,
    validateQuestion,
    clearError
  } = useQuestionValidation({ questions });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleAnswer = (response: QuestionResponse) => {
    onAnswer(response);
    validateQuestion(response.questionId, response.answer);
    if (!errors[response.questionId]) {
      markAnswered(response.questionId);
    }
  };

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      if (currentQuestion && !errors[currentQuestion.id]) {
        goToNext();
        if (currentQuestion.id in errors) {
          clearError(currentQuestion.id);
        }
      } else if (currentQuestion) {
        validateQuestion(currentQuestion.id, undefined);
      }
    } else {
      goToPrevious();
    }
  };

  const renderQuestion = (question: Question) => {
    const error = errors[question.id];
    
    const commonProps = {
      question,
      onAnswer: handleAnswer,
      error,
      'aria-invalid': !!error,
      'aria-errormessage': error ? `error-${question.id}` : undefined
    };

    switch (question.type) {
      case 'MULTIPLE_CHOICE':
        return <MultipleChoiceQuestion {...commonProps} />;
      case 'OPEN_RESPONSE':
        return <OpenResponseQuestion {...commonProps} />;
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

      {currentQuestion && (
        <>
          {renderQuestion(currentQuestion)}
          {errors[currentQuestion.id] && (
            <div 
              id={`error-${currentQuestion.id}`}
              className="error-message"
              role="alert"
            >
              {errors[currentQuestion.id]}
            </div>
          )}
        </>
      )}

      <div className="navigation-buttons">
        <button
          onClick={() => handleNavigation('prev')}
          disabled={isFirstQuestion}
          className="nav-button prev"
        >
          Previous
        </button>
        <button
          onClick={() => handleNavigation('next')}
          disabled={isLastQuestion}
          className="nav-button next"
        >
          Next
        </button>
      </div>
    </div>
  );
}; 