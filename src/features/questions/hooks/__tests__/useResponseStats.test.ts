import { renderHook } from '@testing-library/react-hooks';
import { useResponseStats } from '../useResponseStats';
import { useResponseUpdates } from '../useResponseUpdates';
import type { QuestionResponse } from '../../types/response';

jest.mock('../useResponseUpdates');

describe('useResponseStats', () => {
  const mockResponses: QuestionResponse[] = [
    {
      id: '1',
      questionId: 'test-xy',
      userId: 'user1',
      value: {
        type: 'XY',
        coordinates: { x: 0.2, y: 0.8 },
        interactions: [
          { type: 'move', position: { x: 0.1, y: 0.1 }, timestamp: 1000 },
          { type: 'move', position: { x: 0.2, y: 0.8 }, timestamp: 2000 }
        ]
      },
      metadata: {
        timeToAnswer: 2000,
        interactionCount: 2,
        confidence: 0.8,
        device: { type: 'desktop', input: 'mouse' }
      },
      timestamp: new Date(2023, 0, 1) as any
    },
    {
      id: '2',
      questionId: 'test-xy',
      userId: 'user2',
      value: {
        type: 'XY',
        coordinates: { x: 0.8, y: 0.2 },
        interactions: [
          { type: 'move', position: { x: 0.5, y: 0.5 }, timestamp: 1000 },
          { type: 'click', position: { x: 0.8, y: 0.2 }, timestamp: 1500 }
        ]
      },
      metadata: {
        timeToAnswer: 1500,
        interactionCount: 2,
        confidence: 0.9,
        device: { type: 'mobile', input: 'touch' }
      },
      timestamp: new Date(2023, 0, 2) as any
    }
  ];

  beforeEach(() => {
    (useResponseUpdates as jest.Mock).mockReturnValue({
      responses: mockResponses,
      loading: false,
      error: null
    });
  });

  it('calculates quadrant distribution', () => {
    const { result } = renderHook(() => useResponseStats('test-xy'));
    
    expect(result.current.quadrantStats).toEqual({
      'top-left': 1,    // First response
      'bottom-right': 1, // Second response
      'top-right': 0,
      'bottom-left': 0
    });
  });

  it('calculates interaction patterns', () => {
    const { result } = renderHook(() => useResponseStats('test-xy'));
    
    expect(result.current.interactionStats).toEqual({
      averageInteractions: 2,
      deviceTypes: {
        desktop: 1,
        mobile: 1
      },
      inputMethods: {
        mouse: 1,
        touch: 1
      }
    });
  });

  it('calculates time-based metrics', () => {
    const { result } = renderHook(() => useResponseStats('test-xy'));
    
    expect(result.current.timeStats).toEqual({
      averageTimeToAnswer: 1750, // (2000 + 1500) / 2
      responsesByHour: expect.any(Object),
      responsesByDay: expect.any(Object)
    });
  });

  it('handles empty responses', () => {
    (useResponseUpdates as jest.Mock).mockReturnValue({
      responses: [],
      loading: false,
      error: null
    });

    const { result } = renderHook(() => useResponseStats('test-xy'));
    
    expect(result.current.quadrantStats).toEqual({
      'top-left': 0,
      'top-right': 0,
      'bottom-left': 0,
      'bottom-right': 0
    });
    expect(result.current.interactionStats.averageInteractions).toBe(0);
  });

  it('updates stats when responses change', () => {
    const { result, rerender } = renderHook(() => useResponseStats('test-xy'));
    
    const newResponses = [...mockResponses, {
      id: '3',
      questionId: 'test-xy',
      userId: 'user3',
      value: {
        type: 'XY',
        coordinates: { x: 0.1, y: 0.1 },
        interactions: []
      },
      metadata: {
        timeToAnswer: 1000,
        interactionCount: 1,
        confidence: 0.7,
        device: { type: 'desktop', input: 'mouse' }
      },
      timestamp: new Date() as any
    }];

    (useResponseUpdates as jest.Mock).mockReturnValue({
      responses: newResponses,
      loading: false,
      error: null
    });

    rerender();

    expect(result.current.quadrantStats['bottom-left']).toBe(1);
    expect(result.current.interactionStats.deviceTypes.desktop).toBe(2);
  });
}); 