/**
 * Tests for useOnboarding hook
 */

import { renderHook, act } from '@testing-library/react';
import { useOnboarding } from '../useOnboarding';
import { OnboardingProvider } from '../../components/OnboardingProvider';
import { mockMonitoring } from '../testing/mockMonitoring';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('useOnboarding', () => {
  const mockMonitors = mockMonitoring();
  const mockSteps = [
    {
      id: 'name',
      title: 'What is your name?',
      isRequired: true,
      component: () => null
    },
    {
      id: 'age',
      title: 'What is your age?',
      isRequired: true,
      component: () => null
    },
    {
      id: 'location',
      title: 'Where are you located?',
      isRequired: true,
      component: () => null
    },
    {
      id: 'interests',
      title: 'What are your interests?',
      isRequired: false,
      component: () => null
    }
  ];

  const defaultProps = {
    steps: mockSteps,
    requiredQuestionCount: 3
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderOnboardingHook = (props = {}) => {
    return renderHook(() => useOnboarding(), {
      wrapper: ({ children }) => (
        <OnboardingProvider {...defaultProps} {...props}>
          {children}
        </OnboardingProvider>
      )
    });
  };

  it('should throw error when used outside OnboardingProvider', () => {
    // Wrap in a function to test thrown error
    expect(() => {
      const { result } = renderHook(() => useOnboarding());
      // Access result to trigger the error
      console.log(result.current);
    }).toThrow('useOnboarding must be used within an OnboardingProvider');
  });

  it('should not trigger onboarding for users who completed it', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
      name: { value: 'John' },
      age: { value: 25 },
      location: { value: 'NYC' },
      isComplete: true
    }));

    const { result } = renderOnboardingHook();

    expect(result.current.isComplete).toBe(true);
    expect(result.current.currentStep).toBeNull();
  });

  it('should only show required number of questions', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
      name: { value: 'John' }
    }));

    const { result } = renderOnboardingHook({
      requiredQuestionCount: 2
    });

    expect(result.current.remainingRequired).toBe(1);
    
    act(() => {
      result.current.saveProgress({ value: 25 });
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.progress).toBe(100);
  });

  it('should handle network errors gracefully', async () => {
    const mockError = new Error('Network error');
    mockLocalStorage.setItem.mockRejectedValueOnce(mockError);

    const { result } = renderOnboardingHook();

    await act(async () => {
      try {
        await result.current.saveProgress({ value: 'John' });
      } catch (error) {
        // Expected error
      }
    });

    expect(mockMonitors.trackError).toHaveBeenCalledWith(
      mockError,
      expect.objectContaining({
        type: 'onboarding_error',
        operation: 'save_progress'
      })
    );
    expect(result.current.error).toBeDefined();
    expect(result.current.retryLastOperation).toBeDefined();
  });

  it('should track completion status correctly', async () => {
    const onComplete = jest.fn();
    const { result } = renderOnboardingHook({ onComplete });

    await act(async () => {
      await result.current.saveProgress({ value: 'John' }); // name
      await result.current.saveProgress({ value: 25 }); // age
      await result.current.saveProgress({ value: 'NYC' }); // location
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.progress).toBe(100);
    expect(onComplete).toHaveBeenCalled();
    expect(mockMonitors.trackPerformance).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: 'onboarding_complete',
        requiredQuestionsCompleted: true
      })
    );
  });

  it('should only show remaining required questions', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
      name: { value: 'John' },
      age: { value: 25 }
    }));

    const { result } = renderOnboardingHook();

    expect(result.current.currentStep).not.toBeNull();
    expect(result.current.currentStep?.id).toBe('location');
    expect(result.current.remainingRequired).toBe(1);
  });

  it('should not show already answered questions', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
      name: { value: 'John' }
    }));

    const { result } = renderOnboardingHook();

    expect(result.current.currentStep).not.toBeNull();
    expect(result.current.currentStep?.id).toBe('age');
    expect(result.current.answeredQuestions).toEqual(['name']);
  });

  it('should provide onboarding context', () => {
    const { result } = renderOnboardingHook();

    expect(result.current.currentStep).toBeDefined();
    expect(result.current.progress).toBe(0);
    expect(typeof result.current.goToNext).toBe('function');
    expect(typeof result.current.goToPrevious).toBe('function');
  });

  it('should handle step navigation', async () => {
    const { result } = renderOnboardingHook();

    // Verify initial step exists
    expect(result.current.currentStep).not.toBeNull();
    
    await act(async () => {
      await result.current.saveProgress({ value: 'John' }); // name
    });

    // Should move to age after completing name
    expect(result.current.currentStep).not.toBeNull();
    expect(result.current.currentStep?.id).toBe('age');
    expect(result.current.progress).toBe(33); // 1/3 complete

    act(() => {
      result.current.goToPrevious();
    });

    // Should go back to name
    expect(result.current.currentStep).not.toBeNull();
    expect(result.current.currentStep?.id).toBe('name');
  });

  it('should track step interactions', async () => {
    const { result } = renderOnboardingHook();

    await act(async () => {
      await result.current.saveProgress({ value: 'John' });
    });

    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'step_complete',
        step: 'name'
      })
    );
  });

  it('should handle onboarding completion', async () => {
    const onComplete = jest.fn();
    const { result } = renderOnboardingHook({ onComplete });

    await act(async () => {
      await result.current.saveProgress({ value: 'John' }); // name
      await result.current.saveProgress({ value: 25 }); // age
      await result.current.saveProgress({ value: 'NYC' }); // location
      result.current.completeOnboarding();
    });

    expect(onComplete).toHaveBeenCalled();
    expect(mockMonitors.trackPerformance).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'onboarding_complete',
        requiredQuestionsCompleted: true
      })
    );
  });

  it('should randomly select questions from available pool', () => {
    const questionPool = [
      {
        id: 'q1',
        title: 'Question 1',
        isRequired: false,
        component: () => null
      },
      {
        id: 'q2',
        title: 'Question 2',
        isRequired: false,
        component: () => null
      },
      {
        id: 'q3',
        title: 'Question 3',
        isRequired: false,
        component: () => null
      },
      {
        id: 'q4',
        title: 'Question 4',
        isRequired: false,
        component: () => null
      }
    ];

    // Mock Math.random to test selection
    const mockRandom = jest.spyOn(Math, 'random');
    
    // Test first selection
    mockRandom.mockReturnValueOnce(0.1);
    let { result: result1 } = renderOnboardingHook({
      steps: questionPool
    });
    expect(result1.current.currentStep).not.toBeNull();
    const firstQuestion = result1.current.currentStep?.id;

    // Test second selection
    mockRandom.mockReturnValueOnce(0.9);
    let { result: result2 } = renderOnboardingHook({
      steps: questionPool
    });
    expect(result2.current.currentStep).not.toBeNull();
    const secondQuestion = result2.current.currentStep?.id;

    expect(firstQuestion).not.toBeNull();
    expect(secondQuestion).not.toBeNull();
    expect(firstQuestion).not.toBe(secondQuestion);
    expect(mockRandom).toHaveBeenCalledTimes(2);

    // Verify questions are from our pool
    expect(questionPool.map(q => q.id)).toContain(firstQuestion);
    expect(questionPool.map(q => q.id)).toContain(secondQuestion);

    mockRandom.mockRestore();
  });
}); 