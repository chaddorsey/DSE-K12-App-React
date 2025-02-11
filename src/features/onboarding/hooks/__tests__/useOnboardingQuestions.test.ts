import { renderHook } from '@testing-library/react-hooks';
import { useOnboardingQuestions } from '../useOnboardingQuestions';
import { QuestionBankProvider } from '../../../questions/context/QuestionBankContext';

// Mock the question bank context
jest.mock('../../../questions/context/QuestionBankContext', () => ({
  useQuestionBank: () => ({
    getAllQuestions: () => [
      {
        id: 'q1',
        number: 1,
        type: 'MC',
        label: 'cat_dog',
        text: 'Cat or dog?',
        category: 'PERSONALITY',
        requiredForOnboarding: true
      },
      {
        id: 'q2',
        type: 'MC',
        label: 'region_current',
        text: 'Where do you live?',
        category: 'DEMOGRAPHIC'
      }
    ],
    getQuestionsByCategory: (category: string) => [],
    validateResponse: () => true
  })
}));

describe('useOnboardingQuestions', () => {
  it('returns required questions first', () => {
    const { result } = renderHook(() => useOnboardingQuestions());
    expect(result.current.questions[0].requiredForOnboarding).toBe(true);
  });

  it('provides validation function', () => {
    const { result } = renderHook(() => useOnboardingQuestions());
    expect(result.current.validateResponse('q1', 'any')).toBe(true);
  });

  it('sorts questions by number', () => {
    const { result } = renderHook(() => useOnboardingQuestions());
    const numbers = result.current.questions.map(q => q.number);
    expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
  });
}); 