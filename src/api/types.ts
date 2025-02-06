/**
 * Common types for API client interactions
 */

import { IBatchConfig } from '../utils/batch/RequestBatcher';
import { ICacheConfig } from '../utils/cache/CacheManager';

export interface IApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export interface IRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
  retryAttempts?: number;
  batch?: IBatchConfig | false;
  cache?: ICacheConfig | false;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Type-safe endpoint definitions
export const endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },
  users: {
    profile: '/users/profile',
    settings: '/users/settings'
  }
} as const; 