import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { QuizGenerator } from '../services/QuizGenerator';
import type { Quiz, QuizQuestion, QuizResponse } from '../types/quiz';
import type { QuestionResponse } from '../../questions/types/questions';
import { logger } from '../../../utils/logger';

interface QuizState {
  quiz: Quiz | null;
  currentQuestionIndex: number;
  responses: QuizResponse[];
  score: number;
  completed: boolean;
  loading: boolean;
  error: string | null;
}

type QuizAction = 
  | { type: 'START_QUIZ'; payload: Quiz }
  | { type: 'HANDLE_RESPONSE'; payload: QuizResponse }
  | { type: 'ADVANCE_QUESTION' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

interface QuizContextValue {
  state: QuizState;
  actions: {
    startQuiz: (targetUserId: string) => Promise<void>;
    handleResponse: (response: QuizResponse) => void;
    advanceQuestion: () => void;
  };
}

const initialState: QuizState = {
  quiz: null,
  currentQuestionIndex: 0,
  responses: [],
  score: 0,
  completed: false,
  loading: false,
  error: null
};

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

function isCorrectAnswer(response: QuizResponse, question: QuizQuestion): boolean {
  if (question.type === 'MC' && response.value.type === 'MC') {
    return response.value.selectedOption === question.correctAnswer;
  }
  if (question.type === 'NM' && response.value.type === 'NM') {
    return response.value.number === question.correctAnswer;
  }
  return false;
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  logger.debug('Quiz reducer:', { action, currentState: state });

  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...initialState,
        quiz: action.payload
      };

    case 'HANDLE_RESPONSE': {
      if (!state.quiz) return state;

      const currentQuestion = state.quiz.questions[state.currentQuestionIndex];
      const isCorrect = isCorrectAnswer(action.payload, currentQuestion);

      return {
        ...state,
        responses: [...state.responses, action.payload],
        score: isCorrect ? state.score + 1 : state.score
      };
    }

    case 'ADVANCE_QUESTION': {
      const nextIndex = state.currentQuestionIndex + 1;
      const isCompleted = state.quiz ? nextIndex >= state.quiz.questions.length : false;

      return {
        ...state,
        currentQuestionIndex: isCompleted ? state.currentQuestionIndex : nextIndex,
        completed: isCompleted
      };
    }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
}

export const QuizProvider: React.FC<{
  children: React.ReactNode;
  quizGenerator: QuizGenerator;
}> = ({ children, quizGenerator }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const actions = {
    startQuiz: useCallback(async (targetUserId: string) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const quiz = quizGenerator.generateQuiz(targetUserId);
        dispatch({ type: 'START_QUIZ', payload: quiz });
      } catch (error) {
        logger.error('Error starting quiz:', error);
        dispatch({ 
          type: 'SET_ERROR', 
          payload: 'Failed to start quiz. Please try again.' 
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }, [quizGenerator]),

    handleResponse: useCallback((response: QuizResponse) => {
      dispatch({ type: 'HANDLE_RESPONSE', payload: response });
    }, []),

    advanceQuestion: useCallback(() => {
      dispatch({ type: 'ADVANCE_QUESTION' });
    }, [])
  };

  return (
    <QuizContext.Provider value={{ state, actions }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}; 