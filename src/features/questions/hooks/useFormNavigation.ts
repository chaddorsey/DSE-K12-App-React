import { useState, useCallback, useEffect } from 'react';
import type { Question } from '../types';

interface FormNavigationProps {
  questions: Question[];
  onComplete: () => void;
}

interface FormNavigationState {
  currentQuestionIndex: number;
  currentQuestion: Question | undefined;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isComplete: boolean;
  answeredQuestions: Set<string>;
  goToNext: () => void;
  goToPrevious: () => void;
  markAnswered: (questionId: string) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
  progress: number;
  handleNavigation: (direction: 'prev' | 'next') => void;
}

export const useFormNavigation = ({ 
  questions, 
  onComplete 
}: FormNavigationProps): FormNavigationState => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isComplete = questions.length > 0 && answeredQuestions.size === questions.length;

  const goToNext = useCallback(() => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1));
    }
  }, [isLastQuestion, questions.length]);

  const goToPrevious = useCallback(() => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
    }
  }, [isFirstQuestion]);

  const markAnswered = useCallback((questionId: string) => {
    setAnsweredQuestions(prev => new Set([...prev, questionId]));
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        goToNext();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        goToPrevious();
        break;
      default:
        break;
    }
  }, [goToNext, goToPrevious]);

  const progress = questions.length > 0 
    ? (answeredQuestions.size / questions.length) * 100 
    : 0;

  const handleNavigation = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'next') {
      goToNext();
    } else {
      goToPrevious();
    }
  }, [goToNext, goToPrevious]);

  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  useEffect(() => {
    // Ensure currentQuestionIndex stays within bounds when questions array changes
    if (currentQuestionIndex >= questions.length) {
      setCurrentQuestionIndex(Math.max(0, questions.length - 1));
    }
  }, [questions.length, currentQuestionIndex]);

  return {
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    isFirstQuestion,
    isLastQuestion,
    isComplete,
    answeredQuestions,
    goToNext,
    goToPrevious,
    markAnswered,
    handleKeyDown,
    progress,
    handleNavigation,
  };
}; 