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
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { IUser, UserRole, KnownUser } from '../types/auth';
import { getAvatarUrl } from '@/utils/avatar';
import { findKnownUser } from '@/utils/known-users';

export class AuthService {
  constructor() {
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
      // Check if this is a known user
      const knownUser = await this.getKnownUserData(email);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user: firebaseUser } = userCredential;

      const displayName = knownUser?.displayName || email.split('@')[0];
      // Create base user data without optional fields
      const baseUserData: Omit<IUser, 'organization'> = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName,
        emailVerified: firebaseUser.emailVerified,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        role: knownUser?.role || 'user',
        photoURL: getAvatarUrl(knownUser?.image, displayName)
      };

      // Add organization only if it exists in knownUser
      const userData: IUser = knownUser?.organization 
        ? { ...baseUserData, organization: knownUser.organization }
        : baseUserData;

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      // Send verification email but don't wait for it
      sendEmailVerification(firebaseUser).catch(console.error);

      return userData;
    } catch (error) {
      console.error('SignUp error:', error);
      if (error instanceof Error) {
        throw new Error(`Registration failed: ${error.message}`);
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
}

export const authService = new AuthService();

export async function isKnownEmail(email: string): Promise<boolean> {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

export async function registerKnownUser(email: string, password: string): Promise<void> {
  try {
    // Check if email is in known users CSV
    const knownUserData = await findKnownUser(email);
    
    if (!knownUserData) {
      throw new Error('Email not found in authorized users list');
    }

    // Create the new auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update their profile with pre-populated data
    await firebaseUpdateProfile(userCredential.user, {
      displayName: knownUserData.displayName,
      photoURL: knownUserData.photoURL || null
    });

    // Create their Firestore document with pre-populated data
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: email,
      displayName: knownUserData.displayName,
      photoURL: knownUserData.photoURL || null,
      role: knownUserData.role || 'user',
      organization: knownUserData.organization,
      createdAt: new Date().toISOString(),
      authComplete: true
    });

    // Send verification email
    await sendEmailVerification(userCredential.user);

  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
} 