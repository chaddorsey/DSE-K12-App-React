import { refreshAuthToken, setupTokenRefresh } from '../tokenRefresh';
import { apiClient } from '../../../services/api';
import { getStoredToken, setStoredToken } from '../utils/token';
import { logger } from '../../../utils/logger';

jest.mock('../../../services/api');
jest.mock('../utils/token');
jest.mock('../../../utils/logger');

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;
const mockGetStoredToken = getStoredToken as jest.MockedFunction<typeof getStoredToken>;
const mockSetStoredToken = setStoredToken as jest.MockedFunction<typeof setStoredToken>;

describe('Token Refresh', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('refreshAuthToken', () => {
    it('successfully refreshes token', async () => {
      const oldToken = 'old-token';
      const newToken = 'new-token';
      mockGetStoredToken.mockReturnValue(oldToken);
      mockApiClient.post.mockResolvedValueOnce({ token: newToken });

      await refreshAuthToken();

      expect(mockApiClient.post).toHaveBeenCalledWith('auth.refresh', {
        token: oldToken
      });
      expect(mockSetStoredToken).toHaveBeenCalledWith(newToken);
    });

    it('handles refresh failure', async () => {
      const error = new Error('Refresh failed');
      mockGetStoredToken.mockReturnValue('old-token');
      mockApiClient.post.mockRejectedValueOnce(error);

      await expect(refreshAuthToken()).rejects.toThrow('Refresh failed');
      expect(logger.error).toHaveBeenCalledWith('Token refresh failed', {
        error
      });
    });
  });

  describe('setupTokenRefresh', () => {
    it('sets up refresh interval', () => {
      const callback = jest.fn();
      setupTokenRefresh(callback);

      jest.advanceTimersByTime(25 * 60 * 1000); // 25 minutes
      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(5 * 60 * 1000); // 5 more minutes
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('cleans up interval on stop', () => {
      const callback = jest.fn();
      const stop = setupTokenRefresh(callback);

      stop();
      jest.advanceTimersByTime(30 * 60 * 1000); // 30 minutes
      expect(callback).not.toHaveBeenCalled();
    });
  });
}); 