import React, { useState } from 'react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OpenResponseQuestion } from './OpenResponseQuestion';
import { NumericQuestion } from './NumericQuestion';
import { DelightFactor } from './DelightFactor/DelightFactor';
import { QuestionProvider, useQuestionContext } from '../context/QuestionContext';
import { OnboardingProvider, useOnboardingContext } from '../context/OnboardingContext';
import type { QuestionType } from '../types';
import './QuestionPlayground.css';

const standardQuestions: QuestionType[] = [
  {
    id: 'std1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What brings you here today?',
    options: ['Learning', 'Career Growth', 'Curiosity', 'Other']
  },
  {
    id: 'std2',
    type: 'OPEN_RESPONSE',
    prompt: 'What are your main goals?',
    maxLength: 500
  },
  {
    id: 'std3',
    type: 'NUMERIC',
    prompt: 'Years of experience?',
    min: 0,
    max: 50,
    step: 1
  },
  {
    id: 'std4',
    type: 'MULTIPLE_CHOICE',
    prompt: 'Preferred learning style?',
    options: ['Visual', 'Audio', 'Reading', 'Hands-on']
  }
];

const questionPool: QuestionType[] = [
  {
    id: 'pool1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How did you hear about us?',
    options: ['Social Media', 'Friend', 'Search', 'Other']
  },
  {
    id: 'pool2',
    type: 'OPEN_RESPONSE',
    prompt: 'What specific topics interest you?',
    maxLength: 300
  },
  {
    id: 'pool3',
    type: 'NUMERIC',
    prompt: 'Hours per week available for learning?',
    min: 1,
    max: 40,
    step: 1
  }
];

const OnboardingFlow = () => {
  const { state, actions } = useOnboardingContext();
  const { state: questionState } = useQuestionContext();
  const [currentDelight, setCurrentDelight] = useState<DelightFactor | null>(null);

  const handleDelightComplete = () => {
    setCurrentDelight(null);
  };

  const getDelightFactor = (question: QuestionType, response: QuestionResponse): DelightFactor | null => {
    switch (question.type) {
      case 'MULTIPLE_CHOICE':
        if (question.id === 'std1') { // What brings you here
          return {
            id: 'confetti',
            type: 'ANIMATION',
            timing: 'POST_ANSWER',
            trigger: 'IMMEDIATE',
            animationType: 'CELEBRATION',
            content: {
              animation: 'confetti',
              duration: 2000
            },
            questionTypes: ['MULTIPLE_CHOICE']
          };
        } else if (question.id === 'std4') { // Preferred learning style
          return {
            id: 'stats',
            type: 'STATS',
            timing: 'POST_ANSWER',
            trigger: 'IMMEDIATE',
            content: {
              statType: 'PERCENTAGE',
              value: Math.floor(Math.random() * 30) + 20,
              message: `You're in good company! ${Math.floor(Math.random() * 30) + 20}% of respondents share that style.`
            }
          };
        }
        return null;
      case 'NUMERIC':
        return {
          id: 'number',
          type: 'NUMBER_ANIMATION',
          timing: 'POST_ANSWER',
          trigger: 'IMMEDIATE',
          content: {
            number: parseInt(response.answer, 10),
            color: `hsl(${Math.random() * 360}, 80%, 60%)`,
            duration: 1000
          }
        };
      default:
        return null;
    }
  };

  const handleAnswer = (response: QuestionResponse) => {
    const currentQuestion = state.selectedQuestions[state.currentQuestionIndex];
    const delightFactor = getDelightFactor(currentQuestion, response);
    
    if (delightFactor) {
      setCurrentDelight(delightFactor);
      setTimeout(() => {
        actions.handleResponse(response);
      }, delightFactor.content.duration + 100);
    } else {
      actions.handleResponse(response);
    }
  };

  const renderCurrentQuestion = () => {
    if (!state.selectedQuestions.length) return null;
    
    const currentQuestion = state.selectedQuestions[state.currentQuestionIndex];
    switch (currentQuestion.type) {
      case 'MULTIPLE_CHOICE':
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        );
      case 'OPEN_RESPONSE':
        return (
          <OpenResponseQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        );
      case 'NUMERIC':
        return (
          <NumericQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <h2>Onboarding Questions</h2>
        <div className="progress">
          Question {state.currentQuestionIndex + 1} of 7
        </div>
      </div>

      {!state.selectedQuestions.length ? (
        <button 
          onClick={actions.initializeSequence}
          className="start-button"
        >
          Start Onboarding
        </button>
      ) : (
        <div className="question-container">
          {renderCurrentQuestion()}
          {currentDelight && (
            <DelightFactor
              factor={currentDelight}
              onComplete={handleDelightComplete}
            />
          )}
        </div>
      )}

      {state.completed && (
        <div className="completion-message">
          Onboarding Complete!
        </div>
      )}
    </div>
  );
};

export const QuestionPlayground = () => {
  return (
    <QuestionProvider>
      <OnboardingProvider
        standardQuestions={standardQuestions}
        questionPool={questionPool}
      >
        <OnboardingFlow />
      </OnboardingProvider>
    </QuestionProvider>
  );
}; 