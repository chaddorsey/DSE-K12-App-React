import { MetricsCalculator } from '../MetricsCalculator';
import type { QuestionResponse, XYResponseValue } from '../../types/response';

describe('MetricsCalculator', () => {
  const calculator = new MetricsCalculator();

  const mockXYResponses: QuestionResponse[] = [
    {
      id: '1',
      questionId: 'q1',
      userId: 'u1',
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
      timestamp: new Date(2023, 0, 1)
    },
    {
      id: '2',
      questionId: 'q1',
      userId: 'u2',
      value: {
        type: 'XY',
        coordinates: { x: 0.8, y: 0.2 },
        interactions: [
          { type: 'move', position: { x: 0.5, y: 0.5 }, timestamp: 1000 },
          { type: 'move', position: { x: 0.8, y: 0.2 }, timestamp: 3000 }
        ]
      },
      metadata: {
        timeToAnswer: 3000,
        interactionCount: 2,
        confidence: 0.9,
        device: { type: 'mobile', input: 'touch' }
      },
      timestamp: new Date(2023, 0, 1)
    }
  ];

  describe('XY Metrics', () => {
    it('calculates core distribution metrics', () => {
      const metrics = calculator.calculateMetrics(mockXYResponses);
      
      expect(metrics).toMatchObject({
        questionId: 'q1',
        totalResponses: 2,
        xyMetrics: {
          distribution: {
            quadrants: {
              'top-left': 1,
              'bottom-right': 1,
              'top-right': 0,
              'bottom-left': 0
            },
            grid: {
              '1,4': 1,  // 0.2, 0.8
              '4,1': 1   // 0.8, 0.2
            }
          },
          average: {
            x: 0.5,
            y: 0.5
          }
        },
        userResponses: [
          {
            userId: 'u1',
            response: {
              value: { x: 0.2, y: 0.8 },
              timestamp: expect.any(Date)
            }
          },
          {
            userId: 'u2',
            response: {
              value: { x: 0.8, y: 0.2 },
              timestamp: expect.any(Date)
            }
          }
        ]
      });
    });
  });

  describe('Multiple Choice Metrics', () => {
    it('calculates option distribution', () => {
      const metrics = calculator.calculateMetrics(mockMultipleChoiceResponses);
      
      expect(metrics).toMatchObject({
        questionId: 'q1',
        totalResponses: 2,
        multipleChoiceMetrics: {
          optionCounts: {
            'A': 1,
            'B': 1
          }
        },
        userResponses: expect.arrayContaining([
          expect.objectContaining({
            userId: expect.any(String),
            response: {
              value: expect.any(String),
              timestamp: expect.any(Date)
            }
          })
        ])
      });
    });
  });
}); 