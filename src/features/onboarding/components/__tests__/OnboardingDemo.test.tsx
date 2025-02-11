import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { OnboardingDemo } from '../OnboardingDemo';
import { QuestionBankProvider } from '../../../questions/context/QuestionBankContext';

expect.extend(toHaveNoViolations);

// Mock the questions hook
jest.mock('../../hooks/useOnboardingQuestions', () => ({
  useOnboardingQuestions: () => ({
    questions: [
      {
        id: 'q1',
        number: 1,
        type: 'MC',
        label: 'cat_dog',
        text: 'Are you more of a cat person or a dog person?',
        category: 'PERSONALITY',
        options: ['Cat person', 'Dog person'],
        requiredForOnboarding: true
      },
      {
        id: 'q2',
        number: 2,
        type: 'NM',
        label: 'num_tvs',
        text: 'How many TVs do you have?',
        category: 'INTERESTS',
        min: 0,
        max: 10,
        requiredForOnboarding: true
      }
    ],
    validateResponse: () => true
  })
}));

describe('OnboardingDemo', () => {
  const renderOnboarding = () => {
    return render(
      <QuestionBankProvider>
        <OnboardingDemo />
      </QuestionBankProvider>
    );
  };

  it('renders the first question', () => {
    renderOnboarding();
    expect(screen.getByText(/cat person or dog person/i)).toBeInTheDocument();
  });

  it('shows required indicator for required questions', () => {
    renderOnboarding();
    const indicator = screen.getByText('*');
    expect(indicator).toHaveClass('required-indicator');
  });

  it('handles multiple choice responses', () => {
    renderOnboarding();
    const option = screen.getByText('Cat person');
    fireEvent.click(option);
    expect(option).toHaveClass('selected');
  });

  it('advances to next question after response', async () => {
    renderOnboarding();
    const option = screen.getByText('Cat person');
    fireEvent.click(option);
    
    await waitFor(() => {
      expect(screen.getByText(/how many tvs/i)).toBeInTheDocument();
    });
  });

  it('shows progress correctly', () => {
    renderOnboarding();
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Required: 0 of 2')).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = renderOnboarding();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports keyboard navigation', async () => {
      renderOnboarding();
      const options = screen.getAllByRole('button');
      
      // First option should be focused
      options[0].focus();
      expect(document.activeElement).toBe(options[0]);

      // Tab to next option
      userEvent.tab();
      expect(document.activeElement).toBe(options[1]);
    });

    it('announces progress updates', () => {
      renderOnboarding();
      const progressRegion = screen.getByRole('status');
      expect(progressRegion).toHaveAttribute('aria-live', 'polite');
    });

    it('marks required questions appropriately', () => {
      renderOnboarding();
      const question = screen.getByRole('heading', { level: 3 });
      expect(question).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('error handling', () => {
    it('handles invalid responses', async () => {
      // Mock validateResponse to fail
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const mockValidate = jest.fn().mockReturnValue(false);
      jest.mock('../../hooks/useOnboardingQuestions', () => ({
        useOnboardingQuestions: () => ({
          ...jest.requireActual('../../hooks/useOnboardingQuestions')(),
          validateResponse: mockValidate
        })
      }));

      renderOnboarding();
      const option = screen.getByText('Cat person');
      fireEvent.click(option);

      await waitFor(() => {
        expect(screen.getByText(/invalid response/i)).toBeInTheDocument();
      });
    });

    it('handles missing required questions', async () => {
      renderOnboarding();
      const skipButton = screen.getByText(/skip/i);
      fireEvent.click(skipButton);

      await waitFor(() => {
        expect(screen.getByText(/this question is required/i)).toBeInTheDocument();
      });
    });

    it('handles network errors gracefully', async () => {
      // Mock network error
      jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));
      
      renderOnboarding();
      const option = screen.getByText('Cat person');
      fireEvent.click(option);

      await waitFor(() => {
        expect(screen.getByText(/failed to save response/i)).toBeInTheDocument();
      });
    });

    it('validates numeric input boundaries', async () => {
      renderOnboarding();
      const option = screen.getByText('Cat person');
      fireEvent.click(option);

      const numInput = await screen.findByRole('spinbutton');
      fireEvent.change(numInput, { target: { value: '999' } });
      fireEvent.blur(numInput);

      await waitFor(() => {
        expect(screen.getByText(/must be between 0 and 10/i)).toBeInTheDocument();
      });
    });
  });

  describe('recovery scenarios', () => {
    it('allows retrying failed submissions', async () => {
      // Mock first attempt to fail, second to succeed
      const mockValidate = jest.fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);

      jest.mock('../../hooks/useOnboardingQuestions', () => ({
        useOnboardingQuestions: () => ({
          ...jest.requireActual('../../hooks/useOnboardingQuestions')(),
          validateResponse: mockValidate
        })
      }));

      renderOnboarding();
      const option = screen.getByText('Cat person');
      
      // First attempt
      fireEvent.click(option);
      await waitFor(() => {
        expect(screen.getByText(/invalid response/i)).toBeInTheDocument();
      });

      // Retry
      const retryButton = screen.getByText(/try again/i);
      fireEvent.click(retryButton);
      fireEvent.click(option);

      await waitFor(() => {
        expect(screen.queryByText(/invalid response/i)).not.toBeInTheDocument();
      });
    });

    it('preserves partial progress on reload', async () => {
      // Mock localStorage
      const mockStorage: Record<string, string> = {};
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(
        key => mockStorage[key] || null
      );
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(
        (key, value) => { mockStorage[key] = value.toString(); }
      );

      renderOnboarding();
      const option = screen.getByText('Cat person');
      fireEvent.click(option);

      // Simulate reload
      renderOnboarding();

      await waitFor(() => {
        expect(option).toHaveClass('selected');
      });
    });
  });
}); 