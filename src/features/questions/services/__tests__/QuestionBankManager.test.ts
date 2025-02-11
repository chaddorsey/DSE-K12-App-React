import { QuestionBankManager } from '../QuestionBankManager';
import type { Question } from '../../types/question';
import { generateTestQuestions } from '../../../../data/questions/generateTestData';
import { questionStore } from '../../../../data/questions';

describe('QuestionBankManager', () => {
  let manager: QuestionBankManager;
  
  const testQuestions: Question[] = [
    {
      id: 'mc1',
      number: 1,
      type: 'MC',
      label: 'test_mc',
      text: 'Test MC',
      category: 'PERSONALITY',
      options: ['Option 1', 'Option 2'],
      allowMultiple: true
    },
    {
      id: 'num1',
      number: 2,
      type: 'NM',
      label: 'test_num',
      text: 'Test Numeric',
      category: 'DEMOGRAPHIC',
      min: 0,
      max: 100
    },
    {
      id: 'op1',
      number: 3,
      type: 'OP',
      label: 'test_op',
      text: 'Test Open',
      category: 'INTERESTS',
      format: 'email'
    },
    {
      id: 'scale1',
      number: 4,
      type: 'SCALE',
      label: 'test_scale',
      text: 'Test Scale',
      category: 'PERSONALITY',
      min: 1,
      max: 5
    }
  ];

  beforeEach(() => {
    manager = new QuestionBankManager(testQuestions);
  });

  describe('Question Retrieval', () => {
    it('gets question by id', () => {
      const question = manager.getQuestion('mc1');
      expect(question).toBeDefined();
      expect(question?.type).toBe('MC');
    });

    it('gets questions by category', () => {
      const personalityQuestions = manager.getQuestionsByCategory('PERSONALITY');
      expect(personalityQuestions).toHaveLength(2);
      expect(personalityQuestions[0].category).toBe('PERSONALITY');
    });

    it('gets all questions', () => {
      const allQuestions = manager.getAllQuestions();
      expect(allQuestions).toHaveLength(testQuestions.length);
    });
  });

  describe('Response Validation', () => {
    it('validates multiple choice responses', () => {
      expect(manager.validateResponse('mc1', ['Option 1'])).toBe(true);
      expect(manager.validateResponse('mc1', ['Invalid'])).toBe(false);
      expect(manager.validateResponse('mc1', ['Option 1', 'Option 2'])).toBe(true);
    });

    it('validates numeric responses', () => {
      expect(manager.validateResponse('num1', 50)).toBe(true);
      expect(manager.validateResponse('num1', -1)).toBe(false);
      expect(manager.validateResponse('num1', 101)).toBe(false);
      expect(manager.validateResponse('num1', 'not a number')).toBe(false);
    });

    it('validates open-ended responses', () => {
      expect(manager.validateResponse('op1', 'test@example.com')).toBe(true);
      expect(manager.validateResponse('op1', 'not an email')).toBe(false);
    });

    it('validates scale responses', () => {
      expect(manager.validateResponse('scale1', 3)).toBe(true);
      expect(manager.validateResponse('scale1', 0)).toBe(false);
      expect(manager.validateResponse('scale1', 6)).toBe(false);
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