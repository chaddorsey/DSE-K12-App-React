import { logger } from '../logger';

describe('Logger', () => {
  let consoleInfoSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log info messages in development', () => {
    const message = 'Test info message';
    logger.info(message);
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringContaining('[INFO] Test info message')
    );
  });

  it('should log error messages', () => {
    const error = new Error('Test error');
    logger.error(error);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('[ERROR] Test error')
    );
  });
}); 