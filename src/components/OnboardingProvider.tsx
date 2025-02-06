/**
 * Provider component for managing onboarding flow
 */

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { MonitoringService } from '../monitoring/MonitoringService';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface IOnboardingStep {
  id: string;
  title: string;
  isRequired: boolean;
  validationSchema?: yup.Schema;
  component: React.ComponentType<IOnboardingStepProps>;
}

interface IOnboardingStepProps {
  step: IOnboardingStep;
  onComplete: (data: any) => void;
  onBack: () => void;
}

interface IOnboardingState {
  currentStep: number;
  steps: IOnboardingStep[];
  progress: Record<string, any>;
  isComplete: boolean;
}

interface IOnboardingContext {
  currentStep: IOnboardingStep;
  progress: number;
  goToNext: () => void;
  goToPrevious: () => void;
  saveProgress: (data: any) => void;
  completeOnboarding: () => void;
}

export const OnboardingContext = createContext<IOnboardingContext | null>(null);

interface IOnboardingProviderProps {
  steps: IOnboardingStep[];
  onComplete?: () => void;
  children: React.ReactNode;
}

export function OnboardingProvider({ 
  steps, 
  onComplete, 
  children 
}: IOnboardingProviderProps) {
  const monitoring = MonitoringService.getInstance();
  const [storedProgress, setStoredProgress] = useLocalStorage('onboarding_progress', {});
  const [state, setState] = useState<IOnboardingState>({
    currentStep: 0,
    steps,
    progress: storedProgress,
    isComplete: false
  });

  const startTime = React.useRef(Date.now());

  // Calculate progress percentage
  const progressPercentage = React.useMemo(() => {
    const completedSteps = Object.keys(state.progress).length;
    return Math.round((completedSteps / steps.length) * 100);
  }, [state.progress, steps.length]);

  const saveProgress = useCallback((stepId: string, data: any) => {
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        [stepId]: data
      }
    }));

    setStoredProgress(prev => ({
      ...prev,
      [stepId]: data
    }));

    monitoring.trackPerformance({
      type: 'step_complete',
      step: stepId,
      totalTime: Date.now() - startTime.current
    });
  }, [setStoredProgress]);

  const goToNext = useCallback(async () => {
    const currentStep = state.steps[state.currentStep];
    
    // Validate required steps
    if (currentStep.isRequired && !state.progress[currentStep.id]) {
      const error = new Error(`Step ${currentStep.id} is required`);
      monitoring.trackError(error, {
        type: 'validation_error',
        step: currentStep.id
      });
      return;
    }

    if (state.currentStep < steps.length - 1) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    } else if (!state.isComplete) {
      setState(prev => ({ ...prev, isComplete: true }));
      monitoring.trackPerformance({
        type: 'onboarding_complete',
        totalTime: Date.now() - startTime.current,
        totalSteps: steps.length
      });
      onComplete?.();
    }
  }, [state.currentStep, state.progress, steps.length, onComplete]);

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

  const contextValue = React.useMemo(() => ({
    currentStep: steps[state.currentStep],
    progress: progressPercentage,
    goToNext,
    goToPrevious,
    saveProgress: (data: any) => saveProgress(steps[state.currentStep].id, data),
    completeOnboarding: () => {
      setState(prev => ({ ...prev, isComplete: true }));
      onComplete?.();
    }
  }), [
    steps,
    state.currentStep,
    progressPercentage,
    goToNext,
    goToPrevious,
    saveProgress,
    onComplete
  ]);

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
} 