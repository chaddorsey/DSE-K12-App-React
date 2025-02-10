import { renderHook, act } from '@testing-library/react';
import { useQuestionValidation } from '../useQuestionValidation';
import type { Question, QuestionResponse } from '../../types';

describe('useQuestionValidation', () => {
  const mockQuestions: Question[] = [
    { 
      id: 'q1', 
      type: 'MULTIPLE_CHOICE', 
      prompt: 'Select one', 
      options: ['A', 'B', 'C'],
      required: true
    },
    { 
      id: 'q2', 
      type: 'OPEN_RESPONSE', 
      prompt: 'Explain why', 
      maxLength: 500,
      minLength: 10,
      required: true
    },
    {
      id: 'q3',
      type: 'NUMERIC',
      prompt: 'Enter a number',
      min: 0,
      max: 100,
      required: false
    }
  ];

  it('initializes with empty errors', () => {
    const { result } = renderHook(() => useQuestionValidation({ questions: mockQuestions }));
    
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(true);
  });

  it('validates required multiple choice questions', () => {
    const { result } = renderHook(() => useQuestionValidation({ questions: mockQuestions }));
    
    act(() => {
      result.current.validateQuestion('q1', undefined);
    });

    expect(result.current.errors.q1).toBe('Please select an option');
    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.validateQuestion('q1', 'A');
    });

    expect(result.current.errors.q1).toBeUndefined();
    expect(result.current.isValid).toBe(true);
  });

  it('validates open response length constraints', () => {
    const { result } = renderHook(() => useQuestionValidation({ questions: mockQuestions }));
    
    // Test too short
    act(() => {
      result.current.validateQuestion('q2', 'Short');
    });
    expect(result.current.errors.q2).toBe('Response must be at least 10 characters');

    // Test valid length
    act(() => {
      result.current.validateQuestion('q2', 'This is a valid response length');
    });
    expect(result.current.errors.q2).toBeUndefined();

    // Test too long
    act(() => {
      result.current.validateQuestion('q2', 'a'.repeat(501));
    });
    expect(result.current.errors.q2).toBe('Response must not exceed 500 characters');
  });

  it('validates numeric range constraints', () => {
    const { result } = renderHook(() => useQuestionValidation({ questions: mockQuestions }));
    
    // Test below range
    act(() => {
      result.current.validateQuestion('q3', -1);
    });
    expect(result.current.errors.q3).toBe('Value must be between 0 and 100');

    // Test above range
    act(() => {
      result.current.validateQuestion('q3', 101);
    });
    expect(result.current.errors.q3).toBe('Value must be between 0 and 100');

    // Test valid value
    act(() => {
      result.current.validateQuestion('q3', 50);
    });
    expect(result.current.errors.q3).toBeUndefined();
  });

  it('skips validation for non-required questions', () => {
    const { result } = renderHook(() => useQuestionValidation({ questions: mockQuestions }));
    
    act(() => {
      result.current.validateQuestion('q3', undefined);
    });

    expect(result.current.errors.q3).toBeUndefined();
    expect(result.current.isValid).toBe(true);
  });

  it('validates all questions', () => {
    const { result } = renderHook(() => useQuestionValidation({ questions: mockQuestions }));
    
    act(() => {
      result.current.validateAll({
        q1: undefined,
        q2: 'too short',
        q3: 150
      });
    });

    expect(result.current.errors).toEqual({
      q1: 'Please select an option',
      q2: 'Response must be at least 10 characters',
      q3: 'Value must be between 0 and 100'
    });
    expect(result.current.isValid).toBe(false);
  });

  it('clears errors for a question', () => {
    const { result } = renderHook(() => useQuestionValidation({ questions: mockQuestions }));
    
    act(() => {
      result.current.validateQuestion('q1', undefined);
    });
    expect(result.current.errors.q1).toBeDefined();

    act(() => {
      result.current.clearError('q1');
    });
    expect(result.current.errors.q1).toBeUndefined();
  });
}); 