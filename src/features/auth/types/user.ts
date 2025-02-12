export interface IUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
  role: UserRole;
  isEmailVerified: boolean;
  metadata?: Record<string, any>;
}

export type UserRole = 'student' | 'teacher' | 'admin';

export interface IUserProfile extends IUser {
  bio?: string;
  school?: string;
  grade?: string;
  subjects?: string[];
  interests?: string[];
  connections?: string[];
} 