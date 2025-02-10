import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionForm } from '../QuestionForm';
import { AccessibilityProvider } from '../../../../features/accessibility/context/AccessibilityContext';
import type { Question, QuestionResponse } from '../../types';

const mockQuestions: Question[] = [
  { 
    id: 'q1', 
    type: 'MULTIPLE_CHOICE', 
    prompt: 'First question', 
    options: ['A', 'B', 'C'] 
  },
  { 
    id: 'q2', 
    type: 'OPEN_RESPONSE', 
    prompt: 'Second question', 
    maxLength: 500 
  }
];

describe('QuestionForm', () => {
  const mockOnComplete = jest.fn();
  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    mockOnComplete.mockClear();
    mockOnAnswer.mockClear();
  });

  const renderForm = () => {
    return render(
      <AccessibilityProvider>
        <QuestionForm
          questions={mockQuestions}
          onComplete={mockOnComplete}
          onAnswer={mockOnAnswer}
        />
      </AccessibilityProvider>
    );
  };

  it('renders the first question initially', () => {
    renderForm();
    expect(screen.getByText('First question')).toBeInTheDocument();
    expect(screen.queryByText('Second question')).not.toBeInTheDocument();
  });

  it('navigates between questions using buttons', () => {
    renderForm();
    
    // Initial state
    expect(screen.getByText('First question')).toBeInTheDocument();
    
    // Go to next question
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('Second question')).toBeInTheDocument();
    
    // Go back
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(screen.getByText('First question')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    renderForm();
    
    // Initial state
    expect(screen.getByText('First question')).toBeInTheDocument();
    
    // Navigate with arrow keys
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByText('Second question')).toBeInTheDocument();
    
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(screen.getByText('First question')).toBeInTheDocument();
  });

  it('tracks question completion', () => {
    renderForm();
    
    // Answer first question
    const firstAnswer: QuestionResponse = {
      questionId: 'q1',
      answer: 'A',
      timestamp: expect.any(Number)
    };
    
    fireEvent.click(screen.getByText('A'));
    expect(mockOnAnswer).toHaveBeenCalledWith(firstAnswer);
    
    // Navigate to second question
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    
    // Answer second question
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test response' } });
    
    const secondAnswer: QuestionResponse = {
      questionId: 'q2',
      answer: 'Test response',
      timestamp: expect.any(Number)
    };
    
    expect(mockOnAnswer).toHaveBeenCalledWith(secondAnswer);
  });

  it('calls onComplete when all questions are answered', () => {
    renderForm();
    
    // Answer first question
    fireEvent.click(screen.getByText('A'));
    
    // Navigate and answer second question
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test response' } });
    
    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('shows progress indicator', () => {
    renderForm();
    
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '0');
    
    // Answer first question
    fireEvent.click(screen.getByText('A'));
    expect(progress).toHaveAttribute('aria-valuenow', '50');
    
    // Answer second question
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test response' } });
    
    expect(progress).toHaveAttribute('aria-valuenow', '100');
  });

  it('displays validation errors', () => {
    renderForm();
    
    // Try to navigate without answering required question
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('prevents navigation when current question is invalid', () => {
    renderForm();
    
    // Try to navigate with invalid response
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    
    // Should still show first question
    expect(screen.getByText('First question')).toBeInTheDocument();
    expect(screen.queryByText('Second question')).not.toBeInTheDocument();
  });

  it('clears validation errors when valid answer is provided', () => {
    renderForm();
    
    // Generate error
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
    
    // Provide valid answer
    fireEvent.click(screen.getByText('A'));
    expect(screen.queryByText('Please select an option')).not.toBeInTheDocument();
  });
});