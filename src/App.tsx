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
  // Add more standard questions...
];

const questionPool: Question[] = [
  {
    id: '2',
    text: 'What subjects do you teach?',
    type: 'MC',
    prompt: 'What subjects do you teach?',
    options: ['Math', 'Science', 'English', 'History', 'Other'],
    requiredForOnboarding: false,
    includeInOnboarding: true,
    label: 'Subject Area',
    category: 'BACKGROUND',
    number: 2,
    correctAnswer: undefined
  },
  // Add more pool questions...
];

export const App = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <BrowserRouter>
          <AuthProvider>
            <AccessibilityProvider>
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
            </AccessibilityProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
};

export default App;