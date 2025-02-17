import React, { createContext, useContext, useReducer, useCallback, useEffect, useState } from 'react';
import type { Question, QuestionResponse } from '../questions/types/questions';
import { db } from '../../config/firebase';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../auth/AuthContext';
import { logger } from '../../utils/logger';

// Move all the types and interfaces
interface OnboardingState {
  selectedQuestions: Question[];
  currentQuestionIndex: number;
  responses: QuestionResponse[];
  completed: boolean;
}

interface OnboardingContextValue {
  state: OnboardingState;
  actions: {
    handleResponse: (response: QuestionResponse) => void;
    advanceToNext: () => void;
    resetOnboarding: () => void;
    initializeSequence: () => Promise<void>;
  };
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

type OnboardingAction = 
  | { type: 'HANDLE_RESPONSE'; payload: QuestionResponse }
  | { type: 'ADVANCE_TO_NEXT' }
  | { type: 'RESET_ONBOARDING' }
  | { type: 'INITIALIZE'; payload: OnboardingState };

const initialState: OnboardingState = {
  selectedQuestions: [],
  currentQuestionIndex: 0,
  responses: [],
  completed: false
};

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'HANDLE_RESPONSE':
      return {
        ...state,
        responses: [...state.responses, action.payload],
        completed: state.currentQuestionIndex === state.selectedQuestions.length - 1
      };

    case 'ADVANCE_TO_NEXT':
      if (state.currentQuestionIndex >= state.selectedQuestions.length - 1) {
        return {
          ...state,
          completed: true
        };
      }
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1
      };

    case 'RESET_ONBOARDING':
      return initialState;

    case 'INITIALIZE':
      return action.payload;

    default:
      return state;
  }
}

interface OnboardingProviderProps {
  children: React.ReactNode;
  standardQuestions: Question[];
  questionPool: Question[];
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  standardQuestions,
  questionPool
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const actions = {
    initializeSequence: useCallback(async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        logger.debug('Initializing onboarding sequence');

        // Select required questions from standard questions
        const selectedQuestions = [
          ...standardQuestions.filter(q => q.requiredForOnboarding),
          ...questionPool.filter(q => q.includeInOnboarding).slice(0, 3)
        ];

        logger.debug('Selected questions for onboarding:', selectedQuestions);

        // Create new onboarding document
        const onboardingRef = collection(db, 'onboarding');
        const docRef = doc(onboardingRef);
        await setDoc(docRef, {
          userId: user.uid,
          selectedQuestions,
          responses: [],
          currentQuestionIndex: 0,
          completed: false,
          startedAt: new Date().toISOString()
        });

        dispatch({
          type: 'INITIALIZE',
          payload: {
            selectedQuestions,
            responses: [],
            currentQuestionIndex: 0,
            completed: false
          }
        });

        setInitialized(true);
      } catch (error) {
        logger.error('Error initializing onboarding:', error);
      } finally {
        setLoading(false);
      }
    }, [user, standardQuestions, questionPool]),

    handleResponse: useCallback(async (response: QuestionResponse) => {
      if (!user) return;

      // Save response to Firebase
      const onboardingRef = collection(db, 'onboarding');
      const q = query(onboardingRef, where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;
        await setDoc(docRef, {
          responses: [...state.responses, response]
        }, { merge: true });
      }

      dispatch({ type: 'HANDLE_RESPONSE', payload: response });
    }, [user, state.responses]),

    advanceToNext: useCallback(() => {
      dispatch({ type: 'ADVANCE_TO_NEXT' });
    }, []),

    resetOnboarding: useCallback(() => {
      dispatch({ type: 'RESET_ONBOARDING' });
    }, [])
  };

  // Initialize when mounted
  useEffect(() => {
    if (user && !initialized && standardQuestions.length > 0) {
      actions.initializeSequence();
    }
  }, [user, initialized, standardQuestions, actions.initializeSequence]);

  // Log props when the provider mounts
  useEffect(() => {
    logger.debug('OnboardingProvider: Received props', {
      standardCount: standardQuestions.length,
      poolCount: questionPool.length
    });
  }, [standardQuestions, questionPool]);

  return (
    <OnboardingContext.Provider value={{ state, actions }}>
      {loading ? <div>Loading questions...</div> : children}
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