import { ResponseService } from '../ResponseService';
import { db } from '@/config/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  increment 
} from 'firebase/firestore';
import type { XYResponseValue } from '../../types/response';

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(() => {
    service = new ResponseService();
  });

  it('should submit multiple choice response and update metrics', async () => {
    const response = await service.submitResponse(
      'test-user',
      'test-question',
      {
        type: 'MULTIPLE_CHOICE',
        selectedOption: 'option-1'
      },
      {
        timeToAnswer: 1000,
        interactionCount: 1,
        confidence: 0.8,
        device: {
          type: 'desktop',
          input: 'mouse'
        }
      }
    );

    // Verify response was stored
    const responseDoc = await getDoc(doc(db, 'responses', response));
    expect(responseDoc.exists()).toBe(true);

    // Verify metrics were updated
    const metricsDoc = await getDoc(doc(db, 'response_metrics', 'test-question'));
    expect(metricsDoc.exists()).toBe(true);
    expect(metricsDoc.data()?.distribution['option-1']).toBe(1);
  });

  it('should submit XY response and update metrics with quadrant distribution', async () => {
    const xyResponse: XYResponseValue = {
      type: 'XY',
      coordinates: { x: 0.75, y: 0.25 }, // top-right quadrant
      interactions: [
        {
          type: 'move',
          position: { x: 0.5, y: 0.5 },
          timestamp: Date.now()
        },
        {
          type: 'click',
          position: { x: 0.75, y: 0.25 },
          timestamp: Date.now()
        }
      ]
    };

    const response = await service.submitResponse(
      'test-user',
      'test-xy-question',
      xyResponse,
      {
        timeToAnswer: 2000,
        interactionCount: 2,
        confidence: 0.9,
        device: {
          type: 'desktop',
          input: 'mouse'
        }
      }
    );

    // Verify response was stored
    const responseDoc = await getDoc(doc(db, 'responses', response));
    expect(responseDoc.exists()).toBe(true);

    // Verify metrics were updated
    const metricsDoc = await getDoc(doc(db, 'response_metrics', 'test-xy-question'));
    const metrics = metricsDoc.data();
    
    expect(metrics).toBeDefined();
    expect(metrics?.distribution['quadrant:top-right']).toBe(1);
    expect(metrics?.totalResponses).toBe(1);
    expect(metrics?.averageTimeToAnswer).toBe(2000);
  });

  it('should update XY metrics with grid-based distribution', async () => {
    const xyResponse: XYResponseValue = {
      type: 'XY',
      coordinates: { x: 0.1, y: 0.9 },
      interactions: []
    };

    await service.submitResponse(
      'test-user',
      'test-xy-question',
      xyResponse,
      {
        timeToAnswer: 1000,
        interactionCount: 1,
        confidence: 0.8,
        device: {
          type: 'desktop',
          input: 'mouse'
        }
      }
    );

    const metricsDoc = await getDoc(doc(db, 'response_metrics', 'test-xy-question'));
    const metrics = metricsDoc.data();

    // Check grid cell distribution (3x3 grid)
    expect(metrics?.distribution['grid:0,2']).toBe(1); // top-left cell
  });

  it('should track interaction patterns in XY metrics', async () => {
    const xyResponse: XYResponseValue = {
      type: 'XY',
      coordinates: { x: 0.5, y: 0.5 },
      interactions: [
        { type: 'move', position: { x: 0.2, y: 0.2 }, timestamp: Date.now() },
        { type: 'move', position: { x: 0.8, y: 0.2 }, timestamp: Date.now() + 100 },
        { type: 'click', position: { x: 0.5, y: 0.5 }, timestamp: Date.now() + 200 }
      ]
    };

    await service.submitResponse(
      'test-user',
      'test-xy-question',
      xyResponse,
      {
        timeToAnswer: 1500,
        interactionCount: 3,
        confidence: 0.7,
        device: {
          type: 'desktop',
          input: 'mouse'
        }
      }
    );

    const metricsDoc = await getDoc(doc(db, 'response_metrics', 'test-xy-question'));
    const metrics = metricsDoc.data();

    expect(metrics?.interactionPatterns).toBeDefined();
    expect(metrics?.interactionPatterns.horizontalMoves).toBeGreaterThan(0);
  });

  // Add more tests...
}); 