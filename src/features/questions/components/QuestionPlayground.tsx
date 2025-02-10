import React, { useState, useEffect } from 'react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { OpenResponseQuestion } from './OpenResponseQuestion';
import { NumericQuestion } from './NumericQuestion';
import { DelightFactor } from './DelightFactor/DelightFactor';
import { QuestionProvider, useQuestionContext } from '../context/QuestionContext';
import { OnboardingProvider, useOnboardingContext } from '../context/OnboardingContext';
import { QuizProvider, useQuizContext } from '../context/QuizContext';
import type { QuestionType, QuestionResponse, QuestionContextValue } from '../types';
import './QuestionPlayground.css';
import { MockDataProvider } from '../../../mocks/MockDataProvider';

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

const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'quiz1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is John\'s favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    correctAnswer: 'Blue',
    distractors: ['Red', 'Green', 'Yellow']
  },
  {
    id: 'quiz2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'How does John prefer to learn?',
    options: ['Visual', 'Audio', 'Reading', 'Hands-on'],
    correctAnswer: 'Visual',
    distractors: ['Audio', 'Reading', 'Hands-on']
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

const ContextControls = () => {
  const { state, actions } = useQuestionContext();
  const quiz = useQuizContext();
  const onboarding = useOnboardingContext();
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  const handleExperienceChange = (experience: QuestionContextValue['experience']) => {
    if (isSessionActive) return;
    actions.setExperience(experience);
  };

  const handleModeChange = (mode: QuestionContextValue['mode']) => {
    if (isSessionActive) return;
    actions.setMode(mode);
  };

  useEffect(() => {
    // Session is active if onboarding has questions or quiz is initialized
    setIsSessionActive(
      (state.experience === 'ONBOARDING' && onboarding.state.selectedQuestions.length > 0) ||
      (state.experience === 'QUIZ' && quiz.state.questions.length > 0)
    );
  }, [state.experience, onboarding.state.selectedQuestions, quiz.state.questions]);

  return (
    <div className="context-controls-wrapper">
      <div className="context-controls">
        <div className="control-group">
          <label>
            Experience:
            <select 
              value={state.experience}
              onChange={(e) => handleExperienceChange(e.target.value as any)}
              disabled={isSessionActive}
            >
              <option value="ONBOARDING">Onboarding</option>
              <option value="QUIZ">Quiz</option>
              <option value="HEAD_TO_HEAD">Head to Head</option>
            </select>
          </label>
        </div>

        <div className="control-group">
          <label>
            Mode:
            <select 
              value={state.mode}
              onChange={(e) => handleModeChange(e.target.value as any)}
              disabled={isSessionActive}
            >
              <option value="PRACTICE">Practice</option>
              <option value="COMPETITION">Competition</option>
            </select>
          </label>
        </div>

        {state.experience === 'QUIZ' && !isSessionActive && (
          <button 
            onClick={() => quiz.actions.initializeQuiz('user1', mockQuizQuestions)}
            className="start-button"
          >
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
};

const QuizFlow = () => {
  const { state, actions } = useQuizContext();
  const [currentDelight, setCurrentDelight] = useState<DelightFactor | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswer = (response: QuizResponse) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrect = response.answer === currentQuestion.correctAnswer;

    // Submit answer first to update score
    actions.submitAnswer(response);
    setHasAnswered(true);

    // If correct, show confetti
    if (isCorrect) {
      setCurrentDelight({
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
      });
    }
  };

  const handleNext = () => {
    actions.advanceToNext();
    setHasAnswered(false);
    setCurrentDelight(null);
  };

  const renderCurrentQuestion = () => {
    if (!state.questions.length) return null;
    
    const currentQuestion = state.questions[state.currentQuestionIndex];
    return (
      <div className="quiz-question">
        <MultipleChoiceQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          correctAnswer={hasAnswered ? currentQuestion.correctAnswer : undefined}
          disabled={hasAnswered}
        />
        {hasAnswered && !state.completed && (
          <button 
            onClick={handleNext}
            className="next-button"
          >
            Next Question
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Quiz Questions</h2>
        <div className="quiz-progress">
          Question {state.currentQuestionIndex + 1} of {state.questions.length}
          <div className="quiz-score">Score: {state.score}</div>
        </div>
      </div>

      <div className="question-container">
        {renderCurrentQuestion()}
        {currentDelight && (
          <DelightFactor
            factor={currentDelight}
            onComplete={() => setCurrentDelight(null)}
          />
        )}
      </div>

      {state.completed && (
        <div className="completion-message">
          Quiz Complete! Final Score: {state.score}/{state.questions.length}
        </div>
      )}
    </div>
  );
};

export const QuestionPlayground = () => {
  return (
    <MockDataProvider>
      <div className="playground-container">
        <QuestionProvider>
          <OnboardingProvider
            standardQuestions={standardQuestions}
            questionPool={questionPool}
          >
            <QuizProvider>
              <ContextControls />
              <QuestionContent />
            </QuizProvider>
          </OnboardingProvider>
        </QuestionProvider>
      </div>
    </MockDataProvider>
  );
};

const QuestionContent = () => {
  const { state } = useQuestionContext();
  
  return (
    <>
      {state.experience === 'ONBOARDING' && <OnboardingFlow />}
      {state.experience === 'QUIZ' && <QuizFlow />}
    </>
  );
}; 