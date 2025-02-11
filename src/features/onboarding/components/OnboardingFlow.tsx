import React from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import { MultipleChoiceQuestion } from '../../questions/components/MultipleChoiceQuestion';
import { OpenResponseQuestion } from '../../questions/components/OpenResponseQuestion';
import { NumericQuestion } from '../../questions/components/NumericQuestion';
import { SliderQuestion } from '../../questions/components/SliderQuestion';
import { SegmentedSliderQuestion } from '../../questions/components/SegmentedSliderQuestion';
import type { Question } from '../../questions/types';
import { useQuestionBank } from '../../questions/context/QuestionBankContext';
import './OnboardingFlow.css';

export const OnboardingFlow: React.FC = () => {
  const { 
    currentQuestion,
    currentStep,
    totalSteps,
    isComplete,
    nextStep,
    previousStep,
    saveResponse
  } = useOnboarding();

  const { getAllQuestions } = useQuestionBank();
  
  // Get all questions and filter for onboarding ones
  const onboardingQuestions = React.useMemo(() => {
    const allQuestions = getAllQuestions();
    return allQuestions
      .filter(q => q.includeInOnboarding)
      .sort((a, b) => {
        // Required questions first, then by number
        if (a.requiredForOnboarding !== b.requiredForOnboarding) {
          return a.requiredForOnboarding ? -1 : 1;
        }
        return a.number - b.number;
      });
  }, [getAllQuestions]);

  if (isComplete) {
    return (
      <div className="onboarding-complete">
        <h2>Welcome aboard! 🎉</h2>
        <p>Thank you for completing the onboarding process.</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const handleAnswer = (response: QuestionResponse) => {
    saveResponse(response);
    nextStep();
  };

  const progress = (currentStep / totalSteps) * 100;

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'MC':
        return (
          <MultipleChoiceQuestion
            question={question}
            onAnswer={handleAnswer}
          />
        );
      case 'OP':
        return (
          <OpenResponseQuestion
            question={question}
            onAnswer={handleAnswer}
          />
        );
      case 'NM':
        return (
          <NumericQuestion
            question={question}
            onAnswer={handleAnswer}
          />
        );
      case 'SCALE':
        return (
          <SliderQuestion
            question={question}
            onAnswer={handleAnswer}
          />
        );
      case 'SEGMENTED_SLIDER':
        return (
          <SegmentedSliderQuestion
            question={question}
            onAnswer={handleAnswer}
          />
        );
      default:
        console.warn(`Unsupported question type: ${question.type}`, question);
        return (
          <div className="error-message">
            This question type ({question.type}) is not yet supported.
          </div>
        );
    }
  };

  return (
    <div className="onboarding-flow">
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-panel">
          <h3>Debug Info</h3>
          <p>Current Question: {currentQuestion?.id}</p>
          <p>Progress: {progress.toFixed(1)}%</p>
          <p>Step: {currentStep + 1} of {totalSteps}</p>
          <p>Required: {currentQuestion?.requiredForOnboarding ? 'Yes' : 'No'}</p>
        </div>
      )}

      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="question-container">
        {renderQuestion(currentQuestion)}
      </div>

      <div className="navigation-buttons">
        <button 
          onClick={previousStep}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        {!currentQuestion.requiredForOnboarding && (
          <button onClick={nextStep}>
            Skip
          </button>
        )}
      </div>
    </div>
  );
}; 