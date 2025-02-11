import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { logger } from '../utils/logger';

export interface UserProfile {
  userId: string;
  displayName: string;
  department?: string;
  interests: string[];
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const profileService = {
  async createProfile(userId: string, data: Partial<UserProfile>) {
    try {
      const now = new Date();
      await setDoc(doc(db, 'profiles', userId), {
        userId,
        ...data,
        createdAt: now,
        updatedAt: now,
        onboardingCompleted: false
      });
    } catch (error) {
      logger.error('Error creating profile:', error);
      throw error;
    }
  },

  async getProfile(userId: string) {
    try {
      const snap = await getDoc(doc(db, 'profiles', userId));
      return snap.data() as UserProfile;
    } catch (error) {
      logger.error('Error getting profile:', error);
      throw error;
    }
  }
}; 