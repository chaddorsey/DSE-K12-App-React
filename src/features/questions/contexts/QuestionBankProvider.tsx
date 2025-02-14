import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Question } from '../types';
import { QuestionBankManager } from '../services/QuestionBankManager';

interface QuestionBankContextType {
  questions: Question[];
  loading: boolean;
  error: Error | null;
}

export const QuestionBankContext = createContext<QuestionBankContextType>({
  questions: [],
  loading: false,
  error: null
});

export const QuestionBankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const manager = new QuestionBankManager();
        const loadedQuestions = manager.getAllQuestions();
        setQuestions(loadedQuestions);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load questions'));
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  return (
    <QuestionBankContext.Provider value={{ questions, loading, error }}>
      {children}
    </QuestionBankContext.Provider>
  );
}; 