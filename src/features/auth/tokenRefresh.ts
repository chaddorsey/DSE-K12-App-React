import { apiClient } from '../../services/api';
import { getStoredToken, setStoredToken } from './utils/token';
import { logger } from '../../utils/logger';

const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes

export async function refreshAuthToken(): Promise<void> {
  try {
    const currentToken = getStoredToken();
    if (!currentToken) {
      throw new Error('No token to refresh');
    }

    const response = await apiClient.post<{ token: string }>('auth.refresh', {
      token: currentToken
    });

    setStoredToken(response.token);
    logger.info('Token refreshed successfully');
  } catch (error) {
    logger.error('Token refresh failed', { error });
    throw error;
  }
}

export function setupTokenRefresh(onRefresh: () => void): () => void {
  const intervalId = setInterval(() => {
    onRefresh();
  }, REFRESH_INTERVAL);

  return () => {
    clearInterval(intervalId);
  };
} 