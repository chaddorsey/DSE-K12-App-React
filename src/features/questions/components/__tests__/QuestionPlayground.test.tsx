import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionPlayground } from '../QuestionPlayground';

describe('QuestionPlayground', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.2); // For predictable HEAD_TO_HEAD behavior
  });

  afterEach(() => {
    jest.spyOn(Math, 'random').mockRestore();
  });

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

  it('shows delight factor for first option in quiz mode', () => {
    render(<QuestionPlayground />);
    
    // Select first option
    const firstOption = screen.getByRole('button', { name: 'Red' });
    fireEvent.click(firstOption);
    
    expect(screen.getByTestId('animation-delight')).toBeInTheDocument();
  });

  it('shows delight factor every other open response in quiz mode', () => {
    render(<QuestionPlayground />);
    
    const textarea = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // First submission
    fireEvent.change(textarea, { target: { value: 'First response' } });
    fireEvent.click(submitButton);
    expect(screen.queryByTestId('animation-delight')).toBeInTheDocument();

    // Second submission
    fireEvent.change(textarea, { target: { value: 'Second response' } });
    fireEvent.click(submitButton);
    expect(screen.queryByTestId('animation-delight')).not.toBeInTheDocument();
  });

  it('shows delight factor randomly in head-to-head mode', () => {
    render(<QuestionPlayground />);
    
    // Switch to head-to-head mode
    const experienceSelect = screen.getByRole('combobox', { name: /experience/i });
    fireEvent.change(experienceSelect, { target: { value: 'HEAD_TO_HEAD' } });

    const firstOption = screen.getByRole('button', { name: 'Red' });
    fireEvent.click(firstOption);
    
    // With mock random = 0.2, should show delight
    expect(screen.getByTestId('animation-delight')).toBeInTheDocument();
  });
}); 