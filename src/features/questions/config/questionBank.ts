import type { Question } from '../types/question';

// Helper function to mark questions as required for onboarding
function markRequiredForOnboarding(question: Question): Question {
  return {
    ...question,
    requiredForOnboarding: true
  };
}

export const questionBank: Question[] = [
  markRequiredForOnboarding({
    id: 'q1',
    number: 1,
    type: 'MC',
    label: 'cat_dog',
    text: 'Are you more of a cat person or a dog person?',
    category: 'PERSONALITY',
    options: ['Cat person', 'Dog person'],
    tags: ['preferences', 'animals']
  }),
  markRequiredForOnboarding({
    id: 'q2',
    number: 2,
    type: 'MC',
    label: 'star_wars_trek',
    text: 'Star Wars or Star Trek?',
    category: 'INTERESTS',
    options: ['Star Wars', 'Star Trek', 'Both', 'Neither'],
    tags: ['preferences', 'entertainment']
  }),
  markRequiredForOnboarding({
    id: 'q6',
    number: 6,
    type: 'MC',
    label: 'professional_cat',
    text: 'What is your primary occupation?',
    category: 'PROFESSIONAL',
    options: ['Engineer', 'Designer', 'Product Manager', 'Researcher', 'Student', 'Other'],
    tags: ['work', 'background']
  }),
  markRequiredForOnboarding({
    id: 'q15',
    number: 15,
    type: 'NM',
    label: 'num_tvs',
    text: 'How many televisions do you have at home?',
    category: 'INTERESTS',
    min: 0,
    max: 10,
    tags: ['lifestyle']
  }),
  markRequiredForOnboarding({
    id: 'q22',
    number: 22,
    type: 'OP',
    label: 'secret',
    text: 'Nobody knows that I...',
    category: 'PERSONALITY',
    maxLength: 500,
    tags: ['personal']
  }),
  // ... other questions
];

// Initialize the question bank manager
export const questionBankManager = new QuestionBankManager(questionBank); 