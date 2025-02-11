import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useFormNavigation } from '../hooks/useFormNavigation';
import { useQuestionValidation } from '../hooks/useQuestionValidation';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OpenResponseQuestion } from './OpenResponseQuestion';
import { useAccessibility } from '../../../features/accessibility/context/AccessibilityContext';
import type { Question, QuestionResponse } from '../types';
import './QuestionForm.css';
import { useQuestionTransition } from '../hooks/useQuestionTransition';

interface Props {
  questions: Question[];
  onComplete: () => void;
  onAnswer: (response: QuestionResponse) => void;
  transitionDuration?: number;
  fadeDelay?: number;
}

export const QuestionForm: React.FC<Props> = ({
  questions,
  onComplete,
  onAnswer,
  transitionDuration = 150,
  fadeDelay = 0
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

  const {
    direction,
    isAnimating,
    phase,
    setPhase,
    setDirection,
    setIsAnimating,
    startTransition
  } = useQuestionTransition({ 
    duration: transitionDuration,
    fadeDelay 
  });

  // Add direction state
  const [transitioningQuestion, setTransitioningQuestion] = useState<Question | null>(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Set CSS variables for transitions
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--transition-duration', `${transitionDuration}ms`);
    root.style.setProperty('--fade-delay', `${fadeDelay}ms`);
  }, [transitionDuration, fadeDelay]);

  const handleAnswer = (response: QuestionResponse) => {
    onAnswer(response);
    validateQuestion(response.questionId, response.answer);
    if (!errors[response.questionId]) {
      markAnswered(response.questionId);
    }
  };

  const handleNavigation = (dir: 'next' | 'prev') => {
    if (isAnimating) return;

    const newDirection = dir === 'next' ? 'forward' : 'backward';
    setTransitioningQuestion(currentQuestion);
    startTransition(newDirection);

    // Wait for exit animation
    setTimeout(() => {
      if (dir === 'next' && !isLastQuestion) {
        goToNext();
      } else if (dir === 'prev' && !isFirstQuestion) {
        goToPrevious();
      }
      setPhase('enter');
      
      // Wait for enter animation
      setTimeout(() => {
        setTransitioningQuestion(null);
        setPhase(null);
        setIsAnimating(false);
      }, transitionDuration);
    }, transitionDuration);
  };

  // Clear direction after transition completes
  useEffect(() => {
    if (!transitioningQuestion) {
      setDirection(null);
    }
  }, [transitioningQuestion]);

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
    <div className={classNames('question-form', {
      'high-contrast': highContrast,
      [`font-size-${fontSize}`]: true,
      'keyboard-mode': keyboardMode
    })}>
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

      <div className="questions-wrapper">
        {/* Show old question during exit */}
        {transitioningQuestion && phase === 'exit' && (
          <div 
            key={`exit-${transitioningQuestion.id}`}
            className={classNames('question-card', {
              'slide-exit': true,
              'slide-exit-forward': direction === 'forward',
              'slide-exit-backward': direction === 'backward'
            })}
          >
            {renderQuestion(transitioningQuestion)}
          </div>
        )}
        
        {/* Show new question during/after enter */}
        {currentQuestion && phase === 'enter' && (
          <div 
            key={`enter-${currentQuestion.id}`}
            data-testid="question-container"
            className={classNames('question-card', {
              'slide-enter': true,
              'slide-enter-forward': direction === 'forward',
              'slide-enter-backward': direction === 'backward'
            })}
          >
            {renderQuestion(currentQuestion)}
          </div>
        )}

        {/* Show current question when not transitioning */}
        {currentQuestion && !phase && (
          <div 
            key={currentQuestion.id}
            data-testid="question-container"
            className="question-card"
          >
            {renderQuestion(currentQuestion)}
          </div>
        )}
      </div>

      <div className="navigation-buttons">
        <button
          onClick={() => handleNavigation('prev')}
          disabled={isFirstQuestion || isAnimating}
          className="nav-button prev"
        >
          Previous
        </button>
        <button
          onClick={() => handleNavigation('next')}
          disabled={isLastQuestion || isAnimating}
          className="nav-button next"
        >
          Next
        </button>
      </div>
    </div>
  );
}; 