import React, { createContext, useContext, useReducer, useCallback, useEffect, useState } from 'react';
import type { 
  Question, 
  QuestionResponse,
  MultipleChoiceQuestion,
  OpenResponseQuestion,
  NumericQuestion
} from '../questions/types/questions';
import { db } from '../../config/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { useAuth } from '../auth/AuthContext';
import { logger } from '../../utils/logger';

interface OnboardingState {
  selectedQuestions: Question[];
  currentQuestionIndex: number;
  responses: QuestionResponse[];
  completed: boolean;
}

interface OnboardingContextValue {
  state: OnboardingState;
  actions: {
    initializeSequence: () => Promise<void>;
    handleResponse: (response: QuestionResponse) => void;
    advanceToNext: () => void;
  };
}

const initialState: OnboardingState = {
  selectedQuestions: [],
  currentQuestionIndex: 0,
  responses: [],
  completed: false
};

type OnboardingAction = 
  | { type: 'INITIALIZE'; payload: OnboardingState }
  | { type: 'HANDLE_RESPONSE'; payload: QuestionResponse }
  | { type: 'ADVANCE_TO_NEXT' };

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload;
    case 'HANDLE_RESPONSE':
      return {
        ...state,
        responses: [...state.responses, action.payload]
      };
    case 'ADVANCE_TO_NEXT': {
      const nextIndex = state.currentQuestionIndex + 1;
      const isCompleted = nextIndex >= state.selectedQuestions.length;
      
      return {
        ...state,
        currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
        completed: isCompleted
      };
    }
    default:
      return state;
  }
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

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
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  // Add useEffect to initialize sequence when component mounts
  useEffect(() => {
    logger.debug('OnboardingProvider mounted', { 
      standardQuestions, 
      questionPool,
      user 
    });
    actions.initializeSequence();
  }, []);

  const actions = {
    initializeSequence: useCallback(async () => {
      if (!user) {
        logger.debug('No user found during initialization');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        logger.debug('Initializing onboarding sequence', {
          standardQuestions,
          questionPool
        });

        // Select required questions from standard questions
        const selectedQuestions = [
          ...standardQuestions.filter(q => q.requiredForOnboarding),
          ...questionPool.filter(q => q.includeInOnboarding).slice(0, 3)
        ];

        logger.debug('Selected questions:', selectedQuestions);

        // Create new onboarding document with sanitized data
        const onboardingRef = collection(db, 'onboarding');
        const docRef = doc(onboardingRef);
        
        // Sanitize the questions for Firestore by removing undefined values
        const sanitizedQuestions = selectedQuestions.map(q => {
          const base = {
            id: q.id,
            type: q.type,
            prompt: q.prompt,
            text: q.text,
            label: q.label,
            category: q.category,
            number: q.number,
            requiredForOnboarding: q.requiredForOnboarding,
            includeInOnboarding: q.includeInOnboarding,
            correctAnswer: q.correctAnswer || null,
            metadata: {
              createdAt: new Date().toISOString()
            }
          };

          // Add type-specific properties
          switch (q.type) {
            case 'MC':
              return {
                ...base,
                options: (q as MultipleChoiceQuestion).options
              };
            case 'OP':
              return {
                ...base,
                maxLength: (q as OpenResponseQuestion).maxLength
              };
            case 'NM':
              return {
                ...base,
                min: (q as NumericQuestion).min,
                max: (q as NumericQuestion).max,
                step: (q as NumericQuestion).step
              };
            default:
              return base;
          }
        });

        await setDoc(docRef, {
          userId: user.uid,
          selectedQuestions: sanitizedQuestions,
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
      } catch (error) {
        logger.error('Error initializing onboarding:', error);
      } finally {
        setLoading(false);
      }
    }, [user, standardQuestions, questionPool]),

    handleResponse: useCallback(async (response: QuestionResponse) => {
      dispatch({ type: 'HANDLE_RESPONSE', payload: response });
    }, []),

    advanceToNext: useCallback(() => {
      dispatch({ type: 'ADVANCE_TO_NEXT' });
    }, [])
  };

  return (
    <OnboardingContext.Provider value={{ state, actions }}>
      {loading ? <div>Loading...</div> : children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
};

export { OnboardingContext }; 