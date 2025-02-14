import { renderHook, act } from '@testing-library/react-hooks';
import { useQuestionResponse } from '../useQuestionResponse';
import { ResponseService } from '../../services/ResponseService';
import { useAuth } from '@/features/auth/context/AuthContext';

jest.mock('@/features/auth/context/AuthContext');
jest.mock('../../services/ResponseService');

describe('useQuestionResponse', () => {
  const mockUser = { uid: 'test-user' };
  const mockSubmitResponse = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (ResponseService as jest.Mock).mockImplementation(() => ({
      submitResponse: mockSubmitResponse
    }));
  });

  it('should submit response successfully', async () => {
    const { result } = renderHook(() => useQuestionResponse('test-question'));
    
    const response = {
      type: 'XY' as const,
      coordinates: { x: 0.5, y: 0.5 },
      interactions: []
    };

    const metadata = {
      timeToAnswer: 1000,
      interactionCount: 1,
      confidence: 0.8,
      device: {
        type: 'desktop' as const,
        input: 'mouse' as const
      }
    };

    mockSubmitResponse.mockResolvedValueOnce('response-id');

    await act(async () => {
      await result.current.submitResponse(response, metadata);
    });

    expect(mockSubmitResponse).toHaveBeenCalledWith(
      mockUser.uid,
      'test-question',
      response,
      metadata
    );
    expect(result.current.error).toBeNull();
  });

  it('should handle errors', async () => {
    const { result } = renderHook(() => useQuestionResponse('test-question'));
    
    mockSubmitResponse.mockRejectedValueOnce(new Error('Submit failed'));

    await act(async () => {
      try {
        await result.current.submitResponse(
          { type: 'XY', coordinates: { x: 0, y: 0 }, interactions: [] },
          { timeToAnswer: 1000, interactionCount: 1, confidence: 0.5, device: { type: 'desktop', input: 'mouse' } }
        );
      } catch (error) {
        // Expected error
      }
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe('Submit failed');
  });
}); 