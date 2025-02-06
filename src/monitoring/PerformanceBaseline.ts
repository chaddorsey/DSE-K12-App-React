import { IPerformanceBaseline, IPerformanceMetrics } from './types';

export class PerformanceBaseline {
  private static instance: PerformanceBaseline;
  private baselines: Map<string, IPerformanceBaseline> = new Map();
  private readonly SAMPLE_SIZE = 100;

  private constructor() {}

  public static getInstance(): PerformanceBaseline {
    if (!PerformanceBaseline.instance) {
      PerformanceBaseline.instance = new PerformanceBaseline();
    }
    return PerformanceBaseline.instance;
  }

  public updateBaseline(componentName: string, metrics: IPerformanceMetrics): void {
    const current = this.baselines.get(componentName);
    
    if (!current) {
      this.baselines.set(componentName, {
        componentName,
        metrics: {
          meanRenderTime: metrics.componentRender,
          p95RenderTime: metrics.componentRender,
          meanTotalTime: metrics.totalTime,
          p95TotalTime: metrics.totalTime
        },
        sampleSize: 1,
        lastUpdated: Date.now()
      });
      return;
    }

    // Update running averages
    const newSampleSize = Math.min(current.sampleSize + 1, this.SAMPLE_SIZE);
    const weight = 1 / newSampleSize;

    const newBaseline: IPerformanceBaseline = {
      componentName,
      metrics: {
        meanRenderTime: (current.metrics.meanRenderTime * (1 - weight)) + (metrics.componentRender * weight),
        p95RenderTime: this.calculateP95(current.metrics.p95RenderTime, metrics.componentRender),
        meanTotalTime: (current.metrics.meanTotalTime * (1 - weight)) + (metrics.totalTime * weight),
        p95TotalTime: this.calculateP95(current.metrics.p95TotalTime, metrics.totalTime)
      },
      sampleSize: newSampleSize,
      lastUpdated: Date.now()
    };

    this.baselines.set(componentName, newBaseline);
  }

  public getBaseline(componentName: string): IPerformanceBaseline | undefined {
    return this.baselines.get(componentName);
  }

  private calculateP95(currentP95: number, newValue: number): number {
    // Simple p95 calculation - could be made more sophisticated
    return Math.max(currentP95, newValue) * 0.95 + newValue * 0.05;
  }
} 