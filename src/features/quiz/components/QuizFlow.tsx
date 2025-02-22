import React from 'react';
import { useQuiz } from '../QuizContext';
import { QuizProgress } from './QuizProgress';
import { QuizComplete } from './QuizComplete';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { QuestionResponse } from '../../questions/types/questions';
import { logger } from '@/utils/logger';
import './QuizFlow.css';
import { QuizQuestionFactory } from '../services/QuizQuestionFactory';

export const QuizFlow: React.FC = () => {
  const {
    currentQuestion,
    responses,
    isComplete,
    loading,
    error,
    score,
    submitAnswer,
    skipQuestion
  } = useQuiz();

  const questionFactory = new QuizQuestionFactory();

  if (loading) {
    return <LoadingSpinner data-testid="loading-spinner" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isComplete) {
    return <QuizComplete score={score} totalQuestions={responses.length} />;
  }

  if (!currentQuestion) {
    return <ErrorMessage message="No question available" />;
  }

  const QuestionComponent = questionFactory.createQuestionComponent(currentQuestion);

  const handleAnswer = async (response: QuestionResponse) => {
    try {
      await submitAnswer(response);
      logger.info('Response submitted:', { questionId: currentQuestion.id });
    } catch (error) {
      logger.error('Error submitting response:', error);
    }
  };

  return (
    <div className="quiz-flow">
      <QuizProgress 
        currentQuestion={responses.length + 1}
        totalQuestions={responses.length + 1}
        score={score}
      />
      
      <div className="question-container">
        <QuestionComponent
          question={currentQuestion}
          onAnswer={handleAnswer}
          showFeedback={true}
        />
      </div>

      {!currentQuestion.required && (
        <button 
          className="skip-button"
          onClick={skipQuestion}
          aria-label="Skip question"
        >
          Skip
        </button>
      )}
    </div>
  );
};