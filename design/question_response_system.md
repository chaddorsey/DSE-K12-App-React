# Question & Response System Design

## Overview
Design for storing and managing questions, responses, and associated metrics for the DSE K12 Connections app.

## Goals
- Store and manage questions and user responses efficiently
- Track user interactions and guesses about others' responses
- Support real-time metrics and leaderboards
- Enable visualization data queries
- Maintain performance with ~100K responses

## Non-Goals
- Complex reporting or analytics
- Long-term data warehousing
- Offline functionality beyond basic caching

## System Components

### 1. Core Collections

#### Questions Collection
```typescript
interface Question {
  id: string;
  prompt: string;
  type: 'multiple_choice' | 'slider' | 'open';
  options?: string[];
  metadata: {
    category: string;
    isOnboarding: boolean;
    tags?: string[];
    sliderConfig?: {
      min: number;
      max: number;
      label: string;
    };
  };
  stats?: {
    timesAnswered: number;
    lastAnswered: Timestamp;
  };
}
```

#### Personal Responses Collection
```typescript
interface PersonalResponse {
  userId: string;
  questionId: string;
  response: string | number;
  timestamp: Timestamp;
  context: 'onboarding' | 'regular';
}
```

#### Question Guesses Collection
```typescript
interface QuestionGuess {
  guessingUserId: string;
  targetUserId: string;
  questionId: string;
  questionType: 'single' | 'multi_dimensional';
  guess: string | number;
  isCorrect: boolean;
  attemptNumber: number;
  context: 'private' | 'head-to-head';
  timestamp: Timestamp;
  matchId?: string;  // For head-to-head only
}
```

### 2. Supporting Collections

#### Matches Collection
```typescript
interface Match {
  id: string;
  userIds: [string, string];
  startTime: Timestamp;
  questionIds: string[];
  status: 'active' | 'completed' | 'abandoned';
}
```

#### Social Ties Collection
```typescript
interface SocialTie {
  userId: string;
  targetUserId: string;
  level: number;  // Recognition level
  lastUpdated: Timestamp;
  history: {
    timestamp: Timestamp;
    level: number;
    context: 'match' | 'quiz' | 'manual';
  }[];
}
```

#### Visualizations Collection
```typescript
interface Visualization {
  id: string;
  creatorId: string;
  imageUrl: string;
  config: {
    type: string;
    parameters: Record<string, any>;
    questionIds?: string[];
  };
  metadata: {
    title: string;
    description?: string;
    created: Timestamp;
    shared: boolean;
    likes: number;
  };
}
```

### 3. Metrics & Aggregates Collection
```typescript
interface UserMetrics {
  userId: string;
  lastUpdated: Timestamp;
  metrics: {
    personalResponses: number;
    privateQuizCount: number;
    privateQuizAttendees: number[];
    headToHeadCount: number;
    headToHeadAttendees: number[];
    correctGuesses: number;
    improvedGuesses: number;
    visualizationsCreated: number;
    visualizationsShared: number;
    galleryViews: number;
    tieLevelsCompleted: number;
  };
}
```

## Implementation Phases

### Phase 1: Core Question & Response System
- Questions collection setup
- Personal responses implementation
- Basic metrics tracking

### Phase 2: Guessing & Matches
- Question guesses implementation
- Head-to-head matches
- Social ties tracking

### Phase 3: Visualization & Gallery
- Visualization storage
- Gallery implementation
- Likes system

### Phase 4: Metrics & Leaderboards
- Real-time metrics aggregation
- Leaderboard implementation
- Performance optimization

## Technical Considerations

### Indexing Strategy
- Compound indexes on userId + timestamp for quick user history
- Indexes on questionId + timestamp for visualization queries
- Indexes on metrics for leaderboard queries

### Real-time Updates
- Use Firestore real-time listeners for matches
- Batch updates for metrics every 5 minutes
- Cache frequently accessed metrics

### Performance Optimizations
- Denormalize common queries
- Pre-calculate metrics where possible
- Use pagination for visualization gallery

## Questions for Discussion
1. Should we implement soft deletion for questions?
2. How long should we retain match history?
3. Do we need to implement rate limiting for guesses?
4. Should visualization configs be versioned?

## New Collection for Multi-dimensional Questions
```typescript
interface MultiDimensionalQuestion {
  id: string;
  constituentQuestions: [string, string]; // IDs of constituent questions
  type: 'grid';  // Future-proofing for other types
  metadata: {
    isPrefered: boolean;  // Indicates if this is a pre-determined good pairing
    title?: string;
    description?: string;
  };
}
``` 