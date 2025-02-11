import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionEditorDemo } from '../QuestionEditorDemo';
import { QuestionBankProvider } from '../../context/QuestionBankContext';

const mockQuestions = [
  {
    id: 'q1',
    type: 'MC',
    text: 'Test Question 1',
    label: 'test_q1',
    category: 'PERSONALITY',
    number: 1,
    options: ['Option 1', 'Option 2'],
    requiredForOnboarding: true
  }
];

describe('QuestionEditorDemo', () => {
  const renderWithProvider = () => {
    return render(
      <QuestionBankProvider initialQuestions={mockQuestions}>
        <QuestionEditorDemo />
      </QuestionBankProvider>
    );
  };

  it('shows question list by default', () => {
    renderWithProvider();
    expect(screen.getByText('Test Question 1')).toBeInTheDocument();
  });

  it('opens editor for new question', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Create New Question'));
    expect(screen.getByText('Add New Question')).toBeInTheDocument();
  });

  it('opens editor for existing question', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Edit Question')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Question 1')).toBeInTheDocument();
  });

  it('handles question deletion', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('Test Question 1')).not.toBeInTheDocument();
  });

  it('duplicates questions', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('Duplicate'));
    expect(screen.getAllByText(/Test Question 1/).length).toBe(2);
  });

  it('updates existing question', async () => {
    renderWithProvider();
    
    // Start editing
    fireEvent.click(screen.getByText('Edit'));
    
    // Update the question text
    const textInput = screen.getByDisplayValue('Test Question 1');
    fireEvent.change(textInput, { target: { value: 'Updated Question' } });
    
    // Save changes
    fireEvent.click(screen.getByText('Save Question'));
    
    // Verify update
    expect(screen.getByText('Updated Question')).toBeInTheDocument();
    expect(screen.queryByText('Test Question 1')).not.toBeInTheDocument();
  });
}); 