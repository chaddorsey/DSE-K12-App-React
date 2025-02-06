/**
 * Batches similar requests to reduce network load
 */

import { logger } from '../logger';

export interface IBatchConfig {
  /** Maximum batch size */
  maxSize: number;
  /** Wait time before processing batch in ms */
  delay: number;
  /** Group requests by endpoint */
  groupBy: (request: Request) => string;
}

interface IBatchItem {
  request: Request;
  resolve: (response: Response) => void;
  reject: (error: Error) => void;
}

const defaultConfig: Required<IBatchConfig> = {
  maxSize: 10,
  delay: 50,
  groupBy: (request) => request.url
};

export interface IBatchMetrics {
  batchSize: number;
  batchCount: number;
  averageWait: number;
  savingsRate: number;
}

export class RequestBatcher {
  private queue: Map<string, IBatchItem[]>;
  private timers: Map<string, NodeJS.Timeout>;
  private config: Required<IBatchConfig>;
  private metrics: IBatchMetrics = {
    batchSize: 0,
    batchCount: 0,
    averageWait: 0,
    savingsRate: 0
  };

  constructor(config: Partial<IBatchConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.queue = new Map();
    this.timers = new Map();
  }

  /**
   * Add request to batch queue
   * @param request - Request to batch
   * @returns Promise resolving to response
   */
  public add(request: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
      const group = this.config.groupBy(request);
      const item: IBatchItem = { request, resolve, reject };

      if (!this.queue.has(group)) {
        this.queue.set(group, []);
        this.scheduleProcessing(group);
      }

      const batch = this.queue.get(group)!;
      batch.push(item);

      if (batch.length >= this.config.maxSize) {
        this.processBatch(group);
      }

      logger.info(`Request added to batch: ${group}`);
    });
  }

  /**
   * Force process all pending batches
   * @param group - Optional group to flush
   */
  public flush(group?: string): void {
    if (group) {
      this.processBatch(group);
    } else {
      Array.from(this.queue.keys()).forEach(g => this.processBatch(g));
    }
  }

  private scheduleProcessing(group: string): void {
    const timer = setTimeout(() => this.processBatch(group), this.config.delay);
    this.timers.set(group, timer);
  }

  private async processBatch(group: string): Promise<void> {
    const timer = this.timers.get(group);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(group);
    }

    const batch = this.queue.get(group);
    if (!batch?.length) return;

    this.queue.delete(group);
    logger.info(`Processing batch: ${group}, size: ${batch.length}`);

    try {
      const requests = this.combineSimilarRequests(batch);
      this.updateMetrics(batch, requests);
      
      const responses = await Promise.all(
        requests.map(request => fetch(request.clone()))
      );

      this.distributeResponses(batch, responses);
    } catch (err) {
      const error = err as Error;
      logger.error(`Batch processing failed: ${group}`, error);
      batch.forEach(item => item.reject(error));
    }
  }

  private combineSimilarRequests(batch: IBatchItem[]): Request[] {
    // Group by URL + method + body
    const groups = new Map<string, Request>();
    
    batch.forEach(({ request }) => {
      const key = `${request.url}|${request.method}|${request.body}`;
      if (!groups.has(key)) {
        groups.set(key, request);
      }
    });

    return Array.from(groups.values());
  }

  private distributeResponses(batch: IBatchItem[], responses: Response[]): void {
    // For now, just clone the first response for all requests in batch
    // TODO: Implement smarter response distribution based on request matching
    const response = responses[0];
    batch.forEach(item => item.resolve(response.clone()));
  }

  public getMetrics(): IBatchMetrics {
    return { ...this.metrics };
  }

  private updateMetrics(batch: IBatchItem[], requests: Request[]): void {
    this.metrics.batchCount++;
    this.metrics.batchSize = (this.metrics.batchSize + batch.length) / 2;
    this.metrics.savingsRate = 1 - (requests.length / batch.length);
  }
} 