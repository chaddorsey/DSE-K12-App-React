export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  role: 'user' | 'admin';
  metadata?: {
    creationTime?: string;
    lastSignInTime?: string;
  };
}

export type UserRole = 'user' | 'admin';

export interface IAuthState {
  user: IUser | null;
  loading: boolean;
  error: Error | null;
  initialized: boolean;
}

export interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  error: Error | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: { displayName?: string | null; photoURL?: string | null }) => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUserProfile: (updates: { photoURL?: string | null, displayName?: string }) => Promise<void>;
  loadUserProfile: (user: IUser) => Promise<void>;
}

export interface KnownUser {
  email: string;
  displayName: string;
  role: UserRole;
  organization?: string;
  image?: string;
  // Add any other pre-known fields
} 