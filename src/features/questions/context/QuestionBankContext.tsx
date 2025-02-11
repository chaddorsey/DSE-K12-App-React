import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { QuestionBankManager } from '../services/QuestionBankManager';
import type { Question, QuestionType, QuestionCategory } from '../types';
import { questionStore } from '../../../data/questions';
import { ensureQuestionFields } from '../utils/questionUtils';

interface QuestionBankContextType {
  getQuestion: (id: string) => Question | undefined;
  getQuestionsByCategory: (category: QuestionCategory) => Question[];
  getAllQuestions: () => Question[];
  validateResponse: (questionId: string, response: any) => boolean;
  isLoading: boolean;
  error: Error | null;
  questions: Question[];
  getQuestions: () => Question[];
  updateQuestion: (question: Question) => void;
  deleteQuestion: (id: string) => Promise<void>;
  duplicateQuestion: (id: string) => Promise<string>;
  bulkUpdate: (ids: string[], updates: Partial<Question>) => Promise<void>;
}

const QuestionBankContext = createContext<QuestionBankContextType | undefined>(undefined);

// Update initial questions to include all required fields
const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q1',
    number: 1,
    type: 'MC',
    text: 'Are you more of a cat person or a dog person?',
    label: 'cat_dog',
    category: 'GENERAL',
    options: ['Cat person', 'Dog person'],
    requiredForOnboarding: true,
    includeInOnboarding: true,
    allowMultiple: false
  },
  {
    id: 'q2',
    number: 2,
    type: 'MC',
    text: 'Star Wars or Star Trek?',
    label: 'star_wars_trek',
    category: 'GENERAL',
    options: ['Star Wars', 'Star Trek', 'Both', 'Neither'],
    requiredForOnboarding: true,
    includeInOnboarding: true,
    allowMultiple: false
  },
  {
    id: 'q3',
    number: 3,
    type: 'MC',
    text: 'What is your primary occupation?',
    label: 'professional_cat',
    category: 'GENERAL',
    options: ['Engineer', 'Designer', 'Product Manager', 'Researcher', 'Student', 'Other'],
    requiredForOnboarding: true,
    includeInOnboarding: false,
    allowMultiple: false
  },
  {
    id: 'q4',
    number: 4,
    type: 'NM',
    text: 'How many TVs do you have?',
    label: 'num_tvs',
    category: 'GENERAL',
    min: 0,
    max: 10,
    step: 1,
    requiredForOnboarding: true,
    includeInOnboarding: false
  },
  {
    id: 'q5',
    number: 5,
    type: 'OP',
    text: 'Nobody knows that I...',
    label: 'secret',
    category: 'GENERAL',
    maxLength: 500,
    requiredForOnboarding: true,
    includeInOnboarding: false
  },
  // Optional onboarding questions
  {
    id: 'q6',
    number: 6,
    type: 'MC',
    text: 'Which region do you live in?',
    label: 'region_current',
    category: 'GENERAL',
    options: ['North', 'South', 'East', 'West'],
    requiredForOnboarding: false,
    includeInOnboarding: true,
    allowMultiple: false
  },
  {
    id: 'q7',
    number: 7,
    type: 'MC',
    text: 'Do you consider yourself more introverted or extroverted?',
    label: 'intro_extrovert',
    category: 'GENERAL',
    options: ['Introverted', 'Extroverted', 'Somewhere in between'],
    requiredForOnboarding: false,
    includeInOnboarding: true,
    allowMultiple: false
  },
  // Additional questions not used in onboarding
  {
    id: 'q8',
    number: 8,
    type: 'MC',
    text: 'What is your favorite season?',
    label: 'favorite_season',
    category: 'GENERAL',
    options: ['Spring', 'Summer', 'Fall', 'Winter'],
    requiredForOnboarding: false,
    includeInOnboarding: false,
    allowMultiple: false
  },
  {
    id: 'q9',
    number: 9,
    type: 'MC',
    text: 'Are you a morning person or night owl?',
    label: 'morning_night',
    category: 'GENERAL',
    options: ['Morning person', 'Night owl', 'Neither'],
    requiredForOnboarding: false,
    includeInOnboarding: false,
    allowMultiple: false
  }
];

interface QuestionBankProviderProps {
  children: React.ReactNode;
  initialQuestions?: Question[];
}

export const QuestionBankProvider: React.FC<QuestionBankProviderProps> = ({
  children,
  initialQuestions = INITIAL_QUESTIONS
}) => {
  // Initialize with either stored questions, question store, or initial questions
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      // First try to get from localStorage
      const savedQuestions = localStorage.getItem('questionBank');
      if (savedQuestions) {
        try {
          const parsed = JSON.parse(savedQuestions);
          if (Array.isArray(parsed) && parsed.length > 0) {
            console.log('Using saved questions:', { length: parsed.length });
            return parsed;
          }
        } catch (parseError) {
          console.error('Error parsing saved questions:', parseError);
        }
      }

      // Then try to get from question store
      try {
        const storeQuestions = questionStore.getAllQuestions();
        if (storeQuestions.length > 0) {
          console.log('Using question store:', { length: storeQuestions.length });
          return storeQuestions.map(q => ensureQuestionFields(q));
        }
      } catch (storeError) {
        console.error('Error loading from question store:', storeError);
      }
      
      // Finally fall back to initial questions
      console.log('Using initial questions:', { length: initialQuestions.length });
      return initialQuestions;
    } catch (error) {
      console.error('Error in questions initialization:', error);
      return initialQuestions;
    }
  });

  const [manager, setManager] = useState<QuestionBankManager | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Initialize manager when component mounts
  useEffect(() => {
    console.log('Initializing manager with questions:', {
      questionsLength: questions.length,
      questions
    });
    try {
      const questionManager = new QuestionBankManager(questions);
      console.log('Manager initialized:', {
        managerQuestions: questionManager.getAllQuestions()
      });
      setManager(questionManager);
      setIsLoading(false);
    } catch (err) {
      console.error('Error initializing manager:', err);
      setError(err instanceof Error ? err : new Error('Failed to initialize question bank'));
      setIsLoading(false);
    }
  }, [questions]);

  // Debug logging
  useEffect(() => {
    console.log('QuestionBank state:', {
      questionCount: questions.length,
      managerQuestions: manager?.getAllQuestions().length,
      isLoading,
      error,
      hasManager: !!manager
    });
  }, [questions, isLoading, error, manager]);

  // Clear localStorage for testing
  useEffect(() => {
    // Uncomment to clear localStorage for testing
    // localStorage.removeItem('questionBank');
  }, []);

  const value: QuestionBankContextType = {
    getQuestion: useCallback((id: string) => questions.find(q => q.id === id), [questions]),
    getQuestionsByCategory: useCallback(
      (category: QuestionCategory) => questions.filter(q => q.category === category),
      [questions]
    ),
    getAllQuestions: useCallback(() => questions, [questions]),
    validateResponse: useCallback(
      (questionId: string, response: any) => manager?.validateResponse(questionId, response) || false,
      [manager]
    ),
    isLoading,
    error,
    questions, // Expose questions directly
    getQuestions: useCallback(() => questions, [questions]),
    updateQuestion: useCallback((updatedQuestion: Question) => {
      console.log('Updating question:', updatedQuestion);
      setQuestions(prev => {
        const updated = prev.map(q => 
          q.id === updatedQuestion.id ? updatedQuestion : q
        );
        return updated;
      });
    }, []),
    deleteQuestion: useCallback(async (id: string) => {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }, []),
    duplicateQuestion: useCallback(async (id: string) => {
      const question = questions.find(q => q.id === id);
      if (!question) throw new Error('Question not found');

      const newId = `${id}-copy-${Date.now()}`;
      const duplicatedQuestion: Question = {
        ...question,
        id: newId,
        text: `${question.text} (Copy)`
      };

      setQuestions(prev => [...prev, duplicatedQuestion] as Question[]);
      return newId;
    }, [questions]),
    bulkUpdate: useCallback(async (ids: string[], updates: Partial<Question>) => {
      setQuestions(prev => 
        prev.map(q => ids.includes(q.id) ? { ...q, ...updates } as Question : q)
      );
    }, [])
  };

  return (
    <QuestionBankContext.Provider value={value}>
      {children}
    </QuestionBankContext.Provider>
  );
};

export function useQuestionBank() {
  const context = useContext(QuestionBankContext);
  if (!context) {
    throw new Error('useQuestionBank must be used within a QuestionBankProvider');
  }
  return context;
} 