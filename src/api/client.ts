/**
 * Core API client with monitoring and error handling
 */

import { MonitoringService } from '../monitoring/MonitoringService';
import { mockApi } from '../services/mockApi';

interface IRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
}

export class ApiClient {
  constructor(
    private baseUrl: string,
    private defaultHeaders: Record<string, string> = {}
  ) {}

  async get<T>(endpoint: string, config: IRequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...config
    });
  }

  async post<T>(endpoint: string, data?: unknown, config: IRequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      ...config
    });
  }

  async put<T>(endpoint: string, data?: unknown, config: IRequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      ...config
    });
  }

  async delete<T>(endpoint: string, config: IRequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...config
    });
  }

  private async request<T>(endpoint: string, config: RequestInit & IRequestConfig): Promise<T> {
    const startTime = performance.now();

    try {
      // For development, use mockApi
      if (process.env.NODE_ENV === 'development') {
        return await mockApi.request<T>(endpoint, config);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...config,
        headers: {
          ...this.defaultHeaders,
          ...config.headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      MonitoringService.getInstance().trackPerformance({
        type: 'api_request',
        duration: performance.now() - startTime,
        success: true,
        endpoint
      });

      return data;
    } catch (error) {
      MonitoringService.getInstance().trackPerformance({
        type: 'api_request',
        duration: performance.now() - startTime,
        success: false,
        endpoint
      });

      throw error;
    }
  }
} 