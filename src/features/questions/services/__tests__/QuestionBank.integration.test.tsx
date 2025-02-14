import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuestionBankProvider, useQuestionBank } from '../QuestionBankContext';
import type { XYQuestion } from '../../types/xy';
import { QuestionCategory } from '../../types/question';

// Test component to interact with question bank
const TestComponent = () => {
  const { addQuestion, getQuestion, submitResponse } = useQuestionBank();
  
  const handleAddXYQuestion = () => {
    const xyQuestion: XYQuestion = {
      id: 'xy-test-1',
      number: 1,
      type: 'XY',
      label: 'Test Grid Question',
      text: 'Place yourself on this grid',
      category: QuestionCategory.PERSONALITY,
      config: {
        xAxis: {
          min: 0,
          max: 100,
          labels: {
            min: 'Introvert',
            max: 'Extrovert'
          }
        },
        yAxis: {
          min: 0,
          max: 100,
          labels: {
            min: 'Practical',
            max: 'Creative'
          }
        }
      }
    };
    addQuestion(xyQuestion);
  };

  const handleSubmitResponse = () => {
    submitResponse({
      questionId: 'xy-test-1',
      value: { x: 0.7, y: 0.3 },
      timestamp: Date.now()
    });
  };

  return (
    <div>
      <button onClick={handleAddXYQuestion}>Add XY Question</button>
      <button onClick={handleSubmitResponse}>Submit Response</button>
      <div data-testid="question-display">
        {JSON.stringify(getQuestion('xy-test-1'))}
      </div>
    </div>
  );
};

describe('QuestionBank XY Question Integration', () => {
  it('should handle adding and retrieving XY questions', async () => {
    render(
      <QuestionBankProvider>
        <TestComponent />
      </QuestionBankProvider>
    );

    // Add question
    fireEvent.click(screen.getByText('Add XY Question'));

    // Verify question was added
    await waitFor(() => {
      const questionDisplay = screen.getByTestId('question-display');
      expect(questionDisplay).toHaveTextContent(/Introvert.*Extrovert/);
    });
  });

  it('should handle XY question responses', async () => {
    render(
      <QuestionBankProvider>
        <TestComponent />
      </QuestionBankProvider>
    );

    // Add question first
    fireEvent.click(screen.getByText('Add XY Question'));
    
    // Submit response
    fireEvent.click(screen.getByText('Submit Response'));

    // Verify response was handled
    // This verification will depend on how your question bank exposes response data
    // You might need to add methods to check response status
  });

  it('should validate XY question responses', async () => {
    const { addQuestion, submitResponse } = useQuestionBank();
    
    // Attempt to submit invalid response
    expect(() => 
      submitResponse({
        questionId: 'xy-test-1',
        value: { x: 1.5, y: -0.5 }, // Invalid coordinates
        timestamp: Date.now()
      })
    ).toThrow();
  });

  it('should track XY question statistics', async () => {
    // Test tracking of response patterns
    // This will depend on what statistics you want to track
  });
}); 