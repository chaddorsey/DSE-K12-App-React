import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../../../App';

describe('Onboarding Flow', () => {
  it('navigates from home to onboarding', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const onboardingLink = screen.getByRole('link', { name: /start onboarding/i });
    fireEvent.click(onboardingLink);

    await waitFor(() => {
      expect(screen.getByText(/welcome.*get to know you/i)).toBeInTheDocument();
    });
  });

  it('completes full onboarding flow', async () => {
    render(
      <MemoryRouter initialEntries={['/onboarding']}>
        <App />
      </MemoryRouter>
    );

    // Answer cat/dog question
    const catOption = screen.getByText('Cat person');
    fireEvent.click(catOption);

    // Answer numeric question
    const numInput = await screen.findByRole('spinbutton');
    fireEvent.change(numInput, { target: { value: '2' } });
    fireEvent.blur(numInput);

    // Should see completion message
    await waitFor(() => {
      expect(screen.getByText(/onboarding complete/i)).toBeInTheDocument();
    });
  });

  describe('error scenarios', () => {
    it('handles validation errors across multiple questions', async () => {
      render(
        <MemoryRouter initialEntries={['/onboarding']}>
          <App />
        </MemoryRouter>
      );

      // Try to submit invalid numeric value
      const numInput = await screen.findByRole('spinbutton');
      fireEvent.change(numInput, { target: { value: '-1' } });
      fireEvent.blur(numInput);

      await waitFor(() => {
        expect(screen.getByText(/must be a positive number/i)).toBeInTheDocument();
      });
    });

    it('prevents completion with missing required answers', async () => {
      render(
        <MemoryRouter initialEntries={['/onboarding']}>
          <App />
        </MemoryRouter>
      );

      // Try to complete without answering required questions
      const completeButton = screen.getByText(/complete/i);
      fireEvent.click(completeButton);

      await waitFor(() => {
        expect(screen.getByText(/please answer all required questions/i)).toBeInTheDocument();
      });
    });

    it('handles browser navigation gracefully', async () => {
      const { history } = render(
        <MemoryRouter initialEntries={['/onboarding']}>
          <App />
        </MemoryRouter>
      );

      // Answer first question
      const catOption = screen.getByText('Cat person');
      fireEvent.click(catOption);

      // Navigate away
      history.push('/');

      // Navigate back
      history.push('/onboarding');

      await waitFor(() => {
        expect(catOption).toHaveClass('selected');
      });
    });
  });
}); 