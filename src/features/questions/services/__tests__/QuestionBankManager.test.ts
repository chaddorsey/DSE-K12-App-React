import { QuestionBankManager } from '../QuestionBankManager';
import type { QuestionType } from '../../types';
import { generateTestQuestions } from '../../../../data/questions/generateTestData';
import { questionStore } from '../../../../data/questions';

describe('QuestionBankManager', () => {
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

  describe('Question Retrieval', () => {
    it('gets question by id', () => {
      const question = manager.getQuestion('q1');
      expect(question).toBeDefined();
      expect(question?.type).toBe('XY');
    });

    it('gets questions by category', () => {
      const personalityQuestions = manager.getQuestionsByCategory('PERSONALITY');
      expect(personalityQuestions.length).toBe(1);
      expect(personalityQuestions[0].category).toBe('PERSONALITY');
    });

    it('gets all questions', () => {
      const allQuestions = manager.getAllQuestions();
      expect(allQuestions).toHaveLength(testQuestions.length);
    });
  });

  describe('Response Validation', () => {
    it('validates XY responses', () => {
      expect(manager.validateResponse('q1', { x: 0.5, y: 0.5 })).toBe(true);
      expect(manager.validateResponse('q1', { x: -1, y: 0.5 })).toBe(false);
      expect(manager.validateResponse('q1', { x: 1.5, y: 0.5 })).toBe(false);
    });

    it('validates multiple choice responses', () => {
      expect(manager.validateResponse('q2', 'A')).toBe(true);
      expect(manager.validateResponse('q2', 'D')).toBe(false);
      expect(manager.validateResponse('q2', '')).toBe(false);
    });

    it('handles invalid response formats', () => {
      expect(manager.validateResponse('q1', null)).toBe(false);
      expect(manager.validateResponse('q1', undefined)).toBe(false);
      expect(manager.validateResponse('q1', {} as any)).toBe(false);
      expect(manager.validateResponse('q1', [] as any)).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('handles invalid question ids', () => {
      expect(manager.getQuestion('invalid')).toBeUndefined();
      expect(manager.validateResponse('invalid', 'any')).toBe(false);
    });

    it('handles invalid categories', () => {
      const questions = manager.getQuestionsByCategory('INVALID' as any);
      expect(questions).toHaveLength(0);
    });
  });

  it('initializes with provided questions', () => {
    const testQuestions = generateTestQuestions(5);
    const manager = new QuestionBankManager(testQuestions);
    expect(manager.getAllQuestions()).toHaveLength(5);
  });

  it('initializes with test data when configured', () => {
    process.env.REACT_APP_USE_TEST_DATA = 'true';
    process.env.REACT_APP_TEST_DATA_COUNT = '10';
    
    const manager = new QuestionBankManager();
    expect(manager.getAllQuestions()).toHaveLength(10);
  });

  it('initializes with JSON data by default', () => {
    process.env.REACT_APP_USE_TEST_DATA = 'false';
    
    const manager = new QuestionBankManager();
    const jsonQuestions = questionStore.getAllQuestions();
    expect(manager.getAllQuestions()).toHaveLength(jsonQuestions.length);
  });
}); 