/**
 * API data models
 */

export interface IDashboardData {
  stats: {
    views: number;
    interactions: number;
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    timestamp: string;
    description: string;
  }>;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
}

export interface IUserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  timezone: string;
} 