import { QuestionFactory } from '../QuestionFactory';
import { QuestionType } from '../../types/questions';

describe('QuestionFactory', () => {
  const factory = new QuestionFactory();

  it('creates a multiple choice question component', () => {
    const question = {
      id: 'q1',
      type: QuestionType.MC,
      prompt: 'Test MC question?',
      text: 'Test MC question?',
      label: 'Test',
      options: ['A', 'B', 'C'],
      number: 1,
      requiredForOnboarding: true,
      includeInOnboarding: true
    };

    const Component = factory.createQuestionComponent(question);
    expect(Component).toBeDefined();
  });

  it('creates a numeric question component', () => {
    const question = {
      id: 'q2',
      type: QuestionType.NM,
      prompt: 'Test numeric question?',
      text: 'Test numeric question?',
      label: 'Test',
      min: 0,
      max: 100,
      step: 1,
      number: 1,
      requiredForOnboarding: true,
      includeInOnboarding: true
    };

    const Component = factory.createQuestionComponent(question);
    expect(Component).toBeDefined();
  });

  it('creates an open response question component', () => {
    const question = {
      id: 'q3',
      type: QuestionType.OP,
      prompt: 'Test open question?',
      text: 'Test open question?',
      label: 'Test',
      maxLength: 500,
      number: 1,
      requiredForOnboarding: true,
      includeInOnboarding: true
    };

    const Component = factory.createQuestionComponent(question);
    expect(Component).toBeDefined();
  });

  it('throws error for unknown question type', () => {
    const question = {
      id: 'q4',
      type: 'UNKNOWN' as QuestionType,
      prompt: 'Invalid question',
      text: 'Invalid question',
      label: 'Test',
      number: 1,
      requiredForOnboarding: true,
      includeInOnboarding: true
    };

    expect(() => factory.createQuestionComponent(question)).toThrow('Unknown question type');
  });
}); 