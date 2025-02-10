import React, { useState } from 'react';
import { useAccessibility, STORAGE_KEY } from '../context/AccessibilityContext';
import { AccessibilityFeedback } from './AccessibilityFeedback';
import './AccessibilityControls.css';

export const AccessibilityControls = () => {
  const {
    highContrast,
    fontSize,
    reducedMotion,
    keyboardMode,
    setHighContrast,
    setFontSize,
    setReducedMotion,
    setKeyboardMode
  } = useAccessibility();

  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (message: string) => {
    setFeedback(message);
    // Reset feedback after it's shown
    setTimeout(() => setFeedback(null), 2000);
  };

  const handleHighContrast = (value: boolean) => {
    setHighContrast(value);
    showFeedback(`High contrast mode ${value ? 'enabled' : 'disabled'}`);
  };

  const handleFontSize = (size: 'normal' | 'large' | 'x-large') => {
    setFontSize(size);
    showFeedback(`Font size set to ${size}`);
  };

  const handleMotion = (value: boolean) => {
    setReducedMotion(value);
    showFeedback(`${value ? 'Reduced' : 'Normal'} motion mode set`);
  };

  const handleKeyboardMode = (value: boolean) => {
    setKeyboardMode(value);
    showFeedback(`Keyboard mode ${value ? 'enabled' : 'disabled'}`);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHighContrast(window.matchMedia('(prefers-contrast: more)').matches);
    setFontSize('normal');
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setKeyboardMode(false);
    showFeedback('Accessibility preferences reset to defaults');
  };

  return (
    <>
      <div className="accessibility-controls" role="region" aria-label="Accessibility Controls">
        <button
          onClick={() => handleHighContrast(!highContrast)}
          aria-pressed={highContrast}
          className="a11y-button"
        >
          {highContrast ? 'Disable' : 'Enable'} High Contrast
        </button>

        <div className="font-size-controls">
          <label id="font-size-label">Font Size:</label>
          <select
            value={fontSize}
            onChange={(e) => handleFontSize(e.target.value as 'normal' | 'large' | 'x-large')}
            aria-labelledby="font-size-label"
          >
            <option value="normal">Normal</option>
            <option value="large">Large</option>
            <option value="x-large">Extra Large</option>
          </select>
        </div>

        <button
          onClick={() => handleMotion(!reducedMotion)}
          aria-pressed={reducedMotion}
          className="a11y-button"
        >
          {reducedMotion ? 'Enable' : 'Reduce'} Motion
        </button>

        <button
          onClick={() => handleKeyboardMode(!keyboardMode)}
          aria-pressed={keyboardMode}
          className="a11y-button"
        >
          {keyboardMode ? 'Disable' : 'Enable'} Keyboard Mode
        </button>

        <button
          onClick={handleReset}
          className="a11y-button reset-button"
          aria-label="Reset all accessibility preferences to system defaults"
        >
          Reset to Defaults
        </button>
      </div>
      {feedback && <AccessibilityFeedback message={feedback} />}
    </>
  );
}; 