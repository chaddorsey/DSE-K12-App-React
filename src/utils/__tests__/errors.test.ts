/**
 * Tests for error utilities
 */

import { 
  ValidationError, 
  NetworkError, 
  AuthenticationError,
  isAppError,
  getErrorMessage
} from '../errors';

describe('Error Utilities', () => {
  describe('ValidationError', () => {
    it('should create validation error with fields', () => {
      const fields = { name: ['Required'] };
      const error = new ValidationError('Invalid data', fields);

      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.fields).toBe(fields);
      expect(error.message).toBe('Invalid data');
    });

    it('should include context if provided', () => {
      const context = { formId: '123' };
      const error = new ValidationError(
        'Invalid data',
        {},
        context
      );

      expect(error.context).toBe(context);
    });
  });

  describe('NetworkError', () => {
    it('should create network error', () => {
      const error = new NetworkError('Connection failed');

      expect(error.code).toBe('NETWORK_ERROR');
      expect(error.message).toBe('Connection failed');
    });
  });

  describe('AuthenticationError', () => {
    it('should create auth error', () => {
      const error = new AuthenticationError('Invalid token');

      expect(error.code).toBe('AUTH_ERROR');
      expect(error.message).toBe('Invalid token');
    });
  });

  describe('isAppError', () => {
    it('should identify app errors', () => {
      expect(isAppError(new ValidationError('test', {}))).toBe(true);
      expect(isAppError(new NetworkError('test'))).toBe(true);
      expect(isAppError(new Error('test'))).toBe(false);
      expect(isAppError({ message: 'test' })).toBe(false);
    });
  });

  describe('getErrorMessage', () => {
    it('should extract error message', () => {
      expect(getErrorMessage(new Error('test'))).toBe('test');
      expect(getErrorMessage('string error')).toBe('string error');
      expect(getErrorMessage({ custom: 'error' })).toBe('[object Object]');
    });
  });
}); 