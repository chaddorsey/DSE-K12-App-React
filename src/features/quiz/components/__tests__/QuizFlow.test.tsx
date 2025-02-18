import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QuizFlow } from '../QuizFlow';
import { DelightFactor } from '../../../questions/components/DelightFactor/DelightFactor';
import type { Quiz, QuizQuestion } from '../../types/quiz';

// Mock DelightFactor component
jest.mock('../../../questions/components/DelightFactor/DelightFactor', () => ({
  DelightFactor: jest.fn(({ onComplete }) => {
    // Simulate completion after a short delay
    setTimeout(onComplete, 100);
    return <div data-testid="mock-delight">Delight Animation</div>;
  })
}));

const mockQuiz: Quiz = {
  id: 'quiz_1',
  targetUserId: 'user1',
  questions: [
    {
      id: 'q1',
      type: 'MC',
      text: 'What is their favorite color?',
      prompt: 'What is their favorite color?',
      label: 'Favorite Color',
      category: 'PREFERENCES',
      number: 1,
      correctAnswer: 'Blue',
      options: ['Red', 'Blue', 'Green', 'Yellow'],
      delightFactor: {
        id: 'delight1',
        type: 'ANIMATION',
        timing: 'POST_ANSWER',
        trigger: 'ON_CORRECT',
        content: {
          animation: 'confetti',
          duration: 2000
        },
        questionTypes: ['MC']
      }
    },
    {
      id: 'q2',
      type: 'NM',
      prompt: 'How many years of experience?',
      correctAnswer: 5,
      options: [3, 5, 7, 10]
    }
  ],
  createdAt: new Date()
};

describe('QuizFlow', () => {
  const mockOnComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays the first question initially', () => {
    render(<QuizFlow quiz={mockQuiz} onComplete={mockOnComplete} />);
    
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('What is their favorite color?')).toBeInTheDocument();
    
    // Should show all options
    mockQuiz.questions[0].options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('shows delight factor on correct answer', async () => {
    render(<QuizFlow quiz={mockQuiz} onComplete={mockOnComplete} />);
    
    // Select correct answer
    fireEvent.click(screen.getByText('Blue'));
    
    // Should show delight animation
    expect(screen.getByTestId('mock-delight')).toBeInTheDocument();
    
    // Wait for delight animation to complete
    await waitFor(() => {
      expect(screen.queryByTestId('mock-delight')).not.toBeInTheDocument();
    });
  });

  it('does not show delight factor on incorrect answer', () => {
    render(<QuizFlow quiz={mockQuiz} onComplete={mockOnComplete} />);
    
    // Select incorrect answer
    fireEvent.click(screen.getByText('Red'));
    
    expect(screen.queryByTestId('mock-delight')).not.toBeInTheDocument();
  });

  it('shows feedback after answering', async () => {
    render(<QuizFlow quiz={mockQuiz} onComplete={mockOnComplete} />);
    
    // Select correct answer
    fireEvent.click(screen.getByText('Blue'));
    
    await waitFor(() => {
      expect(screen.getByText('Correct!')).toBeInTheDocument();
      expect(screen.getByText('Score: 1/1')).toBeInTheDocument();
    });
  });

  it('advances to next question after answering', async () => {
    render(<QuizFlow quiz={mockQuiz} onComplete={mockOnComplete} />);
    
    // Answer first question
    fireEvent.click(screen.getByText('Blue'));
    
    // Click next
    fireEvent.click(screen.getByText('Next Question'));
    
    await waitFor(() => {
      expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
      expect(screen.getByText('How many years of experience?')).toBeInTheDocument();
    });
  });

  it('completes quiz after last question', async () => {
    render(<QuizFlow quiz={mockQuiz} onComplete={mockOnComplete} />);
    
    // Answer both questions
    fireEvent.click(screen.getByText('Blue'));
    fireEvent.click(screen.getByText('Next Question'));
    fireEvent.click(screen.getByText('5'));
    
    await waitFor(() => {
      expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
      expect(screen.getByText('Final Score: 2/2')).toBeInTheDocument();
      expect(mockOnComplete).toHaveBeenCalledWith({
        score: 2,
        totalQuestions: 2,
        answers: expect.any(Array)
      });
    });
  });

  it('handles incorrect answers', async () => {
    render(<QuizFlow quiz={mockQuiz} onComplete={mockOnComplete} />);
    
    // Select wrong answer
    fireEvent.click(screen.getByText('Red'));
    
    await waitFor(() => {
      expect(screen.getByText('Incorrect')).toBeInTheDocument();
      expect(screen.getByText('The correct answer was Blue')).toBeInTheDocument();
      expect(screen.getByText('Score: 0/1')).toBeInTheDocument();
    });
  });

  it('shows loading state while transitioning questions', async () => {
    render(<QuizFlow quiz={mockQuiz} onComplete={mockOnComplete} />);
    
    fireEvent.click(screen.getByText('Blue'));
    
    // Should show loading briefly
    expect(screen.getByText('Loading next question...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Loading next question...')).not.toBeInTheDocument();
    });
  });
}); 