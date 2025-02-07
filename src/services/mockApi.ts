import type { IDashboardData, IUser, IUserSettings } from '../api/types/models';
import { logger } from '../utils/logger';

const MOCK_DELAY = 1000;
const ERROR_RATE = 0.0; // Set to 0 to disable random errors during development

const mockData = {
  'dashboard.overview': {
    stats: {
      totalUsers: 9999,
      activeUsers: 789,
      newUsers: 56
    },
    recentActivity: [
      {
        id: '1',
        type: 'USER_SIGNUP',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        description: 'New user registered'
      },
      {
        id: '2',
        type: 'CONTENT_UPDATE',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        description: 'Content updated in section A'
      },
      {
        id: '3',
        type: 'SYSTEM_EVENT',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        description: 'System maintenance completed'
      }
    ]
  } as IDashboardData,
  'users.profile': {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://via.placeholder.com/150',
    role: 'user'
  } as IUser,
  'users.settings': {
    theme: 'light',
    notifications: true,
    language: 'en',
    timezone: 'UTC'
  } as IUserSettings
};

export const mockApi = {
  async request<T>(endpoint: string): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    // Simulate random failures (disabled for now)
    if (Math.random() < ERROR_RATE) {
      const error = new Error('Random API error');
      logger.error('Mock API error', { endpoint, error });
      throw error;
    }

    const data = mockData[endpoint as keyof typeof mockData];
    if (!data) {
      const error = new Error(`No mock data for endpoint: ${endpoint}`);
      logger.error('Mock API error', { endpoint, error });
      throw error;
    }

    logger.info('Mock API request successful', { endpoint });
    return data as T;
  }
}; 