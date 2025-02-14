import { validateSliderConfig, validateSliderQuestion } from '../slider';
import type { BaseSliderConfig, UnifiedSliderQuestion } from '../slider';

describe('Slider Type Validation', () => {
  describe('validateSliderConfig', () => {
    it('should validate a basic continuous slider config', () => {
      const config: BaseSliderConfig = {
        min: 0,
        max: 100,
        labels: {
          min: 'Start',
          max: 'End'
        }
      };
      expect(validateSliderConfig(config)).toBe(true);
    });

    it('should validate a segmented slider config', () => {
      const config: BaseSliderConfig = {
        min: 0,
        max: 2,
        step: 1,
        labels: {
          points: {
            0: 'Low',
            1: 'Medium',
            2: 'High'
          }
        }
      };
      expect(validateSliderConfig(config)).toBe(true);
    });

    it('should reject invalid min/max values', () => {
      const config: BaseSliderConfig = {
        min: 100,
        max: 0
      };
      expect(() => validateSliderConfig(config)).toThrow('Min must be less than max');
    });
  });

  describe('validateSliderQuestion', () => {
    it('should validate a complete slider question', () => {
      const question: UnifiedSliderQuestion = {
        id: 'test-1',
        type: 'SLIDER',
        mode: 'continuous',
        text: 'Test question',
        category: 'PERSONALITY',
        config: {
          min: 0,
          max: 100,
          labels: {
            min: 'Start',
            max: 'End'
          }
        }
      };
      expect(validateSliderQuestion(question)).toBe(true);
    });

    it('should require segments for segmented mode', () => {
      const question: UnifiedSliderQuestion = {
        id: 'test-2',
        type: 'SLIDER',
        mode: 'segmented',
        text: 'Test question',
        category: 'PERSONALITY',
        config: {
          min: 0,
          max: 2
        }
      };
      expect(() => validateSliderQuestion(question)).toThrow('Segmented slider requires segments');
    });
  });
}); 