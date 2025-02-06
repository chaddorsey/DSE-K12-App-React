/**
 * Tests for useErrorBoundary hook
 */

import { renderHook, act } from '../testing/renderHook';
import { useErrorBoundary } from '../useErrorBoundary';
import { mockMonitoring } from '../testing/mockMonitoring';

describe('useErrorBoundary', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('error handling', () => {
    it('should track errors with monitoring', () => {
      const { result } = renderHook(() => useErrorBoundary('TestComponent'));
      const error = new Error('test error');

      act(() => {
        result.current.reportError(error);
      });

      expect(mockMonitors.trackError).toHaveBeenCalledWith(error, {
        component: 'TestComponent',
        handled: true
      });
    });

    it('should support error recovery', async () => {
      const { result } = renderHook(() => useErrorBoundary('TestComponent'));
      const onRecovery = jest.fn();

      act(() => {
        result.current.reportError(new Error('test'), {
          recoveryAction: onRecovery
        });
      });

      await act(async () => {
        await result.current.recover();
      });

      expect(onRecovery).toHaveBeenCalled();
      expect(result.current.error).toBeNull();
    });

    it('should track recovery attempts', async () => {
      const { result } = renderHook(() => useErrorBoundary('TestComponent'));
      const error = new Error('test');

      act(() => {
        result.current.reportError(error);
      });

      await act(async () => {
        await result.current.recover();
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        type: 'error_recovery',
        component: 'TestComponent',
        success: true,
        error,
        totalTime: expect.any(Number)
      });
    });
  });

  describe('error state', () => {
    it('should maintain error state', () => {
      const { result } = renderHook(() => useErrorBoundary('TestComponent'));
      const error = new Error('test error');

      act(() => {
        result.current.reportError(error);
      });

      expect(result.current.error).toBe(error);
      expect(result.current.hasError).toBe(true);
    });

    it('should clear error state on recovery', async () => {
      const { result } = renderHook(() => useErrorBoundary('TestComponent'));

      act(() => {
        result.current.reportError(new Error('test'));
      });

      await act(async () => {
        await result.current.recover();
      });

      expect(result.current.error).toBeNull();
      expect(result.current.hasError).toBe(false);
    });
  });

  describe('error context', () => {
    it('should capture error context', () => {
      const { result } = renderHook(() => useErrorBoundary('TestComponent'));
      const error = new Error('test error');
      const context = { action: 'save', data: { id: 1 } };

      act(() => {
        result.current.reportError(error, { context });
      });

      expect(mockMonitors.trackError).toHaveBeenCalledWith(error, {
        component: 'TestComponent',
        handled: true,
        context
      });
    });

    it('should support fallback UI', () => {
      const { result } = renderHook(() => useErrorBoundary('TestComponent'));
      const fallback = <div>Error occurred</div>;

      act(() => {
        result.current.reportError(new Error('test'), { fallback });
      });

      expect(result.current.fallback).toBe(fallback);
    });
  });

  describe('error boundary integration', () => {
    it('should integrate with error boundary lifecycle', () => {
      const { result } = renderHook(() => useErrorBoundary('TestComponent'), {
        errorBoundary: true
      });

      const error = new Error('boundary error');
      
      act(() => {
        // Simulate error boundary catching error
        result.current.onError(error);
      });

      expect(result.current.error).toBe(error);
      expect(mockMonitors.trackError).toHaveBeenCalledWith(error, {
        component: 'TestComponent',
        source: 'error_boundary',
        handled: true
      });
    });

    it('should reset when error boundary resets', () => {
      const { result } = renderHook(() => useErrorBoundary('TestComponent'), {
        errorBoundary: true
      });

      act(() => {
        result.current.reportError(new Error('test'));
      });

      act(() => {
        // Simulate error boundary reset
        result.current.onReset();
      });

      expect(result.current.error).toBeNull();
      expect(result.current.hasError).toBe(false);
    });
  });
}); 