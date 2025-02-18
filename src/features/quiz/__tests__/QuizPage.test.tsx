import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { QuizPage } from '../QuizPage';
import { QuizProvider } from '../context/QuizContext';
import { QuizGenerator } from '../services/QuizGenerator';
import type { Quiz, QuizQuestion, QuizResponse } from '../types/quiz';
import { useParams } from 'react-router-dom';

// Mock router
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: () => jest.fn()
}));

// Mock quiz data
const mockQuiz: Quiz = {
  id: 'quiz1',
  targetUserId: 'user1',
  questions: [
    {
      id: '1',
      type: 'MC',
      text: 'What is your favorite color?',
      prompt: 'Choose a color',
      category: 'PREFERENCES',
      label: 'Color Preference',
      options: ['Red', 'Blue', 'Green'],
      correctAnswer: 'Blue',
      metadata: {
        difficulty: 1,
        timeLimit: 30
      }
    } as QuizQuestion,
    {
      id: '2',
      type: 'NM',
      text: 'Years teaching?',
      prompt: 'Enter years',
      category: 'EXPERIENCE',
      label: 'Teaching Experience',
      options: [5, 10, 15],
      correctAnswer: 10,
      metadata: {
        difficulty: 1,
        timeLimit: 30
      }
    } as QuizQuestion
  ],
  createdAt: new Date()
};

const mockQuizResponse: QuizResponse = {
  id: 'resp1',
  userId: 'user2',
  questionId: '1',
  value: {
    type: 'MC',
    selectedOption: 'Blue'
  },
  metadata: {
    timeToAnswer: 1000,
    interactionCount: 1,
    device: {
      type: 'browser',
      input: 'mouse'
    }
  },
  timestamp: new Date(),
  isCorrect: true
};

const mockQuizGenerator: jest.Mocked<QuizGenerator> = {
  generateQuiz: jest.fn().mockReturnValue(mockQuiz),
  generateDistractors: jest.fn()
} as any;

// Test component to access context
const TestComponent = () => {
  const { state, actions } = useQuiz();
  return (
    <div>
      <div data-testid="quiz-state">
        {JSON.stringify({
          currentIndex: state.currentQuestionIndex,
          score: state.score,
          completed: state.completed
        })}
      </div>
      <button 
        onClick={() => {
          if (state.quiz?.targetUserId) {
            actions.startQuiz(state.quiz.targetUserId);
          }
        }}
        data-testid="start-button"
      >
        Start Quiz
      </button>
      <button 
        onClick={() => actions.handleResponse(mockQuizResponse)}
        data-testid="answer-button"
      >
        Answer
      </button>
      <button 
        onClick={() => actions.advanceQuestion()}
        data-testid="next-button"
      >
        Next
      </button>
    </div>
  );
};

describe('QuizPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ userId: 'user1' });
  });

  it('initializes with default state', () => {
    render(
      <QuizProvider quizGenerator={mockQuizGenerator}>
        <TestComponent />
      </QuizProvider>
    );

    const state = JSON.parse(screen.getByTestId('quiz-state').textContent || '');
    expect(state).toEqual({
      currentIndex: 0,
      score: 0,
      completed: false
    });
  });

  it('starts quiz when startQuiz is called', async () => {
    render(
      <QuizProvider quizGenerator={mockQuizGenerator}>
        <QuizPage />
      </QuizProvider>
    );

    // Wait for auto-start (from useEffect)
    await screen.findByTestId('quiz-intro');
    
    // Start quiz manually
    const startButton = screen.getByTestId('start-quiz-button');
    await act(async () => {
      fireEvent.click(startButton);
    });

    expect(mockQuizGenerator.generateQuiz).toHaveBeenCalledWith('user1');
  });

  it('handles responses and updates score', async () => {
    render(
      <QuizProvider quizGenerator={mockQuizGenerator}>
        <QuizPage />
      </QuizProvider>
    );

    // Wait for auto-start
    await screen.findByTestId('quiz-intro');
    
    // Start quiz
    const startButton = screen.getByTestId('start-quiz-button');
    await act(async () => {
      fireEvent.click(startButton);
    });

    // Answer first question
    const option = screen.getByText('Blue');
    fireEvent.click(option);

    // Check feedback
    expect(screen.getByTestId('feedback-correct')).toBeInTheDocument();
    expect(screen.getByText("That's correct!")).toBeInTheDocument();
  });

  it('advances to next question', async () => {
    render(
      <QuizProvider quizGenerator={mockQuizGenerator}>
        <QuizPage />
      </QuizProvider>
    );

    // Wait for auto-start
    await screen.findByTestId('quiz-intro');
    
    // Start quiz
    const startButton = screen.getByTestId('start-quiz-button');
    await act(async () => {
      fireEvent.click(startButton);
    });

    // Answer and advance
    const option = screen.getByText('Blue');
    fireEvent.click(option);
    fireEvent.click(screen.getByTestId('next-button'));

    // Check second question
    expect(screen.getByText('Years teaching?')).toBeInTheDocument();
  });

  it('shows completion screen with score', async () => {
    render(
      <QuizProvider quizGenerator={mockQuizGenerator}>
        <QuizPage />
      </QuizProvider>
    );

    // Wait for auto-start
    await screen.findByTestId('quiz-intro');
    
    // Start quiz
    const startButton = screen.getByTestId('start-quiz-button');
    await act(async () => {
      fireEvent.click(startButton);
    });

    // Complete all questions
    for (const question of mockQuiz.questions) {
      const option = screen.getByText(question.correctAnswer.toString());
      fireEvent.click(option);
      fireEvent.click(screen.getByTestId('next-button'));
    }

    expect(screen.getByTestId('quiz-complete')).toBeInTheDocument();
    expect(screen.getByText(/You scored/i)).toBeInTheDocument();
  });

  it('handles errors gracefully', async () => {
    mockQuizGenerator.generateQuiz.mockRejectedValueOnce(new Error('Quiz generation failed'));

    render(
      <QuizProvider quizGenerator={mockQuizGenerator}>
        <QuizPage />
      </QuizProvider>
    );

    await screen.findByTestId('error-message');
    expect(screen.getByTestId('retry-button')).toBeInTheDocument();
  });
}); 