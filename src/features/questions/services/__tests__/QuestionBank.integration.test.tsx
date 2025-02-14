import { render, screen, waitFor } from '@testing-library/react';
import { QuestionBankProvider } from '../../contexts/QuestionBankProvider';
import { useQuestionBank } from '../../contexts/QuestionBankContext';
import type { Question } from '../../types';

const TestComponent = () => {
  const { questions, loading, error } = useQuestionBank();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {questions.map(q => (
        <div key={q.id} role="listitem">{q.text}</div>
      ))}
    </div>
  );
};

describe('QuestionBank Integration', () => {
  it('provides questions through context', async () => {
    render(
      <QuestionBankProvider>
        <TestComponent />
      </QuestionBankProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const questions = screen.getAllByRole('listitem');
    expect(questions.length).toBeGreaterThan(0);
  });
}); 