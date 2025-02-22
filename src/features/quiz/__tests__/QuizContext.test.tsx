import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { QuizProvider, useQuiz } from '../QuizContext';
import { QuizService } from '../../questions/services/QuizService';
import { QuestionType, QuestionCategory, QuestionContext } from '../../questions/types/questions';
import { useAuth } from '../../auth/AuthContext';

jest.mock('../../questions/services/QuizService');
jest.mock('../../auth/AuthContext', () => ({
  useAuth: jest.fn()
}));

describe('QuizContext', () => {
  const mockQuiz = {
    id: 'quiz1',
    userId: 'user1',
    targetUserId: 'target1',
    questions: [{
      id: 'q1',
      type: QuestionType.MC,
      prompt: 'Test question?',
      text: 'Test question?',
      label: 'Test',
      category: QuestionCategory.PREFERENCES,
      options: ['A', 'B', 'C'],
      number: 1,
      requiredForOnboarding: true,
      includeInOnboarding: true,
      correctAnswer: 'A',
      distractors: ['B', 'C']
    }],
    context: QuestionContext.QUIZ,
    startedAt: new Date().toISOString()
  };

  const mockResponse = {
    id: 'r1',
    questionId: 'q1',
    userId: 'user1',
    targetUserId: 'target1',
    value: {
      type: QuestionType.MC,
      selectedOption: 'A'
    },
    context: QuestionContext.QUIZ,
    metadata: {
      timeToAnswer: 1000,
      interactionCount: 1,
      device: {
        type: 'desktop' as const,
        input: 'mouse' as const
      }
    },
    isCorrect: true,
    points: 100
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: 'user1' }
    });
    (QuizService as jest.Mock).mockImplementation(() => ({
      generateQuiz: jest.fn().mockResolvedValue(mockQuiz),
      submitQuizResponse: jest.fn().mockResolvedValue(mockResponse)
    }));
  });

  const TestComponent = () => {
    const { currentQuestion, submitAnswer, loading, error } = useQuiz();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentQuestion) return <div>No question</div>;
    return <div>Question: {currentQuestion.prompt}</div>;
  };

  it('initializes quiz for target user', async () => {
    await act(async () => {
      render(
        <QuizProvider targetUserId="target1">
          <TestComponent />
        </QuizProvider>
      );
    });

    expect(screen.getByText('Question: Test question?')).toBeInTheDocument();
  });

  it('handles quiz responses', async () => {
    let quizContext;
    const TestComponent = () => {
      quizContext = useQuiz();
      return null;
    };

    await act(async () => {
      render(
        <QuizProvider targetUserId="target1">
          <TestComponent />
        </QuizProvider>
      );
    });

    await act(async () => {
      await quizContext.submitAnswer(mockResponse);
    });

    expect(quizContext.responses).toContain(mockResponse);
    expect(quizContext.currentQuestionIndex).toBe(1);
  });

  it('shows loading state', async () => {
    render(
      <QuizProvider targetUserId="target1">
        <TestComponent />
      </QuizProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles errors', async () => {
    const mockError = new Error('Failed to load quiz');
    (QuizService as jest.Mock).mockImplementation(() => ({
      generateQuiz: jest.fn().mockRejectedValue(mockError)
    }));

    await act(async () => {
      render(
        <QuizProvider targetUserId="target1">
          <TestComponent />
        </QuizProvider>
      );
    });

    expect(screen.getByText('Error: Failed to load quiz')).toBeInTheDocument();
  });
}); 