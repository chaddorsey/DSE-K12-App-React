/**
 * Core API client with monitoring and error handling
 */

import { MonitoringService } from '../monitoring/MonitoringService';

interface IRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

interface IApiClient {
  get<T>(url: string, config?: IRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: IRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: IRequestConfig): Promise<T>;
  delete<T>(url: string, config?: IRequestConfig): Promise<T>;
}

interface IFullRequestConfig extends IRequestConfig {
  method: string;
  url: string;
  data?: unknown;
}

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiClient implements IApiClient {
  private monitoring: MonitoringService;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.monitoring = MonitoringService.getInstance();
  }

  async get<T>(url: string, config?: IRequestConfig): Promise<T> {
    return this.request<T>({
      method: 'GET',
      url,
      ...config
    });
  }

  async post<T>(url: string, data?: unknown, config?: IRequestConfig): Promise<T> {
    return this.request<T>({
      method: 'POST',
      url,
      data,
      ...config
    });
  }

  async put<T>(url: string, data?: unknown, config?: IRequestConfig): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
      ...config
    });
  }

  async delete<T>(url: string, config?: IRequestConfig): Promise<T> {
    return this.request<T>({
      method: 'DELETE',
      url,
      ...config
    });
  }

  private async request<T>(config: IFullRequestConfig): Promise<T> {
    const startTime = Date.now();
    const retries = config.retries ?? 1;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await this.executeRequest<T>(config);
        
        // Track successful request
        this.monitoring.trackPerformance({
          name: `api_${config.method.toLowerCase()}`,
          duration: Date.now() - startTime,
          success: true,
          metadata: {
            url: config.url,
            attempt: attempt + 1
          }
        });

        return response;
      } catch (error) {
        lastError = error as Error;
        
        // Track failed attempt
        this.monitoring.trackError(error as Error, {
          url: config.url,
          attempt: attempt + 1,
          method: config.method
        });

        // Don't retry on client errors (4xx)
        if (error instanceof ApiError && error.status && error.status < 500) {
          throw error;
        }

        // Last attempt, throw the error
        if (attempt === retries - 1) {
          throw error;
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }

    throw lastError;
  }

  private async executeRequest<T>(config: IFullRequestConfig): Promise<T> {
    const url = new URL(config.url, this.baseUrl);
    
    // Add query parameters
    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: config.method,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      body: config.data ? JSON.stringify(config.data) : undefined,
      signal: config.timeout 
        ? AbortSignal.timeout(config.timeout)
        : undefined
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.code || 'API_ERROR',
        errorData.message || response.statusText,
        response.status,
        errorData
      );
    }

    return response.json();
  }
} 