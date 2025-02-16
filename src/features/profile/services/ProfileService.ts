import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  deleteDoc 
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Profile, ProfileUpdateData, ProfileError } from '../types';

export class ProfileService {
  private profilesRef = collection(db, 'profiles');

  async createProfile(
    userId: string, 
    profileData: Omit<Profile, 'userId' | 'stats' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    const profileDoc = doc(this.profilesRef, userId);
    const existingProfile = await getDoc(profileDoc);

    if (existingProfile.exists()) {
      throw new ProfileError(
        'Profile already exists',
        'OPERATION_ERROR'
      );
    }

    const now = new Date();
    const newProfile: Profile = {
      userId,
      ...profileData,
      stats: {
        questionsAnswered: 0,
        quizzesTaken: 0,
        accurateGuesses: 0
      },
      createdAt: now,
      updatedAt: now
    };

    await setDoc(profileDoc, newProfile);
  }

  async getProfile(userId: string): Promise<Profile> {
    try {
      const profileDoc = await getDoc(doc(this.profilesRef, userId));
      
      if (!profileDoc.exists()) {
        throw new ProfileError('Profile not found', 'NOT_FOUND');
      }

      return profileDoc.data() as Profile;
    } catch (error) {
      if (error instanceof ProfileError) throw error;
      throw new ProfileError(
        'Failed to fetch profile',
        'OPERATION_ERROR',
        error
      );
    }
  }

  async updateProfile(userId: string, data: Partial<Profile>): Promise<void> {
    try {
      await updateDoc(doc(this.profilesRef, userId), data);
    } catch (error) {
      throw new ProfileError(
        'Failed to update profile',
        'OPERATION_ERROR',
        error
      );
    }
  }

  async deleteProfile(userId: string): Promise<void> {
    const profileDoc = doc(this.profilesRef, userId);
    const existingProfile = await getDoc(profileDoc);

    if (!existingProfile.exists()) {
      throw new ProfileError(
        'Profile not found',
        'NOT_FOUND'
      );
    }

    await deleteDoc(profileDoc);
  }

  async updateStats(
    userId: string,
    updates: Partial<Profile['stats']>
  ): Promise<void> {
    const profileDoc = doc(this.profilesRef, userId);
    const existingProfile = await getDoc(profileDoc);

    if (!existingProfile.exists()) {
      throw new ProfileError(
        'Profile not found',
        'NOT_FOUND'
      );
    }

    const updateData: Record<string, any> = {};
    Object.entries(updates).forEach(([key, value]) => {
      updateData[`stats.${key}`] = value;
    });
    updateData.updatedAt = new Date();

    await updateDoc(profileDoc, updateData);
  }

  async retryProfileLoad(userId: string, attempts = 3): Promise<Profile> {
    for (let i = 0; i < attempts; i++) {
      try {
        return await this.getProfile(userId);
      } catch (error) {
        if (i === attempts - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
    throw new Error('Failed to load profile after multiple attempts');
  }
}

export const profileService = new ProfileService(); 