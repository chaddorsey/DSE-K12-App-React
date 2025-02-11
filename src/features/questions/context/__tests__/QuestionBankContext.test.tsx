import React from 'react';
import { render, act, renderHook } from '@testing-library/react';
import { QuestionBankProvider, useQuestionBank } from '../QuestionBankContext';
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
  }
];

const TestComponent = () => {
  const { questions, deleteQuestion, duplicateQuestion, bulkUpdate } = useQuestionBank();
  return (
    <div>
      <div data-testid="question-count">{questions.length}</div>
      <div data-testid="question-category">{questions[0]?.category}</div>
      <button onClick={() => deleteQuestion('1')}>Delete</button>
      <button onClick={() => duplicateQuestion('1')}>Duplicate</button>
      <button onClick={() => bulkUpdate(['1'], { category: 'UPDATED' })}>Update</button>
    </div>
  );
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QuestionBankProvider initialQuestions={mockQuestions}>
    {children}
  </QuestionBankProvider>
);

describe('QuestionBankContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides question management functions', async () => {
    const { getByTestId, getByText } = render(<TestComponent />, { wrapper });

    // Initial state
    expect(getByTestId('question-count')).toHaveTextContent('1');

    // Test duplication
    await act(async () => {
      getByText('Duplicate').click();
    });
    expect(getByTestId('question-count')).toHaveTextContent('2');

    // Test deletion
    await act(async () => {
      getByText('Delete').click();
    });
    expect(getByTestId('question-count')).toHaveTextContent('1');

    // Test bulk update
    await act(async () => {
      getByText('Update').click();
    });
    expect(getByTestId('question-category')).toHaveTextContent('UPDATED');
  });

  it('throws error when used outside provider', () => {
    const { result } = renderHook(() => useQuestionBank());
    expect(result.error).toEqual(Error('useQuestionBank must be used within a QuestionBankProvider'));
  });
}); 