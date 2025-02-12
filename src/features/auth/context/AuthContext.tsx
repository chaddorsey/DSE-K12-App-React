/**
 * Authentication context and provider
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { IUser } from '../types/user';
import { MonitoringService } from '@/monitoring/MonitoringService';
import { IAnalyticsEvent } from '@/monitoring/types';

interface AuthContextValue {
  user: IUser | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const monitoring = MonitoringService.getInstance();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          const userData: IUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || undefined,
            photoURL: firebaseUser.photoURL || undefined,
            isEmailVerified: firebaseUser.emailVerified,
            createdAt: new Date(),
            lastLoginAt: new Date(),
            role: 'student',
          };
          setUser(userData);
          monitoring.trackEvent({
            type: 'auth',
            category: 'user',
            action: 'state_changed',
            label: 'signed_in',
            metadata: { uid: userData.uid }
          });
        } else {
          setUser(null);
          monitoring.trackEvent({
            type: 'auth',
            category: 'user',
            action: 'state_changed',
            label: 'signed_out'
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Authentication error'));
        monitoring.trackError(
          'auth_error',
          new Error('Auth state change failed'),
          { context: 'auth_state_change' }
        );
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    error,
    signIn: async () => {/* implementation */},
    signOut: async () => {/* implementation */},
    signUp: async () => {/* implementation */},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext; 