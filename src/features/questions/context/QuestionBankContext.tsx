import React, { createContext, useContext, useEffect, useState } from 'react';
import { QuestionBankManager } from '../services/QuestionBankManager';
import { EXTENDED_QUESTIONS } from '../../../constants/questions';
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

export function QuestionBankProvider({ children }: { children: React.ReactNode }) {
  const [manager, setManager] = useState<QuestionBankManager | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Convert existing questions to new format
      const convertedQuestions: Question[] = EXTENDED_QUESTIONS.map(q => ({
        id: `q${q.number}`,
        number: q.number,
        type: q.type as any,
        label: q.label,
        text: q.question,
        category: determineCategory(q.label),
        ...(q.type === 'MC' ? { options: q.options } : {}),
        ...(q.type === 'NM' ? { min: 0, max: 100 } : {}),
        ...(q.type === 'OP' ? { maxLength: 1000 } : {})
      }));

      const questionManager = new QuestionBankManager(convertedQuestions);
      setManager(questionManager);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize question bank'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  function determineCategory(label: string): QuestionCategory {
    if (label.includes('professional')) return 'PROFESSIONAL';
    if (label.includes('region') || label.includes('gender')) return 'DEMOGRAPHIC';
    if (label.includes('hobby') || label.includes('movies')) return 'INTERESTS';
    if (label.includes('intro_extrovert')) return 'PERSONALITY';
    return 'BACKGROUND';
  }

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