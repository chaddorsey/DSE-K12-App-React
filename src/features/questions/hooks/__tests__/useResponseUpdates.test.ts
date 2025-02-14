import { renderHook } from '@testing-library/react-hooks';
import { useResponseUpdates } from '../useResponseUpdates';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { act } from '@testing-library/react-hooks';
import type { QuestionResponse } from '../../types/response';

jest.mock('firebase/firestore');
jest.mock('@/config/firebase', () => ({
  db: {}
}));

describe('useResponseUpdates', () => {
  const mockOnSnapshot = jest.fn();
  const mockUnsubscribe = jest.fn();

  beforeEach(() => {
    (collection as jest.Mock).mockReturnValue({});
    (query as jest.Mock).mockReturnValue({});
    (onSnapshot as jest.Mock).mockImplementation((query, callback) => {
      mockOnSnapshot(callback);
      return mockUnsubscribe;
    });
  });

  it('should subscribe to response updates', () => {
    renderHook(() => useResponseUpdates('test-question'));
    expect(mockOnSnapshot).toHaveBeenCalled();
  });

  it('should handle incoming responses', () => {
    const { result } = renderHook(() => useResponseUpdates('test-question'));

    const mockSnapshot = {
      docs: [
        {
          id: 'response-1',
          data: () => ({
            questionId: 'test-question',
            value: { type: 'XY', coordinates: { x: 0.5, y: 0.5 } },
            timestamp: new Date()
          })
        }
      ]
    };

    mockOnSnapshot.mock.calls[0][0](mockSnapshot);

    expect(result.current.responses).toHaveLength(1);
    expect(result.current.loading).toBe(false);
  });

  it('should handle errors', () => {
    const { result } = renderHook(() => useResponseUpdates('test-question'));
    
    mockOnSnapshot.mock.calls[0][1](new Error('Update failed'));

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe('Update failed');
  });

  it('should unsubscribe on unmount', () => {
    const { unmount } = renderHook(() => useResponseUpdates('test-question'));
    
    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it('should handle empty snapshots', () => {
    const { result } = renderHook(() => useResponseUpdates('test-question'));
    
    const emptySnapshot = { docs: [] };
    act(() => {
      mockOnSnapshot.mock.calls[0][0](emptySnapshot);
    });

    expect(result.current.responses).toHaveLength(0);
    expect(result.current.loading).toBe(false);
  });

  it('should handle invalid response data', () => {
    const { result } = renderHook(() => useResponseUpdates('test-question'));
    
    const invalidSnapshot = {
      docs: [
        {
          id: 'response-1',
          data: () => ({
            questionId: 'test-question',
            // Missing required fields
            timestamp: new Date()
          })
        }
      ]
    };

    act(() => {
      mockOnSnapshot.mock.calls[0][0](invalidSnapshot);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toContain('Invalid response data');
  });

  it('should handle response ordering correctly', () => {
    const { result } = renderHook(() => useResponseUpdates('test-question'));
    
    const now = new Date();
    const responses = [
      {
        id: 'response-1',
        data: () => ({
          questionId: 'test-question',
          value: { type: 'XY', coordinates: { x: 0.5, y: 0.5 } },
          timestamp: new Date(now.getTime() - 1000)
        })
      },
      {
        id: 'response-2',
        data: () => ({
          questionId: 'test-question',
          value: { type: 'XY', coordinates: { x: 0.3, y: 0.7 } },
          timestamp: now
        })
      }
    ];

    act(() => {
      mockOnSnapshot.mock.calls[0][0]({ docs: responses });
    });

    expect(result.current.responses[0].id).toBe('response-2');
  });

  it('should limit responses correctly', () => {
    const { result } = renderHook(() => useResponseUpdates('test-question', 2));
    
    const responses = Array.from({ length: 5 }, (_, i) => ({
      id: `response-${i}`,
      data: () => ({
        questionId: 'test-question',
        value: { type: 'XY', coordinates: { x: 0.5, y: 0.5 } },
        timestamp: new Date()
      })
    }));

    act(() => {
      mockOnSnapshot.mock.calls[0][0]({ docs: responses });
    });

    expect(result.current.responses).toHaveLength(2);
  });
}); 