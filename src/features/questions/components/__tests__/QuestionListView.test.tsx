import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionListView } from '../QuestionListView';
import { QuestionBankProvider } from '../../context/QuestionBankContext';
import type { Question } from '../../types';

const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green'],
    category: 'PERSONALITY',
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  },
  {
    id: '2',
    type: 'OPEN_RESPONSE',
    prompt: 'Describe your ideal day.',
    maxLength: 500,
    category: 'PERSONALITY',
    number: 2,
    requiredForOnboarding: false,
    includeInOnboarding: true
  }
];

const mockHandlers = {
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onDuplicate: jest.fn()
};

describe('QuestionListView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders list of questions', () => {
    render(
      <QuestionBankProvider initialQuestions={mockQuestions}>
        <QuestionListView {...mockHandlers} />
      </QuestionBankProvider>
    );

    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
    expect(screen.getByText('Describe your ideal day.')).toBeInTheDocument();
  });

  it('handles sorting by type', () => {
    render(
      <QuestionBankProvider initialQuestions={mockQuestions}>
        <QuestionListView {...mockHandlers} />
      </QuestionBankProvider>
    );

    fireEvent.click(screen.getByText('Type'));
    
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('MULTIPLE_CHOICE');
    expect(rows[2]).toHaveTextContent('OPEN_RESPONSE');
  });

  it('filters questions by search term', () => {
    render(
      <QuestionBankProvider initialQuestions={mockQuestions}>
        <QuestionListView {...mockHandlers} />
      </QuestionBankProvider>
    );

    const searchInput = screen.getByPlaceholderText('Search questions...');
    fireEvent.change(searchInput, { target: { value: 'color' } });

    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument();
    expect(screen.queryByText('Describe your ideal day.')).not.toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(
      <QuestionBankProvider initialQuestions={mockQuestions}>
        <QuestionListView {...mockHandlers} />
      </QuestionBankProvider>
    );

    const editButtons = screen.getAllByLabelText('Edit question');
    fireEvent.click(editButtons[0]);

    expect(mockHandlers.onEdit).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked and confirmed', () => {
    render(
      <QuestionBankProvider initialQuestions={mockQuestions}>
        <QuestionListView {...mockHandlers} />
      </QuestionBankProvider>
    );

    const deleteButtons = screen.getAllByLabelText('Delete question');
    fireEvent.click(deleteButtons[0]);
    
    // Confirm deletion
    fireEvent.click(screen.getByText('Confirm'));

    expect(mockHandlers.onDelete).toHaveBeenCalledWith('1');
  });
}); 