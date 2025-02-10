import React, { createContext, useContext, useState, useEffect } from 'react';

export const STORAGE_KEY = 'accessibility-preferences';

interface AccessibilityPreferences {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'x-large';
  reducedMotion: boolean;
  keyboardMode: boolean;
}

const loadStoredPreferences = (): Partial<AccessibilityPreferences> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to load accessibility preferences:', error);
    return {};
  }
};

const savePreferences = (prefs: AccessibilityPreferences) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (error) {
    console.warn('Failed to save accessibility preferences:', error);
  }
};

interface AccessibilityContextValue {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'x-large';
  reducedMotion: boolean;
  keyboardMode: boolean;
  setHighContrast: (value: boolean) => void;
  setFontSize: (size: 'normal' | 'large' | 'x-large') => void;
  setReducedMotion: (value: boolean) => void;
  setKeyboardMode: (value: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load stored preferences or system preferences
  const storedPrefs = loadStoredPreferences();
  const [highContrast, setHighContrast] = useState(
    storedPrefs.highContrast ?? window.matchMedia('(prefers-contrast: more)').matches
  );
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'x-large'>(
    storedPrefs.fontSize ?? 'normal'
  );
  const [reducedMotion, setReducedMotion] = useState(
    storedPrefs.reducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [keyboardMode, setKeyboardMode] = useState(storedPrefs.keyboardMode ?? false);

  // Save preferences whenever they change
  useEffect(() => {
    const preferences: AccessibilityPreferences = {
      highContrast,
      fontSize,
      reducedMotion,
      keyboardMode
    };
    savePreferences(preferences);
  }, [highContrast, fontSize, reducedMotion, keyboardMode]);

  // Listen for system preference changes
  useEffect(() => {
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleContrastChange = (e: MediaQueryListEvent) => {
      if (!loadStoredPreferences().highContrast) {
        setHighContrast(e.matches);
      }
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (!loadStoredPreferences().reducedMotion) {
        setReducedMotion(e.matches);
      }
    };

    contrastQuery.addEventListener('change', handleContrastChange);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      contrastQuery.removeEventListener('change', handleContrastChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Apply preferences to document root
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
    document.documentElement.setAttribute('data-font-size', fontSize);
    document.documentElement.classList.toggle('keyboard-mode', keyboardMode);
  }, [highContrast, fontSize, reducedMotion, keyboardMode]);

  const value = {
    highContrast,
    fontSize,
    reducedMotion,
    keyboardMode,
    setHighContrast,
    setFontSize,
    setReducedMotion,
    setKeyboardMode
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}; 