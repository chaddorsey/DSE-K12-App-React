import { ResponseService } from '../ResponseService';
import { db } from '@/config/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  increment,
  Timestamp
} from 'firebase/firestore';
import type { XYValue, QuestionResponse, Device, MultipleChoiceValue } from '../../types';
import { QuestionType, QuestionContext } from '../../types/questions';

jest.mock('../../../../config/firebase');

describe('ResponseService', () => {
  let responseService: ResponseService;

  const mockDevice: Device = {
    type: 'desktop' as const,
    input: 'mouse' as const
  };

  const mockMetadata = {
    timeToAnswer: 1000,
    interactionCount: 1,
    confidence: 0.8,
    device: mockDevice
  };

  const mockXYValue: XYValue = {
    type: 'XY',
    coordinates: { x: 0.5, y: 0.5 },
    interactions: [
      { 
        type: 'move' as const, 
        position: { x: 0.3, y: 0.3 }, 
        timestamp: Date.now() 
      }
    ]
  };

  const mockMultipleChoiceValue: MultipleChoiceValue = {
    type: 'MULTIPLE_CHOICE',
    selectedOption: 'option-1',
    interactions: [
      {
        type: 'click' as const,
        position: { x: 0.5, y: 0.5 },
        timestamp: Date.now()
      }
    ]
  };

  const mockResponse = {
    id: 'resp1',
    questionId: 'q1',
    userId: 'user1',
    context: QuestionContext.ONBOARDING,
    value: {
      type: QuestionType.MC,
      selectedOption: 'A'
    },
    metadata: {
      timeToAnswer: 1000,
      interactionCount: 1,
      device: {
        type: 'desktop' as const,
        input: 'mouse' as const
      }
    },
    timestamp: new Date()
  };

  beforeEach(() => {
    responseService = new ResponseService(db);
  });

  describe('Response Submission', () => {
    it('submits multiple choice response and updates metrics', async () => {
      const response = await responseService.submitResponse(
        'test-user',
        'test-question',
        mockMultipleChoiceValue,
        mockMetadata
      );

      const responseDoc = await getDoc(doc(db, 'responses', response));
      expect(responseDoc.exists()).toBe(true);

      const metricsDoc = await getDoc(doc(db, 'response_metrics', 'test-question'));
      expect(metricsDoc.exists()).toBe(true);
      expect(metricsDoc.data()?.distribution['option-1']).toBe(1);
    });

    it('submits XY response and updates quadrant distribution', async () => {
      const topRightXYValue: XYValue = {
        ...mockXYValue,
        coordinates: { x: 0.75, y: 0.25 }
      };

      const response = await responseService.submitResponse(
        'test-user',
        'test-xy-question',
        topRightXYValue,
        mockMetadata
      );

      const responseDoc = await getDoc(doc(db, 'responses', response));
      expect(responseDoc.exists()).toBe(true);

      const metricsDoc = await getDoc(doc(db, 'response_metrics', 'test-xy-question'));
      const metrics = metricsDoc.data();
      
      expect(metrics).toBeDefined();
      expect(metrics?.distribution['quadrant:top-right']).toBe(1);
      expect(metrics?.totalResponses).toBe(1);
      expect(metrics?.averageTimeToAnswer).toBe(1000);
    });

    it('updates XY metrics with grid-based distribution', async () => {
      const topLeftXYValue: XYValue = {
        ...mockXYValue,
        coordinates: { x: 0.1, y: 0.9 }
      };

      await responseService.submitResponse(
        'test-user',
        'test-xy-question',
        topLeftXYValue,
        mockMetadata
      );

      const metricsDoc = await getDoc(doc(db, 'response_metrics', 'test-xy-question'));
      const metrics = metricsDoc.data();

      expect(metrics?.distribution['grid:0,2']).toBe(1); // top-left cell
    });

    it('tracks interaction patterns in XY metrics', async () => {
      const interactiveXYValue: XYValue = {
        ...mockXYValue,
        interactions: [
          { type: 'move' as const, position: { x: 0.2, y: 0.2 }, timestamp: Date.now() },
          { type: 'move' as const, position: { x: 0.8, y: 0.2 }, timestamp: Date.now() + 100 },
          { type: 'click' as const, position: { x: 0.5, y: 0.5 }, timestamp: Date.now() + 200 }
        ]
      };

      await responseService.submitResponse(
        'test-user',
        'test-xy-question',
        interactiveXYValue,
        {
          ...mockMetadata,
          timeToAnswer: 1500,
          interactionCount: 3
        }
      );

      const metricsDoc = await getDoc(doc(db, 'response_metrics', 'test-xy-question'));
      const metrics = metricsDoc.data();

      expect(metrics?.interactionPatterns).toBeDefined();
      expect(metrics?.interactionPatterns.horizontalMoves).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('handles validation errors gracefully', async () => {
      const invalidValue = {
        ...mockXYValue,
        coordinates: { x: 1.5, y: 0.5 } // Invalid coordinates
      };

      await expect(
        responseService.submitResponse('test-user', 'test-question', invalidValue, mockMetadata)
      ).rejects.toThrow();
    });

    it('handles database errors gracefully', async () => {
      // Mock a database error
      jest.spyOn(db, 'collection').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await expect(
        responseService.submitResponse('test-user', 'test-question', mockXYValue, mockMetadata)
      ).rejects.toThrow('Database error');
    });
  });

  describe('saveResponse', () => {
    it('saves response and updates metrics in transaction', async () => {
      const mockTransaction = {
        set: jest.fn(),
        get: jest.fn().mockResolvedValue({ exists: () => false }),
        update: jest.fn()
      };

      const mockRunTransaction = jest.fn().mockImplementation(async (db, callback) => {
        return callback(mockTransaction);
      });

      (db as any).runTransaction = mockRunTransaction;

      await responseService.saveResponse(mockResponse);

      expect(mockTransaction.set).toHaveBeenCalledTimes(2); // Response and metrics
      expect(mockRunTransaction).toHaveBeenCalled();
    });
  });

  describe('getResponsesByContext', () => {
    it('queries responses by user and context', async () => {
      const mockDocs = [
        { id: 'resp1', data: () => mockResponse }
      ];
      const mockQuery = jest.fn().mockReturnValue({});
      const mockGetDocs = jest.fn().mockResolvedValue({ docs: mockDocs });

      (db.collection as jest.Mock).mockReturnValue({ query: mockQuery });
      (query as unknown as jest.Mock).mockReturnValue({ getDocs: mockGetDocs });

      const responses = await responseService.getResponsesByContext('user1', QuestionContext.ONBOARDING);

      expect(responses.length).toBe(1);
      expect(responses[0].id).toBe('resp1');
      expect(where).toHaveBeenCalledWith('context', '==', QuestionContext.ONBOARDING);
    });
  });
}); 