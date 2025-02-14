import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { XYResponseVisualization } from '../XYResponseVisualization';
import { useResponseUpdates } from '../../hooks/useResponseUpdates';
import type { QuestionResponse } from '../../types/response';

jest.mock('../../hooks/useResponseUpdates');

describe('XYResponseVisualization', () => {
  const mockResponses: QuestionResponse[] = [
    {
      id: '1',
      questionId: 'test-xy',
      userId: 'user1',
      value: {
        type: 'XY',
        coordinates: { x: 0.2, y: 0.8 },
        interactions: []
      },
      metadata: {
        timeToAnswer: 1000,
        interactionCount: 1,
        confidence: 0.8,
        device: { type: 'desktop', input: 'mouse' }
      },
      timestamp: new Date() as any
    },
    {
      id: '2',
      questionId: 'test-xy',
      userId: 'user2',
      value: {
        type: 'XY',
        coordinates: { x: 0.8, y: 0.2 },
        interactions: []
      },
      metadata: {
        timeToAnswer: 2000,
        interactionCount: 2,
        confidence: 0.9,
        device: { type: 'desktop', input: 'mouse' }
      },
      timestamp: new Date() as any
    }
  ];

  beforeEach(() => {
    (useResponseUpdates as jest.Mock).mockReturnValue({
      responses: mockResponses,
      loading: false,
      error: null
    });
  });

  it('renders heatmap of responses', () => {
    render(<XYResponseVisualization questionId="test-xy" />);
    
    const heatmap = screen.getByTestId('response-heatmap');
    expect(heatmap).toBeInTheDocument();
    
    // Check for response points
    mockResponses.forEach(response => {
      const { x, y } = (response.value as any).coordinates;
      const point = screen.getByTestId(`response-point-${response.id}`);
      expect(point).toHaveStyle({
        left: `${x * 100}%`,
        top: `${y * 100}%`
      });
    });
  });

  it('shows loading state', () => {
    (useResponseUpdates as jest.Mock).mockReturnValue({
      responses: [],
      loading: true,
      error: null
    });

    render(<XYResponseVisualization questionId="test-xy" />);
    expect(screen.getByTestId('visualization-loading')).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useResponseUpdates as jest.Mock).mockReturnValue({
      responses: [],
      loading: false,
      error: new Error('Failed to load responses')
    });

    render(<XYResponseVisualization questionId="test-xy" />);
    expect(screen.getByText(/failed to load responses/i)).toBeInTheDocument();
  });

  it('updates visualization when new responses arrive', () => {
    const { rerender } = render(<XYResponseVisualization questionId="test-xy" />);
    
    const newResponses = [
      ...mockResponses,
      {
        id: '3',
        questionId: 'test-xy',
        userId: 'user3',
        value: {
          type: 'XY',
          coordinates: { x: 0.5, y: 0.5 },
          interactions: []
        },
        metadata: {
          timeToAnswer: 1500,
          interactionCount: 1,
          confidence: 0.7,
          device: { type: 'desktop', input: 'mouse' }
        },
        timestamp: new Date() as any
      }
    ];

    act(() => {
      (useResponseUpdates as jest.Mock).mockReturnValue({
        responses: newResponses,
        loading: false,
        error: null
      });
      rerender(<XYResponseVisualization questionId="test-xy" />);
    });

    expect(screen.getAllByTestId(/response-point/)).toHaveLength(3);
  });

  it('calculates and displays response density', () => {
    render(<XYResponseVisualization questionId="test-xy" />);
    
    const heatmap = screen.getByTestId('response-heatmap');
    const densityOverlay = within(heatmap).getByTestId('density-overlay');
    
    expect(densityOverlay).toHaveStyle({
      background: expect.stringContaining('rgba')
    });
  });
}); 