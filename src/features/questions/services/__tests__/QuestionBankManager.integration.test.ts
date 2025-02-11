import { QuestionBankManager } from '../QuestionBankManager';
import { EXTENDED_QUESTIONS } from '../../../../constants/questions';
import type { Question, QuestionResponse } from '../../types/question';

describe('QuestionBankManager Integration Tests', () => {
  let manager: QuestionBankManager;

  // Convert existing questions to new format
  const convertedQuestions: Question[] = EXTENDED_QUESTIONS.map(q => ({
    id: `q${q.number}`,
    number: q.number,
    type: q.type as any,
    label: q.label,
    text: q.question,
    category: determineCategory(q.label),
    ...(q.type === 'MC' ? { options: q.options } : {}),
    ...(q.type === 'NM' ? { min: 0, max: 100 } : {}),
    ...(q.type === 'OP' ? { maxLength: 1000 } : {})
  }));

  function determineCategory(label: string): Question['category'] {
    if (label.includes('professional')) return 'PROFESSIONAL';
    if (label.includes('region') || label.includes('gender')) return 'DEMOGRAPHIC';
    if (label.includes('hobby') || label.includes('movies')) return 'INTERESTS';
    if (label.includes('intro_extrovert')) return 'PERSONALITY';
    return 'BACKGROUND';
  }

  beforeEach(() => {
    manager = new QuestionBankManager(convertedQuestions);
  });

  describe('Real Data Scenarios', () => {
    it('handles all question types from EXTENDED_QUESTIONS', () => {
      const allQuestions = manager.getAllQuestions();
      expect(allQuestions.length).toBe(EXTENDED_QUESTIONS.length);

      // Verify each type is handled
      const types = new Set(allQuestions.map(q => q.type));
      expect(types).toContain('MC');
      expect(types).toContain('NM');
      expect(types).toContain('OP');
    });

    it('correctly categorizes questions', () => {
      const professionalQuestions = manager.getQuestionsByCategory('PROFESSIONAL');
      expect(professionalQuestions.some(q => q.label === 'professional_cat')).toBe(true);

      const demographicQuestions = manager.getQuestionsByCategory('DEMOGRAPHIC');
      expect(demographicQuestions.some(q => q.label === 'region_current')).toBe(true);
    });

    it('validates real question responses', () => {
      // Test MC question (professional category)
      const profQuestion = manager.getQuestion('q6'); // professional_cat question
      expect(profQuestion?.type).toBe('MC');
      expect(manager.validateResponse('q6', 'Researcher')).toBe(true);
      expect(manager.validateResponse('q6', 'Invalid Job')).toBe(false);

      // Test numeric question (commute hours)
      const commuteQuestion = manager.getQuestion('q27'); // commute_hrs question
      expect(commuteQuestion?.type).toBe('NM');
      expect(manager.validateResponse('q27', 2)).toBe(true);
      expect(manager.validateResponse('q27', -1)).toBe(false);
    });
  });

  describe('Response Collection Scenarios', () => {
    const sampleResponses: QuestionResponse[] = [
      {
        questionId: 'q1',
        value: 'Cat person',
        timestamp: Date.now()
      },
      {
        questionId: 'q24',
        value: 2,
        timestamp: Date.now()
      },
      {
        questionId: 'q33',
        value: 'Chocolate',
        timestamp: Date.now()
      }
    ];

    it('validates a complete response set', () => {
      const validResponses = sampleResponses.every(response => 
        manager.validateResponse(response.questionId, response.value)
      );
      expect(validResponses).toBe(true);
    });

    it('handles response dependencies', () => {
      // Example: If someone answers they're a student, their work experience should be limited
      const studentResponse = {
        questionId: 'q6', // professional_cat
        value: 'Student',
        timestamp: Date.now()
      };

      const workExpResponse = {
        questionId: 'q27', // commute_hrs
        value: 0,
        timestamp: Date.now()
      };

      expect(manager.validateResponse(studentResponse.questionId, studentResponse.value)).toBe(true);
      expect(manager.validateResponse(workExpResponse.questionId, workExpResponse.value)).toBe(true);
    });
  });

  describe('Category Analysis', () => {
    it('provides category statistics', () => {
      const categories = ['DEMOGRAPHIC', 'PROFESSIONAL', 'PERSONALITY', 'INTERESTS', 'BACKGROUND'] as const;
      const stats = categories.map(category => ({
        category,
        count: manager.getQuestionsByCategory(category).length,
        types: new Set(manager.getQuestionsByCategory(category).map(q => q.type))
      }));

      expect(stats.every(s => s.count > 0)).toBe(true);
      expect(stats.find(s => s.category === 'DEMOGRAPHIC')?.types.has('MC')).toBe(true);
    });

    it('handles cross-category relationships', () => {
      const demographicQuestions = manager.getQuestionsByCategory('DEMOGRAPHIC');
      const professionalQuestions = manager.getQuestionsByCategory('PROFESSIONAL');

      // Verify no question appears in multiple categories
      const allQuestionIds = new Set([
        ...demographicQuestions.map(q => q.id),
        ...professionalQuestions.map(q => q.id)
      ]);
      expect(allQuestionIds.size).toBe(
        demographicQuestions.length + professionalQuestions.length
      );
    });
  });

  describe('Error Recovery', () => {
    it('handles malformed questions gracefully', () => {
      const malformedQuestion = {
        id: 'bad1',
        number: 999,
        type: 'INVALID' as any,
        label: 'bad_question',
        text: 'Bad Question',
        category: 'DEMOGRAPHIC'
      };

      const newManager = new QuestionBankManager([...convertedQuestions, malformedQuestion]);
      expect(() => newManager.validateResponse('bad1', 'any value')).not.toThrow();
    });

    it('recovers from invalid response formats', () => {
      const responses = [
        { id: 'q1', value: null },
        { id: 'q1', value: undefined },
        { id: 'q1', value: {} },
        { id: 'q1', value: [] }
      ];

      responses.forEach(response => {
        expect(() => manager.validateResponse(response.id, response.value)).not.toThrow();
        expect(manager.validateResponse(response.id, response.value)).toBe(false);
      });
    });
  });
}); 