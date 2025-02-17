import React, { useEffect } from 'react';
import { useOnboardingContext } from '../OnboardingContext';
import { MultipleChoiceQuestionComponent } from '../../questions/components/MultipleChoiceQuestion';
import { NumericQuestionComponent } from '../../questions/components/NumericQuestion';
import { SliderQuestionComponent } from '../../questions/components/SliderQuestion';
import { OpenResponseQuestionComponent } from '../../questions/components/OpenResponseQuestion';
import { logger } from '../../../utils/logger';
import type { 
  MultipleChoiceQuestion, 
  NumericQuestion,
  SliderQuestion,
  OpenResponseQuestion,
  QuestionResponse 
} from '../../questions/types/questions';

export const OnboardingFlow = () => {
  const { state, actions } = useOnboardingContext();
  
  // Add debug logging
  useEffect(() => {
    logger.info('OnboardingFlow state:', {
      currentIndex: state.currentQuestionIndex,
      totalQuestions: state.selectedQuestions.length,
      currentQuestion: state.selectedQuestions[state.currentQuestionIndex],
      allQuestions: state.selectedQuestions
    });
  }, [state]);

  useEffect(() => {
    logger.info('Available components:', {
      hasMultipleChoice: !!MultipleChoiceQuestionComponent,
      hasNumeric: !!NumericQuestionComponent,
      hasSlider: !!SliderQuestionComponent,
      hasOpenResponse: !!OpenResponseQuestionComponent
    });
  }, []);

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

  logger.info('Rendering question:', {
    type: currentQuestion?.type,
    id: currentQuestion?.id,
    text: currentQuestion?.text
  });

  const handleAnswer = (response: QuestionResponse) => {
    actions.handleResponse(response);
    actions.advanceToNext();
  };

  return (
    <div className="onboarding-flow">
      <h2>Onboarding Flow</h2>
      <div className="question-container">
        {currentQuestion.type === 'MC' && (
          <MultipleChoiceQuestionComponent
            question={currentQuestion as MultipleChoiceQuestion}
            onAnswer={handleAnswer}
          />
        )}
        {currentQuestion.type === 'NM' && (
          <NumericQuestionComponent
            question={currentQuestion as NumericQuestion}
            onAnswer={handleAnswer}
          />
        )}
        {currentQuestion.type === 'SCALE' && (
          <SliderQuestionComponent
            question={currentQuestion as SliderQuestion}
            onAnswer={handleAnswer}
          />
        )}
        {currentQuestion.type === 'OP' && (
          <OpenResponseQuestionComponent
            question={currentQuestion as OpenResponseQuestion}
            onAnswer={handleAnswer}
          />
        )}
      </div>
      <div className="progress">
        Question {state.currentQuestionIndex + 1} of {state.selectedQuestions.length}
      </div>
    </div>
  );
}; 