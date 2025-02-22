import { QuizService } from '../QuizService';
import { QuestionService } from '../QuestionService';
import { db } from '@/config/firebase';
import { QuestionType, QuestionCategory, QuestionContext } from '../../types/questions';

jest.mock('../QuestionService');
jest.mock('@/config/firebase');

describe('QuizService', () => {
  let service: QuizService;
  let questionService: QuestionService;

  const mockQuestion = {
    id: 'q1',
    type: QuestionType.MC,
    prompt: 'Test question?',
    text: 'Test question?',
    label: 'Test',
    category: QuestionCategory.PREFERENCES,
    options: ['A', 'B', 'C'],
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
    questionService = new QuestionService();
    service = new QuizService(questionService);
  });

  describe('generateQuiz', () => {
    it('generates quiz for target user', async () => {
      (questionService.getQuestionsByCategory as jest.Mock).mockResolvedValue([mockQuestion]);

      const quiz = await service.generateQuiz('user1', 'target1');
      
      expect(quiz.questions.length).toBeGreaterThan(0);
      expect(quiz.targetUserId).toBe('target1');
      expect(quiz.context).toBe(QuestionContext.QUIZ);
    });

    it('includes correct answers and distractors', async () => {
      const mockQuizQuestion = {
        ...mockQuestion,
        correctAnswer: 'A',
        distractors: ['B', 'C']
      };

      (questionService.getQuestionsByCategory as jest.Mock).mockResolvedValue([mockQuizQuestion]);

      const quiz = await service.generateQuiz('user1', 'target1');
      
      expect(quiz.questions[0].correctAnswer).toBeDefined();
      expect(quiz.questions[0].distractors).toBeDefined();
    });
  });

  describe('submitQuizResponse', () => {
    it('validates and scores responses', async () => {
      const response = {
        questionId: 'q1',
        userId: 'user1',
        targetUserId: 'target1',
        value: {
          type: QuestionType.MC,
          selectedOption: 'A'
        },
        context: QuestionContext.QUIZ,
        metadata: {
          timeToAnswer: 1000,
          interactionCount: 1,
          device: {
            type: 'desktop' as const,
            input: 'mouse' as const
          }
        }
      };

      const result = await service.submitQuizResponse(response);
      
      expect(result.isCorrect).toBeDefined();
      expect(result.points).toBeDefined();
    });
  });
}); 