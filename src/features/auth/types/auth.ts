export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  role: UserRole;
  metadata?: Record<string, any>;
}

export type UserRole = 'user' | 'admin';

export interface IAuthState {
  user: IUser | null;
  loading: boolean;
  error: Error | null;
  initialized: boolean;
}

export interface IAuthContext extends IAuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: { displayName?: string; photoURL?: string }) => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface KnownUser {
  email: string;
  displayName: string;
  role: UserRole;
  organization?: string;
  image?: string;
  // Add any other pre-known fields
} 