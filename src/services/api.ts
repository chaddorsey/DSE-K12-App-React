import { config } from '../config';

const API_URL = config.apiUrl;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
}

export const apiClient = {
  request: async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    const {
      method = 'GET',
      headers = {},
      body
    } = options;

    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  get: async <T>(endpoint: string, headers = {}): Promise<T> => {
    return apiClient.request<T>(endpoint, { method: 'GET', headers });
  },

  post: async <T>(endpoint: string, data?: any, headers = {}): Promise<T> => {
    return apiClient.request<T>(endpoint, {
      method: 'POST',
      headers,
      body: data
    });
  },

  put: async <T>(endpoint: string, data?: any, headers = {}): Promise<T> => {
    return apiClient.request<T>(endpoint, {
      method: 'PUT',
      headers,
      body: data
    });
  },

  delete: async <T>(endpoint: string, headers = {}): Promise<T> => {
    return apiClient.request<T>(endpoint, {
      method: 'DELETE',
      headers
    });
  }
}; 