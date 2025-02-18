import React from 'react';

interface OnboardingCompleteProps {
  onReturn: () => void;
}

export const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ onReturn }) => {
  return (
    <div className="onboarding-complete">
      <h2>Onboarding Complete</h2>
      <p>You have successfully completed all available onboarding questions.</p>
      <p>Thank you for your participation!</p>
      <button 
        onClick={onReturn}
        className="btn btn-primary mt-4"
        style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          backgroundColor: '#4F46E5',
          color: 'white',
          textDecoration: 'none',
          border: 'none',
          borderRadius: '0.375rem',
          fontWeight: 500,
          cursor: 'pointer'
        }}
      >
        Return to Home
      </button>
    </div>
  );
}; 