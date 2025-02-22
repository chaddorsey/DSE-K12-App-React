import { Question, QuestionType, QuestionCategory } from '../types/questions';

export const standardQuestions: Question[] = [
  {
    id: '1',
    text: 'What grade level do you teach?',
    type: QuestionType.MC,
    prompt: 'What grade level do you teach?',
    options: ['K-5', '6-8', '9-12', 'Higher Ed'],
    requiredForOnboarding: true,
    includeInOnboarding: true,
    label: 'Grade Level',
    category: QuestionCategory.BACKGROUND,
    number: 1,
    correctAnswer: undefined
  },
  {
    id: '2',
    text: 'What subjects do you teach?',
    type: QuestionType.MC,
    prompt: 'What subjects do you teach?',
    options: ['Math', 'Science', 'English', 'History', 'Other'],
    requiredForOnboarding: true,
    includeInOnboarding: true,
    label: 'Subject Area',
    category: QuestionCategory.BACKGROUND,
    number: 2,
    correctAnswer: undefined
  }
]; 