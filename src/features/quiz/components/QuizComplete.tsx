import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../QuizContext';
import './QuizComplete.css';

interface QuizCompleteProps {
  score: number;
  totalQuestions: number;
}

export const QuizComplete: React.FC<QuizCompleteProps> = ({
  score,
  totalQuestions
}) => {
  const navigate = useNavigate();
  const { restartQuiz } = useQuiz();
  const percentage = Math.round((score / (totalQuestions * 100)) * 100);

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="quiz-complete" data-testid="quiz-complete">
      <div className="complete-content">
        <h1>Quiz Complete!</h1>
        
        <div className="score-display">
          <div className="score-circle">
            <div className="score-number">{percentage}%</div>
            <div className="score-label">Score</div>
          </div>
        </div>

        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-label">Points Earned</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Questions Answered</span>
            <span className="stat-value">{totalQuestions}</span>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="primary-button"
            onClick={handleContinue}
          >
            Continue to Dashboard
          </button>
          <button 
            className="secondary-button"
            onClick={restartQuiz}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}; 