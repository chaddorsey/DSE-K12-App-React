import { OnboardingService } from '../OnboardingService';
import { db } from '@/config/firebase';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { QuestionType, QuestionContext } from '../../../questions/types/questions';

jest.mock('@/config/firebase');

describe('OnboardingService', () => {
  let service: OnboardingService;

  const mockSession = {
    id: 'session1',
    userId: 'user1',
    questions: [{
      id: 'q1',
      type: QuestionType.MC,
      prompt: 'Test question?',
      text: 'Test question?',
      label: 'Test',
      options: ['A', 'B', 'C'],
      number: 1,
      requiredForOnboarding: true,
      includeInOnboarding: true
    }],
    responses: [],
    currentQuestionIndex: 0,
    completed: false,
    startedAt: new Date().toISOString()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OnboardingService();
  });

  describe('getLatestSession', () => {
    it('returns null when no sessions exist', async () => {
      const mockSnapshot = { empty: true, docs: [] };
      (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

      const result = await service.getLatestSession('user1');
      expect(result).toBeNull();
    });

    it('returns the latest session when multiple exist', async () => {
      const mockSnapshot = {
        empty: false,
        docs: [
          {
            id: 'session1',
            data: () => ({ ...mockSession, startedAt: '2024-01-01' })
          },
          {
            id: 'session2',
            data: () => ({ ...mockSession, startedAt: '2024-01-02' })
          }
        ]
      };
      (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

      const result = await service.getLatestSession('user1');
      expect(result?.id).toBe('session2');
    });
  });

  describe('createSession', () => {
    it('creates a new session with provided questions', async () => {
      const mockDocRef = { id: 'newSession' };
      (doc as jest.Mock).mockReturnValue(mockDocRef);

      const result = await service.createSession('user1', mockSession.questions);
      
      expect(result.id).toBe('newSession');
      expect(setDoc).toHaveBeenCalled();
      expect(result.questions).toEqual(mockSession.questions);
    });
  });
}); 