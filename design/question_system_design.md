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
1. ✅ Base question components without delight factors
2. ✅ Type-safe response handling
3. ✅ Basic validation
4. ✅ Mobile-friendly inputs

### Phase 2: Delight Factor Integration
1. ✅ Delight factor component system
2. ✅ Animation framework integration (confetti)
3. ❌ Community insight display
4. ❌ Achievement triggers

### Phase 3: Context Integration
1. Experience-specific adaptations
   - QuestionContext provider implementation
   - Experience-specific UI adaptations
   - Experience-specific validation rules
   - Experience-specific delight factors
   
2. Mode-based modifications
   - Onboarding mode features:
     - Sequential question presentation
     - Fixed sequence of 7 questions
     - Question type distribution
     - Immediate delight feedback
     - Auto-advance to next question
     - Redirect to dashboard on completion
   - Quiz mode features:
     - Subject selection UI
     - Question sequence from subject's responses
     - Response validation against subject's answers
     - Correct/incorrect feedback
     - Score tracking and completion state
   - Head-to-Head mode features (future):
     - Real-time opponent matching
     - Synchronized question presentation
     - Live score comparison

### Context Integration Details

#### Context Provider Implementation
```typescript
interface QuestionContextValue {
  experience: 'ONBOARDING' | 'QUIZ' | 'HEAD_TO_HEAD';
  mode: 'PRACTICE' | 'COMPETITION';
  subjectId?: string;
  timeLimit?: number;
  showFeedback: boolean;
  allowRetry: boolean;
  trackProgress: boolean;
}

interface QuestionContextActions {
  setMode: (mode: QuestionContextValue['mode']) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  showExplanation: () => void;
  trackResponse: (response: QuestionResponse) => void;
}

const QuestionContext = React.createContext<{
  state: QuestionContextValue;
  actions: QuestionContextActions;
} | undefined>(undefined);
```

#### Response Persistence Schema
```typescript
interface StoredResponse extends QuestionResponse {
  experienceId: string;
  mode: QuestionContextValue['mode'];
  timestamp: number;
  timeTaken?: number;
  attempts?: number;
  correct?: boolean;
}

interface ProgressData {
  experienceId: string;
  userId: string;
  completedQuestions: string[];
  correctAnswers: number;
  totalAttempts: number;
  averageTime: number;
  lastActive: number;
}
```

#### API Endpoints
```typescript
// POST /api/responses
interface SubmitResponseRequest {
  response: StoredResponse;
}

// GET /api/progress/:experienceId
interface GetProgressResponse {
  progress: ProgressData;
}

// POST /api/analytics
interface AnalyticsEvent {
  type: 'VIEW' | 'ATTEMPT' | 'COMPLETE' | 'RETRY';
  questionId: string;
  experienceId: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}
```

#### Implementation Sequence
1. Context Provider Setup
   - Basic provider implementation
   - Mode switching
   - Timer functionality

2. Experience Adaptations
   - Experience-specific components
   - UI modifications
   - Validation rules

3. Storage Integration
   - Local storage setup
   - API client implementation
   - Response tracking

4. Analytics Integration
   - Event tracking
   - Progress monitoring
   - Performance metrics

#### Onboarding Flow Details
```typescript
interface OnboardingConfig {
  totalQuestions: 7;
  standardQuestions: QuestionType[]; // Fixed set of 4 questions
  questionPool: QuestionType[];      // Pool for random selection
  typeDistribution: {
    multipleChoice: { min: 2 },
    openResponse: { min: 1 },
    numeric: { min: 1 }
  };
}

interface OnboardingState {
  currentQuestionIndex: number;
  selectedQuestions: QuestionType[];  // 7 questions for this session
  responses: QuestionResponse[];
  completed: boolean;
}

interface OnboardingActions {
  initializeSequence: () => void;     // Select and order questions
  handleResponse: (response: QuestionResponse) => void;
  advanceToNext: () => void;
  completeOnboarding: () => void;     // Redirect to dashboard
}
```

#### Question Selection Algorithm
1. Start with 4 standard questions
2. Calculate remaining type requirements
3. Filter question pool by required types
4. Randomly select remaining questions while maintaining distribution
5. Shuffle final sequence (keeping standard questions in relative order)

#### Quiz Mode Details
```typescript
interface QuizState {
  subjectId: string;
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  responses: QuizResponse[];
  completed: boolean;
  score: number;
}

interface QuizQuestion extends QuestionType {
  correctAnswer: string;
  distractors: string[];
}

interface QuizResponse {
  questionId: string;
  userAnswer: string;
  correct: boolean;
  timestamp: number;
}
```

#### Quiz Flow
1. Subject Selection
   - Grid/list of available subjects with avatars
   - Selection initializes quiz sequence

2. Question Presentation
   - 5 questions per sequence
   - Multiple choice format with distractors
   - Progress indication (X/5)

3. Response Handling
   - Correct:
     - Green highlight
     - Confetti animation
     - Score increment
   - Incorrect:
     - Red highlight with wiggle
     - Reveal correct in green
     - No delight factor

4. Completion
   - Display final score
   - "Try Some More" option if more questions available
   - "Return to People" navigation option

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

### Question Types

#### Base Question Type
```typescript
interface BaseQuestionType {
  id: string;
  prompt: string;
  type: string;
}
```

#### Multiple Choice
```typescript
interface MultipleChoiceQuestionType extends BaseQuestionType {
  type: 'MULTIPLE_CHOICE';
  options: string[];
}
```

#### Open Response
```typescript
interface OpenResponseQuestionType extends BaseQuestionType {
  type: 'OPEN_RESPONSE';
  maxLength: number;
}
```

#### Numeric
```typescript
interface NumericQuestionType extends BaseQuestionType {
  type: 'NUMERIC';
  min: number;
  max: number;
  step: number;
}
```

#### Slider
```typescript
interface SliderQuestionType extends BaseQuestionType {
  type: 'SLIDER';
  leftOption: string;
  rightOption: string;
  defaultValue?: number; // 0.5 if not specified
}
```

#### Segmented Slider
```typescript
interface SegmentedSliderQuestionType extends BaseQuestionType {
  type: 'SEGMENTED_SLIDER';
  segments: {
    value: number;
    label?: string;
  }[];
  defaultSegment?: number;
}
```

#### X-Y Continuum
```typescript
interface XYContinuumQuestionType extends BaseQuestionType {
  type: 'XY_CONTINUUM';
  xAxis: {
    left: string;
    right: string;
  };
  yAxis: {
    top: string;
    bottom: string;
  };
  defaultPosition?: { x: number; y: number };
}
``` 