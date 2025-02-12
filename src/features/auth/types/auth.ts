export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  role: UserRole;
  metadata?: Record<string, any>;
}

export type UserRole = 'student' | 'teacher' | 'admin';

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
  updateProfile: (updates: Partial<IUser>) => Promise<void>;
} 