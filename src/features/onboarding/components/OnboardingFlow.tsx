import React from 'react';
import { useOnboardingContext } from '../OnboardingContext';
import { MultipleChoiceQuestionComponent } from '../../questions/components/MultipleChoiceQuestion';
import type { MultipleChoiceQuestion, QuestionResponse } from '../../questions/types/questions';

export const OnboardingFlow = () => {
  const { state, actions } = useOnboardingContext();
  
  if (!state.selectedQuestions.length) {
    return (
      <div className="onboarding-flow">
        <h2>Onboarding Flow</h2>
        <button onClick={() => actions.initializeSequence()}>
          Start Onboarding
        </button>
      </div>
    );
  }

  if (state.completed) {
    return (
      <div className="onboarding-flow">
        <h2>Onboarding Complete</h2>
        <p>Thank you for completing the onboarding process!</p>
      </div>
    );
  }

  const currentQuestion = state.selectedQuestions[state.currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className="onboarding-flow">
        <h2>Error</h2>
        <p>No question found. Please try again.</p>
        <button onClick={() => actions.initializeSequence()}>
          Restart Onboarding
        </button>
      </div>
    );
  }

  return (
    <div className="onboarding-flow">
      <h2>Onboarding Flow</h2>
      <div className="question-container">
        {currentQuestion.type === 'MC' && (
          <MultipleChoiceQuestionComponent
            question={currentQuestion as MultipleChoiceQuestion}
            onAnswer={(response: QuestionResponse) => {
              actions.handleResponse(response);
              actions.advanceToNext();
            }}
          />
        )}
        {/* Add other question type handlers */}
      </div>
      <div className="progress">
        Question {state.currentQuestionIndex + 1} of {state.selectedQuestions.length}
      </div>
    </div>
  );
}; 