import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { AppContent } from './AppContent';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { QuestionPlayground } from './features/questions/components/QuestionPlayground';
import { OnboardingProvider } from './features/onboarding/OnboardingContext';
import { OnboardingFlow } from './features/onboarding/components/OnboardingFlow';
import { AccessibilityProvider } from './features/accessibility/AccessibilityContext';
import type { Question } from './features/questions/types/questions';
import { QuestionCategory } from './features/questions/types/questions';

// Define sample questions
const standardQuestions: Question[] = [
  {
    id: '1',
    text: 'What grade level do you teach?',
    type: 'MC',
    prompt: 'What grade level do you teach?',
    options: ['K-5', '6-8', '9-12', 'Higher Ed'],
    requiredForOnboarding: true,
    includeInOnboarding: true,
    label: 'Grade Level',
    category: 'BACKGROUND',
    number: 1,
    correctAnswer: undefined
  },
  {
    id: '2',
    text: 'What subjects do you teach?',
    type: 'MC',
    prompt: 'What subjects do you teach?',
    options: ['Math', 'Science', 'English', 'History', 'Other'],
    requiredForOnboarding: true,
    includeInOnboarding: true,
    label: 'Subject Area',
    category: 'BACKGROUND',
    number: 2,
    correctAnswer: undefined
  }
];

const questionPool: Question[] = [
  {
    id: '3',
    text: 'How many years have you been teaching?',
    type: 'NM',
    prompt: 'Enter your years of teaching experience',
    min: 0,
    max: 50,
    step: 1,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Teaching Experience',
    category: 'BACKGROUND',
    number: 3,
    correctAnswer: undefined
  },
  {
    id: '4',
    text: 'How comfortable are you with technology in the classroom?',
    type: 'SCALE',
    prompt: 'Rate your comfort level with classroom technology',
    leftOption: 'Not Comfortable',
    rightOption: 'Very Comfortable',
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Tech Comfort',
    category: 'PREFERENCES',
    number: 4,
    correctAnswer: undefined
  },
  {
    id: '5',
    text: 'Briefly describe your teaching philosophy',
    type: 'OP',
    prompt: 'Share your approach to teaching in a few sentences',
    maxLength: 500,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Teaching Philosophy',
    category: 'BACKGROUND',
    number: 5,
    correctAnswer: undefined
  },
  {
    id: '6',
    text: 'How many students do you typically teach per class?',
    type: 'NM',
    prompt: 'Enter your average class size',
    min: 1,
    max: 100,
    step: 1,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Class Size',
    category: 'BACKGROUND',
    number: 6,
    correctAnswer: undefined
  },
  {
    id: '7',
    text: 'How often do you use digital tools in your teaching?',
    type: 'SCALE',
    prompt: 'Rate your frequency of digital tool usage',
    leftOption: 'Rarely',
    rightOption: 'Daily',
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Digital Usage',
    category: 'PREFERENCES',
    number: 7,
    correctAnswer: undefined
  },
  {
    id: '8',
    text: 'What are your main challenges in teaching?',
    type: 'OP',
    prompt: 'Describe your biggest teaching challenges',
    maxLength: 300,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Teaching Challenges',
    category: 'PREFERENCES',
    number: 8,
    correctAnswer: undefined
  },
  {
    id: '9',
    text: 'Rate your work-life balance satisfaction',
    type: 'SCALE',
    prompt: 'How satisfied are you with your current work-life balance?',
    leftOption: 'Not Satisfied',
    rightOption: 'Very Satisfied',
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Work-Life Balance',
    category: 'PREFERENCES',
    number: 9,
    correctAnswer: undefined
  },
  {
    id: '10',
    text: 'How many hours per week do you spend on lesson planning?',
    type: 'NM',
    prompt: 'Enter average hours spent on planning',
    min: 0,
    max: 40,
    step: 0.5,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Planning Time',
    category: 'BACKGROUND',
    number: 10,
    correctAnswer: undefined
  },
  {
    id: '11',
    text: 'What professional development goals do you have?',
    type: 'OP',
    prompt: 'Share your professional development aspirations',
    maxLength: 400,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'PD Goals',
    category: 'PREFERENCES',
    number: 11,
    correctAnswer: undefined
  },
  {
    id: '12',
    text: 'How would you rate your current stress level?',
    type: 'SCALE',
    prompt: 'Rate your current stress level in teaching',
    leftOption: 'Low Stress',
    rightOption: 'High Stress',
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Stress Level',
    category: 'PREFERENCES',
    number: 12,
    correctAnswer: undefined
  }
];

export const App = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <AccessibilityProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/*" element={<AppContent />} />
                <Route 
                  path="/questions/playground" 
                  element={
                    <ProtectedRoute>
                      <QuestionPlayground />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/onboarding" 
                  element={
                    <ProtectedRoute>
                      <OnboardingProvider
                        standardQuestions={standardQuestions}
                        questionPool={questionPool}
                      >
                        <OnboardingFlow />
                      </OnboardingProvider>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </AccessibilityProvider>
      </div>
    </ErrorBoundary>
  );
};

export default App;