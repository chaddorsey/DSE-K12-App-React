import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './features/auth/components/Navbar';
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

export const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/visualize" element={<VisualizePage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/connections" element={<ConnectionsPage />} />
          </Route>
          
          {/* Manager/Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['manager', 'admin']} />}>
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </main>
    </div>
  );
}; 