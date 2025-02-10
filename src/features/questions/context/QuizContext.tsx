import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { QuizQuestion, QuizResponse } from '../types';

interface QuizState {
  subjectId: string | null;
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  responses: QuizResponse[];
  completed: boolean;
  score: number;
}

interface QuizActions {
  initializeQuiz: (subjectId: string, questions: QuizQuestion[]) => void;
  submitAnswer: (response: QuizResponse) => void;
  advanceToNext: () => void;
  resetQuiz: () => void;
}

type QuizAction =
  | { type: 'INITIALIZE_QUIZ'; payload: { subjectId: string; questions: QuizQuestion[] } }
  | { type: 'SUBMIT_ANSWER'; payload: QuizResponse }
  | { type: 'ADVANCE_TO_NEXT' }
  | { type: 'RESET_QUIZ' };

const initialState: QuizState = {
  subjectId: null,
  currentQuestionIndex: 0,
  questions: [],
  responses: [],
  completed: false,
  score: 0
};

const QuizContext = createContext<{
  state: QuizState;
  actions: QuizActions;
} | undefined>(undefined);

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'INITIALIZE_QUIZ':
      return {
        ...initialState,
        subjectId: action.payload.subjectId,
        questions: action.payload.questions
      };
    case 'SUBMIT_ANSWER': {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = action.payload.userAnswer === currentQuestion.correctAnswer;
      
      return {
        ...state,
        responses: [...state.responses, action.payload],
        score: isCorrect ? state.score + 1 : state.score
      };
    }
    case 'ADVANCE_TO_NEXT':
      if (state.currentQuestionIndex < state.questions.length - 1) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          completed: state.currentQuestionIndex === state.questions.length - 2
        };
      }
      return {
        ...state,
        completed: true
      };
    case 'RESET_QUIZ':
      return initialState;
    default:
      return state;
  }
}

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const actions: QuizActions = {
    initializeQuiz: useCallback((subjectId: string, questions: QuizQuestion[]) => {
      dispatch({ type: 'INITIALIZE_QUIZ', payload: { subjectId, questions } });
    }, []),

    submitAnswer: useCallback((response: QuizResponse) => {
      dispatch({ type: 'SUBMIT_ANSWER', payload: response });
    }, []),

    advanceToNext: useCallback(() => {
      dispatch({ type: 'ADVANCE_TO_NEXT' });
    }, []),

    resetQuiz: useCallback(() => {
      dispatch({ type: 'RESET_QUIZ' });
    }, [])
  };

  return (
    <QuizContext.Provider value={{ state, actions }}>
      {children}
    </QuizContext.Provider>
  );
};

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
} 