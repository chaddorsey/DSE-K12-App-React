# Achievement System Design

## Problem Statement
Create a flexible achievement and unlocking system that:
- Tracks user progress across multiple dimensions
- Provides incentives for data contribution
- Manages feature unlocking
- Supports social engagement
- Maintains persistent state

## Design Overview

### Core Types
```typescript
interface Achievement {
  id: string;
  type: AchievementType;
  title: string;
  description: string;
  icon?: string;
  unlockedFeatures?: string[];
  visibility: 'VISIBLE' | 'HIDDEN' | 'REVEALED_ON_PROGRESS';
  requirements: AchievementRequirement[];
  progress?: {
    current: number;
    total: number;
  };
}

type AchievementType = 
  | 'ONBOARDING'      // Initial app engagement
  | 'DATA_CONTRIBUTION' // Answering questions about self
  | 'CONNECTION'      // Mapping connections to others
  | 'SOCIAL'          // Head-to-head participation
  | 'EXPLORER'        // Data visualization engagement
  | 'MILESTONE'       // Cumulative achievements
  | 'CUSTOM';         // Special events/features

interface AchievementRequirement {
  type: RequirementType;
  count?: number;
  criteria: unknown; // Type based on RequirementType
  aggregation?: 'COUNT' | 'SUM' | 'UNIQUE' | 'STREAK';
}

type RequirementType =
  | 'QUESTION_ANSWERED'
  | 'CONNECTION_MAPPED'
  | 'HEAD_TO_HEAD_COMPLETED'
  | 'VISUALIZATION_CREATED'
  | 'FEATURE_USED'
  | 'CUSTOM';

interface UnlockableFeature {
  id: string;
  name: string;
  description: string;
  type: 'CORE' | 'SOCIAL' | 'VISUALIZATION' | 'CUSTOM';
  requirements: {
    achievements: string[];  // Achievement IDs required
    operator: 'AND' | 'OR'; // How to combine requirements
  };
}

interface UserAchievementState {
  userId: string;
  achievements: {
    [achievementId: string]: {
      unlocked: boolean;
      progress: number;
      unlockedAt?: number;
    };
  };
  unlockedFeatures: string[]; // Feature IDs
}
```

### Achievement Management
```typescript
interface AchievementManager {
  // Core achievement tracking
  trackEvent(event: AchievementEvent): Promise<Achievement[]>;
  getProgress(achievementId: string): Promise<number>;
  isUnlocked(achievementId: string): Promise<boolean>;
  
  // Feature management
  isFeatureUnlocked(featureId: string): Promise<boolean>;
  getUnlockedFeatures(): Promise<UnlockableFeature[]>;
  
  // Progress management
  getVisibleAchievements(): Promise<Achievement[]>;
  getNextMilestones(): Promise<Achievement[]>;
}

interface AchievementEvent {
  type: RequirementType;
  data: unknown;
  timestamp: number;
  context?: {
    experience?: string;
    mode?: string;
    subjectId?: string;
  };
}
```

### Directory Structure
```
src/
  features/
    achievements/
      components/
        AchievementCard/
        ProgressIndicator/
        UnlockNotification/
        __tests__/
      hooks/
        useAchievementTracking.ts
        useFeatureUnlock.ts
        __tests__/
      context/
        AchievementContext.tsx
      types/
        index.ts
      utils/
        progressCalculation.ts
        eventProcessing.ts
        __tests__/
      constants/
        achievements.ts
        features.ts
```

## Implementation Plan

### Phase 1: Core Achievement Infrastructure
1. Achievement definition system
2. Progress tracking
3. Basic persistence
4. Event processing

### Phase 2: Feature Unlocking
1. Feature gate system
2. Unlock notifications
3. Progress indicators
4. State persistence

### Phase 3: Social Integration
1. Achievement visibility
2. Progress sharing
3. Social notifications
4. Community stats

## Testing Strategy

### Unit Tests
```typescript
describe('AchievementManager', () => {
  it('tracks events correctly', () => {});
  it('calculates progress accurately', () => {});
  it('manages feature unlocking properly', () => {});
  it('persists state correctly', () => {});
});
```

### Integration Tests
```typescript
describe('AchievementSystem', () => {
  it('integrates with question system', () => {});
  it('handles concurrent events properly', () => {});
  it('maintains consistent unlock state', () => {});
});
```

## State Management

### Local Storage Structure
```typescript
interface AchievementStorage {
  achievements: {
    [achievementId: string]: {
      progress: number;
      unlockedAt?: number;
    };
  };
  features: string[]; // Unlocked feature IDs
  events: AchievementEvent[]; // Recent events for recovery
}
```

### Sync Strategy
1. Local state for immediate feedback
2. Server sync for persistence
3. Conflict resolution
4. Offline support

## Performance Considerations
1. Lazy loading of achievement definitions
2. Batched event processing
3. Efficient progress calculations
4. Optimistic updates

## Future Considerations
1. Custom achievement types
2. Advanced progress tracking
3. Social achievement types
4. Conference-specific achievements 