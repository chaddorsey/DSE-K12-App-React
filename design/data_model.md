# Application Data Model

## Core Collections

### Users & Profiles
```typescript
/users/{userId}
{
  id: string;
  email: string;
  displayName: string;
  createdAt: Timestamp;
  lastActive: Timestamp;
}

/profiles/{userId}
{
  userId: string;
  bio: string;
  avatar: string;
  preferences: {
    notifications: boolean;
    privacy: 'public' | 'friends' | 'private';
  };
  stats: {
    questionsAnswered: number;
    quizzesTaken: number;
    accurateGuesses: number;
  };
}
```

### Questions & Quizzes
```typescript
/questions/{questionId}
{
  id: string;
  type: 'XY' | 'MULTIPLE_CHOICE';
  prompt: string;
  config: {
    // XY specific
    axisLabels?: {
      x: { min: string; max: string; };
      y: { min: string; max: string; };
    };
    // Multiple choice specific
    options?: string[];
  };
  metadata: {
    author: string;
    createdAt: Timestamp;
    tags: string[];
    difficulty: number;
  };
}

/quizzes/{quizId}
{
  id: string;
  title: string;
  description: string;
  questions: {
    id: string;
    order: number;
  }[];
  metadata: {
    author: string;
    createdAt: Timestamp;
    tags: string[];
    difficulty: number;
    estimatedTime: number;
  };
}
```

### Responses & Guesses
```typescript
/responses/{responseId}
{
  id: string;
  userId: string;
  questionId: string;
  quizId?: string;  // If part of a quiz
  value: {
    type: 'XY' | 'MULTIPLE_CHOICE';
    // XY Response
    coordinates?: {
      x: number;
      y: number;
    };
    // Multiple Choice Response
    selectedOption?: string;
  };
  metadata: {
    timestamp: Timestamp;
    timeToAnswer: number;
    interactionCount: number;
    device: {
      type: string;
      input: string;
    };
  };
}

/guesses/{guessId}
{
  id: string;
  userId: string;         // Who made the guess
  targetUserId: string;   // Whose response they're guessing
  questionId: string;
  value: {
    type: 'XY' | 'MULTIPLE_CHOICE';
    coordinates?: { x: number; y: number; };
    selectedOption?: string;
  };
  metadata: {
    timestamp: Timestamp;
    timeToGuess: number;
    confidence: number;
  };
  accuracy?: {
    distance?: number;    // For XY
    correct?: boolean;    // For Multiple Choice
    score: number;        // Normalized score
  };
}
```

### Metrics & Aggregations
```typescript
/metrics/questions/{questionId}
{
  questionId: string;
  totalResponses: number;
  totalGuesses: number;
  distribution: {
    // XY Question
    quadrants?: Record<string, number>;
    grid?: Record<string, number>;
    average?: { x: number; y: number; };
    // Multiple Choice
    options?: Record<string, number>;
  };
  guessAccuracy: {
    averageScore: number;
    distribution: Record<number, number>;  // Score buckets
  };
  timeStats: {
    averageResponseTime: number;
    averageGuessTime: number;
  };
  lastUpdated: Timestamp;
}

/metrics/quizzes/{quizId}
{
  quizId: string;
  totalParticipants: number;
  questionStats: {
    [questionId: string]: {
      averageScore: number;
      averageTime: number;
      completion: number;
    };
  };
  lastUpdated: Timestamp;
}
```

### User Connections & Social
```typescript
/connections/{connectionId}
{
  id: string;
  users: [string, string];  // userId pair
  status: 'pending' | 'accepted';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/userStats/{userId}
{
  userId: string;
  connections: number;
  responseStats: {
    total: number;
    byType: Record<string, number>;
    averageAccuracy: number;
  };
  guessStats: {
    total: number;
    averageAccuracy: number;
    byTarget: Record<string, {
      total: number;
      accuracy: number;
    }>;
  };
  lastUpdated: Timestamp;
}
```

## Indexing Strategy
- Compound indexes on responses by questionId + timestamp
- Compound indexes on guesses by targetUserId + questionId
- Compound indexes on questions by tags + difficulty
- Compound indexes on connections by userId + status

## Security Rules
- Users can only read/write their own responses
- Users can only read responses of connections
- Metrics are readable by all authenticated users
- Guesses are only revealed after target user responds 