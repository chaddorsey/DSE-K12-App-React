import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { AccessibilityProvider, useAccessibility } from '../context/AccessibilityContext';

const TestComponent = () => {
  const { 
    highContrast, 
    fontSize, 
    reducedMotion,
    setHighContrast,
    setFontSize,
    setReducedMotion
  } = useAccessibility();

  return (
    <div>
      <div data-testid="prefs">
        {JSON.stringify({ highContrast, fontSize, reducedMotion })}
      </div>
      <button onClick={() => setHighContrast(true)}>Set High Contrast</button>
      <button onClick={() => setFontSize('large')}>Set Large Font</button>
      <button onClick={() => setReducedMotion(true)}>Set Reduced Motion</button>
    </div>
  );
};

describe('AccessibilityContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('persists preferences to localStorage', () => {
    const { getByText, getByTestId } = render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    act(() => {
      fireEvent.click(getByText('Set High Contrast'));
      fireEvent.click(getByText('Set Large Font'));
    });

    const stored = JSON.parse(localStorage.getItem('accessibility-preferences') || '{}');
    expect(stored.highContrast).toBe(true);
    expect(stored.fontSize).toBe('large');
  });

  it('loads stored preferences on mount', () => {
    const storedPrefs = {
      highContrast: true,
      fontSize: 'large',
      reducedMotion: true,
      keyboardMode: true
    };
    localStorage.setItem('accessibility-preferences', JSON.stringify(storedPrefs));

    const { getByTestId } = render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    const prefs = JSON.parse(getByTestId('prefs').textContent || '{}');
    expect(prefs.highContrast).toBe(true);
    expect(prefs.fontSize).toBe('large');
    expect(prefs.reducedMotion).toBe(true);
  });

  it('handles system preference changes', () => {
    const { getByTestId } = render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    // Simulate system preference change
    act(() => {
      const event = new MediaQueryListEvent('change', { matches: true });
      window.matchMedia('(prefers-contrast: more)').dispatchEvent(event);
    });

    const prefs = JSON.parse(getByTestId('prefs').textContent || '{}');
    expect(prefs.highContrast).toBe(true);
  });

  it('handles storage errors gracefully', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage full');
    });

    const { getByText } = render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    act(() => {
      fireEvent.click(getByText('Set High Contrast'));
    });

    expect(console.warn).toHaveBeenCalledWith(
      'Failed to save accessibility preferences:',
      expect.any(Error)
    );
  });
}); 