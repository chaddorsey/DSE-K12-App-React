import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OnboardingFlow } from '../OnboardingFlow';
import { useOnboarding } from '../../OnboardingContext';
import { QuestionType, QuestionCategory } from '../../../questions/types/questions';

jest.mock('../../OnboardingContext');

describe('OnboardingFlow', () => {
  const mockQuestion = {
    id: 'q1',
    type: QuestionType.MC,
    prompt: 'Test question?',
    text: 'Test question?',
    label: 'Test',
    category: QuestionCategory.PREFERENCES,
    options: ['A', 'B', 'C'],
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  };

  const mockHandleResponse = jest.fn();
  const mockSkipQuestion = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useOnboarding as jest.Mock).mockReturnValue({
      currentQuestion: mockQuestion,
      currentQuestionComponent: () => <div>Mock Question Component</div>,
      responses: [],
      isComplete: false,
      loading: false,
      error: null,
      handleResponse: mockHandleResponse,
      skipQuestion: mockSkipQuestion
    });
  });

  it('renders question component when available', () => {
    render(<OnboardingFlow />);
    expect(screen.getByText('Mock Question Component')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    (useOnboarding as jest.Mock).mockReturnValue({
      loading: true
    });
    render(<OnboardingFlow />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error message when error occurs', () => {
    (useOnboarding as jest.Mock).mockReturnValue({
      error: 'Test error'
    });
    render(<OnboardingFlow />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('shows completion screen when complete', () => {
    (useOnboarding as jest.Mock).mockReturnValue({
      isComplete: true
    });
    render(<OnboardingFlow />);
    expect(screen.getByTestId('onboarding-complete')).toBeInTheDocument();
  });

  it('allows skipping non-required questions', () => {
    (useOnboarding as jest.Mock).mockReturnValue({
      currentQuestion: { ...mockQuestion, requiredForOnboarding: false },
      currentQuestionComponent: () => <div>Mock Question Component</div>,
      skipQuestion: mockSkipQuestion
    });
    
    render(<OnboardingFlow />);
    fireEvent.click(screen.getByText('Skip'));
    expect(mockSkipQuestion).toHaveBeenCalled();
  });
}); 