/**
 * API Client with network resilience and type safety.
 * Handles all API communication with automatic retry and error handling.
 */

import { mockApi } from '../services/mockApi';
import { NetworkClient } from '../utils/NetworkClient';
import { endpoints, EndpointPath, ResponseType, RequestBody, ExtractMethod } from './types/endpoints';
import { ApiError } from './types/errors';
import { logger } from '../utils/logger';

export interface IRequestOptions<TBody = unknown> {
  body?: TBody;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  cache?: boolean;
  batch?: boolean;
  retryAttempts?: number;
}

export class ApiClient {
  /**
   * Creates a new API client instance
   * @param networkClient - Network client for making HTTP requests
   * @param config - Configuration options
   */
  constructor(
    private networkClient: NetworkClient,
    private config: { baseUrl: string }
  ) {}

  /**
   * Make a type-safe request to the API
   */
  public async request<P extends EndpointPath>(
    path: P,
    options: RequestInit = {}
  ): Promise<ResponseType<P>> {
    try {
      // Use mock API in development
      if (process.env.NODE_ENV === 'development') {
        return await mockApi.request<ResponseType<P>>(path);
      }

      const response = await this.networkClient.request(
        `${this.config.baseUrl}${path}`,
        options
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      logger.error('API request failed', error);
      throw this.handleError(error);
    }
  }

  private getEndpointConfig(path: string) {
    const parts = path.split('.');
    let config: any = endpoints;
    
    for (const part of parts) {
      config = config[part];
      if (!config) {
        throw new Error(`Invalid endpoint path: ${path}`);
      }
    }

    return config;
  }

  /**
   * Standardize error handling across all requests
   * @param error - Original error from request
   * @returns Never - always throws an ApiError
   * @throws {ApiError} Standardized API error
   * @private
   */
  private handleError(error: unknown): never {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error',
      500,
      'UNKNOWN_ERROR'
    );
  }
} 