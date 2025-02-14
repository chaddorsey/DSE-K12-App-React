import { createContext, useContext } from 'react';
import type { Question } from '../types';

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

export const useQuestionBank = () => useContext(QuestionBankContext); 