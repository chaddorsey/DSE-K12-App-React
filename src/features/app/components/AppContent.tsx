import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { logger } from '@/utils/logger';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AccessibilityProvider } from '../../accessibility/AccessibilityContext';
import { QuestionPlayground } from '../../questions/components/QuestionPlayground';
import { QuizPage } from '../../quiz/pages/QuizPage';
import { OnboardingFlow } from '../../onboarding/components/OnboardingFlow';
import { Navbar } from '../../../components/Navbar';
import { Link } from 'react-router-dom';

export const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  logger.info('AppContent render:', {
    hasUser: !!user,
    uid: user?.uid,
    email: user?.email
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user?.uid) {
    logger.error('AppContent: No user UID available');
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <AccessibilityProvider>
          <Routes>
            <Route path="/" element={
              <div className="home-page">
                <h1>Welcome to the App</h1>
                <div className="content">
                  <div className="actions">
                    <Link to="/onboarding" className="start-button">
                      Start Onboarding
                    </Link>
                  </div>
                </div>
              </div>
            } />
            <Route path="/questions/playground" element={<QuestionPlayground />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/onboarding" element={<OnboardingFlow />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AccessibilityProvider>
      </main>
    </div>
  );
}; 