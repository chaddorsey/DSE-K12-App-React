export type UserRole = 'user' | 'manager' | 'admin';

export interface IUser {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
  role: UserRole;
  metadata: Record<string, unknown>;
  onboardingCompleted: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
}

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
  image?: string | null;
  role?: UserRole;
  organization?: string;
} 