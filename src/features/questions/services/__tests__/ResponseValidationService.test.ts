import { ResponseValidationService } from '../ResponseValidationService';
import type { QuestionResponse } from '../../types/response';

describe('ResponseValidationService', () => {
  let service: ResponseValidationService;

  beforeEach(() => {
    service = new ResponseValidationService();
  });

  describe('XY Response Validation', () => {
    const validXYResponse: QuestionResponse = {
      id: 'test-1',
      questionId: 'q1',
      userId: 'user1',
      value: {
        type: 'XY',
        coordinates: { x: 0.5, y: 0.5 },
        interactions: [
          { type: 'move', position: { x: 0.3, y: 0.3 }, timestamp: 1000 }
        ]
      },
      metadata: {
        timeToAnswer: 2000,
        interactionCount: 1,
        confidence: 0.8,
        device: { type: 'desktop', input: 'mouse' }
      },
      timestamp: new Date()
    };

    it('validates correct XY response', () => {
      expect(() => service.validateResponse(validXYResponse)).not.toThrow();
    });

    it('rejects invalid coordinates', () => {
      const invalid = {
        ...validXYResponse,
        value: {
          ...validXYResponse.value,
          coordinates: { x: 1.5, y: 0.5 }
        }
      };
      expect(() => service.validateResponse(invalid)).toThrow();
    });

    it('validates interaction timestamps', () => {
      const invalid = {
        ...validXYResponse,
        value: {
          ...validXYResponse.value,
          interactions: [{ type: 'move', position: { x: 0.5, y: 0.5 }, timestamp: 'invalid' }]
        }
      };
      expect(() => service.validateResponse(invalid)).toThrow();
    });
  });

  describe('Multiple Choice Validation', () => {
    // Similar tests for multiple choice responses
  });

  describe('Metadata Validation', () => {
    it('validates response time limits', () => {
      const invalid = {
        ...validResponse,
        metadata: {
          ...validResponse.metadata,
          timeToAnswer: 600000 // 10 minutes
        }
      };
      expect(() => service.validateResponse(invalid)).toThrow();
    });

    it('validates device information', () => {
      const invalid = {
        ...validResponse,
        metadata: {
          ...validResponse.metadata,
          device: { type: 'invalid', input: 'mouse' }
        }
      };
      expect(() => service.validateResponse(invalid)).toThrow();
    });
  });
}); 