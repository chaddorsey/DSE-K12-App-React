const getSliderDelightFactor = (
  question: SliderQuestionType,
  response: QuestionResponse,
  context: QuestionContext
): DelightFactor | null => {
  if (context.experience === 'QUIZ') {
    // Return celebration for correct answers in quiz mode
    return {
      id: 'slider-correct',
      type: 'ANIMATION',
      timing: 'POST_ANSWER',
      trigger: 'ON_CORRECT',
      animationType: 'CELEBRATION',
      content: {
        animation: 'confetti',
        duration: 2000
      },
      questionTypes: ['SLIDER']
    };
  }

  // For onboarding, show insight about response distribution
  return {
    id: 'slider-insight',
    type: 'STATS',
    timing: 'POST_ANSWER',
    trigger: 'IMMEDIATE',
    content: {
      statType: 'PERCENTAGE',
      value: 65,
      message: 'of users prefer a similar balance'
    }
  };
}; 