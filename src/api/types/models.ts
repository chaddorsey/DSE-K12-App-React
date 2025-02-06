/**
 * API data models
 */

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface IUserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  timezone: string;
} 