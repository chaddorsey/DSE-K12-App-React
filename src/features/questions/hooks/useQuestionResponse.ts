import { useState, useCallback } from 'react';
import { ResponseService } from '../services/ResponseService';
import type { ResponseValue, ResponseMetadata } from '../types/response';
import { useAuth } from '@/features/auth/context/AuthContext';

export function useQuestionResponse(questionId: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const responseService = new ResponseService();

  const submitResponse = useCallback(async (
    value: ResponseValue,
    metadata: Omit<ResponseMetadata, 'timestamp'>
  ) => {
    if (!user) {
      throw new Error('User must be authenticated to submit responses');
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const responseId = await responseService.submitResponse(
        user.uid,
        questionId,
        value,
        metadata
      );
      return responseId;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to submit response');
      setError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [questionId, user]);

  return {
    submitResponse,
    isSubmitting,
    error
  };
} 