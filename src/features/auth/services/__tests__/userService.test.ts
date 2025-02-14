import { UserService } from '../userService';
import { db } from '@/config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { IUser, IUserProfile } from '../../types/user';

jest.mock('@/config/firebase');
jest.mock('firebase/firestore');

describe('UserService', () => {
  let service: UserService;
  const mockUid = 'test-user-123';

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UserService();
  });

  describe('createUser', () => {
    it('creates user with default stats and preferences', async () => {
      const mockUser: IUser = {
        uid: mockUid,
        email: 'test@example.com',
        role: 'student',
        isEmailVerified: false,
        createdAt: new Date(),
        lastLoginAt: new Date()
      };

      await service.createUser(mockUser);

      expect(setDoc).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          ...mockUser,
          stats: expect.objectContaining({
            questionsAnswered: 0,
            quizzesTaken: 0,
            accurateGuesses: 0
          }),
          preferences: expect.objectContaining({
            notifications: true,
            privacy: 'public'
          })
        })
      );
    });
  });

  // Add more test cases for other methods...
}); 