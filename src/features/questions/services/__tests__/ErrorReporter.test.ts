import { ErrorReporter } from '../ErrorReporter';
import { BatchProcessingError } from '../BatchProcessingError';

describe('ErrorReporter', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should store error reports', async () => {
    const error = new BatchProcessingError('Test error', 'QUEUE_FULL');
    await ErrorReporter.reportError(error, 'processing', {
      queueSize: 100
    });

    const reports = ErrorReporter.getStoredReports();
    expect(reports).toHaveLength(1);
    expect(reports[0]).toMatchObject({
      type: 'processing',
      code: 'QUEUE_FULL',
      message: 'Test error',
      context: {
        queueSize: 100,
        deviceInfo: expect.any(Object)
      }
    });
  });

  it('should limit number of stored reports', async () => {
    const MAX_REPORTS = 100;
    
    for (let i = 0; i < MAX_REPORTS + 10; i++) {
      await ErrorReporter.reportError(
        new Error(`Error ${i}`),
        'processing'
      );
    }

    const reports = ErrorReporter.getStoredReports();
    expect(reports).toHaveLength(MAX_REPORTS);
    expect(reports[0].message).toBe('Error 109'); // Most recent
  });

  it('should include device info in reports', async () => {
    await ErrorReporter.reportError(new Error('Test'), 'network');
    
    const [report] = ErrorReporter.getStoredReports();
    expect(report.context?.deviceInfo).toEqual({
      online: expect.any(Boolean),
      storageAvailable: expect.any(Boolean),
      userAgent: expect.any(String)
    });
  });
}); 