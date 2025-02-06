/**
 * Tests for useAuth hook
 */

import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { AuthProvider } from '../../components/AuthProvider';
import { mockMonitoring } from '../testing/mockMonitoring';
import { MonitoringService } from '../../monitoring/MonitoringService';

// Mock MonitoringService
jest.mock('../../monitoring/MonitoringService', () => ({
  MonitoringService: {
    getInstance: jest.fn(() => ({
      trackPerformance: jest.fn(),
      trackError: jest.fn()
    }))
  }
}));

describe('useAuth', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error when used outside AuthProvider', () => {
    // Wrap in a function to test thrown error
    expect(() => {
      const { result } = renderHook(() => useAuth());
      // Access result to trigger the error
      console.log(result.current);
    }).toThrow('useAuth must be used within an AuthProvider');
  });

  it('should provide authentication state', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();
  });

  it('should handle signup', async () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    await act(async () => {
      await result.current.signup(credentials);
    });

    expect(result.current.user).toEqual({
      id: '1',
      email: credentials.email
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle login', async () => {
    const { result } = renderHook(() => useAuth());

    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    await act(async () => {
      await result.current.login(credentials);
    });

    expect(result.current.user).toEqual({
      id: '1',
      email: credentials.email
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle logout', async () => {
    const { result } = renderHook(() => useAuth());

    // First login
    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    expect(result.current.user).not.toBeNull();

    // Then logout
    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors', async () => {
    const { result } = renderHook(() => useAuth());
    const error = new Error('Auth failed');

    // Mock failed API call
    jest.spyOn(global, 'Promise').mockRejectedValueOnce(error);

    await act(async () => {
      try {
        await result.current.login({
          email: 'test@example.com',
          password: 'wrong'
        });
      } catch (e) {
        // Expected error
      }
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(error);
  });
}); 