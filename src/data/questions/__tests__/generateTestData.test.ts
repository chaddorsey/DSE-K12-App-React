import { generateTestQuestions } from '../generateTestData';
import type { Question } from '../../../features/questions/types';

describe('generateTestData', () => {
  it('generates the specified number of questions', () => {
    const count = 5;
    const questions = generateTestQuestions(count);
    expect(questions).toHaveLength(count);
  });

  it('generates valid question objects', () => {
    const questions = generateTestQuestions(1);
    const question = questions[0];

    expect(question).toHaveProperty('id');
    expect(question).toHaveProperty('type');
    expect(question).toHaveProperty('text');
    expect(question).toHaveProperty('label');
    expect(question).toHaveProperty('category');
    expect(question).toHaveProperty('number');
  });

  it('generates questions with valid types', () => {
    const questions = generateTestQuestions(10);
    const validTypes = ['MC', 'OP', 'NM', 'SCALE'];
    
    questions.forEach(question => {
      expect(validTypes).toContain(question.type);
    });
  });

  it('generates multiple choice questions with options', () => {
    const questions = generateTestQuestions(20);
    const mcQuestions = questions.filter(q => q.type === 'MC');
    
    mcQuestions.forEach(question => {
      expect(question.options).toBeDefined();
      expect(Array.isArray(question.options)).toBe(true);
      expect(question.options?.length).toBeGreaterThan(0);
    });
  });
}); 