import { 
  ApiError,
  ValidationError,
  AuthenticationError,
  NotFoundError,
  ServerError
} from '../ApiError';

describe('API Errors', () => {
  describe('ApiError', () => {
    it('should create base error with all properties', () => {
      const error = new ApiError(
        'Test error',
        'TEST_ERROR',
        'User friendly message',
        400,
        { field: 'test' }
      );

      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_ERROR');
      expect(error.userMessage).toBe('User friendly message');
      expect(error.status).toBe(400);
      expect(error.details).toEqual({ field: 'test' });
      expect(error.name).toBe('ApiError');
    });

    it('should work with minimal properties', () => {
      const error = new ApiError('Test error', 'TEST_ERROR', 'User message');
      
      expect(error.message).toBe('Test error');
      expect(error.status).toBeUndefined();
      expect(error.details).toBeUndefined();
    });
  });

  describe('ValidationError', () => {
    it('should create error with validation details', () => {
      const details = { field: 'username', error: 'Required' };
      const error = new ValidationError('Invalid data', details);

      expect(error.message).toBe('Invalid data');
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.status).toBe(400);
      expect(error.details).toBe(details);
      expect(error.name).toBe('ValidationError');
      expect(error.userMessage).toBe('The provided data is invalid.');
    });
  });

  describe('AuthenticationError', () => {
    it('should create error with auth message', () => {
      const error = new AuthenticationError('Token expired');

      expect(error.message).toBe('Token expired');
      expect(error.code).toBe('AUTH_ERROR');
      expect(error.status).toBe(401);
      expect(error.userMessage).toBe('Please sign in to continue.');
      expect(error.name).toBe('AuthenticationError');
    });
  });

  describe('NotFoundError', () => {
    it('should create error with resource info', () => {
      const error = new NotFoundError('User');

      expect(error.message).toBe('Resource not found: User');
      expect(error.code).toBe('NOT_FOUND');
      expect(error.status).toBe(404);
      expect(error.userMessage).toBe('The requested information could not be found.');
      expect(error.name).toBe('NotFoundError');
    });
  });

  describe('ServerError', () => {
    it('should create error with server message', () => {
      const error = new ServerError('Database connection failed');

      expect(error.message).toBe('Database connection failed');
      expect(error.code).toBe('SERVER_ERROR');
      expect(error.status).toBe(500);
      expect(error.userMessage).toBe('Something went wrong. Please try again later.');
      expect(error.name).toBe('ServerError');
    });
  });

  describe('Error inheritance', () => {
    it('should maintain proper instanceof relationships', () => {
      const validationError = new ValidationError('Invalid');
      const authError = new AuthenticationError('Unauthorized');
      const notFoundError = new NotFoundError('User');
      const serverError = new ServerError('Failed');

      expect(validationError).toBeInstanceOf(ApiError);
      expect(authError).toBeInstanceOf(ApiError);
      expect(notFoundError).toBeInstanceOf(ApiError);
      expect(serverError).toBeInstanceOf(ApiError);
      expect(validationError).toBeInstanceOf(Error);
    });
  });
}); 