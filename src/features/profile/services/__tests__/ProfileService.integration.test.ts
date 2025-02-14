import { ProfileService } from '../ProfileService';
import { Profile, ProfileError } from '../../types';
import { db, auth } from '@/config/firebase';
import { connectFirestoreEmulator } from 'firebase/firestore';

describe('ProfileService Integration', () => {
  let service: ProfileService;
  const mockUserId = 'test-user-123';

  const mockProfile = {
    bio: 'Test bio',
    avatar: 'test-avatar.jpg',
    preferences: {
      notifications: true,
      privacy: 'public' as const
    }
  };

  beforeAll(() => {
    // Connect to emulator
    connectFirestoreEmulator(db, 'localhost', 8080);
  });

  beforeEach(() => {
    service = new ProfileService();
  });

  it('should perform full CRUD lifecycle', async () => {
    // Create
    await service.createProfile(mockUserId, mockProfile);
    
    // Read
    const profile = await service.getProfile(mockUserId);
    expect(profile.bio).toBe(mockProfile.bio);
    expect(profile.preferences.privacy).toBe(mockProfile.preferences.privacy);
    
    // Update
    const updates = {
      bio: 'Updated bio',
      preferences: { notifications: false }
    };
    await service.updateProfile(mockUserId, updates);
    
    const updatedProfile = await service.getProfile(mockUserId);
    expect(updatedProfile.bio).toBe(updates.bio);
    expect(updatedProfile.preferences.notifications).toBe(updates.preferences.notifications);
    
    // Delete
    await service.deleteProfile(mockUserId);
    await expect(service.getProfile(mockUserId)).rejects.toThrow(ProfileError);
  });

  it('should handle stats updates correctly', async () => {
    // Create profile
    await service.createProfile(mockUserId, mockProfile);
    
    // Update stats
    await service.updateStats(mockUserId, {
      questionsAnswered: 5,
      quizzesTaken: 2
    });
    
    const profile = await service.getProfile(mockUserId);
    expect(profile.stats.questionsAnswered).toBe(5);
    expect(profile.stats.quizzesTaken).toBe(2);
  });

  it('should maintain data integrity during concurrent updates', async () => {
    await service.createProfile(mockUserId, mockProfile);
    
    // Perform multiple concurrent updates
    const updates = Array(5).fill(null).map((_, i) => 
      service.updateStats(mockUserId, { questionsAnswered: i + 1 })
    );
    
    await Promise.all(updates);
    
    const profile = await service.getProfile(mockUserId);
    expect(profile.stats.questionsAnswered).toBeLessThanOrEqual(5);
    expect(profile.stats.questionsAnswered).toBeGreaterThan(0);
  });
}); 