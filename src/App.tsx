import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QuestionPlayground } from './features/questions/components/QuestionPlayground';
import { AccessibilityProvider } from './features/accessibility/context/AccessibilityContext';
import { AccessibilityControls } from './features/accessibility/components/AccessibilityControls';
import { useAccessibility } from './features/accessibility/context/AccessibilityContext';
import './App.css';
import { AvatarGridDemo } from './features/connections/components/AvatarGridDemo';
import { Header } from './components/Header';
import { QuestionTypesDemo } from './features/questions/components/QuestionTypesDemo';
import { DataVisualizationDemo } from './features/visualization/components/DataVisualizationDemo';
import { AuthProvider } from './features/auth/context/AuthContext';
import { NetworkProvider } from './features/network/NetworkProvider';
import { ProgressiveAvatarDemo } from './features/connections/components/ProgressiveAvatarDemo';
import { QuestionBankProvider } from './features/questions/context/QuestionBankContext';
import { OnboardingProvider } from './features/onboarding/context/OnboardingContext';
import { Home } from './features/home/components/Home';
import { QuestionBankEditor } from './features/questions/components/QuestionBankEditor';
import { QuestionEditorDemo } from './features/questions/components/QuestionEditorDemo';
import { OnboardingDemo } from './features/onboarding/components/OnboardingDemo';
import { ProtectedRoute } from './components/ProtectedRoute';
import { SignIn } from './features/auth/components/SignIn';
import { Footer } from './components/Footer';
import { RegistrationForm } from './features/auth/components/RegistrationForm';
import { EmailVerification } from './features/auth/components/EmailVerification';
import { AdminRoute } from './components/AdminRoute';
import { ProfileSettings } from './features/auth/components/ProfileSettings';

const AppContent = () => {
  const {
    highContrast,
    setHighContrast,
    setFontSize,
    reducedMotion,
    setReducedMotion,
    keyboardMode,
    setKeyboardMode,
    fontSize
  } = useAccessibility();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard shortcuts with Alt key
      if (!e.altKey) return;

      switch (e.key.toLowerCase()) {
        case 'h': // Alt + H for High Contrast
          e.preventDefault();
          setHighContrast(!highContrast);
          break;
        case 'f': // Alt + F for Font Size
          e.preventDefault();
          const sizes: ('normal' | 'large' | 'x-large')[] = ['normal', 'large', 'x-large'];
          const currentIndex = sizes.indexOf(fontSize);
          const nextSize = sizes[(currentIndex + 1) % sizes.length];
          setFontSize(nextSize);
          break;
        case 'm': // Alt + M for Motion
          e.preventDefault();
          setReducedMotion(!reducedMotion);
          break;
        case 'k': // Alt + K for Keyboard Mode
          e.preventDefault();
          setKeyboardMode(!keyboardMode);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    setHighContrast,
    setFontSize,
    setReducedMotion,
    setKeyboardMode,
    fontSize,
    highContrast,
    reducedMotion,
    keyboardMode
  ]);

  return (
    <div className="App">
      <Header 
        links={[
          { to: '/', label: 'Home' },
          { to: '/question-playground', label: 'Quiz' },
          { to: '/connections', label: 'Connections' }
        ]} 
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          
          {/* Protected Routes */}
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <OnboardingDemo />
            </ProtectedRoute>
          } />
          <Route path="/question-playground" element={
            <ProtectedRoute>
              <QuestionPlayground />
            </ProtectedRoute>
          } />
          <Route path="/connections" element={
            <ProtectedRoute>
              <ProgressiveAvatarDemo />
            </ProtectedRoute>
          } />
          <Route path="/visualizations" element={<DataVisualizationDemo />} />
          <Route path="/question-editor" element={
            <AdminRoute>
              <QuestionEditorDemo />
            </AdminRoute>
          } />
          <Route path="/demo/editor" element={
            <AdminRoute>
              <QuestionBankEditor />
            </AdminRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div>Dashboard (Protected)</div>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AccessibilityProvider>
      <QuestionBankProvider>
        <OnboardingProvider>
          <AuthProvider>
            <NetworkProvider>
              <AppContent />
            </NetworkProvider>
          </AuthProvider>
        </OnboardingProvider>
      </QuestionBankProvider>
    </AccessibilityProvider>
  );
}

export default App; 