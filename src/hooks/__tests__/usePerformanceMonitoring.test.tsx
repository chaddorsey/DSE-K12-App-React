/**
 * Tests for usePerformanceMonitoring hook
 */

import { renderHook, act } from '../testing/renderHook';
import { usePerformanceMonitoring } from '../usePerformanceMonitoring';
import { mockMonitoring } from '../testing/mockMonitoring';

describe('usePerformanceMonitoring', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('render tracking', () => {
    it('should track initial render', () => {
      renderHook(() => usePerformanceMonitoring('TestComponent'));

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        type: 'render',
        component: 'TestComponent',
        totalTime: expect.any(Number),
        isInitial: true
      });
    });

    it('should track re-renders', () => {
      const { rerender } = renderHook(() => 
        usePerformanceMonitoring('TestComponent')
      );

      mockMonitors.trackPerformance.mockClear();
      rerender();

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        type: 'render',
        component: 'TestComponent',
        totalTime: expect.any(Number),
        isInitial: false
      });
    });

    it('should include custom tags', () => {
      renderHook(() => 
        usePerformanceMonitoring('TestComponent', {
          tags: { feature: 'test' }
        })
      );

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: expect.objectContaining({
            feature: 'test'
          })
        })
      );
    });
  });

  describe('interaction tracking', () => {
    it('should track interaction duration', async () => {
      const { result } = renderHook(() => 
        usePerformanceMonitoring('TestComponent')
      );

      await act(async () => {
        await result.current.trackInteraction('click', async () => {
          jest.advanceTimersByTime(100);
        });
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        type: 'interaction',
        component: 'TestComponent',
        interaction: 'click',
        totalTime: 100,
        success: true
      });
    });

    it('should track failed interactions', async () => {
      const { result } = renderHook(() => 
        usePerformanceMonitoring('TestComponent')
      );

      const error = new Error('test error');

      await act(async () => {
        try {
          await result.current.trackInteraction('click', async () => {
            jest.advanceTimersByTime(50);
            throw error;
          });
        } catch (e) {
          // Expected error
        }
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        type: 'interaction',
        component: 'TestComponent',
        interaction: 'click',
        totalTime: 50,
        success: false,
        error
      });
    });

    it('should support custom interaction metadata', async () => {
      const { result } = renderHook(() => 
        usePerformanceMonitoring('TestComponent')
      );

      await act(async () => {
        await result.current.trackInteraction('click', async () => {
          jest.advanceTimersByTime(100);
        }, {
          target: 'button',
          action: 'submit'
        });
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: expect.objectContaining({
            target: 'button',
            action: 'submit'
          })
        })
      );
    });
  });

  describe('performance marks', () => {
    it('should create performance marks', () => {
      const { result } = renderHook(() => 
        usePerformanceMonitoring('TestComponent')
      );

      act(() => {
        result.current.mark('test-mark');
      });

      expect(performance.mark).toHaveBeenCalledWith(
        'TestComponent:test-mark'
      );
    });

    it('should measure between marks', () => {
      const { result } = renderHook(() => 
        usePerformanceMonitoring('TestComponent')
      );

      act(() => {
        result.current.mark('start');
        jest.advanceTimersByTime(100);
        result.current.mark('end');
        result.current.measure('test', 'start', 'end');
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        type: 'measure',
        component: 'TestComponent',
        name: 'test',
        totalTime: 100
      });
    });
  });

  describe('cleanup', () => {
    it('should clear performance marks on unmount', () => {
      const { unmount } = renderHook(() => 
        usePerformanceMonitoring('TestComponent')
      );

      unmount();

      // Verify marks are cleared
      expect(performance.clearMarks).toHaveBeenCalled();
    });
  });
}); 