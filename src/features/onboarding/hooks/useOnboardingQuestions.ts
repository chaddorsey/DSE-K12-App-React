import { useMemo } from 'react';
import { useQuestionBank } from '../../questions/context/QuestionBankContext';
import type { Question } from '../../questions/types/question';

export function useOnboardingQuestions() {
  const { getAllQuestions, getQuestionsByCategory, validateResponse } = useQuestionBank();

  const onboardingQuestions = useMemo(() => {
    const allQuestions = getAllQuestions();
    
    // Get required onboarding questions first
    const requiredQuestions = allQuestions.filter(q => q.requiredForOnboarding);

    // Then get other essential questions if needed
    const otherEssentialQuestions = [
      ...getQuestionsByCategory('DEMOGRAPHIC').filter(q => 
        ['region_current', 'gender'].includes(q.label) && !q.requiredForOnboarding
      ),
      ...getQuestionsByCategory('PROFESSIONAL').filter(q => 
        ['professional_cat'].includes(q.label) && !q.requiredForOnboarding
      ),
      ...getQuestionsByCategory('PERSONALITY').filter(q => 
        ['intro_extrovert'].includes(q.label) && !q.requiredForOnboarding
      )
    ];

    // Combine and sort by question number to maintain a logical flow
    return [...requiredQuestions, ...otherEssentialQuestions]
      .sort((a, b) => a.number - b.number);
  }, [getAllQuestions, getQuestionsByCategory]);

  return {
    questions: onboardingQuestions,
    validateResponse
  };
} 