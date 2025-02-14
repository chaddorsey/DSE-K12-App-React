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
    const profileDoc = await getDoc(doc(this.profilesRef, userId));

    if (!profileDoc.exists()) {
      throw new ProfileError(
        'Profile not found',
        'NOT_FOUND'
      );
    }

    return profileDoc.data() as Profile;
  }

  async updateProfile(userId: string, updates: ProfileUpdateData): Promise<void> {
    const profileDoc = doc(this.profilesRef, userId);
    const existingProfile = await getDoc(profileDoc);

    if (!existingProfile.exists()) {
      throw new ProfileError(
        'Profile not found',
        'NOT_FOUND'
      );
    }

    const updateData: Record<string, any> = {
      ...updates,
      updatedAt: new Date()
    };

    // Handle nested preference updates
    if (updates.preferences) {
      Object.entries(updates.preferences).forEach(([key, value]) => {
        updateData[`preferences.${key}`] = value;
      });
      delete updateData.preferences;
    }

    await updateDoc(profileDoc, updateData);
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
} 