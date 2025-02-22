import { QuestionService } from '../QuestionService';
import { db } from '@/config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { QuestionType, QuestionCategory } from '../../types/questions';

jest.mock('@/config/firebase');

describe('QuestionService', () => {
  let service: QuestionService;

  const mockQuestions = [
    {
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
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    service = new QuestionService();
  });

  describe('getOnboardingQuestions', () => {
    it('fetches onboarding questions', async () => {
      const mockSnapshot = {
        docs: mockQuestions.map(q => ({
          id: q.id,
          data: () => q
        }))
      };
      (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

      const questions = await service.getOnboardingQuestions();
      expect(questions).toHaveLength(1);
      expect(questions[0].includeInOnboarding).toBe(true);
    });
  });

  describe('getQuestionsByCategory', () => {
    it('fetches questions by category', async () => {
      const mockSnapshot = {
        docs: mockQuestions.map(q => ({
          id: q.id,
          data: () => q
        }))
      };
      (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

      const questions = await service.getQuestionsByCategory(QuestionCategory.PREFERENCES);
      expect(questions).toHaveLength(1);
      expect(questions[0].category).toBe(QuestionCategory.PREFERENCES);
    });
  });
}); 