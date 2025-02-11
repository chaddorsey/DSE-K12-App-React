import React, { createContext, useContext, useState, useCallback } from 'react';
import { useQuestionBank } from '../../questions/context/QuestionBankContext';
import type { Question, QuestionResponse } from '../../questions/types';

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  currentQuestion: Question | null;
  isComplete: boolean;
  responses: Record<string, QuestionResponse>;
  nextStep: () => void;
  previousStep: () => void;
  saveResponse: (response: QuestionResponse) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getAllQuestions } = useQuestionBank();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, QuestionResponse>>({});

  const onboardingQuestions = React.useMemo(() => {
    const allQuestions = getAllQuestions();
    return allQuestions
      .filter(q => q.includeInOnboarding)
      .sort((a, b) => {
        if (a.requiredForOnboarding !== b.requiredForOnboarding) {
          return a.requiredForOnboarding ? -1 : 1;
        }
        return a.number - b.number;
      });
  }, [getAllQuestions]);

  const currentQuestion = onboardingQuestions[currentStep] || null;
  const totalSteps = onboardingQuestions.length;
  const isComplete = currentStep >= totalSteps;

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const saveResponse = useCallback((response: QuestionResponse) => {
    setResponses(prev => ({
      ...prev,
      [response.questionId]: response
    }));
  }, []);

  const value = {
    currentStep,
    totalSteps,
    currentQuestion,
    isComplete,
    responses,
    nextStep,
    previousStep,
    saveResponse
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}; 