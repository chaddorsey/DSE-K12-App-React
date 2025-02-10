# Question System Design

## Problem Statement
Create a unified question component system that:
- Supports multiple question types (multiple choice, open response, numeric)
- Can be used across experiences (onboarding, quizzes, head-to-head)
- Integrates delight factors
- Maintains type safety and testability
- Supports mobile-first interaction

## Design Overview

### Core Types
```typescript
interface BaseQuestion {
  id: string;
  prompt: string;
  type: QuestionType;
  delightFactors: {
    eligible: string[];  // IDs of eligible delight factors
    required?: string[]; // IDs of delight factors that must be shown
    priority?: number[]; // Priority order for eligible factors
  };
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'MULTIPLE_CHOICE';
  options: string[];
  correctAnswer?: string; // Optional for non-quiz contexts
}

interface OpenResponseQuestion extends BaseQuestion {
  type: 'OPEN_RESPONSE';
  maxLength?: number;
  validation?: RegExp;
}

interface NumericQuestion extends BaseQuestion {
  type: 'NUMERIC';
  min: number;
  max: number;
  step?: number;
}

interface BaseDelightFactor {
  id: string;
  timing: 'PRE_ANSWER' | 'POST_ANSWER';
  trigger: 'IMMEDIATE' | 'DELAYED' | 'ON_CORRECT' | 'ON_INCORRECT';
}

interface AnimationDelightFactor extends BaseDelightFactor {
  type: 'ANIMATION';
  animationType: 'CELEBRATION' | 'PROGRESS' | 'INSIGHT' | 'CUSTOM';
  content: {
    animation: string;
    duration: number;
    customParams?: Record<string, unknown>;
  };
  questionTypes: QuestionType[]; // Which question types this animation can be used with
}

interface CommunityInsightDelightFactor extends BaseDelightFactor {
  type: 'COMMUNITY_INSIGHT';
  insightType: 'DISTRIBUTION' | 'COMPARISON' | 'TREND' | 'CUSTOM';
  content: {
    template: string;
    dataPoint: string;
    format?: string;
    threshold?: number; // Minimum responses needed
  };
  applicableQuestions: string[]; // Specific question IDs this insight works with
}

interface AchievementDelightFactor extends BaseDelightFactor {
  type: 'ACHIEVEMENT';
  achievementType: 'MILESTONE' | 'DISCOVERY' | 'SOCIAL' | 'CUSTOM';
  content: {
    achievement: string;
    description: string;
    icon?: string;
  };
  conditions: {
    questionId?: string;
    responsePattern?: string | number | RegExp;
    context?: Partial<QuestionContext>;
  };
}

type DelightFactor = 
  | AnimationDelightFactor 
  | CommunityInsightDelightFactor 
  | AchievementDelightFactor;

type Question = MultipleChoiceQuestion | OpenResponseQuestion | NumericQuestion;

interface QuestionResponse<T extends Question> {
  questionId: string;
  answer: T extends MultipleChoiceQuestion ? string :
          T extends OpenResponseQuestion ? string :
          T extends NumericQuestion ? number :
          never;
  timestamp: number;
  context: QuestionContext;
}

type QuestionContext = {
  experience: 'ONBOARDING' | 'QUIZ' | 'HEAD_TO_HEAD';
  mode?: 'PRACTICE' | 'COMPETITION';
  subjectId?: string; // For questions about other users
};
```

### Component Architecture
```typescript
interface QuestionProps<T extends Question> {
  question: T;
  onAnswer: (response: QuestionResponse<T>) => void;
  context: QuestionContext;
  disabled?: boolean;
  loading?: boolean;
}

interface DelightFactorProps {
  factor: DelightFactor;
  onComplete?: () => void;
}
```

### Directory Structure
```
src/
  features/
    questions/
      components/
        QuestionCard/
          index.tsx
          MultipleChoice.tsx
          OpenResponse.tsx
          NumericResponse.tsx
          DelightFactor.tsx
          __tests__/
      hooks/
        useQuestionValidation.ts
        useDelightFactor.ts
        __tests__/
      context/
        QuestionContext.tsx
      types/
        index.ts
      utils/
        validation.ts
        formatting.ts
        __tests__/
```

## Implementation Plan

### Phase 1: Core Question Components
1. Base question components without delight factors
2. Type-safe response handling
3. Basic validation
4. Mobile-friendly inputs

### Phase 2: Delight Factor Integration
1. Delight factor component system
2. Animation framework integration
3. Community insight display
4. Achievement triggers

### Phase 3: Context Integration
1. Experience-specific adaptations
2. Mode-based modifications
3. Subject-specific handling
4. Response persistence

## Testing Strategy

### Unit Tests
```typescript
describe('QuestionCard', () => {
  it('renders appropriate input for question type', () => {});
  it('validates responses correctly', () => {});
  it('handles mobile interactions properly', () => {});
  it('triggers delight factors at appropriate times', () => {});
});
```

### Integration Tests
```typescript
describe('QuestionFlow', () => {
  it('maintains context across questions', () => {});
  it('persists responses correctly', () => {});
  it('integrates with achievement system', () => {});
});
```

## Error Handling
1. Input validation with user feedback
2. Network error recovery
3. State inconsistency detection
4. Accessibility error prevention

## Performance Considerations
1. Lazy loading of delight factors
2. Response debouncing
3. Animation performance
4. Mobile touch optimization

## Future Considerations
1. Additional question types
2. Enhanced validation patterns
3. New delight factor types
4. React Native compatibility 

// DelightFactor selection and management
interface DelightFactorManager {
  getFactorsForQuestion(
    questionId: string,
    context: QuestionContext,
    previousResponses: QuestionResponse<Question>[]
  ): DelightFactor[];

  shouldShowFactor(
    factor: DelightFactor,
    question: Question,
    context: QuestionContext
  ): boolean;

  getNextFactor(
    question: Question,
    shownFactors: string[],
    context: QuestionContext
  ): DelightFactor | null;
} 