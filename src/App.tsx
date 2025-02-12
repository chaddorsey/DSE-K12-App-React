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
          <Route path="/onboarding" element={<OnboardingDemo />} />
          <Route path="/question-playground" element={<QuestionPlayground />} />
          <Route path="/connections" element={<ProgressiveAvatarDemo />} />
          <Route path="/question-editor" element={<QuestionEditorDemo />} />
          <Route path="/demo">
            <Route path="editor" element={<QuestionBankEditor />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Dashboard (Protected)</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
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