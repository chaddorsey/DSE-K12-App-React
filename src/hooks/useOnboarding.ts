/**
 * Hook for accessing onboarding context and functionality
 */

import { useContext } from 'react';
import { OnboardingContext } from '../components/OnboardingProvider';

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  
  return context;
} 