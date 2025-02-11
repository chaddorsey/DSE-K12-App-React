import React, { useMemo } from 'react';
import { OnboardingProvider } from '../context/OnboardingContext';
import { OnboardingFlow } from './OnboardingFlow';
import { useQuestionBank } from '../../questions/context/QuestionBankContext';
import './OnboardingDemo.css';

export const OnboardingDemo: React.FC = () => {
  const { questions } = useQuestionBank();
  
  // Filter questions for onboarding
  const onboardingQuestions = useMemo(() => {
    const filtered = questions
      .filter(q => q.requiredForOnboarding || q.includeInOnboarding)
      .sort((a, b) => {
        // Required questions come first
        if (a.requiredForOnboarding && !b.requiredForOnboarding) return -1;
        if (!a.requiredForOnboarding && b.requiredForOnboarding) return 1;
        // Then sort by number
        return a.number - b.number;
      });

    // Debug log
    console.log('Onboarding Questions:', {
      total: filtered.length,
      required: filtered.filter(q => q.requiredForOnboarding).length,
      optional: filtered.filter(q => !q.requiredForOnboarding).length,
      questions: filtered
    });

    return filtered;
  }, [questions]);

  return (
    <OnboardingProvider questions={onboardingQuestions}>
      <div className="onboarding-demo">
        <OnboardingFlow />
      </div>
    </OnboardingProvider>
  );
}; 