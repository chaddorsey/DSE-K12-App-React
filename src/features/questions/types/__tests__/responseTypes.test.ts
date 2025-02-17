import { 
  BaseResponse,
  QuestionResponse,
  MultipleChoiceResponse,
  OpenResponseResponse,
  NumericResponse,
  SliderResponse,
  SegmentedSliderResponse,
  XYContinuumResponse
} from '../responses';

describe('Response Types', () => {
  describe('BaseResponse', () => {
    it('should validate a base response structure', () => {
      const response: BaseResponse = {
        id: 'resp1',
        userId: 'user1',
        questionId: 'q1',
        timestamp: new Date(),
        metadata: {
          timeToAnswer: 1500,
          interactionCount: 2,
          device: {
            type: 'desktop',
            input: 'mouse'
          }
        }
      };

      expect(response.id).toBeTruthy();
      expect(response.metadata.timeToAnswer).toBeGreaterThan(0);
    });
  });

  describe('MultipleChoiceResponse', () => {
    it('should validate a multiple choice response', () => {
      const response: MultipleChoiceResponse = {
        id: 'resp1',
        userId: 'user1',
        questionId: 'q1',
        timestamp: new Date(),
        value: {
          type: 'MULTIPLE_CHOICE',
          selectedOption: 'Learning'
        },
        metadata: {
          timeToAnswer: 1500,
          interactionCount: 1,
          device: {
            type: 'desktop',
            input: 'mouse'
          }
        }
      };

      expect(response.value.type).toBe('MULTIPLE_CHOICE');
      expect(response.value.selectedOption).toBeTruthy();
    });
  });

  describe('XYContinuumResponse', () => {
    it('should validate an XY continuum response', () => {
      const response: XYContinuumResponse = {
        id: 'resp1',
        userId: 'user1',
        questionId: 'q1',
        timestamp: new Date(),
        value: {
          type: 'XY_CONTINUUM',
          coordinates: { x: 0.5, y: 0.7 }
        },
        metadata: {
          timeToAnswer: 2500,
          interactionCount: 3,
          device: {
            type: 'desktop',
            input: 'mouse'
          }
        }
      };

      expect(response.value.type).toBe('XY_CONTINUUM');
      expect(response.value.coordinates.x).toBeGreaterThanOrEqual(0);
      expect(response.value.coordinates.x).toBeLessThanOrEqual(1);
      expect(response.value.coordinates.y).toBeGreaterThanOrEqual(0);
      expect(response.value.coordinates.y).toBeLessThanOrEqual(1);
    });

    it('should validate coordinate bounds', () => {
      // @ts-expect-error - Invalid x coordinate
      const invalid1: XYContinuumResponse = {
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
    });
  });
}); 