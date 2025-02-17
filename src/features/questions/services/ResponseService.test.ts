import { ResponseService } from './ResponseService';
import { mockFirestore } from '../../../mocks/mockFirestore';
import type { QuestionResponse, QuizResponse } from '../types/responses';

describe('ResponseService', () => {
  let responseService: ResponseService;

  beforeEach(() => {
    responseService = new ResponseService(mockFirestore);
  });

  describe('saveResponse', () => {
    it('should save a valid MC response', async () => {
      const response: QuestionResponse = {
        id: 'resp1',
        userId: 'user1',
        questionId: 'q1',
        timestamp: Date.now(),
        value: {
          type: 'MC',
          selectedOption: 'option1'
        },
        metadata: {
          confidence: 0.8,
          timeSpent: 5000
        },
        sessionId: 'session1',
        context: 'ONBOARDING'
      };

      const result = await responseService.saveResponse(response);
      expect(result.id).toBe('resp1');
    });

    it('should save a valid quiz response with correct/incorrect status', async () => {
      const response: QuizResponse = {
        id: 'resp2',
        userId: 'user1',
        questionId: 'q2',
        timestamp: Date.now(),
        value: {
          type: 'MC',
          selectedOption: 'option2'
        },
        correct: true,
        metadata: {
          confidence: 0.9,
          timeSpent: 3000
        },
        sessionId: 'session1',
        context: 'QUIZ'
      };

      const result = await responseService.saveResponse(response);
      expect(result.id).toBe('resp2');
      expect(result.correct).toBe(true);
    });

    it('should reject invalid response data', async () => {
      const invalidResponse = {
        id: 'resp3',
        // Missing required fields
      };

      await expect(responseService.saveResponse(invalidResponse as any))
        .rejects
        .toThrow('Invalid response data');
    });
  });

  describe('getResponsesBySession', () => {
    it('should retrieve all responses for a session', async () => {
      const responses = await responseService.getResponsesBySession('session1');
      expect(responses).toHaveLength(2);
      expect(responses[0].sessionId).toBe('session1');
    });

    it('should return empty array for non-existent session', async () => {
      const responses = await responseService.getResponsesBySession('nonexistent');
      expect(responses).toHaveLength(0);
    });
  });

  describe('getResponsesByUser', () => {
    it('should retrieve all responses for a user', async () => {
      const responses = await responseService.getResponsesByUser('user1');
      expect(responses.length).toBeGreaterThan(0);
      expect(responses[0].userId).toBe('user1');
    });
  });
}); 