import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizProvider, useQuizContext } from '../QuizContext';

const mockSubject = {
  id: 'user1',
  name: 'Test User',
  avatar: 'avatar.jpg'
};

const mockQuestions = [
  {
    id: 'q1',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is Test User\'s favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    correctAnswer: 'Blue',
    distractors: ['Red', 'Green', 'Yellow']
  },
  {
    id: 'q2',
    type: 'MULTIPLE_CHOICE',
    prompt: 'What is Test User\'s preferred learning style?',
    options: ['Visual', 'Audio', 'Reading', 'Hands-on'],
    correctAnswer: 'Visual',
    distractors: ['Audio', 'Reading', 'Hands-on']
  }
];

const TestComponent = () => {
  const { state, actions } = useQuizContext();
  
  return (
    <div>
      <div data-testid="current-index">{state.currentQuestionIndex}</div>
      <div data-testid="score">{state.score}</div>
      <button onClick={() => actions.initializeQuiz(mockSubject.id, mockQuestions)}>
        Start Quiz
      </button>
      <button 
        onClick={() => actions.submitAnswer({
          questionId: state.questions[state.currentQuestionIndex].id,
          userAnswer: 'Blue',
          timestamp: Date.now()
        })}
      >
        Submit Answer
      </button>
    </div>
  );
};

describe('QuizContext', () => {
  it('initializes quiz with subject and questions', () => {
    render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    );

    fireEvent.click(screen.getByText('Start Quiz'));
    expect(screen.getByTestId('current-index')).toHaveTextContent('0');
  });

  it('tracks score for correct answers', () => {
    render(
      <QuizProvider>
        <TestComponent />
      </QuizProvider>
    );

    fireEvent.click(screen.getByText('Start Quiz'));
    fireEvent.click(screen.getByText('Submit Answer'));
    expect(screen.getByTestId('score')).toHaveTextContent('1');
  });
}); 