import type { IDashboardData, IUser, IUserSettings } from '../api/types/models';

const MOCK_DELAY = 1000;

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

    // Simulate random failures
    if (Math.random() < 0.1) {
      throw new Error('Random API error');
    }

    const data = mockData[endpoint as keyof typeof mockData];
    if (!data) {
      throw new Error(`No mock data for endpoint: ${endpoint}`);
    }

    return data as T;
  }
}; 