import { QuizQuestionFactory } from '../QuizQuestionFactory';
import { QuestionType, QuestionCategory } from '../../../questions/types/questions';
import { MultipleChoiceQuizQuestion } from '../../components/MultipleChoiceQuizQuestion';
import { SliderQuizQuestion } from '../../components/SliderQuizQuestion';
import { XYContinuumQuizQuestion } from '../../components/XYContinuumQuizQuestion';

describe('QuizQuestionFactory', () => {
  let factory: QuizQuestionFactory;

  beforeEach(() => {
    factory = new QuizQuestionFactory();
  });

  it('creates multiple choice question component', () => {
    const question = {
      id: 'q1',
      type: QuestionType.MC,
      prompt: 'Test?',
      text: 'Test?',
      label: 'Test',
      category: QuestionCategory.PREFERENCES,
      options: ['A', 'B', 'C'],
      number: 1,
      correctAnswer: 'A',
      distractors: ['B', 'C']
    };

    const component = factory.createQuestionComponent(question);
    expect(component).toBe(MultipleChoiceQuizQuestion);
  });

  it('creates slider question component', () => {
    const question = {
      id: 'q2',
      type: QuestionType.SLIDER,
      prompt: 'Test?',
      text: 'Test?',
      label: 'Test',
      category: QuestionCategory.PREFERENCES,
      min: 0,
      max: 100,
      step: 1,
      number: 2,
      correctAnswer: '50'
    };

    const component = factory.createQuestionComponent(question);
    expect(component).toBe(SliderQuizQuestion);
  });

  it('creates XY continuum question component', () => {
    const question = {
      id: 'q3',
      type: QuestionType.XY,
      prompt: 'Test?',
      text: 'Test?',
      label: 'Test',
      category: QuestionCategory.PREFERENCES,
      number: 3,
      correctAnswer: { x: 0.5, y: 0.5 }
    };

    const component = factory.createQuestionComponent(question);
    expect(component).toBe(XYContinuumQuizQuestion);
  });

  it('throws error for unsupported question type', () => {
    const question = {
      id: 'q4',
      type: 'UNKNOWN' as QuestionType,
      prompt: 'Test?',
      text: 'Test?',
      label: 'Test',
      category: QuestionCategory.PREFERENCES,
      number: 4
    };

    expect(() => {
      factory.createQuestionComponent(question);
    }).toThrow('Unsupported question type: UNKNOWN');
  });
}); 