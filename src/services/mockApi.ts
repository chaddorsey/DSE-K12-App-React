/**
 * Mock API service for development and testing
 */

import type { IDashboardData, IUser, IUserSettings } from '../api/types/models';
import { logger } from '../utils/logger';

const MOCK_DELAY = 1000;
const ERROR_RATE = 0.0; // Set to 0 to disable random errors during development

const mockData = {
  auth: {
    login: {
      token: 'mock-auth-token',
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'user',
        preferences: {
          theme: 'light',
          notifications: true
        }
      }
    },
    logout: { success: true }
  },
  users: {
    profile: {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      displayName: 'Test User',
      avatarUrl: 'https://example.com/avatar.jpg',
      preferences: {
        theme: 'light',
        notifications: true
      }
    },
    settings: {
      theme: 'light',
      notifications: true,
      language: 'en',
      timezone: 'UTC'
    }
  },
  dashboard: {
    overview: {
      stats: {
        views: 1000,
        interactions: 750,
        conversions: 50
      },
      recentActivity: [
        {
          id: '1',
          type: 'view',
          timestamp: '2024-01-01T12:00:00Z'
        },
        {
          id: '2',
          type: 'interaction',
          timestamp: '2024-01-01T12:05:00Z'
        }
      ]
    }
  }
};

export const mockApi = {
  async request<T>(endpoint: string, _options?: RequestInit): Promise<T> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    // Simulate random errors if enabled
    if (ERROR_RATE > 0 && Math.random() < ERROR_RATE) {
      const error = new Error('Mock API error');
      logger.error('Mock API error', { endpoint, error });
      throw error;
    }

    // Split endpoint path and traverse mock data
    const parts = endpoint.split('.');
    let data: any = mockData;

    for (const part of parts) {
      data = data[part];
      if (!data) {
        const error = new Error(`No mock data for endpoint: ${endpoint}`);
        logger.error('Mock API error', { endpoint, error });
        throw error;
      }
    }

    logger.info('Mock API request successful', { endpoint });
    return data as T;
  }
}; 