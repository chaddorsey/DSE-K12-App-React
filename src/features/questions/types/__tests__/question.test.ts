import type { 
  Question,
  MultipleChoiceQuestion,
  NumericQuestion,
  OpenEndedQuestion,
  ScaleQuestion
} from '../question';

describe('Question Types', () => {
  describe('MultipleChoiceQuestion', () => {
    const mcQuestion: MultipleChoiceQuestion = {
      id: 'mc1',
      number: 1,
      type: 'MC',
      label: 'test_mc',
      text: 'Test MC Question',
      category: 'PERSONALITY',
      options: ['Option 1', 'Option 2', 'Option 3'],
      allowMultiple: true,
      tags: ['test']
    };

    it('has correct structure', () => {
      expect(mcQuestion.type).toBe('MC');
      expect(Array.isArray(mcQuestion.options)).toBe(true);
      expect(mcQuestion.options.length).toBeGreaterThan(0);
    });

    // Type checking test (will fail compilation if types are wrong)
    it('accepts valid options', () => {
      const response: string | string[] = mcQuestion.allowMultiple 
        ? ['Option 1', 'Option 2']
        : 'Option 1';
      expect(mcQuestion.options.includes(
        Array.isArray(response) ? response[0] : response
      )).toBe(true);
    });
  });

  describe('NumericQuestion', () => {
    const numQuestion: NumericQuestion = {
      id: 'num1',
      number: 2,
      type: 'NM',
      label: 'test_num',
      text: 'Test Numeric Question',
      category: 'DEMOGRAPHIC',
      min: 0,
      max: 100,
      step: 1,
      unit: 'years'
    };

    it('has correct structure', () => {
      expect(numQuestion.type).toBe('NM');
      expect(typeof numQuestion.min).toBe('number');
      expect(typeof numQuestion.max).toBe('number');
    });

    it('has valid range', () => {
      expect(numQuestion.max).toBeGreaterThan(numQuestion.min);
      if (numQuestion.step) {
        expect(numQuestion.step).toBeLessThan(numQuestion.max - numQuestion.min);
      }
    });
  });

  describe('OpenEndedQuestion', () => {
    const openQuestion: OpenEndedQuestion = {
      id: 'op1',
      number: 3,
      type: 'OP',
      label: 'test_op',
      text: 'Test Open Question',
      category: 'INTERESTS',
      maxLength: 1000,
      format: 'text'
    };

    it('has correct structure', () => {
      expect(openQuestion.type).toBe('OP');
      expect(typeof openQuestion.maxLength).toBe('number');
    });

    it('has valid format', () => {
      expect(['text', 'email', 'url']).toContain(openQuestion.format);
    });
  });

  describe('ScaleQuestion', () => {
    const scaleQuestion: ScaleQuestion = {
      id: 'scale1',
      number: 4,
      type: 'SCALE',
      label: 'test_scale',
      text: 'Test Scale Question',
      category: 'PERSONALITY',
      min: 1,
      max: 5,
      labels: {
        1: 'Strongly Disagree',
        5: 'Strongly Agree'
      }
    };

    it('has correct structure', () => {
      expect(scaleQuestion.type).toBe('SCALE');
      expect(typeof scaleQuestion.min).toBe('number');
      expect(typeof scaleQuestion.max).toBe('number');
    });

    it('has valid range and labels', () => {
      expect(scaleQuestion.max).toBeGreaterThan(scaleQuestion.min);
      if (scaleQuestion.labels) {
        expect(Object.keys(scaleQuestion.labels)).toContain(scaleQuestion.min.toString());
        expect(Object.keys(scaleQuestion.labels)).toContain(scaleQuestion.max.toString());
      }
    });
  });
}); 