import React, { useState, useCallback } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { UserSearch } from '../components/UserSearch';
import { QuizFlow } from '../components/QuizFlow';
import { QuizService } from '../services/QuizService';
import { db } from '../../../config/firebase';
import type { IUser } from '../../auth/types';
import type { Quiz } from '../types/quiz';
import { logger } from '../../../utils/logger';

export const QuizPage = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const quizService = new QuizService(db);

  const handleUserSelect = useCallback(async (user: IUser) => {
    setSelectedUser(user);
    setLoading(true);
    setError(null);
    setQuiz(null);

    try {
      const newQuiz = await quizService.generateQuiz(user.id);
      setQuiz(newQuiz);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to generate quiz';
      setError(errorMessage);
      
      // Add helpful message if no questions available
      if (errorMessage.includes('not answered any questions')) {
        setError(`${user.displayName} hasn't answered any questions yet. Try another user or come back later.`);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleQuizComplete = (result: { score: number; totalQuestions: number }) => {
    setQuizComplete(true);
  };

  const handleStartNew = () => {
    setQuiz(null);
    setSelectedUser(null);
    setQuizComplete(false);
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    
    logger.debug('Answer comparison:', {
      given: answer,
      correct: currentQuestion.correctAnswer,
      isCorrect
    });

    // ... rest of answer handling code
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      
      {!selectedUser ? (
        <>
          <p className="mb-4">Choose a user to quiz about:</p>
          <UserSearch onUserSelect={handleUserSelect} />
        </>
      ) : (
        <div>
          <p className="mb-4">Selected user: {selectedUser.displayName}</p>
          
          {loading && <div className="loading">Generating quiz...</div>}
          
          {error && (
            <div className="error-message">
              {error}
              <button 
                onClick={() => handleUserSelect(selectedUser)}
                className="retry-button"
              >
                Try Again
              </button>
            </div>
          )}

          {quiz && !quizComplete && (
            <QuizFlow 
              quiz={quiz} 
              onComplete={handleQuizComplete}
            />
          )}

          {quizComplete && (
            <div className="quiz-complete">
              <button 
                onClick={handleStartNew}
                className="new-quiz-button"
              >
                Start New Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 