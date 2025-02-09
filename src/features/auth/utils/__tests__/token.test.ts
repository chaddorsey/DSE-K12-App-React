import { getStoredToken, setStoredToken, clearStoredToken } from '../token';

describe('Token Utils', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('stores and retrieves token', () => {
    setStoredToken('test-token');
    expect(getStoredToken()).toBe('test-token');
  });

  it('clears token', () => {
    setStoredToken('test-token');
    clearStoredToken();
    expect(getStoredToken()).toBeNull();
  });

  it('handles localStorage errors gracefully', () => {
    const mockError = new Error('Storage error');
    jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw mockError;
    });

    expect(getStoredToken()).toBeNull();
  });
}); 