import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionPlayground } from '../QuestionPlayground';

describe('QuestionPlayground', () => {
  it('renders sample questions', () => {
    render(<QuestionPlayground />);
    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
    expect(screen.getByText('How many hours do you typically sleep?')).toBeInTheDocument();
  });

  it('toggles loading state', () => {
    render(<QuestionPlayground />);
    const loadingToggle = screen.getByLabelText(/show loading state/i);
    fireEvent.click(loadingToggle);
    expect(screen.getAllByTestId('question-loading')).toHaveLength(2);
  });

  it('toggles disabled state', () => {
    render(<QuestionPlayground />);
    const disableToggle = screen.getByLabelText(/disable questions/i);
    fireEvent.click(disableToggle);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('displays responses', () => {
    render(<QuestionPlayground />);
    const blueButton = screen.getByRole('button', { name: 'Blue' });
    fireEvent.click(blueButton);
    expect(screen.getByText(/last response: blue/i)).toBeInTheDocument();
  });
}); 