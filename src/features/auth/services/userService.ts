import { db } from '@/config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { IUser, IUserProfile } from '../types/user';

export class UserService {
  private readonly usersCollection = 'users';

  async createUser(user: IUser): Promise<void> {
    const userRef = doc(db, this.usersCollection, user.uid);
    await setDoc(userRef, {
      ...user,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    });
  }

  async getUserById(uid: string): Promise<IUser | null> {
    const userRef = doc(db, this.usersCollection, uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }

    return userSnap.data() as IUser;
  }

  async updateUserProfile(uid: string, updates: Partial<IUserProfile>): Promise<void> {
    const userRef = doc(db, this.usersCollection, uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date(),
    });
  }
}

export const userService = new UserService(); 