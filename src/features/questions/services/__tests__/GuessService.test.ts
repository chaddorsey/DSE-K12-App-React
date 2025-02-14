import { GuessService } from '../GuessService';
import { ResponseService } from '../ResponseService';
import { MetricsCalculator } from '../MetricsCalculator';
import { Timestamp, Firestore } from 'firebase/firestore';
import type { 
  GuessResponse, 
  QuestionResponse, 
  DeviceType,
  InputType,
  Device
} from '../../types';
import { db } from '@/config/firebase';

// Mock Firebase
const mockFirestore = {
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn()
};

jest.mock('@/config/firebase', () => ({
  db: mockFirestore
}));

jest.mock('../ResponseService', () => {
  return jest.fn().mockImplementation(() => ({
    getResponse: jest.fn()
  }));
});

jest.mock('../MetricsCalculator');

describe('GuessService', () => {
  let service: GuessService;
  let mockResponseService: jest.Mocked<ResponseService>;
  let mockMetricsCalculator: jest.Mocked<MetricsCalculator>;

  const mockDevice: Device = {
    type: 'desktop' as DeviceType,
    input: 'mouse' as InputType
  };

  const mockXYResponse: QuestionResponse = {
    id: 'r1',
    questionId: 'q1',
    userId: 'user1',
    value: {
      type: 'XY',
      coordinates: { x: 0.5, y: 0.5 },
      interactions: [
        {
          type: 'move',
          position: { x: 0.3, y: 0.3 },
          timestamp: Date.now()
        },
        {
          type: 'click',
          position: { x: 0.5, y: 0.5 },
          timestamp: Date.now()
        }
      ]
    },
    metadata: {
      timeToAnswer: 1000,
      interactionCount: 1,
      confidence: 0.8,
      device: mockDevice
    },
    timestamp: Timestamp.now()
  };

  const mockXYGuess: GuessResponse = {
    id: 'g1',
    questionId: 'q1',
    userId: 'user2',
    targetUserId: 'user1',
    value: {
      type: 'XY',
      coordinates: { x: 0.6, y: 0.4 },
      interactions: [
        {
          type: 'move',
          position: { x: 0.6, y: 0.4 },
          timestamp: Date.now()
        }
      ]
    },
    metadata: {
      timeToGuess: 2000,
      confidence: 0.8,
      device: { type: 'desktop', input: 'mouse' }
    },
    timestamp: Timestamp.now()
  };

  beforeEach(() => {
    mockResponseService = new ResponseService() as jest.Mocked<ResponseService>;
    mockMetricsCalculator = new MetricsCalculator() as jest.Mocked<MetricsCalculator>;
    service = new GuessService(mockResponseService, mockMetricsCalculator);
    
    // Reset mock implementations
    mockFirestore.collection.mockReturnValue({
      doc: jest.fn().mockReturnValue({
        get: jest.fn().mockResolvedValue({
          exists: () => true,
          data: () => ({
            accuracy: { distance: 0.5, score: 0.75 }
          })
        })
      })
    });
  });

  describe('submitGuess', () => {
    it('should validate and store a guess', async () => {
      mockResponseService.getResponse.mockResolvedValueOnce(mockXYResponse);
      
      const guessId = await service.submitGuess(
        'user2',
        'user1',
        'q1',
        {
          type: 'XY',
          coordinates: { x: 0.6, y: 0.4 },
          interactions: [
            {
              type: 'move',
              position: { x: 0.6, y: 0.4 },
              timestamp: Date.now()
            }
          ]
        },
        {
          timeToGuess: 2000,
          confidence: 0.8,
          device: { type: 'desktop', input: 'mouse' }
        }
      );

      expect(guessId).toBeTruthy();
    });

    it('should prevent guessing before target responds', async () => {
      mockResponseService.getResponse.mockResolvedValueOnce(null);
      
      await expect(service.submitGuess(
        'user2',
        'user1',
        'q1',
        {
          type: 'XY',
          coordinates: { x: 0.5, y: 0.5 },
          interactions: [
            {
              type: 'move',
              position: { x: 0.5, y: 0.5 },
              timestamp: Date.now()
            }
          ]
        },
        {
          timeToGuess: 1000,
          confidence: 0.5,
          device: mockDevice
        }
      )).rejects.toThrow('Target has not responded yet');
    });
  });

  describe('calculateAccuracy', () => {
    it('should calculate XY guess accuracy', async () => {
      const accuracy = await service.calculateAccuracy(mockXYGuess, mockXYResponse);
      
      expect(accuracy).toEqual({
        distance: 0.14142135623730953, // sqrt((0.6-0.5)^2 + (0.4-0.5)^2)
        score: expect.any(Number)
      });
      expect(accuracy.score).toBeGreaterThan(0);
      expect(accuracy.score).toBeLessThanOrEqual(1);
    });

    it('should calculate multiple choice accuracy', async () => {
      const mcResponse: QuestionResponse = {
        ...mockXYResponse,
        value: { type: 'MULTIPLE_CHOICE', selectedOption: 'A' }
      };
      const mcGuess: GuessResponse = {
        ...mockXYGuess,
        value: { type: 'MULTIPLE_CHOICE', selectedOption: 'A' }
      };

      const accuracy = await service.calculateAccuracy(mcGuess, mcResponse);
      
      expect(accuracy).toEqual({
        correct: true,
        score: 1
      });
    });
  });

  describe('revealGuess', () => {
    it('should reveal guess only after target responds', async () => {
      mockResponseService.getResponse.mockResolvedValueOnce(mockXYResponse);
      
      const guess = await service.revealGuess('g1', 'user1');
      expect(guess).toBeTruthy();
    });

    it('should not reveal guess before target responds', async () => {
      mockResponseService.getResponse.mockResolvedValueOnce(null);
      
      await expect(service.revealGuess('g1', 'user1'))
        .rejects.toThrow('Cannot reveal guess before target responds');
    });
  });

  describe('getGuessesForQuestion', () => {
    it('should return all guesses for a question and target', async () => {
      const guesses = await service.getGuessesForQuestion('q1', 'user1');
      expect(Array.isArray(guesses)).toBe(true);
    });

    it('should only return guesses after target response', async () => {
      mockResponseService.getResponse.mockResolvedValueOnce(mockXYResponse);
      
      const guesses = await service.getGuessesForQuestion('q1', 'user1');
      guesses.forEach(guess => {
        expect(guess.accuracy).toBeDefined();
      });
    });
  });
}); 