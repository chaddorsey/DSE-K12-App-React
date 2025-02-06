import { PerformanceBaseline } from '../PerformanceBaseline';
import { IPerformanceMetrics } from '../types';

describe('PerformanceBaseline', () => {
  let baseline: PerformanceBaseline;

  beforeEach(() => {
    baseline = PerformanceBaseline.getInstance();
  });

  it('should create initial baseline for new component', () => {
    const metrics: IPerformanceMetrics = {
      componentRender: 100,
      stateUpdate: 50,
      apiCall: 20,
      totalTime: 170,
      timestamp: Date.now()
    };

    baseline.updateBaseline('TestComponent', metrics);
    const result = baseline.getBaseline('TestComponent');

    expect(result).toBeDefined();
    expect(result?.metrics.meanRenderTime).toBe(100);
    expect(result?.metrics.meanTotalTime).toBe(170);
    expect(result?.sampleSize).toBe(1);
  });

  it('should update existing baseline with new metrics', () => {
    const initialMetrics: IPerformanceMetrics = {
      componentRender: 100,
      stateUpdate: 50,
      apiCall: 20,
      totalTime: 170,
      timestamp: Date.now()
    };

    const newMetrics: IPerformanceMetrics = {
      componentRender: 200,
      stateUpdate: 50,
      apiCall: 20,
      totalTime: 270,
      timestamp: Date.now()
    };

    baseline.updateBaseline('TestComponent', initialMetrics);
    baseline.updateBaseline('TestComponent', newMetrics);
    
    const result = baseline.getBaseline('TestComponent');
    expect(result?.metrics.meanRenderTime).toBeGreaterThan(100);
    expect(result?.metrics.meanRenderTime).toBeLessThan(200);
    expect(result?.sampleSize).toBe(2);
  });

  it('should calculate p95 correctly', () => {
    const metrics: IPerformanceMetrics = {
      componentRender: 1000, // Significantly higher value
      stateUpdate: 50,
      apiCall: 20,
      totalTime: 1070,
      timestamp: Date.now()
    };

    baseline.updateBaseline('TestComponent', metrics);
    const result = baseline.getBaseline('TestComponent');

    expect(result?.metrics.p95RenderTime).toBe(1000); // First value sets baseline
    
    // Add a lower value
    baseline.updateBaseline('TestComponent', {
      ...metrics,
      componentRender: 100,
      totalTime: 170
    });

    const updated = baseline.getBaseline('TestComponent');
    // Should decrease but still be influenced by the high value
    expect(updated?.metrics.p95RenderTime).toBeGreaterThan(100);
    expect(updated?.metrics.p95RenderTime).toBeLessThan(1000);
  });
}); 