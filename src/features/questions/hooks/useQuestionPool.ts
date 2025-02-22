import { useState, useEffect } from 'react';
import { Question } from '../types/questions';
import { questionPool } from '../data/rawQuestions';

export const useQuestionPool = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setQuestions(questionPool);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
      setLoading(false);
    }
  }, []);

  return { questions, loading, error };
}; 