/**
 * Authentication context and provider
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<IAuthState>(initialState);
  const monitoring = MonitoringService.getInstance();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userData = await authService.getUserData(firebaseUser.uid);
          setState(prev => ({
            ...prev,
            user: userData,
            loading: false,
            initialized: true
          }));
          monitoring.trackEvent({
            type: 'auth',
            category: 'user',
            action: 'state_changed',
            label: 'signed_in',
            metadata: { uid: userData.uid }
          });
        } else {
          setState(prev => ({
            ...prev,
            user: null,
            loading: false,
            initialized: true
          }));
          monitoring.trackEvent({
            type: 'auth',
            category: 'user',
            action: 'state_changed',
            label: 'signed_out'
          });
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error : new Error('Authentication error'),
          loading: false,
          initialized: true
        }));
        monitoring.trackError(
          'auth_error',
          new Error('Auth state change failed'),
          { context: 'auth_state_change' }
        );
      }
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

  const updateProfile = async (updates: Partial<IUser>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      if (!state.user) throw new Error('No user logged in');
      // Implementation pending
      setState(prev => ({ ...prev, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Profile update failed'),
        loading: false
      }));
    }
  };

  const value: IAuthContext = {
    ...state,
    signIn,
    signOut,
    signUp,
    resetPassword,
    updateProfile
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