import { render, act } from '@testing-library/react';
import { OnboardingProvider, useOnboarding } from '../OnboardingContext';
import { QuestionService } from '../../questions/services/QuestionService';
import { ResponseService } from '../../questions/services/ResponseService';
import { QuestionType, QuestionContext } from '../../questions/types/questions';

jest.mock('../../questions/services/QuestionService');
jest.mock('../../questions/services/ResponseService');
jest.mock('../../auth/AuthContext', () => ({
  useAuth: () => ({ user: { uid: 'test-user' } })
}));

describe('OnboardingContext', () => {
  const mockQuestions = [
    {
      id: 'q1',
      type: QuestionType.MC,
      prompt: 'Test question?',
      text: 'Test question?',
      label: 'Test',
      options: ['A', 'B', 'C'],
      number: 1,
      requiredForOnboarding: true,
      includeInOnboarding: true
    }
  ];

  const mockResponse = {
    id: 'r1',
    questionId: 'q1',
    userId: 'test-user',
    context: QuestionContext.ONBOARDING,
    value: {
      type: QuestionType.MC,
      selectedOption: 'A'
    },
    metadata: {
      timeToAnswer: 1000,
      interactionCount: 1,
      device: {
        type: 'desktop' as const,
        input: 'mouse' as const
      }
    },
    timestamp: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (QuestionService as jest.Mock).mockImplementation(() => ({
      getOnboardingQuestions: jest.fn().mockResolvedValue(mockQuestions)
    }));
    (ResponseService as jest.Mock).mockImplementation(() => ({
      saveResponse: jest.fn().mockResolvedValue(mockResponse)
    }));
  });

  it('loads questions on mount', async () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useOnboarding();
      return null;
    };

    await act(async () => {
      render(
        <OnboardingProvider>
          <TestComponent />
        </OnboardingProvider>
      );
    });

    expect(contextValue.questions).toEqual(mockQuestions);
    expect(contextValue.loading).toBe(false);
  });

  it('handles responses correctly', async () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useOnboarding();
      return null;
    };

    await act(async () => {
      render(
        <OnboardingProvider>
          <TestComponent />
        </OnboardingProvider>
      );
    });

    await act(async () => {
      await contextValue.handleResponse(mockResponse);
    });

    expect(contextValue.responses).toContain(mockResponse);
    expect(contextValue.currentQuestionIndex).toBe(1);
  });
}); 