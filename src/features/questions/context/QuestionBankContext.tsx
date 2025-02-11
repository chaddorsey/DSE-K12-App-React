import React, { createContext, useContext, useEffect, useState } from 'react';
import { QuestionBankManager } from '../services/QuestionBankManager';
import type { Question, QuestionCategory } from '../types/question';

interface QuestionBankContextType {
  getQuestion: (id: string) => Question | undefined;
  getQuestionsByCategory: (category: QuestionCategory) => Question[];
  getAllQuestions: () => Question[];
  validateResponse: (questionId: string, response: any) => boolean;
  isLoading: boolean;
  error: Error | null;
}

const QuestionBankContext = createContext<QuestionBankContextType | null>(null);

const INITIAL_QUESTIONS: Question[] = [
  // Required onboarding questions
  {
    id: 'q1',
    number: 1,
    type: 'MC',
    label: 'cat_dog',
    text: 'Are you more of a cat person or a dog person?',
    category: 'PERSONALITY',
    options: ['Cat person', 'Dog person'],
    requiredForOnboarding: true
  },
  {
    id: 'q2',
    number: 2,
    type: 'MC',
    label: 'star_wars_trek',
    text: 'Star Wars or Star Trek?',
    category: 'INTERESTS',
    options: ['Star Wars', 'Star Trek', 'Both', 'Neither'],
    requiredForOnboarding: true
  },
  {
    id: 'q3',
    number: 3,
    type: 'MC',
    label: 'professional_cat',
    text: 'What is your primary occupation?',
    category: 'PROFESSIONAL',
    options: ['Engineer', 'Designer', 'Product Manager', 'Researcher', 'Student', 'Other'],
    requiredForOnboarding: true
  },
  {
    id: 'q4',
    number: 4,
    type: 'NM',
    label: 'num_tvs',
    text: 'How many TVs do you have?',
    category: 'INTERESTS',
    min: 0,
    max: 10,
    requiredForOnboarding: true
  },
  {
    id: 'q5',
    number: 5,
    type: 'OP',
    label: 'secret',
    text: 'Nobody knows that I...',
    category: 'PERSONALITY',
    maxLength: 500,
    requiredForOnboarding: true
  },
  // Optional onboarding questions
  {
    id: 'q6',
    number: 6,
    type: 'MC',
    label: 'region_current',
    text: 'Which region do you live in?',
    category: 'DEMOGRAPHIC',
    options: ['North', 'South', 'East', 'West'],
    includeInOnboarding: true // New flag for optional onboarding questions
  },
  {
    id: 'q7',
    number: 7,
    type: 'MC',
    label: 'intro_extrovert',
    text: 'Do you consider yourself more introverted or extroverted?',
    category: 'PERSONALITY',
    options: ['Introverted', 'Extroverted', 'Somewhere in between'],
    includeInOnboarding: true
  },
  // Additional questions not used in onboarding
  {
    id: 'q8',
    number: 8,
    type: 'MC',
    label: 'favorite_season',
    text: 'What is your favorite season?',
    category: 'INTERESTS',
    options: ['Spring', 'Summer', 'Fall', 'Winter']
  },
  {
    id: 'q9',
    number: 9,
    type: 'MC',
    label: 'morning_night',
    text: 'Are you a morning person or night owl?',
    category: 'PERSONALITY',
    options: ['Morning person', 'Night owl', 'Neither']
  },
  // ... more questions ...
];

export function QuestionBankProvider({ children }: { children: React.ReactNode }) {
  const [manager, setManager] = useState<QuestionBankManager | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Use our predefined questions directly
      const questionManager = new QuestionBankManager(INITIAL_QUESTIONS);
      setManager(questionManager);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize question bank'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    getQuestion: (id: string) => manager?.getQuestion(id),
    getQuestionsByCategory: (category: QuestionCategory) => 
      manager?.getQuestionsByCategory(category) || [],
    getAllQuestions: () => manager?.getAllQuestions() || [],
    validateResponse: (questionId: string, response: any) => 
      manager?.validateResponse(questionId, response) || false,
    isLoading,
    error
  };

  return (
    <QuestionBankContext.Provider value={value}>
      {children}
    </QuestionBankContext.Provider>
  );
}

export function useQuestionBank() {
  const context = useContext(QuestionBankContext);
  if (!context) {
    throw new Error('useQuestionBank must be used within a QuestionBankProvider');
  }
  return context;
} 