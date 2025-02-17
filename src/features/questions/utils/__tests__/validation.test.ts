import { 
  validateQuestion, 
  validateResponse,
  ValidationError 
} from '../validation';
import type { MultipleChoiceQuestion, XYContinuumQuestion } from '../../types/questions';
import type { MultipleChoiceResponse, XYContinuumResponse } from '../../types/responses';

describe('Validation Utilities', () => {
  describe('validateQuestion', () => {
    it('should validate a valid multiple choice question', () => {
      const question: MultipleChoiceQuestion = {
        id: 'test1',
        type: 'MULTIPLE_CHOICE',
        prompt: 'Test question',
        options: ['A', 'B', 'C']
      };

      expect(() => validateQuestion(question)).not.toThrow();
    });

    it('should throw on invalid multiple choice question', () => {
      const invalid: MultipleChoiceQuestion = {
        id: 'test2',
        type: 'MULTIPLE_CHOICE',
        prompt: 'Test question',
        options: []
      };

      expect(() => validateQuestion(invalid)).toThrow(ValidationError);
    });
  });

  describe('validateResponse', () => {
    it('should validate a valid XY response', () => {
      const response: XYContinuumResponse = {
        id: 'resp1',
        userId: 'user1',
        questionId: 'q1',
        timestamp: new Date(),
        value: {
          type: 'XY_CONTINUUM',
          coordinates: { x: 0.5, y: 0.5 }
        },
        metadata: {
          timeToAnswer: 1000,
          interactionCount: 1,
          device: { type: 'desktop', input: 'mouse' }
        }
      };

      expect(() => validateResponse(response)).not.toThrow();
    });

    it('should throw on invalid XY coordinates', () => {
      const invalid: XYContinuumResponse = {
        id: 'resp2',
        userId: 'user1',
        questionId: 'q1',
        timestamp: new Date(),
        value: {
          type: 'XY_CONTINUUM',
          coordinates: { x: 1.5, y: 0.5 }
        },
        metadata: {
          timeToAnswer: 1000,
          interactionCount: 1,
          device: { type: 'desktop', input: 'mouse' }
        }
      };

      expect(() => validateResponse(invalid)).toThrow(ValidationError);
    });
  });
}); 