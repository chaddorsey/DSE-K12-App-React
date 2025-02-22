import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingComplete.css';

export const OnboardingComplete: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="onboarding-complete">
      <h1>Setup Complete!</h1>
      <p>Thank you for completing your profile setup.</p>
      <button 
        className="continue-button"
        onClick={handleContinue}
      >
        Continue to Dashboard
      </button>
    </div>
  );
}; 