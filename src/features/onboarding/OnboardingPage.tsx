import React from 'react';
import { QuestionPlayground } from '../questions/components/QuestionPlayground';
import { useQuestionContext } from '../questions/context/QuestionContext';
import { useOnboardingContext } from './OnboardingProvider';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const OnboardingPage = () => {
  const { actions } = useQuestionContext();
  const { state: onboardingState } = useOnboardingContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Set experience to ONBOARDING only once on mount
    actions.setExperience('ONBOARDING');
  }, []); // Empty dependency array

  React.useEffect(() => {
    // Check completion status in separate effect
    if (onboardingState.completed) {
      navigate('/');
    }
  }, [onboardingState.completed, navigate]);

  if (!user) {
    return (
      <div className="onboarding-page">
        <div className="onboarding-welcome">
          <h1>Welcome to DSET</h1>
          <p>Please sign in to begin the onboarding process.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-header">
        <h1>Welcome to DSET</h1>
        <p>Let's get to know you better to personalize your experience.</p>
      </div>
      
      <div className="onboarding-content">
        <QuestionPlayground />
      </div>
    </div>
  );
}; 