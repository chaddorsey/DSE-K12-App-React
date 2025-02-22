import React from 'react';
import './QuizProgress.css';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuestion,
  totalQuestions,
  score
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="quiz-progress">
      <div className="progress-header">
        <div className="question-count">
          Question {currentQuestion} of {totalQuestions}
        </div>
        <div className="current-score">
          Score: {score}
        </div>
      </div>
      
      <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}; 