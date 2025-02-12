import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OpenResponseQuestion } from '../OpenResponseQuestion';
import type { OpenResponseQuestionType } from '../../types';
import { AccessibilityProvider } from '../../../accessibility/context/AccessibilityContext';

describe('OpenResponseQuestion', () => {
  const mockQuestion: OpenResponseQuestionType = {
    id: 'q1',
    type: 'OPEN_RESPONSE',
    prompt: 'What are your career goals?',
    maxLength: 500
  };

  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    mockOnAnswer.mockClear();
  });

  it('renders the question prompt', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    expect(screen.getByText(mockQuestion.prompt)).toBeInTheDocument();
  });

  it('renders a textarea for input', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onAnswer with entered text', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'My response' } });
    fireEvent.blur(input);
    
    expect(mockOnAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      answer: 'My response',
      timestamp: expect.any(Number)
    });
  });

  it('enforces maxLength constraint', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '500');
  });

  it('shows remaining character count', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test' } });
    
    expect(screen.getByText('496 characters remaining')).toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        disabled={true}
      />
    );
    
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('shows loading state when loading prop is true', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        loading={true}
      />
    );
    
    expect(screen.getByTestId('question-loading')).toBeInTheDocument();
  });

  it('enables submit button only when text is entered', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test response' } });
    
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onAnswer when submit button is clicked', () => {
    render(
      <OpenResponseQuestion
        question={mockQuestion}
        onAnswer={mockOnAnswer}
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test response' } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    expect(mockOnAnswer).toHaveBeenCalledWith({
      questionId: mockQuestion.id,
      answer: 'Test response',
      timestamp: expect.any(Number)
    });
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
        <OpenResponseQuestion 
          question={mockQuestion}
          onAnswer={mockOnAnswer}
        />
      </AccessibilityProvider>
    );

    const input = screen.getByRole('textbox');
    const mockResizeListener = mockVisualViewport.addEventListener.mock.calls[0][1];

    // Simulate keyboard opening
    Object.defineProperty(window.visualViewport!, 'height', { value: 500 });
    mockResizeListener(new Event('resize'));

    expect(input.parentElement).toHaveStyle({
      transform: `translateY(-300px)` // Keyboard height
    });
  });

  it('restores input position when keyboard closes', () => {
    render(
      <AccessibilityProvider>
        <OpenResponseQuestion 
          question={mockQuestion}
          onAnswer={mockOnAnswer}
        />
      </AccessibilityProvider>
    );

    const input = screen.getByRole('textbox');
    const mockResizeListener = mockVisualViewport.addEventListener.mock.calls[0][1];

    // Simulate keyboard closing
    Object.defineProperty(window.visualViewport!, 'height', { value: 800 });
    mockResizeListener(new Event('resize'));

    expect(input.parentElement).toHaveStyle({
      transform: 'translateY(0)'
    });
  });

  it('handles viewport scrolling with keyboard open', () => {
    render(
      <AccessibilityProvider>
        <OpenResponseQuestion 
          question={mockQuestion}
          onAnswer={mockOnAnswer}
        />
      </AccessibilityProvider>
    );

    const input = screen.getByRole('textbox');
    const mockScrollListener = mockVisualViewport.addEventListener.mock.calls[1][1];

    // Simulate viewport scroll
    Object.defineProperty(window.visualViewport!, 'offsetTop', { value: 50 });
    mockScrollListener(new Event('scroll'));

    expect(input.parentElement).toHaveStyle({
      transform: `translateY(-50px)`
    });
  });
}); 