import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
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
import { AuthProvider } from './features/auth/AuthContext';

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
    <div className="app">
      <div className="sr-only" role="status" aria-live="polite">
        Press Alt + H for high contrast, Alt + F for font size, 
        Alt + M for motion settings, or Alt + K for keyboard mode
      </div>
      <AccessibilityControls />
      <QuestionPlayground />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AccessibilityProvider>
          <div className="app-container">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<QuestionPlayground />} />
                <Route path="/demo">
                  <Route path="avatar-grid" element={<AvatarGridDemo />} />
                  <Route path="question-types" element={<QuestionTypesDemo />} />
                  <Route path="visualization" element={<DataVisualizationDemo />} />
                </Route>
              </Routes>
            </main>
          </div>
        </AccessibilityProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}; 