import { useState, useCallback } from 'react';
import type { Question } from '../types';

interface ValidationProps {
  questions: Question[];
}

type ValidationErrors = Record<string, string | undefined>;
type QuestionValues = Record<string, string | number | undefined>;

interface ValidationState {
  errors: ValidationErrors;
  isValid: boolean;
  validateQuestion: (questionId: string, value: string | number | undefined) => void;
  validateAll: (values: QuestionValues) => boolean;
  clearError: (questionId: string) => void;
}

export const useQuestionValidation = ({ questions }: ValidationProps): ValidationState => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const getQuestionById = useCallback((questionId: string) => {
    return questions.find(q => q.id === questionId);
  }, [questions]);

  const validateQuestion = useCallback((questionId: string, value: string | number | undefined) => {
    const question = getQuestionById(questionId);
    if (!question) return;

    let error: string | undefined;

    if (question.required && value === undefined) {
      error = 'Please select an option';
    } else if (value !== undefined) {
      switch (question.type) {
        case 'OPEN_RESPONSE':
          if (typeof value === 'string') {
            if (question.minLength && value.length < question.minLength) {
              error = `Response must be at least ${question.minLength} characters`;
            } else if (value.length > question.maxLength) {
              error = `Response must not exceed ${question.maxLength} characters`;
            }
          }
          break;

        case 'NUMERIC':
          if (typeof value === 'number') {
            if (value < question.min || value > question.max) {
              error = `Value must be between ${question.min} and ${question.max}`;
            }
          }
          break;

        case 'MULTIPLE_CHOICE':
          if (!question.options.includes(value as string)) {
            error = 'Please select a valid option';
          }
          break;
      }
    }

    setErrors(prev => ({
      ...prev,
      [questionId]: error
    }));
  }, [getQuestionById]);

  const validateAll = useCallback((values: QuestionValues): boolean => {
    const newErrors: ValidationErrors = {};
    
    questions.forEach(question => {
      const value = values[question.id];
      
      if (question.required && value === undefined) {
        newErrors[question.id] = 'Please select an option';
      } else if (value !== undefined) {
        switch (question.type) {
          case 'OPEN_RESPONSE':
            if (typeof value === 'string') {
              if (question.minLength && value.length < question.minLength) {
                newErrors[question.id] = `Response must be at least ${question.minLength} characters`;
              } else if (value.length > question.maxLength) {
                newErrors[question.id] = `Response must not exceed ${question.maxLength} characters`;
              }
            }
            break;

          case 'NUMERIC':
            if (typeof value === 'number') {
              if (value < question.min || value > question.max) {
                newErrors[question.id] = `Value must be between ${question.min} and ${question.max}`;
              }
            }
            break;

          case 'MULTIPLE_CHOICE':
            if (!question.options.includes(value as string)) {
              newErrors[question.id] = 'Please select a valid option';
            }
            break;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [questions]);

  const clearError = useCallback((questionId: string) => {
    setErrors(prev => ({
      ...prev,
      [questionId]: undefined
    }));
  }, []);

  const isValid = Object.values(errors).every(error => !error);

  return {
    errors,
    isValid,
    validateQuestion,
    validateAll,
    clearError
  };
}; 