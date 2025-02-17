import React from 'react';
import { Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { useAuth } from './features/auth/AuthContext';
import { OnboardingPage } from './features/onboarding/OnboardingPage';
import { ConnectionsPage } from './features/connections/ConnectionsPage';
import { VisualizePage } from './features/visualize/VisualizePage';
import { QuizPage } from './features/quiz/QuizPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { Unauthorized } from './features/auth/components/Unauthorized';
import { SignIn } from './features/auth/components/SignIn';
import { HomePage } from './features/home/HomePage';
import { OnboardingProvider } from './features/onboarding';
import { QuestionProvider } from './features/questions/context/QuestionContext';
import { standardQuestions, questionPool } from './features/questions/data/questionSets';
import { logger } from './utils/logger';

export const AppContent = () => {
  const { loading } = useAuth();
  
  logger.debug('AppContent render', { loading });

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/connections" element={<ConnectionsPage />} />
            <Route path="/visualize" element={<VisualizePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            
            <Route 
              path="/onboarding" 
              element={
                <QuestionProvider>
                  <OnboardingProvider
                    standardQuestions={standardQuestions}
                    questionPool={questionPool}
                  >
                    <OnboardingPage />
                  </OnboardingProvider>
                </QuestionProvider>
              } 
            />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Outlet />
      </main>
    </>
  );
};