import type { Question } from '../types/questions';

export const standardQuestions: Question[] = [
  {
    id: 'std1',
    type: 'MC',
    prompt: 'What brings you here today?',
    options: ['Learning', 'Career Growth', 'Curiosity', 'Other'],
    text: 'What brings you here today?',
    label: '',
    category: 'GENERAL',
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  },
  {
    id: 'std2',
    type: 'SCALE',
    prompt: 'How do you prefer to balance theory and practice?',
    leftOption: 'Pure Theory',
    rightOption: 'Pure Practice',
    defaultValue: 0.5,
    text: 'How do you prefer to balance theory and practice?',
    label: '',
    category: 'PREFERENCES',
    number: 2,
    requiredForOnboarding: true,
    includeInOnboarding: true
  },
  {
    id: 'std3',
    type: 'XY_CONTINUUM',
    prompt: 'Plot your learning style preferences:',
    xAxis: {
      left: 'Individual',
      right: 'Group'
    },
    yAxis: {
      top: 'Theory',
      bottom: 'Practice'
    },
    defaultPosition: { x: 0.5, y: 0.5 },
    text: 'Plot your learning style preferences:',
    label: '',
    category: 'PREFERENCES',
    number: 3,
    requiredForOnboarding: true,
    includeInOnboarding: true
  }
];

export const questionPool: Question[] = [
  {
    id: 'pool1',
    type: 'MC',
    prompt: 'What specific topics interest you most?',
    options: [
      'Software Architecture',
      'Frontend Development',
      'Backend Development',
      'DevOps',
      'Machine Learning'
    ],
    text: 'What specific topics interest you most?',
    label: '',
    category: 'INTERESTS',
    number: 1,
    requiredForOnboarding: false,
    includeInOnboarding: true
  },
  {
    id: 'pool2',
    type: 'SEGMENTED_SLIDER',
    prompt: 'Rate your current programming experience:',
    segments: [
      { value: 1, label: 'Beginner' },
      { value: 2, label: 'Intermediate' },
      { value: 3, label: 'Advanced' },
      { value: 4, label: 'Expert' }
    ],
    defaultSegment: 2,
    text: 'Rate your current programming experience:',
    label: '',
    category: 'EXPERIENCE',
    number: 2,
    requiredForOnboarding: false,
    includeInOnboarding: true
  },
  {
    id: 'pool3',
    type: 'SCALE',
    prompt: 'How much time can you dedicate to learning each week?',
    leftOption: '1-2 hours',
    rightOption: '10+ hours',
    defaultValue: 0.3,
    text: 'How much time can you dedicate to learning each week?',
    label: '',
    category: 'AVAILABILITY',
    number: 3,
    requiredForOnboarding: false,
    includeInOnboarding: true
  },
  {
    id: 'pool4',
    type: 'MC',
    prompt: 'What is your preferred learning format?',
    options: [
      'Video Tutorials',
      'Interactive Exercises',
      'Text Documentation',
      'Live Workshops'
    ],
    text: 'What is your preferred learning format?',
    label: '',
    category: 'PREFERENCES',
    number: 4,
    requiredForOnboarding: false,
    includeInOnboarding: true
  }
]; 