/**
 * Tests for OnboardingProvider component
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { OnboardingProvider } from '../OnboardingProvider';
import { useOnboarding } from '../../hooks/useOnboarding';
import { mockMonitoring } from '../../hooks/testing/mockMonitoring';
import * as yup from 'yup';

// Mock steps
const mockSteps = [
  {
    id: 'profile',
    title: 'Profile Setup',
    isRequired: true,
    validationSchema: yup.object({
      name: yup.string().required()
    }),
    component: ({ onComplete }) => (
      <div>
        <h2>Profile Setup</h2>
        <button onClick={() => onComplete({ name: 'Test User' })}>
          Complete
        </button>
      </div>
    )
  },
  {
    id: 'preferences',
    title: 'Preferences',
    isRequired: false,
    component: ({ onComplete, onBack }) => (
      <div>
        <h2>Preferences</h2>
        <button onClick={onBack}>Back</button>
        <button onClick={() => onComplete({ theme: 'dark' })}>
          Complete
        </button>
      </div>
    )
  }
];

describe('OnboardingProvider', () => {
  const mockMonitors = mockMonitoring();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const TestComponent = () => {
    const { currentStep, progress, goToNext, goToPrevious } = useOnboarding();
    return (
      <div>
        <div>Progress: {progress}%</div>
        <div>Current Step: {currentStep.title}</div>
        <button onClick={goToPrevious}>Previous</button>
        <button onClick={goToNext}>Next</button>
      </div>
    );
  };

  it('should provide initial onboarding state', () => {
    const { getByText } = render(
      <OnboardingProvider steps={mockSteps}>
        <TestComponent />
      </OnboardingProvider>
    );

    expect(getByText('Progress: 0%')).toBeInTheDocument();
    expect(getByText('Current Step: Profile Setup')).toBeInTheDocument();
  });

  it('should handle step navigation', () => {
    const { getByText } = render(
      <OnboardingProvider steps={mockSteps}>
        <TestComponent />
      </OnboardingProvider>
    );

    // Complete first step
    fireEvent.click(getByText('Complete'));
    expect(getByText('Current Step: Preferences')).toBeInTheDocument();

    // Go back
    fireEvent.click(getByText('Back'));
    expect(getByText('Current Step: Profile Setup')).toBeInTheDocument();
  });

  it('should validate required steps', async () => {
    const { getByText } = render(
      <OnboardingProvider steps={mockSteps}>
        <TestComponent />
      </OnboardingProvider>
    );

    // Try to skip required step
    fireEvent.click(getByText('Next'));
    expect(getByText('Current Step: Profile Setup')).toBeInTheDocument();
    expect(mockMonitors.trackError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        type: 'validation_error',
        step: 'profile'
      })
    );
  });

  it('should persist progress', () => {
    const { getByText } = render(
      <OnboardingProvider steps={mockSteps}>
        <TestComponent />
      </OnboardingProvider>
    );

    // Complete first step
    fireEvent.click(getByText('Complete'));
    expect(localStorage.getItem('onboarding_progress')).toBeTruthy();
    expect(getByText('Progress: 50%')).toBeInTheDocument();
  });

  it('should track step completion', () => {
    const { getByText } = render(
      <OnboardingProvider steps={mockSteps}>
        <TestComponent />
      </OnboardingProvider>
    );

    fireEvent.click(getByText('Complete'));

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'step_complete',
      step: 'profile',
      totalTime: expect.any(Number)
    });
  });

  it('should handle onboarding completion', async () => {
    const onComplete = jest.fn();
    const { getByText } = render(
      <OnboardingProvider steps={mockSteps} onComplete={onComplete}>
        <TestComponent />
      </OnboardingProvider>
    );

    // Complete all steps
    fireEvent.click(getByText('Complete')); // Profile
    fireEvent.click(getByText('Complete')); // Preferences

    expect(onComplete).toHaveBeenCalled();
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith({
      type: 'onboarding_complete',
      totalTime: expect.any(Number),
      totalSteps: 2
    });
  });
}); 