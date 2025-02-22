import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { OnboardingProvider } from './features/onboarding/OnboardingContext';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { Login } from './features/auth/components/Login';
import { SignUp } from './features/auth/components/SignUp';
import { OnboardingFlow } from './features/onboarding/components/OnboardingFlow';
import { AppContent } from './features/app/components/AppContent';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AccessibilityProvider } from './features/accessibility/AccessibilityContext';
import { QuestionPlayground } from './features/questions/components/QuestionPlayground';
import { useStandardQuestions, useQuestionPool } from './features/questions/hooks/useQuestions';
import { QuizPage } from './features/quiz/pages/QuizPage';
import './styles/layout.css';

const App = () => {
  const standardQuestions = useStandardQuestions();
  const questionPool = useQuestionPool();

  return (
    <ErrorBoundary>
      <div className="app">
        <BrowserRouter>
          <AuthProvider>
            <OnboardingProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected routes */}
                <Route 
                  path="/onboarding" 
                  element={
                    <ProtectedRoute>
                      <OnboardingFlow />
                    </ProtectedRoute>
                  } 
                />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <AppContent />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </OnboardingProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
};

export default App; 