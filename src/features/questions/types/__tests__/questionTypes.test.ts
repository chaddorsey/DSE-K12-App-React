import { 
  QuestionType,
  BaseQuestion,
  MultipleChoiceQuestion,
  OpenResponseQuestion,
  NumericQuestion,
  SliderQuestion,
  SegmentedSliderQuestion,
  XYContinuumQuestion,
  Question
} from '../questions';

describe('Question Types', () => {
  describe('MultipleChoiceQuestion', () => {
    it('should validate a valid multiple choice question', () => {
      const question: MultipleChoiceQuestion = {
        id: 'test1',
        type: 'MULTIPLE_CHOICE',
        prompt: 'What brings you here today?',
        options: ['Learning', 'Career Growth', 'Curiosity', 'Other']
      };

      // Type assertion should pass
      expect(question.type).toBe('MULTIPLE_CHOICE');
      expect(question.options.length).toBeGreaterThan(0);
    });

    it('should not allow invalid question types', () => {
      // @ts-expect-error - Invalid type
      const invalid: MultipleChoiceQuestion = {
        id: 'test2',
        type: 'INVALID',
        prompt: 'Invalid question',
        options: []
      };
    });

    it('should require all necessary properties', () => {
      // @ts-expect-error - Missing options
      const invalid: MultipleChoiceQuestion = {
        id: 'test3',
        type: 'MULTIPLE_CHOICE',
        prompt: 'Missing options'
      };
    });
  });

  describe('OpenResponseQuestion', () => {
    it('should validate a valid open response question', () => {
      const question: OpenResponseQuestion = {
        id: 'test1',
        type: 'OPEN_RESPONSE',
        prompt: 'What are your goals?',
        maxLength: 500
      };

      expect(question.type).toBe('OPEN_RESPONSE');
      expect(question.maxLength).toBeGreaterThan(0);
    });
  });

  describe('NumericQuestion', () => {
    it('should validate a valid numeric question', () => {
      const question: NumericQuestion = {
        id: 'test1',
        type: 'NUMERIC',
        prompt: 'Years of experience?',
        min: 0,
        max: 50,
        step: 1
      };

      expect(question.type).toBe('NUMERIC');
      expect(question.max).toBeGreaterThan(question.min);
    });
  });

  describe('SliderQuestion', () => {
    it('should validate a valid slider question', () => {
      const question: SliderQuestion = {
        id: 'test1',
        type: 'SLIDER',
        prompt: 'Theory vs Practice preference?',
        leftOption: 'Pure Theory',
        rightOption: 'Pure Practice',
        defaultValue: 0.5
      };

      expect(question.type).toBe('SLIDER');
      expect(question.leftOption).toBeTruthy();
      expect(question.rightOption).toBeTruthy();
      expect(question.defaultValue).toBeGreaterThanOrEqual(0);
      expect(question.defaultValue).toBeLessThanOrEqual(1);
    });

    it('should allow omitting defaultValue', () => {
      const question: SliderQuestion = {
        id: 'test2',
        type: 'SLIDER',
        prompt: 'Theory vs Practice?',
        leftOption: 'Theory',
        rightOption: 'Practice'
      };

      expect(question.defaultValue).toBeUndefined();
    });
  });

  describe('SegmentedSliderQuestion', () => {
    it('should validate a valid segmented slider question', () => {
      const question: SegmentedSliderQuestion = {
        id: 'test1',
        type: 'SEGMENTED_SLIDER',
        prompt: 'Rate your experience level',
        segments: [
          { value: 1, label: 'Beginner' },
          { value: 2, label: 'Intermediate' },
          { value: 3, label: 'Advanced' }
        ],
        defaultSegment: 1
      };

      expect(question.type).toBe('SEGMENTED_SLIDER');
      expect(question.segments.length).toBeGreaterThan(0);
      expect(question.segments[0]).toHaveProperty('value');
      expect(question.segments[0]).toHaveProperty('label');
    });

    it('should require at least one segment', () => {
      // @ts-expect-error - Empty segments array
      const invalid: SegmentedSliderQuestion = {
        id: 'test2',
        type: 'SEGMENTED_SLIDER',
        prompt: 'Invalid segments',
        segments: []
      };
    });
  });

  describe('XYContinuumQuestion', () => {
    it('should validate a valid XY continuum question', () => {
      const question: XYContinuumQuestion = {
        id: 'test1',
        type: 'XY_CONTINUUM',
        prompt: 'Plot your work style',
        xAxis: {
          left: 'Individual',
          right: 'Team'
        },
        yAxis: {
          top: 'Strategic',
          bottom: 'Tactical'
        },
        defaultPosition: { x: 0.5, y: 0.5 }
      };

      expect(question.type).toBe('XY_CONTINUUM');
      expect(question.xAxis).toHaveProperty('left');
      expect(question.xAxis).toHaveProperty('right');
      expect(question.yAxis).toHaveProperty('top');
      expect(question.yAxis).toHaveProperty('bottom');
    });

    it('should allow omitting defaultPosition', () => {
      const question: XYContinuumQuestion = {
        id: 'test1',
        type: 'XY_CONTINUUM',
        prompt: 'Plot your work style',
        xAxis: {
          left: 'Individual',
          right: 'Team'
        },
        yAxis: {
          top: 'Strategic',
          bottom: 'Tactical'
        }
      };

      expect(question.defaultPosition).toBeUndefined();
    });

    it('should validate defaultPosition values between 0 and 1', () => {
      // @ts-expect-error - Invalid x value
      const invalid1: XYContinuumQuestion = {
        id: 'test2',
        type: 'XY_CONTINUUM',
        prompt: 'Invalid position',
        xAxis: { left: 'A', right: 'B' },
        yAxis: { top: 'C', bottom: 'D' },
        defaultPosition: { x: 1.5, y: 0.5 }
      };

      // @ts-expect-error - Invalid y value
      const invalid2: XYContinuumQuestion = {
        id: 'test3',
        type: 'XY_CONTINUUM',
        prompt: 'Invalid position',
        xAxis: { left: 'A', right: 'B' },
        yAxis: { top: 'C', bottom: 'D' },
        defaultPosition: { x: 0.5, y: -1 }
      };
    });
  });

  // Add more test cases for other question types...
}); 