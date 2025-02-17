import React, { createContext, useContext, useReducer, useCallback, useState, useEffect } from 'react';
import type { QuestionResponse } from '../types';
import { logger } from '../../../utils/logger';

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
  setExperience: (experience: QuestionContextValue['experience']) => void;
  setShowFeedback: (show: boolean) => void;
  setAllowRetry: (allow: boolean) => void;
}

const QuestionContext = createContext<{
  state: QuestionContextValue;
  actions: QuestionContextActions;
} | undefined>(undefined);

type QuestionContextAction =
  | { type: 'SET_MODE'; payload: QuestionContextValue['mode'] }
  | { type: 'START_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'SHOW_EXPLANATION' }
  | { type: 'TRACK_RESPONSE'; payload: QuestionResponse }
  | { type: 'SET_EXPERIENCE'; payload: QuestionContextValue['experience'] }
  | { type: 'SET_SHOW_FEEDBACK'; payload: boolean }
  | { type: 'SET_ALLOW_RETRY'; payload: boolean };

const initialState: QuestionContextValue = {
  experience: 'ONBOARDING',
  mode: 'PRACTICE',
  showFeedback: true,
  allowRetry: true,
  trackProgress: true
};

function questionContextReducer(
  state: QuestionContextValue,
  action: QuestionContextAction
): QuestionContextValue {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
        showFeedback: action.payload === 'PRACTICE',
        allowRetry: action.payload === 'PRACTICE'
      };
    case 'START_TIMER':
      return { ...state };
    case 'PAUSE_TIMER':
      return { ...state };
    case 'RESET_TIMER':
      return { ...state };
    case 'SHOW_EXPLANATION':
      return { ...state };
    case 'TRACK_RESPONSE':
      return { ...state };
    case 'SET_EXPERIENCE':
      return {
        ...state,
        experience: action.payload
      };
    case 'SET_SHOW_FEEDBACK':
      return {
        ...state,
        showFeedback: action.payload
      };
    case 'SET_ALLOW_RETRY':
      return {
        ...state,
        allowRetry: action.payload
      };
    default:
      return state;
  }
}

export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(questionContextReducer, initialState);

  const actions: QuestionContextActions = {
    setMode: useCallback((mode) => {
      dispatch({ type: 'SET_MODE', payload: mode });
    }, []),
    startTimer: useCallback(() => {
      dispatch({ type: 'START_TIMER' });
    }, []),
    pauseTimer: useCallback(() => {
      dispatch({ type: 'PAUSE_TIMER' });
    }, []),
    resetTimer: useCallback(() => {
      dispatch({ type: 'RESET_TIMER' });
    }, []),
    showExplanation: useCallback(() => {
      dispatch({ type: 'SHOW_EXPLANATION' });
    }, []),
    trackResponse: useCallback((response) => {
      dispatch({ type: 'TRACK_RESPONSE', payload: response });
    }, []),
    setExperience: useCallback((experience) => {
      dispatch({ type: 'SET_EXPERIENCE', payload: experience });
    }, []),
    setShowFeedback: useCallback((show) => {
      dispatch({ type: 'SET_SHOW_FEEDBACK', payload: show });
    }, []),
    setAllowRetry: useCallback((allow) => {
      dispatch({ type: 'SET_ALLOW_RETRY', payload: allow });
    }, [])
  };

  useEffect(() => {
    logger.debug('QuestionProvider mounted', { 
      experience: state.experience,
      mode: state.mode,
      showFeedback: state.showFeedback,
      allowRetry: state.allowRetry
    });

    const loadQuestions = async () => {
      try {
        logger.debug('Loading questions...');
        // Your loading logic
      } catch (error) {
        logger.error('Error loading questions:', error);
      }
    };

    loadQuestions();
  }, [state]);

  return (
    <QuestionContext.Provider value={{ state, actions }}>
      {children}
    </QuestionContext.Provider>
  );
};

export function useQuestionContext() {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error('useQuestionContext must be used within a QuestionProvider');
  }
  return context;
} 