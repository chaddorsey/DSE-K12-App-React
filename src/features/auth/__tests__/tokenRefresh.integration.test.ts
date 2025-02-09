import { render, act } from '@testing-library/react';
import { AuthProvider } from '../AuthContext';
import { apiClient } from '../../../services/api';
import { getStoredToken } from '../utils/token';

jest.mock('../../../services/api');
jest.mock('../utils/token');

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;
const mockGetStoredToken = getStoredToken as jest.MockedFunction<typeof getStoredToken>;

describe('Token Refresh Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('refreshes token when user is authenticated', async () => {
    mockGetStoredToken.mockReturnValue('old-token');
    mockApiClient.post.mockResolvedValue({ token: 'new-token' });

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'user' as const
    };

    render(
      <AuthProvider initialUser={mockUser}>
        <div>Test</div>
      </AuthProvider>
    );

    await act(async () => {
      jest.advanceTimersByTime(30 * 60 * 1000); // 30 minutes
    });

    expect(mockApiClient.post).toHaveBeenCalledWith('auth.refresh', {
      token: 'old-token'
    });
  });

  it('logs out user when refresh fails', async () => {
    mockGetStoredToken.mockReturnValue('old-token');
    mockApiClient.post.mockRejectedValue(new Error('Refresh failed'));

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      role: 'user' as const
    };

    const { rerender } = render(
      <AuthProvider initialUser={mockUser}>
        <div>Test</div>
      </AuthProvider>
    );

    await act(async () => {
      jest.advanceTimersByTime(30 * 60 * 1000); // 30 minutes
    });

    // Force rerender to see state changes
    rerender(
      <AuthProvider initialUser={mockUser}>
        <div>Test</div>
      </AuthProvider>
    );

    expect(mockGetStoredToken()).toBeNull();
  });
}); 