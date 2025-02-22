import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User as FirebaseUser, signInWithEmailAndPassword, signOut as firebaseSignOut, createUserWithEmailAndPassword, updateProfile, getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, setDoc, collection, query, limit, getDocs, where, updateDoc } from 'firebase/firestore';
import { MonitoringService } from '@/monitoring/MonitoringService';
import { logger } from '../../utils/logger';
import { AuthService } from './services/AuthService';
import { IAnalyticsEvent } from '@/monitoring/types';
import type { User, UserRole } from './types/auth';
import { LoadingSpinner } from '@/components/LoadingSpinner';

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
  isAnonymous: boolean;
  phoneNumber: string | null;
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
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInAnonymously: (mode: "dummy" | "real") => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  // ... other methods
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface AuthMode {
  type: 'real' | 'dummy';
  active: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    loading: boolean;
    error: Error | null;
    initialized: boolean;
  }>({
    user: null,
    loading: true,
    error: null,
    initialized: false
  });
  
  const mountedRef = useRef(true);

  useEffect(() => {
    logger.info('AuthProvider initializing');
    let unsubscribed = false;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (unsubscribed) return;

      logger.info('Auth state changed:', { 
        hasUser: !!firebaseUser, 
        uid: firebaseUser?.uid,
        timestamp: new Date().toISOString()
      });

      try {
        // Always set loading true when auth state changes
        setAuthState(prev => ({ 
          ...prev, 
          loading: true,
          initialized: true 
        }));

        if (firebaseUser) {
          // Get user doc from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          const userData: User = {
            id: firebaseUser.uid,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: userDoc.exists() ? userDoc.data()?.role || 'user' : 'user',
            isNewUser: !userDoc.exists(),
            createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
            lastLoginAt: firebaseUser.metadata.lastSignInTime || new Date().toISOString(),
            metadata: userDoc.exists() ? userDoc.data()?.metadata || {} : {},
            onboardingCompleted: userDoc.exists() ? userDoc.data()?.onboardingCompleted || false : false,
            isAnonymous: firebaseUser.isAnonymous,
            phoneNumber: firebaseUser.phoneNumber
          };

          logger.info('Setting complete user data:', { 
            uid: userData.uid, 
            email: userData.email,
            timestamp: new Date().toISOString()
          });
          
          if (!unsubscribed) {
            setAuthState({
              user: userData,
              loading: false,
              error: null,
              initialized: true
            });
          }
        } else {
          logger.info('No firebase user, clearing auth state');
          if (!unsubscribed) {
            setAuthState({
              user: null,
              loading: false,
              error: null,
              initialized: true
            });
          }
        }
      } catch (error) {
        logger.error('Error in auth state change:', error);
        if (!unsubscribed) {
          setAuthState({
            user: null,
            loading: false,
            error: error as Error,
            initialized: true
          });
        }
      }
    });

    return () => {
      unsubscribed = true;
      unsubscribe();
    };
  }, []);

  // Don't render children until auth is initialized
  if (!authState.initialized) {
    return <LoadingSpinner />;
  }

  const handleError = (error: unknown) => {
    const authError: AuthError = error instanceof Error ? error : new Error('An unknown error occurred');
    if (error instanceof Error) {
      authError.type = 'auth_error';
    }
    setAuthState(prev => ({ ...prev, error }));
    
    MonitoringService.getInstance().trackError(
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

  const getUserDoc = async (uid: string) => {
    const userRef = doc(db, 'users', uid);
    return await getDoc(userRef);
  };

  const createUserDoc = async (user: User) => {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName || '',
      role: 'user',
      emailVerified: user.emailVerified,
      createdAt: new Date(),
      uid: user.uid
    });
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false,
        error: error as Error 
      }));
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      logger.debug('Attempting sign out');
      await firebaseSignOut(auth);
      setAuthState(prev => ({ ...prev, user: null }));
      logger.debug('Sign out successful');
    } catch (error) {
      logger.error('Sign out error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const userData = {
        email: userCredential.user.email,
        createdAt: new Date().toISOString(),
        role: 'user' as const,
        isNewUser: true,
        onboardingCompleted: false,
        uid: userCredential.user.uid,
        id: userCredential.user.uid,
        displayName: null,
        photoURL: null,
        emailVerified: false,
        metadata: {},
        isAnonymous: false,
        phoneNumber: null
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      await auth.signOut();
      
      setAuthState(prev => ({ ...prev, loading: false }));
      return userCredential;
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false,
        error: error as Error 
      }));
      throw error;
    }
  };

  const signInAnonymously = async (mode: "dummy" | "real"): Promise<void> => {
    // Implementation
  };

  return (
    <AuthContext.Provider value={{
      user: authState.user,
      loading: authState.loading,
      error: authState.error,
      initialized: authState.initialized,
      signUp,
      signIn,
      signOut: () => auth.signOut()
    }}>
      {children}
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