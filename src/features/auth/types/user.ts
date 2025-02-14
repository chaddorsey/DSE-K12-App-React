import { User as FirebaseUser } from 'firebase/auth';

export interface IUser extends Omit<FirebaseUser, 'metadata'> {
  role: UserRole;
  metadata?: Record<string, any>;
}

export type UserRole = 'student' | 'teacher' | 'admin';

export interface IUserStats {
  questionsAnswered: number;
  quizzesTaken: number;
  accurateGuesses: number;
  lastUpdated: Date;
}

export interface IUserPreferences {
  notifications: boolean;
  privacy: 'public' | 'friends' | 'private';
  theme?: 'light' | 'dark';
  language?: string;
  timezone?: string;
}

export interface IUserProfile extends IUser {
  bio?: string;
  school?: string;
  grade?: string;
  subjects?: string[];
  interests?: string[];
  connections?: string[];
  stats: IUserStats;
  preferences: IUserPreferences;
}

export interface IUserSettings {
  language: string;
  timezone: string;
  theme?: 'light' | 'dark';
  notifications?: boolean;
  emailFrequency?: 'daily' | 'weekly' | 'never';
} 