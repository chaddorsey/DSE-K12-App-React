import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as FirebaseUser, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, setDoc, collection, query, limit, getDocs, where, updateDoc } from 'firebase/firestore';
import { MonitoringService } from '@/monitoring/MonitoringService';
import { logger } from '../../utils/logger';
import { AuthService } from './services/AuthService';
import { IAnalyticsEvent } from '@/monitoring/types';
import { onAuthStateChanged } from 'firebase/auth';

// Only import dev service in development
const devDataService = process.env.NODE_ENV === 'development' 
  ? require('../../services/devDataService').devDataService 
  : null;

const isDevelopment = process.env.NODE_ENV === 'development';
const useDummyAuth = process.env.REACT_APP_USE_DUMMY_AUTH === 'true';

// Extend Firebase user with our custom fields
export interface User extends FirebaseUser {
  department?: string;
  interests?: string[];
  onboardingCompleted?: boolean;
}

// Add custom error type
interface AuthError extends Error {
  type?: string;
  code?: string;
}

// Update IAuthContext interface to match implementation
interface IAuthContext {
  user: User | null;
  userClaims: { role?: string } | null;
  loading: boolean;
  initialLoadComplete: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInAnonymously: (mode: "dummy" | "real") => Promise<void>;
  // ... other methods
}

const AuthContext = createContext<IAuthContext | null>(null);

interface AuthMode {
  type: 'real' | 'dummy';
  active: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userClaims, setUserClaims] = useState<{ role?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>(() => ({
    type: process.env.REACT_APP_USE_DUMMY_AUTH === 'true' ? 'dummy' : 'real',
    active: true
  }));
  const authService = new AuthService();
  const monitoring = MonitoringService.getInstance();

  // Fetch additional user data from Firestore
  const enrichUserData = async (firebaseUser: FirebaseUser): Promise<User> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      const userData = userDoc.data();
      
      return {
        ...firebaseUser,
        department: userData?.department,
        interests: userData?.interests,
        onboardingCompleted: userData?.onboardingCompleted
      };
    } catch (error) {
      logger.error('Error fetching user data:', error);
      return firebaseUser as User;
    }
  };

  // Development helper to get a random dummy user
  const getRandomDummyUser = async (): Promise<User | null> => {
    if (process.env.NODE_ENV !== 'development') {
      return null;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef, 
        where('isDummy', '==', true),
        limit(1)
      );
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        if (devDataService) {
          await devDataService.seedDummyUsers();
        }
        return getRandomDummyUser();
      }

      const userData = snapshot.docs[0].data();
      return userData as User;
    } catch (error) {
      logger.error('Error getting dummy user:', error);
      return null;
    }
  };

  // Switch between real and dummy auth
  const switchAuthMode = async (mode: 'real' | 'dummy') => {
    if (!isDevelopment) {
      logger.warn('Auth mode switching is only available in development');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'dummy') {
        await firebaseSignOut(auth); // Sign out any real user
        const dummyUser = await getRandomDummyUser();
        setUser(dummyUser);
        setAuthMode({ type: 'dummy', active: true });
      } else {
        setUser(null);
        setAuthMode({ type: 'real', active: true });
      }
    } catch (error) {
      logger.error('Error switching auth mode:', error);
      setError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isDevelopment) {
      // In production, always use real auth
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        try {
          if (firebaseUser) {
            // Check if verification status changed
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists() && userDoc.data().emailVerified !== firebaseUser.emailVerified) {
              await updateDoc(doc(db, 'users', firebaseUser.uid), {
                emailVerified: firebaseUser.emailVerified
              });
            }

            const userData = await enrichUserData(firebaseUser);
            setUser(userData);
            const token = await userData.getIdTokenResult();
            setUserClaims(token.claims as { role?: string });
          } else {
            setUser(null);
            setUserClaims(null);
          }
        } catch (error) {
          logger.error('Auth state change error:', error);
          setError(error as AuthError);
        } finally {
          setLoading(false);
          setInitialLoadComplete(true);
        }
      });
      return unsubscribe;
    }

    if (authMode.type === 'dummy') {
      // Use dummy auth
      getRandomDummyUser().then(dummyUser => {
        setUser(dummyUser);
        setLoading(false);
      });
      return;
    } else {
      // Use real auth
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        try {
          if (firebaseUser) {
            // Check if verification status changed
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists() && userDoc.data().emailVerified !== firebaseUser.emailVerified) {
              await updateDoc(doc(db, 'users', firebaseUser.uid), {
                emailVerified: firebaseUser.emailVerified
              });
            }

            const userData = await enrichUserData(firebaseUser);
            setUser(userData);
            const token = await userData.getIdTokenResult();
            setUserClaims(token.claims as { role?: string });
          } else {
            setUser(null);
            setUserClaims(null);
          }
        } catch (error) {
          logger.error('Auth state change error:', error);
          setError(error as AuthError);
        } finally {
          setLoading(false);
          setInitialLoadComplete(true);
        }
      });
      return unsubscribe;
    }
  }, [authMode.type]);

  const handleError = (error: unknown) => {
    const authError: AuthError = error instanceof Error ? error : new Error('An unknown error occurred');
    if (error instanceof Error) {
      authError.type = 'auth_error';
    }
    setError(authError);
    
    monitoring.trackError(
      'auth_error',  // eventName: string
      authError,     // error: Error
      {             // metadata?: Record<string, unknown>
        timestamp: new Date(),
        context: 'auth_flow',
        errorType: authError.type,
        errorCode: authError.code
      }
    );
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await authService.signIn(email, password);
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const signInAnonymously = async (mode: "dummy" | "real"): Promise<void> => {
    // Implementation
  };

  const signOut = async (): Promise<void> => {
    try {
      await auth.signOut();
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const value: IAuthContext = {
    user,
    userClaims,
    loading,
    initialLoadComplete,
    error,
    signIn,
    signOut,
    signInAnonymously: signInAnonymously!, // Assert non-null since we know it's defined
    // ... other methods
  };

  return (
    <AuthContext.Provider value={value}>
      {!initialLoadComplete ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 