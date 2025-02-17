import React, { useState, useEffect } from 'react';
import { useOnboardingContext } from '../context/OnboardingContext';
import { useAuth } from '../../auth/AuthContext';
import { SessionService } from '../services/SessionService';
import { ResponseService } from '../services/ResponseService';
import { DelightFactor } from './DelightFactor/DelightFactor';
import type { QuestionResponse } from '../types/responses';
import type { DelightFactor as DelightFactorType } from '../types/delightFactors';
import { MultipleChoiceQuestionComponent } from './MultipleChoiceQuestion';
import { SliderQuestionComponent } from './SliderQuestion';
import { XYContinuumQuestionComponent } from './XYContinuumQuestion';
import { SegmentedSliderQuestionComponent } from './SegmentedSliderQuestion';

interface Props {
  sessionService: SessionService;
  responseService: ResponseService;
}

export const OnboardingFlow: React.FC<Props> = ({ sessionService, responseService }) => {
  const { state, actions } = useOnboardingContext();
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentDelight, setCurrentDelight] = useState<DelightFactorType | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    const initSession = async () => {
      if (user?.uid && state.selectedQuestions.length > 0) {
        const newSessionId = await sessionService.startSession(user.uid, 'ONBOARDING');
        setSessionId(newSessionId);
      }
    };

    initSession();
  }, [user?.uid, state.selectedQuestions.length, sessionService]);

  const handleAnswer = async (response: QuestionResponse) => {
    if (!sessionId) return;

    try {
      // Save response
      const savedResponse = await responseService.saveResponse({
        ...response,
        sessionId,
        context: 'ONBOARDING'
      });

      // Update onboarding state
      actions.handleResponse(savedResponse);
      setHasAnswered(true);

      // Show delight factor
      setCurrentDelight({
        id: 'confetti',
        type: 'ANIMATION',
        timing: 'POST_ANSWER',
        trigger: 'IMMEDIATE',
        content: {
          animation: 'confetti',
          duration: 2000,
          customParams: {
            type: 'CELEBRATION'
          }
        },
        questionTypes: ['MC', 'SCALE', 'XY_CONTINUUM', 'SEGMENTED_SLIDER']
      });

      // Check if onboarding is complete
      if (state.currentQuestionIndex === state.selectedQuestions.length - 1) {
        await sessionService.completeSession(sessionId, {
          totalQuestions: state.selectedQuestions.length
        });
      }
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const renderCurrentQuestion = () => {
    if (!state.selectedQuestions.length) return null;
    
    const currentQuestion = state.selectedQuestions[state.currentQuestionIndex];
    if (typeof currentQuestion === 'string') return null;

    switch (currentQuestion.type) {
      case 'MC':
        return (
          <MultipleChoiceQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      case 'SCALE':
        return (
          <SliderQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      case 'XY_CONTINUUM':
        return (
          <XYContinuumQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
            mode="ONBOARDING"
          />
        );
      case 'SEGMENTED_SLIDER':
        return (
          <SegmentedSliderQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={hasAnswered}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container" data-testid="onboarding-flow">
      {currentDelight && (
        <DelightFactor
          factor={currentDelight}
          onComplete={() => {
            setCurrentDelight(null);
            setHasAnswered(false);
            if (!state.completed) {
              actions.advanceToNext();
            }
          }}
        />
      )}

      <div className="onboarding-header">
        <h2>Getting to Know You</h2>
        <div className="progress">
          Question {state.currentQuestionIndex + 1} of {state.selectedQuestions.length}
        </div>
      </div>

      <div className="question-container">
        {renderCurrentQuestion()}
      </div>

      {state.completed && (
        <div className="completion-message">
          Onboarding Complete! Thank you for your responses.
        </div>
      )}
    </div>
  );
}; 