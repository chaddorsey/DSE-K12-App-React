import { QuizGenerator } from '../QuizGenerator';
import type { 
  Question,
  QuestionResponse,
  MultipleChoiceQuestion,
  NumericQuestion
} from '../../../questions/types/questions';

describe('QuizGenerator', () => {
  // Test data setup
  const mockQuestions: Question[] = [
    {
      id: '1',
      type: 'MC',
      text: 'What is your favorite color?',
      prompt: 'Choose your favorite color',
      category: 'PREFERENCES',
      label: 'Favorite Color',
      options: ['Red', 'Blue', 'Green', 'Yellow'],
      standardDistractors: ['Purple', 'Orange', 'Pink'],
      metadata: {
        difficulty: 1,
        timeLimit: 30
      }
    } as MultipleChoiceQuestion,
    {
      id: '2',
      type: 'NM',
      text: 'How many years have you been teaching?',
      prompt: 'Enter your teaching experience in years',
      category: 'EXPERIENCE',
      label: 'Teaching Experience',
      min: 0,
      max: 50,
      step: 1,
      metadata: {
        difficulty: 1,
        timeLimit: 30
      }
    } as NumericQuestion
  ];

  const mockResponses: QuestionResponse[] = [
    {
      id: 'resp1',
      userId: 'user1',
      questionId: '1',
      value: {
        type: 'MC',
        selectedOption: 'Blue'
      },
      correct: false,
      metadata: {
        timeToAnswer: 5000,
        interactionCount: 1,
        device: {
          type: 'browser',
          input: 'mouse'
        }
      },
      timestamp: new Date()
    },
    {
      id: 'resp2',
      userId: 'user2',
      questionId: '1',
      value: {
        type: 'MC',
        selectedOption: 'Red'
      },
      correct: false,
      metadata: {
        timeToAnswer: 4000,
        interactionCount: 1,
        device: {
          type: 'browser',
          input: 'mouse'
        }
      },
      timestamp: new Date()
    },
    {
      id: 'resp3',
      userId: 'user1',
      questionId: '2',
      value: {
        type: 'NM',
        number: 15
      },
      correct: false,
      metadata: {
        timeToAnswer: 3000,
        interactionCount: 1,
        device: {
          type: 'browser',
          input: 'keyboard'
        }
      },
      timestamp: new Date()
    }
  ];

  describe('generateQuiz', () => {
    it('should generate quiz questions only for questions the target user has answered', () => {
      const generator = new QuizGenerator(mockQuestions, mockResponses);
      const quiz = generator.generateQuiz('user1');

      expect(quiz.questions).toHaveLength(2);
      expect(quiz.questions.map((q: Question) => q.id)).toContain('1');
      expect(quiz.questions.map((q: Question) => q.id)).toContain('2');
    });

    it('should generate multiple choice options including the correct answer and distractors', () => {
      const generator = new QuizGenerator(mockQuestions, mockResponses);
      const quiz = generator.generateQuiz('user1');
      
      const mcQuestion = quiz.questions.find((q: Question) => q.type === 'MC');
      expect(mcQuestion?.options).toHaveLength(3);
      expect(mcQuestion?.options).toContain('Blue'); // Target's answer
      expect(mcQuestion?.options).toBeSorted(); // Should be in alphanumeric order
    });

    it('should generate numeric options including the correct answer and other responses', () => {
      const generator = new QuizGenerator(mockQuestions, mockResponses);
      const quiz = generator.generateQuiz('user1');
      
      const nmQuestion = quiz.questions.find((q: Question) => q.type === 'NM');
      expect(nmQuestion?.options).toHaveLength(3);
      expect(nmQuestion?.options).toContain(15); // Target's answer
      expect(nmQuestion?.options).toBeSorted((a: number, b: number) => a - b);
    });
  });

  describe('generateDistractors', () => {
    it('should generate different distractors for each question type', () => {
      const generator = new QuizGenerator(mockQuestions, mockResponses);
      
      const mcDistractors = generator.generateDistractors('1', 'user1');
      expect(mcDistractors).toHaveLength(2);
      expect(mcDistractors).not.toContain('Blue'); // Shouldn't include target's answer

      const nmDistractors = generator.generateDistractors('2', 'user1');
      expect(nmDistractors).toHaveLength(2);
      expect(nmDistractors).not.toContain(15); // Shouldn't include target's answer
    });
  });
}); 