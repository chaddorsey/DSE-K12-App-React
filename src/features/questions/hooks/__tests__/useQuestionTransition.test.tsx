import { renderHook, act } from '@testing-library/react';
import { useQuestionTransition } from '../useQuestionTransition';

describe('useQuestionTransition', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useQuestionTransition());
    
    expect(result.current.direction).toBeNull();
    expect(result.current.isAnimating).toBe(false);
    expect(result.current.transitionClass).toBe('');
  });

  it('handles forward transition', () => {
    const { result } = renderHook(() => useQuestionTransition());
    
    act(() => {
      result.current.startTransition('forward');
    });

    expect(result.current.direction).toBe('forward');
    expect(result.current.isAnimating).toBe(true);
    expect(result.current.transitionClass).toBe('slide-exit slide-exit-forward');

    // After exit phase
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current.transitionClass).toBe('slide-enter slide-enter-forward');

    // After enter phase
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current.isAnimating).toBe(false);
    expect(result.current.transitionClass).toBe('');
  });

  it('handles backward transition', () => {
    const { result } = renderHook(() => useQuestionTransition());
    
    act(() => {
      result.current.startTransition('backward');
    });

    expect(result.current.direction).toBe('backward');
    expect(result.current.isAnimating).toBe(true);
    expect(result.current.transitionClass).toBe('slide-exit slide-exit-backward');

    // After exit phase
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current.transitionClass).toBe('slide-enter slide-enter-backward');

    // After enter phase
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current.isAnimating).toBe(false);
    expect(result.current.transitionClass).toBe('');
  });

  it('prevents new transitions while animating', () => {
    const { result } = renderHook(() => useQuestionTransition());
    
    act(() => {
      result.current.startTransition('forward');
    });
    
    const initialClass = result.current.transitionClass;
    
    act(() => {
      result.current.startTransition('backward');
    });
    
    expect(result.current.transitionClass).toBe(initialClass);
  });

  it('cleans up timeouts on unmount', () => {
    const { result, unmount } = renderHook(() => useQuestionTransition());
    
    act(() => {
      result.current.startTransition('forward');
    });
    
    unmount();
    
    // Ensure no errors when timers try to run
    act(() => {
      jest.runAllTimers();
    });
  });
}); 