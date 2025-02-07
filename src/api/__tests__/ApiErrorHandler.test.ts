import { ApiErrorHandler, IErrorResponse } from '../ApiErrorHandler';
import { 
  ApiError, 
  ValidationError,
  AuthenticationError,
  NotFoundError,
  ServerError 
} from '../../errors/ApiError';
import { logger } from '../../utils/logger';

// Mock logger
jest.mock('../../utils/logger');

describe('ApiErrorHandler', () => {
  let handler: ApiErrorHandler;

  beforeEach(() => {
    handler = new ApiErrorHandler();
    jest.clearAllMocks();
  });

  describe('handleError', () => {
    it('should pass through existing ApiErrors', () => {
      const originalError = new ValidationError('Invalid input');
      const result = handler.handleError(originalError);
      expect(result).toBe(originalError);
    });

    it('should convert Error instances to ServerError', () => {
      const error = new Error('Network failed');
      const result = handler.handleError(error);

      expect(result).toBeInstanceOf(ServerError);
      expect(result.message).toBe('Network failed');
    });

    it('should handle API error responses', () => {
      const response: IErrorResponse = {
        error: {
          code: 'INVALID_INPUT',
          message: 'Validation failed',
          details: { field: 'email' }
        },
        status: 400
      };

      const result = handler.handleError(response);

      expect(result).toBeInstanceOf(ValidationError);
      expect(result.details).toEqual({ field: 'email' });
    });

    it('should create ServerError for unknown errors', () => {
      const result = handler.handleError('Unexpected error');
      
      expect(result).toBeInstanceOf(ServerError);
      expect(result.message).toBe('An unexpected error occurred');
    });

    it('should log errors with endpoint info', () => {
      handler.handleError(new Error('Test error'), '/api/test');
      
      expect(logger.error).toHaveBeenCalledWith(
        'API Error occurred',
        expect.objectContaining({
          error: expect.any(Error),
          endpoint: '/api/test'
        })
      );
    });
  });

  describe('getRecoveryAction', () => {
    it('should return login redirect for auth errors', () => {
      const error = new AuthenticationError('Token expired');
      const recovery = handler.getRecoveryAction(error);
      
      expect(recovery).toBeDefined();
    });

    it('should return page refresh for server errors', () => {
      const error = new ServerError('Internal error');
      const recovery = handler.getRecoveryAction(error);
      
      expect(recovery).toBeDefined();
    });

    it('should return undefined for other errors', () => {
      const error = new ValidationError('Invalid input');
      const recovery = handler.getRecoveryAction(error);
      
      expect(recovery).toBeUndefined();
    });
  });
}); 