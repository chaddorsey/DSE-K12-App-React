import React, { createContext, useContext, useReducer, useCallback, useEffect, useState } from 'react';
import type { 
  Question, 
  QuestionResponse,
  MultipleChoiceQuestion,
  OpenResponseQuestion,
  NumericQuestion,
  SliderQuestion,
  QuestionTypeString,
  QuestionCategory
} from '../questions/types/questions';
import { db } from '../../config/firebase';
import { doc, setDoc, collection, arrayUnion, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../auth/AuthContext';
import { logger } from '../../utils/logger';

interface OnboardingState {
  sessionId: string;
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
  sessionId: '',
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
  logger.info('Reducer called with:', { action, currentState: state });
  
  switch (action.type) {
    case 'INITIALIZE': {
      logger.info('Initializing state with:', action.payload);
      return action.payload;
    }
    case 'HANDLE_RESPONSE': {
      const newState = {
        ...state,
        responses: [...state.responses, action.payload]
      };
      logger.debug('Handling response:', { 
        response: action.payload, 
        newState 
      });
      return newState;
    }
    case 'ADVANCE_TO_NEXT': {
      const nextIndex = state.currentQuestionIndex + 1;
      const isCompleted = nextIndex >= state.selectedQuestions.length;
      
      const newState = {
        ...state,
        currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
        completed: isCompleted
      };
      
      logger.debug('Advancing to next:', { 
        nextIndex, 
        isCompleted, 
        newState 
      });
      return newState;
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

// Update the interface to use a more specific type for stored questions
interface StoredQuestion {
  id: string;
  type: QuestionTypeString;
  prompt: string;
  text: string;
  label: string;
  category: QuestionCategory;
  number: number;
  requiredForOnboarding: boolean;
  includeInOnboarding: boolean;
  correctAnswer: string | null;
  options?: string[];
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  leftOption?: string;
  rightOption?: string;
}

interface OnboardingSession {
  id: string;
  userId: string;
  selectedQuestions: StoredQuestion[];  // Use StoredQuestion instead of Question
  responses: QuestionResponse[];
  currentQuestionIndex: number;
  completed: boolean;
  startedAt: string;
  completedAt?: string;
}

// Add this helper function at the top of the file
const sanitizeQuestionForFirestore = (question: Question) => {
  // Base properties that all questions have
  const base = {
    id: question.id,
    type: question.type,
    prompt: question.prompt,
    text: question.text,
    label: question.label,
    category: question.category,
    number: question.number,
    requiredForOnboarding: question.requiredForOnboarding,
    includeInOnboarding: question.includeInOnboarding,
    correctAnswer: question.correctAnswer || null
  };

  // Add type-specific properties
  switch (question.type) {
    case 'MC':
      return {
        ...base,
        options: (question as MultipleChoiceQuestion).options
      };
    case 'OP':
      return {
        ...base,
        maxLength: (question as OpenResponseQuestion).maxLength
      };
    case 'NM':
      return {
        ...base,
        min: (question as NumericQuestion).min,
        max: (question as NumericQuestion).max,
        step: (question as NumericQuestion).step
      };
    case 'SCALE':
      return {
        ...base,
        leftOption: (question as SliderQuestion).leftOption,
        rightOption: (question as SliderQuestion).rightOption
      };
    default:
      return base;
  }
};

// Add this helper function
const convertStoredToQuestion = (stored: StoredQuestion): Question => {
  const base = {
    id: stored.id,
    type: stored.type,
    prompt: stored.prompt,
    text: stored.text,
    label: stored.label,
    category: stored.category,
    number: stored.number,
    requiredForOnboarding: stored.requiredForOnboarding,
    includeInOnboarding: stored.includeInOnboarding,
    correctAnswer: stored.correctAnswer || undefined
  };

  switch (stored.type) {
    case 'MC':
      return {
        ...base,
        type: 'MC',
        options: stored.options || []
      };
    case 'OP':
      return {
        ...base,
        type: 'OP',
        maxLength: stored.maxLength || 500
      };
    case 'NM':
      return {
        ...base,
        type: 'NM',
        min: stored.min || 0,
        max: stored.max || 100,
        step: stored.step || 1
      };
    case 'SCALE':
      return {
        ...base,
        type: 'SCALE',
        leftOption: stored.leftOption || '',
        rightOption: stored.rightOption || ''
      };
    default:
      return base as Question;
  }
};

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  standardQuestions,
  questionPool
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Check for completed onboarding when component mounts
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const onboardingRef = collection(db, 'onboarding');
        
        // First check for any existing onboarding sessions for this user
        const userSessions = query(
          onboardingRef,
          where('userId', '==', user.uid)
        );

        const sessionsSnapshot = await getDocs(userSessions);
        
        if (!sessionsSnapshot.empty) {
          // Get the most recent session
          const sessions = sessionsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as OnboardingSession[];

          const latestSession = sessions.sort((a, b) => 
            b.startedAt.localeCompare(a.startedAt)
          )[0];

          if (latestSession.completed) {
            setHasCompletedOnboarding(true);
            logger.debug('User has already completed onboarding');
          } else {
            // Restore in-progress session
            logger.debug('Restoring in-progress session:', latestSession);
            dispatch({
              type: 'INITIALIZE',
              payload: {
                sessionId: latestSession.id,
                selectedQuestions: latestSession.selectedQuestions.map(convertStoredToQuestion),
                responses: latestSession.responses || [],
                currentQuestionIndex: latestSession.currentQuestionIndex,
                completed: false
              }
            });
          }
        } else {
          // No existing sessions, start new one
          logger.debug('Starting new onboarding session');
          await actions.initializeSequence();
        }
      } catch (error) {
        logger.error('Error checking onboarding status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  const actions = {
    initializeSequence: useCallback(async () => {
      if (!user) {
        logger.debug('No user found during initialization');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Select all required questions plus 10 from the pool
        const selectedQuestions = [
          ...standardQuestions.filter(q => q.requiredForOnboarding),
          ...questionPool.filter(q => q.includeInOnboarding).slice(0, 10)
        ];

        logger.debug('Initializing sequence with questions:', {
          required: standardQuestions.filter(q => q.requiredForOnboarding),
          pool: questionPool.filter(q => q.includeInOnboarding).slice(0, 10),
          total: selectedQuestions
        });

        const onboardingRef = collection(db, 'onboarding');
        const docRef = doc(onboardingRef);
        const sessionId = docRef.id;

        // Sanitize questions before saving to Firestore
        const sanitizedQuestions = selectedQuestions.map(sanitizeQuestionForFirestore);

        // Create new session document
        const newSession: Omit<OnboardingSession, 'id'> = {
          userId: user.uid,
          selectedQuestions: sanitizedQuestions,
          responses: [],
          currentQuestionIndex: 0,
          completed: false,
          startedAt: new Date().toISOString()
        };

        await setDoc(docRef, newSession);

        // Initialize local state with original questions
        const initialState = {
          sessionId,
          selectedQuestions,
          responses: [],
          currentQuestionIndex: 0,
          completed: false
        };

        logger.debug('Dispatching initial state:', initialState);
        dispatch({
          type: 'INITIALIZE',
          payload: initialState
        });

      } catch (error) {
        logger.error('Error initializing onboarding:', error);
      } finally {
        setLoading(false);
      }
    }, [user, standardQuestions, questionPool]),

    handleResponse: useCallback(async (response: QuestionResponse) => {
      try {
        logger.debug('Handling response:', {
          response,
          currentIndex: state.currentQuestionIndex,
          nextIndex: state.currentQuestionIndex + 1,
          totalQuestions: state.selectedQuestions.length,
          nextQuestion: state.selectedQuestions[state.currentQuestionIndex + 1]
        });

        // Update local state
        dispatch({ type: 'HANDLE_RESPONSE', payload: response });

        const onboardingRef = collection(db, 'onboarding');
        const docRef = doc(onboardingRef, state.sessionId);
        
        const isLastQuestion = state.currentQuestionIndex === state.selectedQuestions.length - 1;
        
        // Update Firestore with the new response and current state
        await setDoc(docRef, {
          responses: arrayUnion(response),
          currentQuestionIndex: state.currentQuestionIndex + 1,
          completed: isLastQuestion,
          completedAt: isLastQuestion ? new Date().toISOString() : null
        }, { merge: true });

        if (isLastQuestion) {
          setHasCompletedOnboarding(true);
        }

        logger.debug('Response saved, state updated:', {
          response,
          newIndex: state.currentQuestionIndex + 1,
          isLastQuestion,
          sessionId: state.sessionId
        });
      } catch (error) {
        logger.error('Error saving response:', error);
      }
    }, [state.currentQuestionIndex, state.selectedQuestions.length, state.sessionId]),

    advanceToNext: useCallback(() => {
      dispatch({ type: 'ADVANCE_TO_NEXT' });
    }, [])
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (hasCompletedOnboarding) {
    return (
      <div className="onboarding-complete">
        <h2>Onboarding Complete</h2>
        <p>You have already completed all available onboarding questions.</p>
        <p>Thank you for your participation!</p>
      </div>
    );
  }

  return (
    <OnboardingContext.Provider value={{ state, actions }}>
      {children}
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