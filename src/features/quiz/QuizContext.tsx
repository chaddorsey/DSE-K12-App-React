import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { QuizService } from '../questions/services/QuizService';
import { QuestionService } from '../questions/services/QuestionService';
import { QuestionFactory } from '../questions/services/QuestionFactory';
import { 
  Question,
  QuizQuestion,
  QuizResponse,
  QuestionContext as QContext
} from '../questions/types/questions';
import { useAuth } from '../auth/AuthContext';
import { logger } from '@/utils/logger';

interface QuizState {
  id: string | null;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  responses: QuizResponse[];
  completed: boolean;
  loading: boolean;
  error: string | null;
  score: number;
}

interface QuizContextValue {
  currentQuestion: QuizQuestion | null;
  currentQuestionComponent: React.ComponentType<any> | null;
  responses: QuizResponse[];
  isComplete: boolean;
  loading: boolean;
  error: string | null;
  score: number;
  submitAnswer: (response: QuizResponse) => Promise<void>;
  skipQuestion: () => void;
  restartQuiz: () => void;
}

const initialState: QuizState = {
  id: null,
  questions: [],
  currentQuestionIndex: 0,
  responses: [],
  completed: false,
  loading: true,
  error: null,
  score: 0
};

type QuizAction = 
  | { type: 'SET_QUIZ'; payload: { id: string; questions: QuizQuestion[] } }
  | { type: 'ADD_RESPONSE'; payload: QuizResponse }
  | { type: 'SKIP_QUESTION' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'RESET' };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  logger.debug('Quiz reducer:', { action, currentState: state });

  switch (action.type) {
    case 'SET_QUIZ':
      return {
        ...state,
        id: action.payload.id,
        questions: action.payload.questions,
        loading: false
      };

    case 'ADD_RESPONSE':
      const newResponses = [...state.responses, action.payload];
      const newScore = state.score + (action.payload.points || 0);
      return {
        ...state,
        responses: newResponses,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        completed: state.currentQuestionIndex + 1 === state.questions.length,
        score: newScore
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

    case 'UPDATE_SCORE':
      return {
        ...state,
        score: action.payload
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

interface QuizProviderProps {
  children: React.ReactNode;
  targetUserId: string;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children, targetUserId }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { user } = useAuth();

  const quizService = new QuizService(new QuestionService());
  const questionFactory = new QuestionFactory();

  const initializeQuiz = useCallback(async () => {
    if (!user?.uid) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const quiz = await quizService.generateQuiz(user.uid, targetUserId);
      
      dispatch({ 
        type: 'SET_QUIZ', 
        payload: { 
          id: quiz.id, 
          questions: quiz.questions 
        }
      });
    } catch (error) {
      logger.error('Failed to initialize quiz:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load quiz' });
    }
  }, [user, targetUserId, quizService]);

  const submitAnswer = async (response: QuizResponse) => {
    try {
      const scoredResponse = await quizService.submitQuizResponse(response);
      dispatch({ type: 'ADD_RESPONSE', payload: scoredResponse });
    } catch (error) {
      logger.error('Failed to submit answer:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to submit answer' });
    }
  };

  const skipQuestion = () => {
    dispatch({ type: 'SKIP_QUESTION' });
  };

  const restartQuiz = () => {
    dispatch({ type: 'RESET' });
    initializeQuiz();
  };

  useEffect(() => {
    initializeQuiz();
  }, [initializeQuiz]);

  const currentQuestion = state.questions[state.currentQuestionIndex] || null;
  const currentQuestionComponent = currentQuestion 
    ? questionFactory.createQuestionComponent(currentQuestion)
    : null;

  const value: QuizContextValue = {
    currentQuestion,
    currentQuestionComponent,
    responses: state.responses,
    isComplete: state.completed,
    loading: state.loading,
    error: state.error,
    score: state.score,
    submitAnswer,
    skipQuestion,
    restartQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
}; 