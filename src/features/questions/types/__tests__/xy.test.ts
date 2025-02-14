import { validateXYConfig, validateXYQuestion } from '../xy';
import type { XYConfig, XYQuestion } from '../xy';
import { QuestionCategory } from '../question';

describe('XY Question Type Validation', () => {
  describe('validateXYConfig', () => {
    it('should validate a basic XY config', () => {
      const config: XYConfig = {
        xAxis: {
          min: 0,
          max: 100,
          labels: {
            min: 'Left',
            max: 'Right'
          }
        },
        yAxis: {
          min: 0,
          max: 100,
          labels: {
            min: 'Bottom',
            max: 'Top'
          }
        }
      };
      expect(validateXYConfig(config)).toBe(true);
    });

    it('should validate config with linked questions', () => {
      const config: XYConfig = {
        xAxis: {
          min: 0,
          max: 100,
          questionId: 'slider-1',
          labels: {
            min: 'Left',
            max: 'Right'
          }
        },
        yAxis: {
          min: 0,
          max: 100,
          questionId: 'slider-2',
          labels: {
            min: 'Bottom',
            max: 'Top'
          }
        }
      };
      expect(validateXYConfig(config)).toBe(true);
    });

    it('should reject invalid axis configuration', () => {
      const config: XYConfig = {
        xAxis: {
          min: 100,
          max: 0,
          labels: {
            min: 'Left',
            max: 'Right'
          }
        },
        yAxis: {
          min: 0,
          max: 100,
          labels: {
            min: 'Bottom',
            max: 'Top'
          }
        }
      };
      expect(() => validateXYConfig(config)).toThrow('X-axis min must be less than max');
    });
  });

  describe('validateXYQuestion', () => {
    const baseQuestion: Omit<XYQuestion, 'config'> = {
      id: 'xy-1',
      number: 1,
      type: 'XY',
      label: 'Grid Question',
      text: 'Place yourself on this grid',
      category: QuestionCategory.PERSONALITY
    };

    it('should validate a complete XY question', () => {
      const question: XYQuestion = {
        ...baseQuestion,
        config: {
          xAxis: {
            min: 0,
            max: 100,
            labels: {
              min: 'Left',
              max: 'Right'
            }
          },
          yAxis: {
            min: 0,
            max: 100,
            labels: {
              min: 'Bottom',
              max: 'Top'
            }
          }
        }
      };
      expect(validateXYQuestion(question)).toBe(true);
    });

    it('should require labels for both axes', () => {
      const question: XYQuestion = {
        ...baseQuestion,
        config: {
          xAxis: {
            min: 0,
            max: 100,
            labels: {
              min: 'Left',
              max: 'Right'
            }
          },
          yAxis: {
            min: 0,
            max: 100,
            labels: {
              min: 'Bottom',
              max: 'Top'
            }
          }
        }
      };
      expect(validateXYQuestion(question)).toBe(true);
    });
  });
}); 