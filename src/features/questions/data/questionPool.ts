import { Question, QuestionType, QuestionCategory } from '../types/questions';

export const questionPool: Question[] = [
  {
    id: '3',
    text: 'How many years have you been teaching?',
    type: QuestionType.NUMERIC,
    prompt: 'Enter your years of teaching experience',
    min: 0,
    max: 50,
    step: 1,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Teaching Experience',
    category: QuestionCategory.BACKGROUND,
    number: 3,
    correctAnswer: undefined
  },
  // ... rest of the questions moved here
]; 