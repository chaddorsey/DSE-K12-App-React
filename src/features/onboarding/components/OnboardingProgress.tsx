import React from 'react';
import './OnboardingProgress.css';

interface OnboardingProgressProps {
  currentIndex: number;
  totalQuestions: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentIndex,
  totalQuestions
}) => {
  const progress = (currentIndex / totalQuestions) * 100;

  return (
    <div className="onboarding-progress">
      <div className="progress-text">
        Question {currentIndex + 1} of {totalQuestions}
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