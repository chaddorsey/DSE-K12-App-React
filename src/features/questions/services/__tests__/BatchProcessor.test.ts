import { BatchProcessor } from '../BatchProcessor';
import { ResponseService } from '../ResponseService';
import { ResponseValidationService } from '../ResponseValidationService';
import type { QuestionResponse } from '../../types/response';
import { db } from '@/config/firebase';

jest.mock('../ResponseService');
jest.mock('../ResponseValidationService');
jest.mock('@/config/firebase');

describe('BatchProcessor', () => {
  let processor: BatchProcessor;
  let mockResponseService: jest.Mocked<ResponseService>;
  let mockValidationService: jest.Mocked<ResponseValidationService>;

  const mockResponse: QuestionResponse = {
    id: 'test-1',
    questionId: 'q1',
    userId: 'user1',
    value: {
      type: 'XY',
      coordinates: { x: 0.5, y: 0.5 },
      interactions: []
    },
    metadata: {
      timeToAnswer: 1000,
      interactionCount: 1,
      confidence: 0.8,
      device: { type: 'desktop', input: 'mouse' }
    },
    timestamp: new Date()
  };

  beforeEach(() => {
    mockResponseService = new ResponseService() as jest.Mocked<ResponseService>;
    mockValidationService = new ResponseValidationService() as jest.Mocked<ResponseValidationService>;
    processor = new BatchProcessor(mockResponseService, mockValidationService);

    // Clear storage
    localStorage.clear();
  });

  it('should queue responses for offline processing', async () => {
    const response = { ...mockResponse };
    await processor.queueResponse(response);

    const queued = processor.getQueuedResponses();
    expect(queued).toHaveLength(1);
    expect(queued[0]).toEqual(response);
  });

  it('should process queued responses when online', async () => {
    // Queue some responses
    await processor.queueResponse({ ...mockResponse, id: '1' });
    await processor.queueResponse({ ...mockResponse, id: '2' });

    mockResponseService.submitBatchResponses.mockResolvedValueOnce(['1', '2']);

    // Process queue
    const results = await processor.processQueue();

    expect(results.successful).toHaveLength(2);
    expect(results.failed).toHaveLength(0);
    expect(mockResponseService.submitBatchResponses).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: '1' }),
        expect.objectContaining({ id: '2' })
      ])
    );
  });

  it('should handle failed submissions', async () => {
    await processor.queueResponse({ ...mockResponse, id: '1' });
    await processor.queueResponse({ ...mockResponse, id: '2' });

    mockResponseService.submitBatchResponses.mockRejectedValueOnce(new Error('Network error'));

    const results = await processor.processQueue();

    expect(results.successful).toHaveLength(0);
    expect(results.failed).toHaveLength(2);
    expect(processor.getQueuedResponses()).toHaveLength(2); // Items remain in queue
  });

  it('should validate responses before queueing', async () => {
    const invalidResponse = { ...mockResponse, questionId: '' };
    mockValidationService.validateResponse.mockImplementation(response => {
      if (!response.questionId) {
        throw new Error('Invalid response');
      }
      return true;
    });

    await expect(processor.queueResponse(invalidResponse)).rejects.toThrow('Invalid response');
    expect(processor.getQueuedResponses()).toHaveLength(0);
  });

  it('should handle retry attempts', async () => {
    await processor.queueResponse({ ...mockResponse, id: '1' });
    
    // First attempt fails
    mockResponseService.submitBatchResponses.mockRejectedValueOnce(new Error('Network error'));
    await processor.processQueue();

    // Second attempt succeeds
    mockResponseService.submitBatchResponses.mockResolvedValueOnce(['1']);
    const results = await processor.processQueue();

    expect(results.successful).toHaveLength(1);
    expect(results.failed).toHaveLength(0);
    expect(processor.getQueuedResponses()).toHaveLength(0);
  });

  it('should persist queue across sessions', async () => {
    await processor.queueResponse({ ...mockResponse, id: '1' });
    
    // Create new processor instance
    const newProcessor = new BatchProcessor(mockResponseService, mockValidationService);
    
    expect(newProcessor.getQueuedResponses()).toHaveLength(1);
    expect(newProcessor.getQueuedResponses()[0].id).toBe('1');
  });

  it('should handle concurrent processing attempts', async () => {
    await processor.queueResponse({ ...mockResponse, id: '1' });

    // Start two concurrent processing attempts
    const process1 = processor.processQueue();
    const process2 = processor.processQueue();

    await expect(Promise.all([process1, process2])).resolves.toHaveLength(2);
    expect(mockResponseService.submitBatchResponses).toHaveBeenCalledTimes(1);
  });

  it('should respect max queue size', async () => {
    const MAX_QUEUE_SIZE = 1000;
    for (let i = 0; i < MAX_QUEUE_SIZE + 1; i++) {
      await processor.queueResponse({ ...mockResponse, id: `${i}` });
    }
    
    expect(processor.getQueuedResponses()).toHaveLength(MAX_QUEUE_SIZE);
  });

  it('should handle network status changes', async () => {
    await processor.queueResponse({ ...mockResponse, id: '1' });
    
    // Simulate offline
    (window as any).navigator.onLine = false;
    const offlineResult = await processor.processQueue();
    expect(offlineResult.failed).toHaveLength(1);
    expect(offlineResult.failed[0].error.message).toContain('offline');

    // Simulate online
    (window as any).navigator.onLine = true;
    mockResponseService.submitBatchResponses.mockResolvedValueOnce(['1']);
    const onlineResult = await processor.processQueue();
    expect(onlineResult.successful).toHaveLength(1);
  });

  it('should track retry counts per response', async () => {
    await processor.queueResponse({ ...mockResponse, id: '1' });
    
    mockResponseService.submitBatchResponses.mockRejectedValue(new Error('Network error'));
    
    // Try multiple times
    await processor.processQueue();
    await processor.processQueue();
    await processor.processQueue();

    const queuedResponses = processor.getQueuedResponses();
    expect(queuedResponses[0].retryCount).toBe(3);
  });
}); 