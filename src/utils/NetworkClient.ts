/**
 * NetworkClient: Handles network requests with retry logic and network status monitoring.
 * Designed for hotel/conference environments with unreliable WiFi.
 */

import { NetworkMonitor } from './NetworkMonitor';
import { IRetryPolicy, retryPolicies } from './retryPolicy';
import { RequestBatcher, IBatchConfig } from './batch/RequestBatcher';
import { CacheManager, ICacheConfig } from './cache/CacheManager';
import { logger } from './logger';
import { OfflineError, PortalRedirectError, HttpError } from '../errors/NetworkError';
import { NetworkError } from '../errors/NetworkError';

/**
 * Network client configuration interface
 */
export interface INetworkClientConfig {
  /** Base URL for all requests */
  baseUrl?: string;
  /** Retry policy for this client */
  retryPolicy?: IRetryPolicy;
  /** Cache configuration */
  cacheConfig?: ICacheConfig;
  /** Batch configuration */
  batch?: IBatchConfig;
}

/**
 * Network request initialization options
 */
export interface INetworkRequestInit extends RequestInit {
  /** Expected response type */
  responseType?: 'json' | 'text' | 'blob';
  /** Cache options for this request */
  cacheConfig?: ICacheConfig;
  /** Batch options for this request */
  batch?: IBatchConfig | false; // false to disable batching for this request
  /** Standard fetch cache option */
  cache?: RequestCache;
}

interface IRequestConfig extends RequestInit {
  retry?: {
    maxAttempts: number;
    backoffMs: number;
  };
  timeout?: number;
  cache?: RequestCache;
}

const DEFAULT_CONFIG: IRequestConfig = {
  retry: {
    maxAttempts: 3,
    backoffMs: 1000
  },
  timeout: 5000,
  cache: 'default'
};

export class NetworkClient {
  private monitor: NetworkMonitor;
  private config: Required<INetworkClientConfig>;
  private cache: CacheManager;
  private batcher: RequestBatcher;

  /**
   * Creates a new NetworkClient instance
   * @param monitor - Network monitor instance for status tracking
   * @param config - Client configuration options
   */
  constructor(monitor: NetworkMonitor, config: INetworkClientConfig = {}) {
    this.monitor = monitor;
    this.config = {
      baseUrl: '',
      retryPolicy: retryPolicies.default,
      cacheConfig: { ttl: 5 * 60 * 1000, maxEntries: 100, storage: 'memory' },
      batch: { maxSize: 10, delay: 50, groupBy: req => req.url },
      ...config
    };
    this.cache = new CacheManager(this.config.cacheConfig);
    this.batcher = new RequestBatcher(this.config.batch);
  }

  /**
   * Make a fetch request with retry logic
   * @param input - Request URL or info
   * @param init - Request initialization options
   * @returns Promise resolving to the parsed response
   * @throws {OfflineError} When network is offline
   * @throws {PortalRedirectError} When portal redirect is detected
   * @throws {HttpError} When server returns an error status
   */
  public async fetch<T>(
    input: RequestInfo,
    init?: INetworkRequestInit
  ): Promise<T> {
    const url = typeof input === 'string' 
      ? `${this.config.baseUrl}${input}`
      : input;

    // Try cache first for GET requests
    if ((!init?.method || init.method === 'GET') && init?.cacheConfig !== undefined) {
      const cached = this.cache.get<T>(url.toString());
      if (cached) {
        console.log(`Cache hit: ${url}`);
        return cached;
      }
    }

    // Create request object with proper typing
    const requestInit: RequestInit = {
      ...init,
      cache: init?.cache
    };
    const request = new Request(url, requestInit);

    // Use batching for GET requests unless disabled
    if (request.method === 'GET' && init?.batch !== false) {
      const batchConfig = { ...this.config.batch, ...init?.batch };
      const response = await this.batcher.add(request);
      const data = await this.parseResponse<T>(response, init?.responseType);

      // Cache successful GET responses
      if (init?.cacheConfig !== undefined) {
        this.cache.set(url.toString(), data, init.cacheConfig);
      }

      return data;
    }

    // For non-GET or non-batched requests, use normal fetch with retry
    return this.withRetry<T>(() => this.doFetch(request, init));
  }

  /**
   * Make a GET request with retry logic
   * @param url - Request URL
   * @param init - Request initialization options
   * @returns Promise resolving to the parsed response
   * @throws {OfflineError} When network is offline
   * @throws {PortalRedirectError} When portal redirect is detected
   * @throws {HttpError} When server returns an error status
   */
  public async get<T>(
    url: string,
    init?: Omit<INetworkRequestInit, 'method'>
  ): Promise<T> {
    return this.fetch<T>(url, { ...init, method: 'GET' });
  }

  /**
   * Make a POST request with retry logic
   * @param url - Request URL
   * @param data - Request body data
   * @param init - Request initialization options
   * @returns Promise resolving to the parsed response
   * @throws {OfflineError} When network is offline
   * @throws {PortalRedirectError} When portal redirect is detected
   * @throws {HttpError} When server returns an error status
   */
  public async post<T>(
    url: string,
    data?: unknown,
    init?: Omit<INetworkRequestInit, 'method' | 'body'>
  ): Promise<T> {
    return this.fetch<T>(url, {
      ...init,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers
      }
    });
  }

  /**
   * Execute request with retry logic
   * @param request - Function that returns a Promise
   * @returns Promise resolving to the request result
   * @private
   */
  private async withRetry<T>(request: () => Promise<T>): Promise<T> {
    let attempt = 1;
    let lastError: Error = new Error('Unknown error'); // Initialize with default error

    while (attempt <= this.config.retryPolicy.maxAttempts) {
      try {
        return await request();
      } catch (err: unknown) {
        lastError = err as Error;
        console.log(`Request failed (attempt ${attempt})`, lastError);

        if (!this.config.retryPolicy.shouldRetry(lastError)) {
          break;
        }

        if (attempt < this.config.retryPolicy.maxAttempts) {
          const delay = this.calculateDelay(attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        attempt++;
      }
    }

    throw lastError;
  }

  private calculateDelay(attempt: number): number {
    const { initialDelay, maxDelay } = this.config.retryPolicy;
    const delay = Math.min(
      initialDelay * Math.pow(2, attempt - 1),
      maxDelay
    );
    // Add jitter to prevent thundering herd
    return delay * (0.8 + Math.random() * 0.4);
  }

  /**
   * Execute fetch request with common error handling
   * @param request - Request object
   * @param init - Request initialization options
   * @returns Promise resolving to the parsed response
   * @private
   */
  private async doFetch<T>(
    request: Request,
    init?: INetworkRequestInit
  ): Promise<T> {
    if (!this.monitor.getStatus().isOnline) {
      throw new OfflineError();
    }

    const response = await fetch(request);

    if (this.monitor.detectPortalRedirect(response)) {
      throw new PortalRedirectError();
    }

    if (!response.ok) {
      throw new HttpError(`HTTP error! status: ${response.status}`, response.status);
    }

    return this.parseResponse<T>(response, init?.responseType);
  }

  private async parseResponse<T>(
    response: Response,
    responseType: INetworkRequestInit['responseType'] = 'json'
  ): Promise<T> {
    switch (responseType) {
      case 'text':
        return response.text() as Promise<T>;
      case 'blob':
        return response.blob() as Promise<T>;
      case 'json':
      default:
        return response.json();
    }
  }

  async checkConnection(): Promise<boolean> {
    const status = await this.monitor.checkConnection();
    return status.isOnline;
  }

  async request(url: string, config: Partial<IRequestConfig> = {}): Promise<Response> {
    const finalConfig = this.mergeConfig(config);
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= finalConfig.retry!.maxAttempts; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, finalConfig);
        
        if (!response.ok) {
          throw new NetworkError(
            `HTTP error ${response.status}`,
            response.status,
            await response.text()
          );
        }
        
        return response;
      } catch (error) {
        lastError = error as Error;
        logger.warn(`Request failed (attempt ${attempt})`, { error, url });
        
        if (attempt < finalConfig.retry!.maxAttempts) {
          await this.delay(this.getBackoffTime(attempt, finalConfig.retry!.backoffMs));
        }
      }
    }

    throw lastError || new Error('Request failed');
  }

  private mergeConfig(config: Partial<IRequestConfig>): IRequestConfig {
    return {
      ...DEFAULT_CONFIG,
      ...this.config,
      ...config,
      retry: {
        ...DEFAULT_CONFIG.retry,
        ...this.config.retryPolicy,
        ...config.retry
      }
    };
  }

  private async fetchWithTimeout(url: string, config: IRequestConfig): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      return response;
    } finally {
      clearTimeout(timeout);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getBackoffTime(attempt: number, baseMs: number): number {
    return Math.min(baseMs * Math.pow(2, attempt - 1), 10000);
  }
} 