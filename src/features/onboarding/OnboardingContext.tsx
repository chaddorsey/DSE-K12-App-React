import React, { createContext, useContext, useReducer, useCallback, useEffect, ReactNode, useState } from 'react';
import { QuestionService } from '../questions/services/QuestionService';
import { ResponseService } from '../questions/services/ResponseService';
import { OnboardingService } from './services/OnboardingService';
import { QuestionFactory } from '../questions/services/QuestionFactory';
import { db } from '@/config/firebase';
import { 
  Question,
  QuestionResponse,
  QuestionContext,
  QuestionCategory
} from '../questions/types/questions';
import { useAuth } from '../auth/AuthContext';
import { logger } from '@/utils/logger';
import { questionPool } from '../questions/data/rawQuestions';
import { useNavigate } from 'react-router-dom';

interface OnboardingState {
  sessionId: string | null;
  questions: Question[];
  currentQuestionIndex: number;
  responses: QuestionResponse[];
  completed: boolean;
  loading: boolean;
  error: string | null;
}

interface OnboardingContextValue {
  currentQuestion: Question | null;
  currentQuestionComponent: React.ComponentType<any> | null;
  responses: QuestionResponse[];
  isComplete: boolean;
  loading: boolean;
  error: string | null;
  handleResponse: (response: QuestionResponse) => Promise<void>;
  skipQuestion: () => void;
  resetOnboarding: () => void;
}

const initialState: OnboardingState = {
  sessionId: null,
  questions: [],
  currentQuestionIndex: 0,
  responses: [],
  completed: false,
  loading: true,
  error: null
};

type OnboardingAction = 
  | { type: 'SET_SESSION'; payload: { id: string; questions: Question[] } }
  | { type: 'ADD_RESPONSE'; payload: QuestionResponse }
  | { type: 'SKIP_QUESTION' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET' };

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  logger.debug('Onboarding reducer:', { action, currentState: state });

  switch (action.type) {
    case 'SET_SESSION':
      return {
        ...state,
        sessionId: action.payload.id,
        questions: action.payload.questions,
        loading: false
      };

    case 'ADD_RESPONSE':
      const newResponses = [...state.responses, action.payload];
      return {
        ...state,
        responses: newResponses,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        completed: state.currentQuestionIndex + 1 === state.questions.length
      };

    case 'SKIP_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        completed: state.currentQuestionIndex + 1 === state.questions.length
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

interface OnboardingProviderProps {
  children: ReactNode;
  questions: Question[];
  additionalQuestions: Question[];
}

export const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  const { user } = useAuth();
  const navigate = useNavigate();

  const questionService = new QuestionService(db);
  const responseService = new ResponseService(db);
  const onboardingService = new OnboardingService(db);
  const questionFactory = new QuestionFactory();

  const initializeSession = useCallback(async () => {
    if (!user?.uid) return;

    try {
      // Don't set loading if we already have a session
      if (!state.sessionId) {
        dispatch({ type: 'SET_LOADING', payload: true });
      }

      // Check for existing session
      const existingSession = await onboardingService.getLatestSession(user.uid);
      
      if (existingSession) {
        if (existingSession.completed) {
          navigate('/', { replace: true });
          return;
        }
        
        dispatch({ 
          type: 'SET_SESSION', 
          payload: { 
            id: existingSession.id, 
            questions: existingSession.questions 
          }
        });
        return;
      }

      // Get required questions first
      const requiredQuestions = questionPool.filter(q => q.required);
      
      // Get some random non-required questions
      const optionalQuestions = questionPool
        .filter(q => !q.required)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

      const onboardingQuestions = [...requiredQuestions, ...optionalQuestions];

      // Create new session
      const newSession = await onboardingService.createSession(user.uid, onboardingQuestions);
      
      dispatch({ 
        type: 'SET_SESSION', 
        payload: { 
          id: newSession.id, 
          questions: onboardingQuestions 
        }
      });
    } catch (error) {
      logger.error('Failed to initialize session:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize onboarding' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [user?.uid, navigate, state.sessionId]);

  const handleResponse = async (response: QuestionResponse) => {
    if (!state.sessionId) return;

    try {
      const savedResponse = await responseService.saveResponse({
        ...response,
        userId: user?.uid || '',
        context: QuestionContext.ONBOARDING
      });

      await onboardingService.updateSession(state.sessionId, {
        responses: [...state.responses, savedResponse],
        currentQuestionIndex: state.currentQuestionIndex + 1,
        completed: state.currentQuestionIndex + 1 === state.questions.length
      });

      dispatch({ type: 'ADD_RESPONSE', payload: savedResponse });
    } catch (error) {
      logger.error('Failed to save response:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save response' });
    }
  };

  const skipQuestion = () => {
    dispatch({ type: 'SKIP_QUESTION' });
  };

  const resetOnboarding = () => {
    dispatch({ type: 'RESET' });
    initializeSession();
  };

  useEffect(() => {
    if (user?.uid && !state.sessionId) {
      initializeSession();
    }
  }, [user?.uid, initializeSession, state.sessionId]);

  const currentQuestion = state.questions[state.currentQuestionIndex] || null;
  const currentQuestionComponent = currentQuestion 
    ? questionFactory.createQuestionComponent(currentQuestion)
    : null;

  const value: OnboardingContextValue = {
    currentQuestion,
    currentQuestionComponent,
    responses: state.responses,
    isComplete: state.completed,
    loading: state.loading,
    error: state.error,
    handleResponse,
    skipQuestion,
    resetOnboarding
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}; 