/**
 * Authentication context and provider
 */

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { onAuthStateChanged, updateProfile as firebaseUpdateProfile } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { authService } from '../services/AuthService';
import { IUser, IAuthContext, IAuthState } from '../types/auth';
import { MonitoringService } from '@/monitoring/MonitoringService';
import { IAnalyticsEvent } from '@/monitoring/types';

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const initialState: IAuthState = {
  user: null,
  loading: true,
  error: null,
  initialized: false
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<IAuthState>({
    user: null,
    loading: true,
    error: null,
    initialized: false
  });
  const monitoring = MonitoringService.getInstance();
  const isInitialMount = useRef(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log('Firebase user:', firebaseUser);
        // Convert Firebase user to our IUser type
        const user: IUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        };
        setState(prev => ({ ...prev, user, loading: false, initialized: true }));
        if (!isInitialMount.current) {
          monitoring.trackEvent({
            type: 'auth',
            category: 'user',
            action: 'state_changed',
            label: 'signed_in',
            metadata: { uid: user.uid }
          });
        }
      } else {
        setState(prev => ({ ...prev, user: null, loading: false, initialized: true }));
        if (!isInitialMount.current) {
          monitoring.trackEvent({
            type: 'auth',
            category: 'user',
            action: 'state_changed',
            label: 'signed_out'
          });
        }
      }
      isInitialMount.current = false;
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const userData = await authService.signIn(email, password);
      setState(prev => ({ ...prev, user: userData, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Sign in failed'),
        loading: false
      }));
    }
  };

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await authService.signOut();
      setState(prev => ({ ...prev, user: null, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Sign out failed'),
        loading: false
      }));
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const userData = await authService.signUp(email, password, displayName);
      setState(prev => ({ ...prev, user: userData, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Sign up failed'),
        loading: false
      }));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await authService.resetPassword(email);
      setState(prev => ({ ...prev, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Password reset failed'),
        loading: false
      }));
    }
  };

  const updateProfile = async (updates: {
    displayName?: string | null;
    photoURL?: string | null;
  }) => {
    if (!auth.currentUser) {
      throw new Error('No authenticated user');
    }

    try {
      console.log('Updating user profile with:', updates);
      await firebaseUpdateProfile(auth.currentUser, updates);
      
      // Force a refresh of the user object
      const user = auth.currentUser;
      if (user) {
        await user.reload();
      }
      
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    if (auth.currentUser) {
      // Force a reload of the user's data
      await auth.currentUser.reload();
      // Update our state with the fresh data
      setState(prev => ({
        ...prev,
        user: auth.currentUser
      }));
    }
  };

  const updateUserProfile = async (updates: { photoURL?: string | null, displayName?: string }) => {
    if (!auth.currentUser) throw new Error('No authenticated user');
    
    try {
      // Create a clean update object with photoURL as empty string when null
      const cleanUpdates = {
        photoURL: updates.photoURL === null ? '' : (updates.photoURL ?? '')
      };

      console.log('Updating user profile with:', cleanUpdates);
      
      // Use the Firebase update profile function directly
      await firebaseUpdateProfile(auth.currentUser, cleanUpdates);
      
      // Force a refresh of the user data
      await auth.currentUser.reload();
      
      // Update local state with fresh user data
      setState(prev => ({
        ...prev,
        user: auth.currentUser
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile');
    }
  };

  const value: IAuthContext = {
    ...state,
    signIn,
    signOut,
    signUp,
    resetPassword,
    updateProfile,
    refreshUser,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext; 