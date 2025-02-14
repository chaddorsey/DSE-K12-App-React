import { ProfileService } from '../ProfileService';
import { Profile, ProfileError } from '../../types';
import { db, auth } from '@/config/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  deleteDoc 
} from 'firebase/firestore';

jest.mock('@/config/firebase');
jest.mock('firebase/firestore');

describe('ProfileService', () => {
  let service: ProfileService;
  const mockUserId = 'test-user-123';
  
  const mockProfile: Profile = {
    userId: mockUserId,
    bio: 'Test bio',
    avatar: 'test-avatar.jpg',
    preferences: {
      notifications: true,
      privacy: 'public'
    },
    stats: {
      questionsAnswered: 0,
      quizzesTaken: 0,
      accurateGuesses: 0
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProfileService();
  });

  describe('createProfile', () => {
    it('should create a new profile', async () => {
      (setDoc as jest.Mock).mockResolvedValueOnce(undefined);
      
      await service.createProfile(mockUserId, {
        bio: mockProfile.bio,
        avatar: mockProfile.avatar,
        preferences: mockProfile.preferences
      });

      expect(setDoc).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          userId: mockUserId,
          bio: mockProfile.bio,
          avatar: mockProfile.avatar,
          preferences: mockProfile.preferences
        })
      );
    });

    it('should throw error if profile already exists', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true
      });

      await expect(service.createProfile(mockUserId, mockProfile))
        .rejects
        .toThrow(ProfileError);
    });
  });

  describe('getProfile', () => {
    it('should retrieve a profile', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockProfile
      });

      const profile = await service.getProfile(mockUserId);
      expect(profile).toEqual(mockProfile);
    });

    it('should throw error if profile not found', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false
      });

      await expect(service.getProfile(mockUserId))
        .rejects
        .toThrow(ProfileError);
    });
  });

  describe('updateProfile', () => {
    it('should update profile fields', async () => {
      const updates = {
        bio: 'Updated bio',
        preferences: { notifications: false }
      };

      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true,
        data: () => mockProfile
      });
      (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);

      await service.updateProfile(mockUserId, updates);

      expect(updateDoc).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          bio: updates.bio,
          'preferences.notifications': updates.preferences.notifications,
          updatedAt: expect.any(Date)
        })
      );
    });

    it('should throw error if updating non-existent profile', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false
      });

      await expect(service.updateProfile(mockUserId, { bio: 'test' }))
        .rejects
        .toThrow(ProfileError);
    });
  });

  describe('deleteProfile', () => {
    it('should delete a profile', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => true
      });
      (deleteDoc as jest.Mock).mockResolvedValueOnce(undefined);

      await service.deleteProfile(mockUserId);

      expect(deleteDoc).toHaveBeenCalled();
    });

    it('should throw error if deleting non-existent profile', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({
        exists: () => false
      });

      await expect(service.deleteProfile(mockUserId))
        .rejects
        .toThrow(ProfileError);
    });
  });
}); 