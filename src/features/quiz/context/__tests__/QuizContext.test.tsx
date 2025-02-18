import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { QuizProvider, useQuiz } from '../QuizContext';
import { QuizGenerator } from '../../services/QuizGenerator';
import type { Quiz, QuizQuestion } from '../../types/quiz';
import type { QuestionResponse } from '../../../questions/types/questions';

// Mock quiz generator
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
    },
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
    }
  ] as QuizQuestion[],
  createdAt: new Date()
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
        onClick={() => actions.startQuiz('user1')}
        data-testid="start-button"
      >
        Start Quiz
      </button>
      <button 
        onClick={() => {
          actions.handleResponse({
            id: 'resp1',
            userId: 'user2',
            questionId: '1',
            value: {
              type: 'MC',
              selectedOption: 'Blue'
            },
            correct: true,
            metadata: {
              timeToAnswer: 1000,
              interactionCount: 1,
              device: {
                type: 'browser',
                input: 'mouse'
              }
            },
            timestamp: new Date()
          });
        }}
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

describe('QuizContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
        <TestComponent />
      </QuizProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('start-button'));
    });

    expect(mockQuizGenerator.generateQuiz).toHaveBeenCalledWith('user1');
    const state = JSON.parse(screen.getByTestId('quiz-state').textContent || '');
    expect(state.currentIndex).toBe(0);
  });

  it('handles responses and updates score', async () => {
    render(
      <QuizProvider quizGenerator={mockQuizGenerator}>
        <TestComponent />
      </QuizProvider>
    );

    // Start quiz
    await act(async () => {
      fireEvent.click(screen.getByTestId('start-button'));
    });

    // Answer correctly
    fireEvent.click(screen.getByTestId('answer-button'));
    
    const state = JSON.parse(screen.getByTestId('quiz-state').textContent || '');
    expect(state.score).toBe(1);
  });

  it('advances to next question', async () => {
    render(
      <QuizProvider quizGenerator={mockQuizGenerator}>
        <TestComponent />
      </QuizProvider>
    );

    // Start quiz
    await act(async () => {
      fireEvent.click(screen.getByTestId('start-button'));
    });

    // Advance to next question
    fireEvent.click(screen.getByTestId('next-button'));
    
    const state = JSON.parse(screen.getByTestId('quiz-state').textContent || '');
    expect(state.currentIndex).toBe(1);
  });

  it('marks quiz as completed after last question', async () => {
    render(
      <QuizProvider quizGenerator={mockQuizGenerator}>
        <TestComponent />
      </QuizProvider>
    );

    // Start quiz
    await act(async () => {
      fireEvent.click(screen.getByTestId('start-button'));
    });

    // Advance through all questions
    fireEvent.click(screen.getByTestId('next-button')); // Question 2
    fireEvent.click(screen.getByTestId('next-button')); // Try to advance past end
    
    const state = JSON.parse(screen.getByTestId('quiz-state').textContent || '');
    expect(state.completed).toBe(true);
  });
}); 