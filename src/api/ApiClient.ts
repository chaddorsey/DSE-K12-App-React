/**
 * API Client with network resilience and type safety.
 * Handles all API communication with automatic retry and error handling.
 */

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
   * @param options - Configuration options
   */
  constructor(
    private networkClient: NetworkClient,
    private options: {
      baseUrl: string;
      defaultHeaders?: Record<string, string>;
    }
  ) {}

  /**
   * Make a type-safe request to the API
   */
  public async request<P extends EndpointPath>(
    path: P,
    options?: IRequestOptions<RequestBody<P>>
  ): Promise<ResponseType<P>> {
    try {
      const endpoint = this.getEndpointConfig(path);
      const method = endpoint.method as ExtractMethod<typeof endpoints, P>;

      const requestInit = {
        method,
        headers: {
          ...this.options.defaultHeaders,
          ...options?.headers
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
        cache: options?.cache,
        batch: options?.batch,
        retryOptions: {
          maxAttempts: options?.retryAttempts
        }
      };

      logger.info(`API Request: ${method} ${endpoint.path}`, {
        path,
        method,
        hasBody: !!options?.body
      });

      const response = await this.networkClient.fetch<ResponseType<P>>(
        endpoint.path,
        requestInit
      );

      return response;
    } catch (err) {
      logger.error(`API Error: ${path}`, err as Error);
      throw this.handleError(err);
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