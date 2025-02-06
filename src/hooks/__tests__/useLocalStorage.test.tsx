/**
 * Tests for useLocalStorage hook
 */

import { renderHook, act } from '../testing/renderHook';
import { useLocalStorage } from '../useLocalStorage';
import { mockMonitoring } from '../testing/mockMonitoring';

describe('useLocalStorage', () => {
  const mockMonitors = mockMonitoring();
  
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('basic functionality', () => {
    it('should get initial value from localStorage', () => {
      localStorage.setItem('test-key', JSON.stringify('stored value'));
      
      const { result } = renderHook(() => 
        useLocalStorage('test-key', 'default')
      );

      expect(result.current[0]).toBe('stored value');
    });

    it('should use default value if nothing in storage', () => {
      const { result } = renderHook(() => 
        useLocalStorage('test-key', 'default')
      );

      expect(result.current[0]).toBe('default');
    });

    it('should update value in localStorage', () => {
      const { result } = renderHook(() => 
        useLocalStorage('test-key', 'initial')
      );

      act(() => {
        result.current[1]('updated');
      });

      expect(result.current[0]).toBe('updated');
      expect(JSON.parse(localStorage.getItem('test-key')!)).toBe('updated');
    });
  });

  describe('error handling', () => {
    it('should handle invalid JSON in storage', () => {
      localStorage.setItem('test-key', 'invalid json');
      
      const { result } = renderHook(() => 
        useLocalStorage('test-key', 'default')
      );

      expect(result.current[0]).toBe('default');
      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          operation: 'storage_read',
          key: 'test-key'
        })
      );
    });

    it('should handle storage errors', () => {
      const error = new Error('Storage quota exceeded');
      jest.spyOn(localStorage, 'setItem').mockImplementation(() => {
        throw error;
      });

      const { result } = renderHook(() => 
        useLocalStorage('test-key', 'initial')
      );

      act(() => {
        result.current[1]('updated');
      });

      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        error,
        expect.objectContaining({
          operation: 'storage_write',
          key: 'test-key'
        })
      );
    });
  });

  describe('type safety', () => {
    it('should handle complex objects', () => {
      type TestType = { name: string; count: number };
      const initial: TestType = { name: 'test', count: 0 };

      const { result } = renderHook(() => 
        useLocalStorage<TestType>('test-key', initial)
      );

      act(() => {
        result.current[1]({ name: 'updated', count: 1 });
      });

      expect(result.current[0]).toEqual({ name: 'updated', count: 1 });
    });

    it('should validate stored data against schema', () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
          count: { type: 'number' }
        },
        required: ['name', 'count']
      };

      localStorage.setItem('test-key', JSON.stringify({ 
        name: 'test',
        count: 'invalid' // Should be number
      }));

      const { result } = renderHook(() => 
        useLocalStorage('test-key', { name: 'default', count: 0 }, { schema })
      );

      expect(result.current[0]).toEqual({ name: 'default', count: 0 });
      expect(mockMonitors.trackError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          operation: 'storage_validation',
          key: 'test-key'
        })
      );
    });
  });

  describe('sync between tabs', () => {
    it('should update when storage changes in another tab', () => {
      const { result } = renderHook(() => 
        useLocalStorage('test-key', 'initial')
      );

      // Simulate storage event from another tab
      act(() => {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('updated')
        }));
      });

      expect(result.current[0]).toBe('updated');
    });

    it('should track sync events', () => {
      renderHook(() => useLocalStorage('test-key', 'initial'));

      act(() => {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('updated')
        }));
      });

      expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
        type: 'storage_sync',
        key: 'test-key',
        success: true
      });
    });
  });
}); 