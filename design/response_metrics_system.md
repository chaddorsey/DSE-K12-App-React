# Response Metrics System Design

## Overview
System for calculating, storing, and updating response metrics in real-time.

## Goals
- Calculate accurate response statistics
- Support real-time updates
- Scale to handle high volume
- Enable efficient querying
- Support visualization needs

## Core Components

### 1. Metrics Types
```typescript
interface BaseMetrics {
  totalResponses: number;
  lastUpdated: Date;
}

interface XYMetrics extends BaseMetrics {
  quadrantDistribution: {
    'top-left': number;
    'top-right': number;
    'bottom-left': number;
    'bottom-right': number;
  };
  averagePosition: { x: number; y: number };
  standardDeviation: { x: number; y: number };
  interactionPatterns: {
    averageMoves: number;
    averageTime: number;
    movementTypes: {
      horizontal: number;
      vertical: number;
      diagonal: number;
    };
  };
}

interface MultipleChoiceMetrics extends BaseMetrics {
  optionDistribution: Record<string, number>;
  averageTimeToAnswer: number;
  confidenceDistribution: {
    high: number;
    medium: number;
    low: number;
  };
}
```

### 2. Storage Structure
```typescript
// Firestore Collections
responses/{responseId}  // Individual responses
metrics/{questionId}/current  // Current metrics
metrics/{questionId}/hourly/{timestamp}  // Hourly aggregates
metrics/{questionId}/daily/{timestamp}   // Daily aggregates
```

### 3. Update Mechanisms
1. Real-time updates
   - Increment counters
   - Update running averages
   - Recalculate distributions
2. Batch updates
   - Hourly aggregation
   - Daily aggregation
   - Statistical calculations

## Implementation Plan

### Phase 1: Core Metrics (Current Focus)
1. [ ] Implement MetricsCalculator service
   - Basic statistics
   - Running averages
   - Distribution calculations
2. [ ] Add real-time updates
3. [ ] Add batch processing
4. [ ] Add tests

### Phase 2: Aggregation
1. [ ] Implement time-based aggregation
2. [ ] Add statistical analysis
3. [ ] Add caching layer

### Phase 3: Query Support
1. [ ] Add query optimizations
2. [ ] Implement data access patterns
3. [ ] Add visualization support 