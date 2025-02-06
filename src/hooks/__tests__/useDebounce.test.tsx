/**
 * Tests for useDebounce hook
 */

import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';
import { mockMonitoring } from '../testing/mockMonitoring';

describe('useDebounce', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => 
      useDebounce('initial', 500)
    );

    expect(result.current).toBe('initial');
  });

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    // Update multiple times
    rerender({ value: 'update1' });
    rerender({ value: 'update2' });
    rerender({ value: 'final' });

    // Value shouldn't change yet
    expect(result.current).toBe('initial');

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('final');
  });

  it('should track performance metrics', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'update' });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'debounce_update',
      totalTime: 500,
      metadata: {
        value: 'update'
      }
    });
  });

  it('should cleanup on unmount', () => {
    const { unmount, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'update' });
    unmount();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should not update after unmount
    expect(mockMonitors.trackPerformance).not.toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'debounce_update'
      })
    );
  });
}); 