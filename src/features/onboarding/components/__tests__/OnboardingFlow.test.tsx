import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingFlow } from '../OnboardingFlow';
import { OnboardingProvider } from '../../context/OnboardingContext';
import { QuestionBankProvider } from '../../../questions/context/QuestionBankContext';

const mockQuestions = [
  {
    id: 'q1',
    type: 'MC',
    text: 'Test MC Question',
    label: 'test_mc',
    category: 'PERSONALITY',
    number: 1,
    options: ['Option 1', 'Option 2'],
    requiredForOnboarding: true
  },
  {
    id: 'q2',
    type: 'OP',
    text: 'Test Open Question',
    label: 'test_op',
    category: 'INTERESTS',
    number: 2,
    maxLength: 500,
    includeInOnboarding: true
  }
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QuestionBankProvider initialQuestions={mockQuestions}>
    <OnboardingProvider questions={mockQuestions}>
      {children}
    </OnboardingProvider>
  </QuestionBankProvider>
);

describe('OnboardingFlow', () => {
  it('shows progress bar', () => {
    render(<OnboardingFlow />, { wrapper });
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('renders multiple choice question', () => {
    render(<OnboardingFlow />, { wrapper });
    expect(screen.getByText('Test MC Question')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('handles question answers', () => {
    render(<OnboardingFlow />, { wrapper });
    fireEvent.click(screen.getByText('Option 1'));
    expect(screen.getByText('Test Open Question')).toBeInTheDocument();
  });

  it('shows skip button for optional questions', async () => {
    render(<OnboardingFlow />, { wrapper });
    // Answer first required question
    fireEvent.click(screen.getByText('Option 1'));
    // Second question is optional
    const skipButton = screen.getByText('Skip this question');
    expect(skipButton).toBeInTheDocument();
  });

  it('shows completion message', () => {
    render(<OnboardingFlow />, { wrapper });
    // Complete all questions
    fireEvent.click(screen.getByText('Option 1'));
    fireEvent.click(screen.getByText('Skip this question'));
    expect(screen.getByText(/Welcome aboard/)).toBeInTheDocument();
  });

  it('renders numeric question', () => {
    const numericQuestions = [
      {
        id: 'num1',
        type: 'NM',
        text: 'Test Numeric Question',
        label: 'test_num',
        category: 'DEMOGRAPHIC',
        number: 1,
        min: 0,
        max: 100,
        requiredForOnboarding: true
      }
    ];

    render(<OnboardingFlow />, { 
      wrapper: ({ children }) => (
        <QuestionBankProvider initialQuestions={numericQuestions}>
          <OnboardingProvider questions={numericQuestions}>
            {children}
          </OnboardingProvider>
        </QuestionBankProvider>
      )
    });

    expect(screen.getByText('Test Numeric Question')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('handles numeric responses', () => {
    const numericQuestions = [
      {
        id: 'num1',
        type: 'NM',
        text: 'How many?',
        label: 'test_num',
        category: 'DEMOGRAPHIC',
        number: 1,
        min: 0,
        max: 100,
        requiredForOnboarding: true
      }
    ];

    render(<OnboardingFlow />, { 
      wrapper: ({ children }) => (
        <QuestionBankProvider initialQuestions={numericQuestions}>
          <OnboardingProvider questions={numericQuestions}>
            {children}
          </OnboardingProvider>
        </QuestionBankProvider>
      )
    });

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '42' } });
    fireEvent.blur(input);

    expect(screen.getByText(/Welcome aboard/)).toBeInTheDocument();
  });

  it('renders slider question', () => {
    const sliderQuestions = [
      {
        id: 'scale1',
        type: 'SCALE',
        text: 'Rate your experience',
        label: 'experience_rating',
        category: 'FEEDBACK',
        number: 1,
        min: 1,
        max: 5,
        step: 1,
        labels: {
          min: 'Poor',
          max: 'Excellent'
        },
        requiredForOnboarding: true
      }
    ];

    render(<OnboardingFlow />, { 
      wrapper: ({ children }) => (
        <QuestionBankProvider initialQuestions={sliderQuestions}>
          <OnboardingProvider questions={sliderQuestions}>
            {children}
          </OnboardingProvider>
        </QuestionBankProvider>
      )
    });

    expect(screen.getByText('Rate your experience')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
}); 