import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  User as FirebaseUser,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  updatePassword,
  signInWithCustomToken,
  getAuth
} from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { IUser, UserRole, KnownUser } from '../types/auth';
import { getAvatarUrl } from '@/utils/avatar';
import { findKnownUser } from '@/utils/known-users';

console.log('Firestore instance:', db ? 'initialized' : 'null', {
  type: db?.type,
  _databaseId: (db as any)?._databaseId,
});

export class AuthService {
  constructor() {
    console.log('AuthService initializing...');
    // Set persistence to local (survives browser restart)
    setPersistence(auth, browserLocalPersistence)
      .catch(error => console.error('Error setting auth persistence:', error));
  }

  private async getKnownUserData(email: string): Promise<KnownUser | null> {
    const knownUsersRef = collection(db, 'known_users');
    const q = query(knownUsersRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return querySnapshot.docs[0].data() as KnownUser;
  }

  async signUp(email: string, password: string): Promise<IUser> {
    try {
      console.log('Starting signup process...', { dbInitialized: !!db });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Auth user created:', userCredential.user.uid);

      const knownUser = await this.getKnownUserData(email);
      console.log('Known user check:', knownUser ? 'found' : 'not found');
      
      const userData = {
        uid: userCredential.user.uid,
        email: email,
        createdAt: new Date().toISOString(),
        role: 'user'
      };

      console.log('Attempting to create Firestore document...');
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, userData);

      await sendEmailVerification(userCredential.user);
      console.log('Verification email sent');

      return userData as IUser;
    } catch (error) {
      if (error instanceof Error) {
        console.error('SignUp error:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
          ...(error as any).code ? { code: (error as any).code } : {},
          ...(error as any).details ? { details: (error as any).details } : {}
        });
      } else {
        console.error('Unknown signup error:', error);
      }
      throw error;
    }
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

  async sendVerificationEmail(user: FirebaseUser): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      console.log('Check email verification link at: http://localhost:9099/auth');
    }
    return sendEmailVerification(user);
  }

  private async getUserData(uid: string): Promise<IUser> {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }
    return userDoc.data() as IUser;
  }

  private mapFirebaseUser(user: FirebaseUser): IUser {
    return {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      role: 'user' as UserRole,
      metadata: {},
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      onboardingCompleted: false
    };
  }
}

export const authService = new AuthService();

export async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
} 