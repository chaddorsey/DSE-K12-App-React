import { renderHook, act } from '@testing-library/react';
import { useFormNavigation } from '../useFormNavigation';
import type { Question } from '../../types';

describe('useFormNavigation', () => {
  const mockQuestions: Question[] = [
    { id: 'q1', type: 'MULTIPLE_CHOICE', prompt: 'Question 1', options: ['A', 'B', 'C'] },
    { id: 'q2', type: 'OPEN_RESPONSE', prompt: 'Question 2', maxLength: 500 },
    { id: 'q3', type: 'MULTIPLE_CHOICE', prompt: 'Question 3', options: ['X', 'Y', 'Z'] }
  ];

  it('initializes with first question', () => {
    const { result } = renderHook(() => useFormNavigation({ 
      questions: mockQuestions,
      onComplete: () => {}
    }));
    
    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.currentQuestion).toEqual(mockQuestions[0]);
  });

  it('navigates to next question', () => {
    const { result } = renderHook(() => useFormNavigation({ 
      questions: mockQuestions,
      onComplete: () => {}
    }));
    
    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.currentQuestion).toEqual(mockQuestions[1]);
  });

  it('navigates to previous question', () => {
    const { result } = renderHook(() => useFormNavigation({ 
      questions: mockQuestions,
      onComplete: () => {}
    }));
    
    act(() => {
      result.current.goToNext();
      result.current.goToPrevious();
    });

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.currentQuestion).toEqual(mockQuestions[0]);
  });

  it('prevents navigation beyond bounds', () => {
    const { result } = renderHook(() => useFormNavigation({ 
      questions: mockQuestions,
      onComplete: () => {}
    }));
    
    act(() => {
      result.current.goToPrevious();
    });
    expect(result.current.currentQuestionIndex).toBe(0);

    act(() => {
      result.current.goToNext();
      result.current.goToNext();
      result.current.goToNext();
    });
    expect(result.current.currentQuestionIndex).toBe(2);
  });

  it('provides navigation state', () => {
    const { result } = renderHook(() => useFormNavigation({ 
      questions: mockQuestions,
      onComplete: () => {}
    }));
    
    expect(result.current.isFirstQuestion).toBe(true);
    expect(result.current.isLastQuestion).toBe(false);

    act(() => {
      result.current.goToNext();
      result.current.goToNext();
    });

    expect(result.current.isFirstQuestion).toBe(false);
    expect(result.current.isLastQuestion).toBe(true);
  });

  it('tracks completion status', () => {
    const { result } = renderHook(() => useFormNavigation({ 
      questions: mockQuestions,
      onComplete: jest.fn()
    }));
    
    expect(result.current.isComplete).toBe(false);

    act(() => {
      result.current.markAnswered('q1');
      result.current.markAnswered('q2');
      result.current.markAnswered('q3');
    });

    expect(result.current.isComplete).toBe(true);
  });

  it('calls onComplete callback when all questions are answered', () => {
    const mockOnComplete = jest.fn();
    const { result } = renderHook(() => useFormNavigation({ 
      questions: mockQuestions,
      onComplete: mockOnComplete
    }));
    
    act(() => {
      result.current.markAnswered('q1');
      result.current.markAnswered('q2');
      result.current.markAnswered('q3');
    });

    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('supports keyboard navigation', () => {
    const { result } = renderHook(() => useFormNavigation({ 
      questions: mockQuestions,
      onComplete: () => {}
    }));
    
    // Test arrow right navigation
    act(() => {
      result.current.handleKeyDown({ key: 'ArrowRight' } as KeyboardEvent);
    });
    expect(result.current.currentQuestionIndex).toBe(1);

    // Test arrow left navigation
    act(() => {
      result.current.handleKeyDown({ key: 'ArrowLeft' } as KeyboardEvent);
    });
    expect(result.current.currentQuestionIndex).toBe(0);
  });

  it('handles invalid question index gracefully', () => {
    const { result } = renderHook(() => useFormNavigation({ 
      questions: [],
      onComplete: () => {}
    }));
    
    expect(result.current.currentQuestion).toBeUndefined();
    expect(result.current.isFirstQuestion).toBe(true);
    expect(result.current.isLastQuestion).toBe(true);
  });
});