/**
 * Provider component for managing onboarding flow
 * 
 * Features:
 * - Random question selection from available pool
 * - Required vs optional question handling
 * - Progress persistence with error recovery
 * - Network error handling with retry mechanism
 * - Progress tracking and monitoring
 * 
 * Usage:
 * ```tsx
 * <OnboardingProvider 
 *   steps={onboardingSteps}
 *   requiredQuestionCount={5}
 *   onComplete={() => console.log('Onboarding complete')}
 * >
 *   <OnboardingFlow />
 * </OnboardingProvider>
 * ```
 */

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as yup from 'yup';

/**
 * Represents a single onboarding step/question
 */
interface IOnboardingStep {
  /** Unique identifier for the step */
  id: string;
  /** Display title for the step */
  title: string;
  /** Whether this step must be completed */
  isRequired: boolean;
  /** Optional validation schema for step data */
  validationSchema?: yup.Schema;
  /** React component to render for this step */
  component: React.ComponentType<IOnboardingStepProps>;
}

/**
 * Props passed to each step's component
 */
interface IOnboardingStepProps {
  /** Current step configuration */
  step: IOnboardingStep;
  /** Called when step is completed with step data */
  onComplete: (data: any) => void;
  /** Called to navigate to previous step */
  onBack: () => void;
}

/**
 * Internal state for the onboarding flow
 */
interface IOnboardingState {
  /** Index of current step, null if complete */
  currentStep: number | null;
  /** Available onboarding steps */
  steps: IOnboardingStep[];
  /** Stored progress data by step ID */
  progress: Record<string, any>;
  /** Whether onboarding is complete */
  isComplete: boolean;
  /** Current error if any */
  error?: Error;
  /** IDs of answered questions */
  answeredQuestions: string[];
  /** Number of required questions remaining */
  remainingRequired: number;
}

interface IOnboardingContext {
  currentStep: IOnboardingStep | null;
  progress: number;
  isComplete: boolean;
  error?: Error;
  answeredQuestions: string[];
  remainingRequired: number;
  goToNext: () => void;
  goToPrevious: () => void;
  saveProgress: (data: any) => Promise<void>;
  completeOnboarding: () => void;
  retryLastOperation?: () => Promise<void>;
}

interface IOnboardingProviderProps {
  steps: IOnboardingStep[];
  requiredQuestionCount: number;
  onComplete?: () => void;
  children: React.ReactNode;
}

interface IStoredProgress {
  [questionId: string]: {
    value: any;
    timestamp: number;
  };
  isComplete?: boolean;
}

export const OnboardingContext = createContext<IOnboardingContext | null>(null);

export function OnboardingProvider({ 
  steps, 
  requiredQuestionCount,
  onComplete, 
  children 
}: IOnboardingProviderProps) {
  const monitoring = MonitoringService.getInstance();
  const [storedProgress, setStoredProgress] = useLocalStorage<IStoredProgress>('onboarding_progress', {});
  const [error, setError] = useState<Error>();
  const [lastOperation, setLastOperation] = useState<() => Promise<void>>();
  const startTime = React.useRef(Date.now());

  /**
   * Handles errors during onboarding flow
   * Tracks errors and updates error state
   */
  const handleError = useCallback((error: Error, operation: string) => {
    setError(error);
    monitoring.trackError(error, {
      type: 'onboarding_error',
      operation
    });
  }, []);

  const retryOperation = useCallback(async () => {
    if (lastOperation) {
      setError(undefined);
      try {
        await lastOperation();
      } catch (err) {
        handleError(err as Error, 'retry');
      }
    }
  }, [lastOperation, handleError]);

  /**
   * Selects the next question randomly from available pool
   * Prioritizes required questions before optional ones
   */
  const selectNextQuestion = useCallback((
    availableSteps: IOnboardingStep[],
    answered: string[]
  ): number | null => {
    // First handle required questions
    const requiredUnanswered = availableSteps.filter(
      step => step.isRequired && !answered.includes(step.id)
    );
    
    if (requiredUnanswered.length > 0) {
      const randomIndex = Math.floor(Math.random() * requiredUnanswered.length);
      return steps.findIndex(step => step.id === requiredUnanswered[randomIndex].id);
    }

    // Then handle optional questions if we need more
    if (answered.length < requiredQuestionCount) {
      const optionalUnanswered = availableSteps.filter(
        step => !step.isRequired && !answered.includes(step.id)
      );
      
      if (optionalUnanswered.length > 0) {
        const randomIndex = Math.floor(Math.random() * optionalUnanswered.length);
        return steps.findIndex(step => step.id === optionalUnanswered[randomIndex].id);
      }
    }

    return null;
  }, [steps, requiredQuestionCount]);

  const [state, setState] = useState<IOnboardingState>(() => {
    const answeredQuestions = Object.keys(storedProgress).filter(key => key !== 'isComplete');
    const isComplete = storedProgress.isComplete || answeredQuestions.length >= requiredQuestionCount;
    
    return {
      currentStep: isComplete ? null : selectNextQuestion(steps, answeredQuestions),
      steps,
      progress: storedProgress,
      isComplete,
      answeredQuestions,
      remainingRequired: Math.max(0, requiredQuestionCount - answeredQuestions.length)
    };
  });

  /**
   * Saves progress for current step with retry capability
   * Handles network errors and provides recovery mechanism
   */
  const saveProgress = useCallback(async (stepId: string, data: any) => {
    try {
      setState(prev => ({
        ...prev,
        progress: {
          ...prev.progress,
          [stepId]: data
        },
        answeredQuestions: [...prev.answeredQuestions, stepId],
        remainingRequired: Math.max(0, requiredQuestionCount - (prev.answeredQuestions.length + 1))
      }));

      await setStoredProgress(prev => ({
        ...prev,
        [stepId]: {
          value: data,
          timestamp: Date.now()
        }
      }));

      monitoring.trackPerformance({
        type: 'step_complete',
        step: stepId,
        totalTime: Date.now() - startTime.current
      });

      setError(undefined);
      setLastOperation(undefined);
    } catch (err) {
      handleError(err as Error, 'save_progress');
      throw err;
    }
  }, [setStoredProgress, requiredQuestionCount, handleError]);

  const saveProgressWithRetry = useCallback(async (data: any) => {
    const operation = async () => {
      try {
        if (state.currentStep === null) return;
        await saveProgress(steps[state.currentStep].id, data);
      } catch (err) {
        handleError(err as Error, 'save_progress');
        setLastOperation(() => () => saveProgressWithRetry(data));
        throw err;
      }
    };
    
    await operation();
  }, [state.currentStep, steps, saveProgress, handleError]);

  /**
   * Advances to next question or completes onboarding
   * Validates current step and selects next random question
   */
  const goToNext = useCallback(async () => {
    if (state.currentStep === null) return;
    
    const currentStep = steps[state.currentStep];
    
    // Validate required steps
    if (currentStep.isRequired && !state.progress[currentStep.id]) {
      const error = new Error(`Step ${currentStep.id} is required`);
      handleError(error, 'validation');
      return;
    }

    const nextStep = selectNextQuestion(steps, state.answeredQuestions);
    
    if (nextStep !== null) {
      setState(prev => ({
        ...prev,
        currentStep: nextStep
      }));
    } else if (!state.isComplete) {
      setState(prev => ({ ...prev, isComplete: true }));
      await setStoredProgress(prev => ({ ...prev, isComplete: true }));
      
      monitoring.trackPerformance({
        type: 'onboarding_complete',
        totalTime: Date.now() - startTime.current,
        totalSteps: steps.length,
        requiredQuestionsCompleted: true
      });
      
      onComplete?.();
    }
  }, [
    state.currentStep,
    state.answeredQuestions,
    state.isComplete,
    steps,
    setStoredProgress,
    selectNextQuestion,
    handleError,
    onComplete
  ]);

  const goToPrevious = useCallback(() => {
    if (state.currentStep > 0) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
    }
  }, [state.currentStep]);

  const currentStepComponent = React.useMemo(() => {
    const step = steps[state.currentStep];
    const StepComponent = step.component;

    return (
      <StepComponent
        step={step}
        onComplete={(data) => {
          saveProgress(step.id, data);
          goToNext();
        }}
        onBack={goToPrevious}
      />
    );
  }, [state.currentStep, steps, saveProgress, goToNext, goToPrevious]);

  const completeOnboarding = useCallback(() => {
    setState(prev => ({ ...prev, isComplete: true }));
    onComplete?.();
  }, [onComplete]);

  const contextValue = React.useMemo(() => ({
    currentStep: state.currentStep !== null ? steps[state.currentStep] : null,
    progress: Math.round((state.answeredQuestions.length / requiredQuestionCount) * 100),
    isComplete: state.isComplete,
    error,
    answeredQuestions: state.answeredQuestions,
    remainingRequired: state.remainingRequired,
    goToNext,
    goToPrevious,
    saveProgress: saveProgressWithRetry,
    completeOnboarding,
    retryLastOperation: retryOperation
  }), [
    state,
    error,
    requiredQuestionCount,
    goToNext,
    goToPrevious,
    saveProgressWithRetry,
    completeOnboarding,
    retryOperation
  ]);

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
} 