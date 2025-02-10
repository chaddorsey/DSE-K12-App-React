export const validateQuizAnswer = (question: QuizQuestion, answer: QuestionResponse): boolean => {
  switch (question.type) {
    // ... existing cases ...
    case 'SLIDER':
      // Convert answer to number and allow for small differences
      const userValue = parseFloat(answer.value.toString());
      const correctValue = parseFloat(question.correctAnswer);
      const tolerance = 0.1; // Allow 10% difference
      return Math.abs(userValue - correctValue) <= tolerance;
    default:
      return false;
  }
}; 