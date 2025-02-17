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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const knownUser = await this.getKnownUserData(email);
      
      const userData: IUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: knownUser?.displayName || null,
        emailVerified: userCredential.user.emailVerified,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        role: 'user',
        photoURL: knownUser?.image || null,
        isAnonymous: false,
        phoneNumber: null,
        metadata: {},
        onboardingCompleted: false
      };

      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, userData);

      await sendEmailVerification(userCredential.user);

      return userData;
    } catch (error) {
      console.error('SignUp error:', error);
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