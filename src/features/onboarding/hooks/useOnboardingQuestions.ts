import { useMemo } from 'react';
import { useQuestionBank } from '../../questions/context/QuestionBankContext';
import type { Question } from '../../questions/types/question';

export function useOnboardingQuestions() {
  const { getAllQuestions, validateResponse } = useQuestionBank();

  const onboardingQuestions = useMemo(() => {
    const allQuestions = getAllQuestions();
    
    // Get required onboarding questions
    const requiredQuestions = allQuestions.filter(q => q.requiredForOnboarding);
    
    // Get optional onboarding questions
    const optionalQuestions = allQuestions.filter(q => q.includeInOnboarding);

    // Combine and sort by question number
    return [...requiredQuestions, ...optionalQuestions]
      .sort((a, b) => a.number - b.number);
  }, [getAllQuestions]);

  return {
    questions: onboardingQuestions,
    validateResponse
  };
} 