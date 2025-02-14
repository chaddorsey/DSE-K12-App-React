import { MetricsCalculator } from '../MetricsCalculator';
import { Timestamp } from 'firebase/firestore';
import type { 
  QuestionResponse, 
  GuessResponse,
  Device,
  MultipleChoiceValue,
  XYValue 
} from '../../types';

describe('MetricsCalculator', () => {
  let calculator: MetricsCalculator;

  const mockDevice: Device = {
    type: 'desktop' as const,
    input: 'mouse' as const
  };

  const mockMetadata = {
    timeToAnswer: 1000,
    interactionCount: 1,
    confidence: 0.8,
    device: mockDevice
  };

  const mockXYValue: XYValue = {
    type: 'XY',
    coordinates: { x: 0.5, y: 0.5 },
    interactions: [
      { 
        type: 'move' as const, 
        position: { x: 0.3, y: 0.3 }, 
        timestamp: Date.now() 
      }
    ]
  };

  const mockXYResponse: QuestionResponse = {
    id: 'r1',
    questionId: 'q1',
    userId: 'user1',
    value: mockXYValue,
    metadata: mockMetadata,
    timestamp: Timestamp.now()
  };

  const mockXYResponses: QuestionResponse[] = [
    {
      id: '1',
      questionId: 'q1',
      userId: 'u1',
      value: {
        type: 'XY',
        coordinates: { x: 0.2, y: 0.8 },
        interactions: [
          { type: 'move' as const, position: { x: 0.1, y: 0.1 }, timestamp: Date.now() },
          { type: 'move' as const, position: { x: 0.2, y: 0.8 }, timestamp: Date.now() }
        ]
      },
      metadata: mockMetadata,
      timestamp: Timestamp.now()
    },
    {
      id: '2',
      questionId: 'q1',
      userId: 'u2',
      value: {
        type: 'XY',
        coordinates: { x: 0.8, y: 0.2 },
        interactions: [
          { type: 'move' as const, position: { x: 0.5, y: 0.5 }, timestamp: Date.now() },
          { type: 'move' as const, position: { x: 0.8, y: 0.2 }, timestamp: Date.now() }
        ]
      },
      metadata: {
        ...mockMetadata,
        confidence: 0.9,
        device: { type: 'mobile' as const, input: 'touch' as const }
      },
      timestamp: Timestamp.now()
    }
  ];

  const mockMultipleChoiceValue: MultipleChoiceValue = {
    type: 'MULTIPLE_CHOICE',
    selectedOption: 'A',
    interactions: [
      { 
        type: 'click' as const, 
        position: { x: 0.5, y: 0.5 }, 
        timestamp: Date.now() 
      }
    ]
  };

  const mockMultipleChoiceResponses: QuestionResponse[] = [
    {
      id: '1',
      questionId: 'q1',
      userId: 'u1',
      value: {
        ...mockMultipleChoiceValue
      },
      metadata: mockMetadata,
      timestamp: Timestamp.now()
    },
    {
      id: '2',
      questionId: 'q1',
      userId: 'u2',
      value: {
        ...mockMultipleChoiceValue,
        selectedOption: 'B'
      },
      metadata: mockMetadata,
      timestamp: Timestamp.now()
    }
  ];

  beforeEach(() => {
    calculator = new MetricsCalculator();
  });

  it('calculates response metrics correctly', () => {
    const metrics = calculator.calculateResponseMetrics(mockXYResponse);
    expect(metrics.accuracy).toBeDefined();
    expect(metrics.confidence).toBe(0.8);
    expect(metrics.timeToAnswer).toBe(1000);
  });

  describe('XY Metrics', () => {
    it('calculates distribution metrics', () => {
      const metrics = calculator.calculateQuestionMetrics(mockXYResponses);
      
      expect(metrics).toMatchObject({
        questionId: 'q1',
        totalResponses: 2,
        distribution: {
          'top-left': 1,
          'bottom-right': 1
        },
        guessAccuracy: {
          averageScore: 0,
          distribution: {}
        },
        timeStats: {
          averageResponseTime: expect.any(Number),
          averageGuessTime: 0
        }
      });
    });

    it('calculates response accuracy', () => {
      const metrics = calculator.calculateResponseMetrics(mockXYResponse);
      expect(metrics).toMatchObject({
        accuracy: expect.any(Number),
        confidence: 0.8,
        timeToAnswer: 1000,
        interactionCount: 1,
        deviceType: 'desktop'
      });
    });
  });

  describe('Multiple Choice Metrics', () => {
    it('calculates option distribution', () => {
      const metrics = calculator.calculateQuestionMetrics(mockMultipleChoiceResponses);
      
      expect(metrics).toMatchObject({
        questionId: 'q1',
        totalResponses: 2,
        distribution: {
          'A': 1,
          'B': 1
        },
        guessAccuracy: {
          averageScore: 0,
          distribution: {}
        },
        timeStats: {
          averageResponseTime: expect.any(Number),
          averageGuessTime: 0
        }
      });
    });
  });

  it('calculates question metrics correctly', () => {
    const metrics = calculator.calculateQuestionMetrics(mockXYResponses);
    expect(metrics).toMatchObject({
      questionId: 'q1',
      totalResponses: mockXYResponses.length,
      distribution: expect.any(Object),
      guessAccuracy: {
        averageScore: 0,
        distribution: {}
      },
      timeStats: {
        averageResponseTime: expect.any(Number),
        averageGuessTime: 0
      }
    });
  });
}); 