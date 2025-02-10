import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { QuestionType, QuestionResponse } from '../types';

interface OnboardingState {
  currentQuestionIndex: number;
  selectedQuestions: QuestionType[];
  responses: QuestionResponse[];
  completed: boolean;
}

interface OnboardingActions {
  initializeSequence: () => void;
  handleResponse: (response: QuestionResponse) => void;
  advanceToNext: () => void;
  completeOnboarding: () => void;
}

interface OnboardingProviderProps {
  children: React.ReactNode;
  standardQuestions: QuestionType[];
  questionPool: QuestionType[];
}

type OnboardingAction =
  | { type: 'INITIALIZE_SEQUENCE' }
  | { type: 'HANDLE_RESPONSE'; payload: QuestionResponse }
  | { type: 'ADVANCE_TO_NEXT' }
  | { type: 'COMPLETE_ONBOARDING' };

const initialState: OnboardingState = {
  currentQuestionIndex: 0,
  selectedQuestions: [],
  responses: [],
  completed: false
};

const OnboardingContext = createContext<{
  state: OnboardingState;
  actions: OnboardingActions;
} | undefined>(undefined);

function selectQuestions(standardQuestions: QuestionType[], questionPool: QuestionType[]): QuestionType[] {
  const selected = [...standardQuestions];
  const remainingCount = 7 - selected.length;
  
  // Randomly select from pool
  const poolCopy = [...questionPool];
  for (let i = 0; i < remainingCount; i++) {
    const randomIndex = Math.floor(Math.random() * poolCopy.length);
    selected.push(poolCopy[randomIndex]);
    poolCopy.splice(randomIndex, 1);
  }
  
  return selected;
}

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction,
  standardQuestions: QuestionType[],
  questionPool: QuestionType[]
): OnboardingState {
  switch (action.type) {
    case 'INITIALIZE_SEQUENCE':
      return {
        ...state,
        selectedQuestions: selectQuestions(standardQuestions, questionPool),
        currentQuestionIndex: 0,
        responses: [],
        completed: false
      };
    case 'HANDLE_RESPONSE':
      const newResponses = [...state.responses, action.payload];
      const isComplete = newResponses.length === 7;
      return {
        ...state,
        responses: newResponses,
        completed: isComplete
      };
    case 'ADVANCE_TO_NEXT':
      if (state.currentQuestionIndex < state.selectedQuestions.length - 1) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1
        };
      }
      return state;
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        completed: true
      };
    default:
      return state;
  }
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  standardQuestions,
  questionPool
}) => {
  const [state, dispatch] = useReducer(
    (state: OnboardingState, action: OnboardingAction) => 
      onboardingReducer(state, action, standardQuestions, questionPool),
    initialState
  );

  const actions: OnboardingActions = {
    initializeSequence: useCallback(() => {
      dispatch({ type: 'INITIALIZE_SEQUENCE' });
    }, []),
    
    handleResponse: useCallback((response: QuestionResponse) => {
      dispatch({ type: 'HANDLE_RESPONSE', payload: response });
      dispatch({ type: 'ADVANCE_TO_NEXT' });
    }, []),
    
    advanceToNext: useCallback(() => {
      dispatch({ type: 'ADVANCE_TO_NEXT' });
    }, []),
    
    completeOnboarding: useCallback(() => {
      dispatch({ type: 'COMPLETE_ONBOARDING' });
    }, [])
  };

  return (
    <OnboardingContext.Provider value={{ state, actions }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
} 