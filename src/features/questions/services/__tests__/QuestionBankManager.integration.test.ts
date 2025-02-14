import { QuestionBankManager } from '../QuestionBankManager';
import type { QuestionType } from '../../types';
import { generateTestQuestions } from '../../../../data/questions/generateTestData';
import { Timestamp } from 'firebase/firestore';

describe('QuestionBankManager Integration Tests', () => {
  let manager: QuestionBankManager;

  const testQuestions: QuestionType[] = [
    {
      id: 'q1',
      type: 'XY',
      text: 'Test XY Question',
      category: 'PERSONALITY',
      config: {
        xAxis: { min: 0, max: 1, label: 'X Axis' },
        yAxis: { min: 0, max: 1, label: 'Y Axis' }
      }
    },
    {
      id: 'q2',
      type: 'MULTIPLE_CHOICE',
      text: 'Test MC Question',
      category: 'DEMOGRAPHIC',
      options: ['A', 'B', 'C']
    }
  ];

  beforeEach(() => {
    manager = new QuestionBankManager(testQuestions);
  });

  describe('Category Management', () => {
    it('correctly categorizes and manages questions', () => {
      const personalityQuestions = manager.getQuestionsByCategory('PERSONALITY');
      const demographicQuestions = manager.getQuestionsByCategory('DEMOGRAPHIC');

      // Check correct categorization
      expect(personalityQuestions.some(q => q.type === 'XY')).toBe(true);
      expect(demographicQuestions.some(q => q.type === 'MULTIPLE_CHOICE')).toBe(true);

      // Verify no question appears in multiple categories
      const allQuestionIds = new Set([
        ...demographicQuestions.map(q => q.id),
        ...personalityQuestions.map(q => q.id)
      ]);
      expect(allQuestionIds.size).toBe(
        demographicQuestions.length + personalityQuestions.length
      );
    });
  });

  describe('Response Validation', () => {
    it('validates responses by question type', () => {
      // Test XY question
      const xyQuestion = manager.getQuestion('q1');
      expect(xyQuestion?.type).toBe('XY');
      expect(manager.validateResponse('q1', { x: 0.5, y: 0.5 })).toBe(true);
      expect(manager.validateResponse('q1', { x: -1, y: 0.5 })).toBe(false);

      // Test Multiple Choice question
      const mcQuestion = manager.getQuestion('q2');
      expect(mcQuestion?.type).toBe('MULTIPLE_CHOICE');
      expect(manager.validateResponse('q2', 'A')).toBe(true);
      expect(manager.validateResponse('q2', 'D')).toBe(false);
    });
  });

  describe('Error Recovery', () => {
    it('handles malformed inputs gracefully', () => {
      const invalidInputs = [
        { id: 'q1', value: null },
        { id: 'q1', value: undefined },
        { id: 'q1', value: {} as any },
        { id: 'q1', value: [] as any }
      ];

      invalidInputs.forEach(input => {
        expect(() => manager.validateResponse(input.id, input.value)).not.toThrow();
        expect(manager.validateResponse(input.id, input.value)).toBe(false);
      });
    });
  });
}); 