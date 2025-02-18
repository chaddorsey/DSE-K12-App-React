import { QuizService } from '../QuizService';
import { db } from '../../../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { IUser } from '../../../auth/types';
import type { QuestionResponse } from '../../../questions/types/responses';

// Mock Firebase
jest.mock('../../../../config/firebase');

describe('QuizService', () => {
  const mockUser: IUser = {
    id: 'user1',
    displayName: 'Test User',
    email: 'test@example.com'
  };

  const mockResponses: QuestionResponse[] = [
    {
      id: 'resp1',
      userId: 'user1',
      questionId: 'q1',
      value: {
        type: 'MC',
        selectedOption: 'Blue'
      },
      timestamp: new Date(),
      metadata: {
        timeToAnswer: 1000,
        interactionCount: 1,
        device: { type: 'desktop', input: 'mouse' }
      }
    },
    {
      id: 'resp2',
      userId: 'user1',
      questionId: 'q2',
      value: {
        type: 'NM',
        number: 42
      },
      timestamp: new Date(),
      metadata: {
        timeToAnswer: 2000,
        interactionCount: 1,
        device: { type: 'desktop', input: 'keyboard' }
      }
    }
  ];

  beforeEach(() => {
    // Mock Firestore query response
    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockResponses.map(response => ({
        id: response.id,
        data: () => response
      }))
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateQuiz', () => {
    it('generates a quiz with 5 questions', async () => {
      const quizService = new QuizService(db);
      const quiz = await quizService.generateQuiz(mockUser.id);

      expect(quiz.questions).toHaveLength(5);
      expect(quiz.targetUserId).toBe(mockUser.id);
    });

    it('includes questions with correct answers from user responses', async () => {
      const quizService = new QuizService(db);
      const quiz = await quizService.generateQuiz(mockUser.id);

      // Check that questions from responses are included
      const questionIds = quiz.questions.map(q => q.id);
      expect(questionIds).toContain('q1');
      expect(questionIds).toContain('q2');

      // Verify correct answers
      const mcQuestion = quiz.questions.find(q => q.id === 'q1');
      expect(mcQuestion?.correctAnswer).toBe('Blue');

      const numQuestion = quiz.questions.find(q => q.id === 'q2');
      expect(numQuestion?.correctAnswer).toBe(42);
    });

    it('includes distractors for multiple choice questions', async () => {
      const quizService = new QuizService(db);
      const quiz = await quizService.generateQuiz(mockUser.id);

      const mcQuestion = quiz.questions.find(q => q.id === 'q1');
      expect(mcQuestion?.options).toContain('Blue'); // Correct answer
      expect(mcQuestion?.options.length).toBeGreaterThan(1); // Has distractors
      
      // Distractors should be different from correct answer
      const distractors = mcQuestion?.options.filter(opt => opt !== 'Blue');
      expect(distractors?.length).toBeGreaterThan(0);
    });

    it('handles errors gracefully', async () => {
      (getDocs as jest.Mock).mockRejectedValue(new Error('Firestore error'));
      
      const quizService = new QuizService(db);
      await expect(quizService.generateQuiz(mockUser.id))
        .rejects
        .toThrow('Failed to generate quiz');
    });
  });
}); 