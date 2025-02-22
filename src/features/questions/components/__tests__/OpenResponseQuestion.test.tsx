import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OpenResponseQuestionComponent } from '../OpenResponseQuestion';
import { QuestionType } from '../../types/questions';
import { AccessibilityProvider } from '../../../accessibility/context/AccessibilityContext';

describe('OpenResponseQuestion', () => {
  const mockQuestion = {
    id: 'q1',
    type: QuestionType.OP,
    prompt: 'Describe your experience',
    text: 'Describe your experience',
    label: 'Experience',
    maxLength: 500,
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders question prompt and textarea', () => {
    render(
      <OpenResponseQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your response')).toBeInTheDocument();
    expect(screen.getByText('0 / 500')).toBeInTheDocument();
  });

  it('handles text input and submission', () => {
    render(
      <OpenResponseQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const textarea = screen.getByPlaceholderText('Enter your response');
    fireEvent.change(textarea, { target: { value: 'Test response' } });
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        questionId: mockQuestion.id,
        value: {
          type: 'OP',
          text: 'Test response',
          length: 13
        }
      })
    );
  });

  it('enforces maxLength constraint', () => {
    render(
      <OpenResponseQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const textarea = screen.getByPlaceholderText('Enter your response');
    expect(textarea).toHaveAttribute('maxLength', '500');
  });

  it('updates character count', () => {
    render(
      <OpenResponseQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );

    const textarea = screen.getByPlaceholderText('Enter your response');
    fireEvent.change(textarea, { target: { value: 'Test' } });
    
    expect(screen.getByText('4 / 500')).toBeInTheDocument();
  });

  it('disables interaction when disabled prop is true', () => {
    render(
      <OpenResponseQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );

    expect(screen.getByPlaceholderText('Enter your response')).toBeDisabled();
    expect(screen.getByText('Submit')).toBeDisabled();
  });

  it('shows loading state when loading prop is true', () => {
    render(
      <OpenResponseQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        loading={true}
      />
    );
    
    expect(screen.getByTestId('question-loading')).toBeInTheDocument();
  });

  it('enables submit button only when text is entered', () => {
    render(
      <OpenResponseQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeDisabled();
    
    const textarea = screen.getByPlaceholderText('Enter your response');
    fireEvent.change(textarea, { target: { value: 'Test response' } });
    
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onAnswer when submit button is clicked', () => {
    render(
      <OpenResponseQuestionComponent
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const textarea = screen.getByPlaceholderText('Enter your response');
    fireEvent.change(textarea, { target: { value: 'Test response' } });
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    
    expect(mockOnAnswer).toHaveBeenCalledWith(
      expect.objectContaining({
        questionId: mockQuestion.id,
        value: {
          type: 'OP',
          text: 'Test response',
          length: 13
        }
      })
    );
  });
});

const mockVisualViewport = {
  height: 800,
  offsetTop: 0,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

describe('OpenResponseQuestion Mobile Keyboard', () => {
  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    Object.defineProperty(window, 'visualViewport', {
      value: mockVisualViewport,
      configurable: true
    });
    Object.defineProperty(window, 'innerHeight', { value: 800 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('adjusts input position when keyboard opens', () => {
    render(
      <AccessibilityProvider>
        <OpenResponseQuestionComponent
          question={mockQuestion}
          onAnswer={mockOnAnswer}
        />
      </AccessibilityProvider>
    );

    const textarea = screen.getByPlaceholderText('Enter your response');
    const mockResizeListener = mockVisualViewport.addEventListener.mock.calls[0][1];

    // Simulate keyboard opening
    Object.defineProperty(window.visualViewport!, 'height', { value: 500 });
    mockResizeListener(new Event('resize'));

    expect(textarea.parentElement).toHaveStyle({
      transform: `translateY(-300px)` // Keyboard height
    });
  });

  it('restores input position when keyboard closes', () => {
    render(
      <AccessibilityProvider>
        <OpenResponseQuestionComponent
          question={mockQuestion}
          onAnswer={mockOnAnswer}
        />
      </AccessibilityProvider>
    );

    const textarea = screen.getByPlaceholderText('Enter your response');
    const mockResizeListener = mockVisualViewport.addEventListener.mock.calls[0][1];

    // Simulate keyboard closing
    Object.defineProperty(window.visualViewport!, 'height', { value: 800 });
    mockResizeListener(new Event('resize'));

    expect(textarea.parentElement).toHaveStyle({
      transform: 'translateY(0)'
    });
  });

  it('handles viewport scrolling with keyboard open', () => {
    render(
      <AccessibilityProvider>
        <OpenResponseQuestionComponent
          question={mockQuestion}
          onAnswer={mockOnAnswer}
        />
      </AccessibilityProvider>
    );

    const textarea = screen.getByPlaceholderText('Enter your response');
    const mockScrollListener = mockVisualViewport.addEventListener.mock.calls[1][1];

    // Simulate viewport scroll
    Object.defineProperty(window.visualViewport!, 'offsetTop', { value: 50 });
    mockScrollListener(new Event('scroll'));

    expect(textarea.parentElement).toHaveStyle({
      transform: `translateY(-50px)`
    });
  });
}); 