import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Question, QuestionResponse } from '../../questions/types';
import { useQuestionBank } from '../../questions/context/QuestionBankContext';

interface OnboardingContextType {
  currentQuestion: Question | null;
  progress: number;
  isComplete: boolean;
  handleAnswer: (response: QuestionResponse) => void;
  handleSkip: () => void;
  canSkip: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: React.ReactNode;
  questions: Question[];
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  questions
}) => {
  const { validateResponse } = useQuestionBank();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Map<string, QuestionResponse>>(new Map());

  const currentQuestion = questions[currentIndex] || null;
  const progress = (currentIndex / questions.length) * 100;
  const isComplete = currentIndex >= questions.length;

  const canSkip = currentQuestion 
    ? !currentQuestion.requiredForOnboarding
    : false;

  const handleAnswer = useCallback((response: QuestionResponse) => {
    if (!currentQuestion) return;

    // Convert string numbers to actual numbers for numeric questions
    const processedResponse = currentQuestion.type === 'NM' 
      ? {
          ...response,
          answer: typeof response.answer === 'string' 
            ? parseInt(response.answer, 10) 
            : response.answer
        }
      : response;

    // Validate response using QuestionBank
    if (!validateResponse(currentQuestion.id, processedResponse.answer)) {
      console.error('Invalid response:', response);
      return;
    }

    setResponses(prev => {
      const next = new Map(prev);
      next.set(currentQuestion.id, processedResponse);
      return next;
    });
    setCurrentIndex(i => i + 1);
  }, [currentQuestion, validateResponse]);

  const handleSkip = useCallback(() => {
    if (!canSkip) return;
    setCurrentIndex(i => i + 1);
  }, [canSkip]);

  const value = {
    currentQuestion,
    progress,
    isComplete,
    handleAnswer,
    handleSkip,
    canSkip
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
} 