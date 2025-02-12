import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { IUser, UserRole } from '../types/auth';

export class AuthService {
  async signUp(email: string, password: string, displayName: string): Promise<IUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user: firebaseUser } = userCredential;

    await firebaseUpdateProfile(firebaseUser, { displayName });

    const userData: IUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: displayName,
      emailVerified: firebaseUser.emailVerified,
      createdAt: new Date(),
      lastLoginAt: new Date(),
      role: 'student', // Default role
      photoURL: null
    };

    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), userData);

    return userData;
  }

  async signIn(email: string, password: string): Promise<IUser> {
    const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
    const userData = await this.getUserData(firebaseUser.uid);
    
    // Update last login
    await updateDoc(doc(db, 'users', firebaseUser.uid), {
      lastLoginAt: new Date()
    });

    return userData;
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  private async getUserData(uid: string): Promise<IUser> {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }
    return userDoc.data() as IUser;
  }
}

export const authService = new AuthService(); 