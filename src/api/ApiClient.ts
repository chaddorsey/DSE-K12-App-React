/**
 * API Client with network resilience and type safety.
 * Handles all API communication with automatic retry and error handling.
 */

import { mockApi } from '../services/mockApi';
import { NetworkClient } from '../utils/NetworkClient';
import { endpoints, EndpointPath, ResponseType, RequestBody, ExtractMethod } from './types/endpoints';
import { ApiErrorHandler } from './ApiErrorHandler';
import { logger } from '../utils/logger';
import type { ApiError } from '../errors/ApiError';

export interface IRequestOptions<TBody = unknown> {
  body?: TBody;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  cache?: boolean;
  batch?: boolean;
  retryAttempts?: number;
}

export class ApiClient {
  private errorHandler: ApiErrorHandler;

  /**
   * Creates a new API client instance
   * @param networkClient - Network client for making HTTP requests
   * @param config - Configuration options
   * @param errorHandler - Optional error handler for custom error handling logic
   */
  constructor(
    private networkClient: NetworkClient,
    private config: { baseUrl: string },
    errorHandler?: ApiErrorHandler
  ) {
    this.errorHandler = errorHandler || new ApiErrorHandler();
  }

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
      logger.info('API request successful', { path });
      return data;
    } catch (error) {
      const apiError = this.errorHandler.handleError(error, path);
      const recovery = this.errorHandler.getRecoveryAction(apiError);

      if (recovery) {
        logger.info('Attempting error recovery', { path, error: apiError });
        await recovery();
      }

      throw apiError;
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
} 