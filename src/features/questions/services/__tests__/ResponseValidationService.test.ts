import { ResponseValidationService } from '../ResponseValidationService';
import { ResponseValidationError } from '../types/errors';
import { Timestamp } from 'firebase/firestore';
import type { QuestionResponse, Device } from '../../types';

describe('ResponseValidationService', () => {
  let service: ResponseValidationService;
  
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

  const validXYResponse: QuestionResponse = {
    id: 'test-id',
    questionId: 'q1',
    userId: 'user1',
    value: {
      type: 'XY',
      coordinates: { x: 0.5, y: 0.5 },
      interactions: [
        {
          type: 'move' as const,
          position: { x: 0.3, y: 0.3 },
          timestamp: Date.now()
        }
      ]
    },
    metadata: mockMetadata,
    timestamp: Timestamp.now()
  };

  beforeEach(() => {
    service = new ResponseValidationService();
  });

  it('validates valid XY response', () => {
    expect(() => service.validateResponse(validXYResponse)).not.toThrow();
  });

  describe('XY Response Validation', () => {
    it('rejects invalid coordinates', () => {
      const invalid = {
        ...validXYResponse,
        value: {
          ...validXYResponse.value,
          coordinates: { x: 1.5, y: 0.5 }
        }
      };
      expect(() => service.validateResponse(invalid)).toThrow(ResponseValidationError);
    });

    it('validates interaction timestamps', () => {
      const invalid = {
        ...validXYResponse,
        value: {
          ...validXYResponse.value,
          interactions: [
            { 
              type: 'move' as const, 
              position: { x: 0.5, y: 0.5 }, 
              timestamp: 'invalid' as any 
            }
          ]
        }
      };
      expect(() => service.validateResponse(invalid)).toThrow(ResponseValidationError);
    });
  });

  describe('Multiple Choice Validation', () => {
    const validMultipleChoiceResponse: QuestionResponse = {
      ...validXYResponse,
      value: {
        type: 'MULTIPLE_CHOICE',
        selectedOption: 'A',
        interactions: [
          {
            type: 'click' as const,
            position: { x: 0.5, y: 0.5 },
            timestamp: Date.now()
          }
        ]
      }
    };

    it('validates valid multiple choice response', () => {
      expect(() => service.validateResponse(validMultipleChoiceResponse)).not.toThrow();
    });

    it('rejects empty option selection', () => {
      const invalid = {
        ...validMultipleChoiceResponse,
        value: {
          ...validMultipleChoiceResponse.value,
          selectedOption: ''
        }
      };
      expect(() => service.validateResponse(invalid)).toThrow(ResponseValidationError);
    });

    it('validates interaction types', () => {
      const invalid = {
        ...validMultipleChoiceResponse,
        value: {
          ...validMultipleChoiceResponse.value,
          interactions: [
            { 
              type: 'invalid' as const, 
              position: { x: 0.5, y: 0.5 }, 
              timestamp: Date.now() 
            }
          ]
        }
      };
      expect(() => service.validateResponse(invalid)).toThrow(ResponseValidationError);
    });
  });

  describe('Metadata Validation', () => {
    it('validates response time limits', () => {
      const invalid = {
        ...validXYResponse,
        metadata: {
          ...validXYResponse.metadata,
          timeToAnswer: 600000 // 10 minutes
        }
      };
      expect(() => service.validateResponse(invalid)).toThrow(ResponseValidationError);
    });

    it('validates device information', () => {
      const invalid = {
        ...validXYResponse,
        metadata: {
          ...validXYResponse.metadata,
          device: { 
            type: 'invalid' as const, 
            input: 'mouse' as const 
          }
        }
      };
      expect(() => service.validateResponse(invalid)).toThrow(ResponseValidationError);
    });
  });
}); 