import { logger } from '../../../utils/logger';

const TOKEN_KEY = 'auth_token';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    logger.error('Failed to get stored token', { error });
    return null;
  }
}

export function setStoredToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    logger.error('Failed to store token', { error });
  }
}

export function clearStoredToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    logger.error('Failed to clear token', { error });
  }
} 