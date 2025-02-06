/**
 * Tests for useApi hook
 */

import { renderHook, act } from '@testing-library/react';
import { useApi } from '../useApi';
import { apiClient } from '../../services/api';
import { ApiError } from '../../api/types/errors';
import type { IUser } from '../../api/types/models';

// Mock API client
jest.mock('../../services/api', () => ({
  apiClient: {
    request: jest.fn()
  }
}));

// Mock logger
jest.mock('../../utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

describe('useApi', () => {
  const mockUser: IUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful requests', async () => {
    const mockResponse = mockUser;
    (apiClient.request as jest.Mock).mockResolvedValueOnce(mockResponse);

    const onSuccess = jest.fn();
    const { result } = renderHook(() => useApi<IUser>({ onSuccess }));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();

    let promise: Promise<IUser>;
    await act(async () => {
      promise = result.current.request('users.profile');
    });

    const response = await promise!;
    expect(response).toBe(mockResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(mockResponse);
    expect(result.current.error).toBeNull();
    expect(onSuccess).toHaveBeenCalledWith(mockResponse);
  });

  it('should handle request failures', async () => {
    const mockError = new ApiError('API Error', 500);
    (apiClient.request as jest.Mock).mockRejectedValueOnce(mockError);

    const onError = jest.fn();
    const { result } = renderHook(() => useApi<IUser>({ onError }));

    await act(async () => {
      try {
        await result.current.request('users.profile');
        fail('Should have thrown');
      } catch (err) {
        expect(err).toBe(mockError);
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(mockError);
    expect(result.current.errorMessage).toBeDefined();
    expect(onError).toHaveBeenCalledWith(mockError);
  });

  it('should preserve data on error if no body in request', async () => {
    const mockResponse = mockUser;
    (apiClient.request as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useApi<IUser>());

    // First request succeeds
    await act(async () => {
      await result.current.request('users.profile');
    });

    expect(result.current.data).toBe(mockResponse);

    // Second request fails
    const mockError = new ApiError('API Error', 500);
    (apiClient.request as jest.Mock).mockRejectedValueOnce(mockError);

    await act(async () => {
      try {
        await result.current.request('users.profile');
        fail('Should have thrown');
      } catch (err) {
        expect(err).toBe(mockError);
      }
    });

    // Data should be preserved
    expect(result.current.data).toBe(mockResponse);
  });

  it('should clear data on error if body in request', async () => {
    const mockResponse = mockUser;
    (apiClient.request as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useApi<IUser>());

    // First request succeeds
    await act(async () => {
      await result.current.request('users.profile');
    });

    expect(result.current.data).toBe(mockResponse);

    // Second request fails with body
    const mockError = new ApiError('API Error', 500);
    (apiClient.request as jest.Mock).mockRejectedValueOnce(mockError);

    await act(async () => {
      try {
        await result.current.request('users.settings', {
          body: { theme: 'dark' }
        });
        fail('Should have thrown');
      } catch (err) {
        expect(err).toBe(mockError);
      }
    });

    // Data should be cleared
    expect(result.current.data).toBeNull();
  });

  it('should handle initial data', () => {
    const { result } = renderHook(() => 
      useApi<IUser>({ initialData: mockUser })
    );

    expect(result.current.data).toBe(mockUser);
  });

  it('should reset state', () => {
    const { result } = renderHook(() => 
      useApi<IUser>({ initialData: mockUser })
    );

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBe(mockUser);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.errorMessage).toBeNull();
  });

  it('should merge request options', async () => {
    const defaultOptions = {
      cache: true,
      headers: { 'X-Test': 'test' }
    };

    const { result } = renderHook(() => 
      useApi<IUser>({ requestOptions: defaultOptions })
    );

    await act(async () => {
      await result.current.request('users.profile', {
        headers: { 'X-Other': 'other' }
      });
    });

    expect(apiClient.request).toHaveBeenCalledWith(
      'users.profile',
      expect.objectContaining({
        cache: true,
        headers: {
          'X-Test': 'test',
          'X-Other': 'other'
        }
      })
    );
  });
}); 