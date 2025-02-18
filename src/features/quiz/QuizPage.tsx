import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from './context/QuizContext';
import { MultipleChoiceQuestionComponent } from '../questions/components/MultipleChoiceQuestion';
import { NumericQuestionComponent } from '../questions/components/NumericQuestion';
import { logger } from '../../utils/logger';
import type { QuestionResponse, MultipleChoiceQuestion, NumericQuestion } from '../questions/types/questions';
import type { QuizQuestion, QuizResponse } from './types/quiz';
import './QuizPage.css';

export const QuizPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { state, actions } = useQuiz();

  useEffect(() => {
    if (!userId) {
      logger.error('No userId provided');
      navigate('/');
      return;
    }

    actions.startQuiz(userId).catch(error => {
      logger.error('Failed to start quiz:', error);
    });
  }, [userId, actions, navigate]);

  if (!userId) {
    return null; // or redirect/error message
  }

  const handleAnswer = (response: QuestionResponse) => {
    if (!state.quiz) return;

    const currentQuestion = state.quiz.questions[state.currentQuestionIndex];
    const quizResponse: QuizResponse = {
      ...response,
      isCorrect: isAnswerCorrect(response, currentQuestion)
    };
    actions.handleResponse(quizResponse);
  };

  // Helper function to check if answer is correct
  const isAnswerCorrect = (response: QuestionResponse, question: QuizQuestion): boolean => {
    if (question.type === 'MC' && response.value.type === 'MC') {
      return response.value.selectedOption === question.correctAnswer;
    }
    if (question.type === 'NM' && response.value.type === 'NM') {
      return response.value.number === question.correctAnswer;
    }
    return false;
  };

  const handleNext = () => {
    actions.advanceQuestion();
  };

  const handleRetry = () => {
    actions.startQuiz(userId).catch(error => {
      logger.error('Failed to retry quiz:', error);
    });
  };

  if (state.loading) {
    return (
      <div className="quiz-page" data-testid="quiz-loading">
        <div className="loading-spinner">Loading quiz...</div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="quiz-page" data-testid="error-message">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{state.error}</p>
          <button 
            onClick={handleRetry}
            data-testid="retry-button"
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!state.quiz) {
    return (
      <div className="quiz-page" data-testid="quiz-intro">
        <div className="intro-container">
          <h2>How well do you know {userId}?</h2>
          <p>Take this quiz to find out!</p>
          <button 
            onClick={handleRetry}
            data-testid="start-quiz-button"
            className="start-button"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (state.completed) {
    return (
      <div className="quiz-page" data-testid="quiz-complete">
        <div className="completion-container">
          <h2>Quiz Complete!</h2>
          <p>You scored {state.score} out of {state.quiz.questions.length}</p>
          <button 
            onClick={handleRetry}
            data-testid="try-again-button"
            className="retry-button"
          >
            Try Another Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = state.quiz.questions[state.currentQuestionIndex];
  const hasAnswered = state.responses.length > state.currentQuestionIndex;

  return (
    <div className="quiz-page">
      <div className="question-container">
        {currentQuestion.type === 'MC' && (
          <MultipleChoiceQuestionComponent
            question={currentQuestion as MultipleChoiceQuestion}
            onAnswer={handleAnswer}
          />
        )}
        {currentQuestion.type === 'NM' && (
          <NumericQuestionComponent
            question={currentQuestion as NumericQuestion}
            onAnswer={handleAnswer}
          />
        )}
      </div>

      {hasAnswered && (
        <div className="feedback-container">
          <div 
            data-testid="feedback-correct"
            className={`feedback ${
              state.responses[state.currentQuestionIndex].isCorrect ? 'correct' : 'incorrect'
            }`}
          >
            {state.responses[state.currentQuestionIndex].isCorrect 
              ? "That's correct!" 
              : `The correct answer was ${currentQuestion.correctAnswer}`
            }
          </div>
          <button
            onClick={handleNext}
            data-testid="next-button"
            className="next-button"
          >
            {state.currentQuestionIndex === state.quiz.questions.length - 1 
              ? 'Finish Quiz' 
              : 'Next Question'
            }
          </button>
        </div>
      )}

      <div className="progress-indicator">
        Question {state.currentQuestionIndex + 1} of {state.quiz.questions.length}
      </div>
    </div>
  );
}; 