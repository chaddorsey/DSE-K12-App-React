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

describe('ResponseService', () => {
  let service: ResponseService;

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

  beforeEach(() => {
    service = new ResponseService();
  });

  describe('Response Submission', () => {
    it('submits multiple choice response and updates metrics', async () => {
      const response = await service.submitResponse(
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

      const response = await service.submitResponse(
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

      await service.submitResponse(
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

      await service.submitResponse(
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
        service.submitResponse('test-user', 'test-question', invalidValue, mockMetadata)
      ).rejects.toThrow();
    });

    it('handles database errors gracefully', async () => {
      // Mock a database error
      jest.spyOn(db, 'collection').mockImplementationOnce(() => {
        throw new Error('Database error');
      });

      await expect(
        service.submitResponse('test-user', 'test-question', mockXYValue, mockMetadata)
      ).rejects.toThrow('Database error');
    });
  });
}); 