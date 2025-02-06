/**
 * Tests for useAuth hook
 */

import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { AuthProvider } from '../../components/AuthProvider';
import { mockMonitoring } from '../testing/mockMonitoring';

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

  it('should handle login', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password'
      });
    });

    expect(result.current.user).toEqual({
      id: 1,
      email: 'test@example.com'
    });
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle logout', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle errors', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    const error = new Error('Invalid credentials');

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

    expect(result.current.error).toBe(error);
    expect(result.current.isLoading).toBe(false);
  });
}); 