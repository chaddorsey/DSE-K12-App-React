import React from 'react';
import { useOnboarding } from '../OnboardingContext';
import { 
  Question,
  QuestionType,
  QuestionResponse,
  MultipleChoiceQuestion,
  OpenResponseQuestion,
  NumericQuestion,
  SliderQuestion,
  XYContinuumQuestion
} from '../../questions/types/questions';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { OnboardingProgress } from './OnboardingProgress';
import { OnboardingComplete } from './OnboardingComplete';
import { MultipleChoiceQuizQuestion } from './questions/MultipleChoiceQuizQuestion';
import { OpenResponseQuizQuestion } from './questions/OpenResponseQuizQuestion';
import { NumericQuizQuestion } from './questions/NumericQuizQuestion';
import { SliderQuizQuestion } from './questions/SliderQuizQuestion';
import { XYContinuumQuizQuestion } from './questions/XYContinuumQuizQuestion';
import { logger } from '@/utils/logger';
import { useAuth } from '../../auth/AuthContext';
import { Navigate } from 'react-router-dom';

// Define base props interface with required showFeedback
interface BaseQuestionProps {
  onAnswer: (response: QuestionResponse) => void;
  showFeedback: boolean;  // Changed to required
}

// Define specific component types
interface MCQuestionProps extends BaseQuestionProps {
  question: MultipleChoiceQuestion;
}

interface ORQuestionProps extends BaseQuestionProps {
  question: OpenResponseQuestion;
}

interface NMQuestionProps extends BaseQuestionProps {
  question: NumericQuestion;
}

interface SLQuestionProps extends BaseQuestionProps {
  question: SliderQuestion;
}

interface XYQuestionProps extends BaseQuestionProps {
  question: XYContinuumQuestion;
}

type QuestionComponentMap = {
  [QuestionType.MC]: React.ComponentType<MCQuestionProps>;
  [QuestionType.OP]: React.ComponentType<ORQuestionProps>;
  [QuestionType.NM]: React.ComponentType<NMQuestionProps>;
  [QuestionType.SLIDER]: React.ComponentType<SLQuestionProps>;
  [QuestionType.XY]: React.ComponentType<XYQuestionProps>;
};

export const OnboardingFlow: React.FC = () => {
  const { user } = useAuth();
  const {
    currentQuestion,
    responses,
    isComplete,
    loading,
    error,
    handleResponse,
    skipQuestion
  } = useOnboarding();

  if (!user?.uid) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isComplete) {
    return <OnboardingComplete />;
  }

  if (!currentQuestion) {
    return <Navigate to="/" replace />;
  }

  const components: QuestionComponentMap = {
    [QuestionType.MC]: MultipleChoiceQuizQuestion,
    [QuestionType.OP]: OpenResponseQuizQuestion,
    [QuestionType.NM]: NumericQuizQuestion,
    [QuestionType.SLIDER]: SliderQuizQuestion,
    [QuestionType.XY]: XYContinuumQuizQuestion
  };

  const getQuestionComponent = (question: Question): { Component: React.ComponentType<any>; type: QuestionType } | null => {
    const Component = components[question.type];
    if (!Component) {
      logger.error('Unsupported question type:', question.type);
      return null;
    }
    return { Component, type: question.type };
  };

  const questionData = getQuestionComponent(currentQuestion);

  if (!questionData) {
    return <ErrorMessage message="Unsupported question type" />;
  }

  const { Component, type } = questionData;

  // Type guard to narrow the question type
  const isMatchingQuestionType = (q: Question, t: QuestionType): q is Question & { type: typeof t } => {
    return q.type === t;
  };

  if (!isMatchingQuestionType(currentQuestion, type)) {
    return <ErrorMessage message="Question type mismatch" />;
  }

  return (
    <div className="onboarding-flow">
      <OnboardingProgress 
        currentIndex={responses.length} 
        totalQuestions={responses.length + 1} 
      />
      
      <div className="question-container">
        <Component
          question={currentQuestion}
          onAnswer={handleResponse}
          showFeedback={false}
        />
      </div>

      {!currentQuestion.requiredForOnboarding && (
        <button 
          className="skip-button"
          onClick={skipQuestion}
          aria-label="Skip question"
        >
          Skip
        </button>
      )}
    </div>
  );
}; 