import { db } from '@/config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { IUser, IUserProfile, IUserStats, IUserPreferences } from '../types/user';
import { logger } from '@/utils/logger';

export class UserService {
  private readonly usersCollection = 'users';

  async createUser(user: IUser): Promise<void> {
    const userRef = doc(db, this.usersCollection, user.id);
    const now = new Date();
    
    const defaultProfile: IUserProfile = {
      ...user,
      displayNameLower: user.displayName.toLowerCase(),
      createdAt: now,
      lastLoginAt: now,
      stats: {
        questionsAnswered: 0,
        quizzesTaken: 0,
        accurateGuesses: 0,
        lastUpdated: now
      },
      preferences: {
        notifications: true,
        privacy: 'public'
      }
    };

    try {
      await setDoc(userRef, defaultProfile);
      logger.info('Created new user profile', { uid: user.id });
    } catch (error) {
      logger.error('Failed to create user profile', { error, uid: user.id });
      throw error;
    }
  }

  async getUserById(uid: string): Promise<IUserProfile | null> {
    const userRef = doc(db, this.usersCollection, uid);
    
    try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        return null;
      }
      return userSnap.data() as IUserProfile;
    } catch (error) {
      logger.error('Failed to get user profile', { error, uid });
      throw error;
    }
  }

  async updateUserProfile(uid: string, updates: Partial<IUserProfile>): Promise<void> {
    const userRef = doc(db, this.usersCollection, uid);
    
    try {
      const updatesWithLower = updates.displayName 
        ? { ...updates, displayNameLower: updates.displayName.toLowerCase() }
        : updates;
      await updateDoc(userRef, {
        ...updatesWithLower,
        updatedAt: new Date(),
      });
      logger.info('Updated user profile', { uid });
    } catch (error) {
      logger.error('Failed to update user profile', { error, uid });
      throw error;
    }
  }

  async updateUserStats(uid: string, updates: Partial<IUserStats>): Promise<void> {
    const userRef = doc(db, this.usersCollection, uid);
    
    try {
      const updateData: Record<string, any> = {};
      Object.entries(updates).forEach(([key, value]) => {
        updateData[`stats.${key}`] = value;
      });
      updateData['stats.lastUpdated'] = new Date();

      await updateDoc(userRef, updateData);
      logger.info('Updated user stats', { uid });
    } catch (error) {
      logger.error('Failed to update user stats', { error, uid });
      throw error;
    }
  }

  async updateUserPreferences(uid: string, updates: Partial<IUserPreferences>): Promise<void> {
    const userRef = doc(db, this.usersCollection, uid);
    
    try {
      const updateData: Record<string, any> = {};
      Object.entries(updates).forEach(([key, value]) => {
        updateData[`preferences.${key}`] = value;
      });

      await updateDoc(userRef, updateData);
      logger.info('Updated user preferences', { uid });
    } catch (error) {
      logger.error('Failed to update user preferences', { error, uid });
      throw error;
    }
  }

  async incrementUserStats(uid: string, stat: keyof Omit<IUserStats, 'lastUpdated'>): Promise<void> {
    const userRef = doc(db, this.usersCollection, uid);
    
    try {
      await updateDoc(userRef, {
        [`stats.${stat}`]: firebase.firestore.FieldValue.increment(1),
        'stats.lastUpdated': new Date()
      });
      logger.info('Incremented user stat', { uid, stat });
    } catch (error) {
      logger.error('Failed to increment user stat', { error, uid, stat });
      throw error;
    }
  }

  static async updateUser(userId: string, updates: Partial<IUser>): Promise<void> {
    const userDoc = doc(db, 'users', userId);
    const updatesWithLower = updates.displayName 
      ? { ...updates, displayNameLower: updates.displayName.toLowerCase() }
      : updates;
    await updateDoc(userDoc, updatesWithLower);
  }
}

export const userService = new UserService(); 