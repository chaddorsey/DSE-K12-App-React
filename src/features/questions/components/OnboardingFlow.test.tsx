import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OnboardingFlow } from './OnboardingFlow';
import { SessionService } from '../services/SessionService';
import { ResponseService } from '../services/ResponseService';
import { mockFirestore } from '../../../mocks/mockFirestore';
import { OnboardingProvider } from '../context/OnboardingContext';
import { QuestionProvider } from '../context/QuestionContext';

jest.mock('../services/SessionService');
jest.mock('../services/ResponseService');

describe('OnboardingFlow', () => {
  let sessionService: jest.Mocked<SessionService>;
  let responseService: jest.Mocked<ResponseService>;

  beforeEach(() => {
    sessionService = new SessionService(mockFirestore) as jest.Mocked<SessionService>;
    responseService = new ResponseService(mockFirestore) as jest.Mocked<ResponseService>;

    // Mock service methods
    sessionService.startSession.mockResolvedValue('session-123');
    responseService.saveResponse.mockResolvedValue({
      id: 'response-123',
      questionId: 'q1',
      userId: 'user1',
      sessionId: 'session-123',
      value: { type: 'MC', selectedOption: 'option1' },
      timestamp: Date.now(),
      metadata: { confidence: 0.8 },
      context: 'ONBOARDING'
    });
  });

  const renderOnboardingFlow = () => {
    return render(
      <QuestionProvider>
        <OnboardingProvider
          standardQuestions={[
            {
              id: 'q1',
              type: 'MC',
              prompt: 'Test Question',
              options: ['option1', 'option2'],
              text: 'Test Question',
              label: '',
              category: 'PREFERENCES',
              number: 1,
              requiredForOnboarding: true,
              includeInOnboarding: true
            }
          ]}
          questionPool={[]}
        >
          <OnboardingFlow 
            sessionService={sessionService}
            responseService={responseService}
          />
        </OnboardingProvider>
      </QuestionProvider>
    );
  };

  it('should start a new session on mount', async () => {
    renderOnboardingFlow();
    await waitFor(() => {
      expect(sessionService.startSession).toHaveBeenCalledWith('user1', 'ONBOARDING');
    });
  });

  it('should save responses and show delight factor on answer', async () => {
    renderOnboardingFlow();
    
    // Wait for question to render
    const option = await screen.findByText('option1');
    fireEvent.click(option);

    await waitFor(() => {
      expect(responseService.saveResponse).toHaveBeenCalled();
      // Verify delight factor appears
      expect(screen.getByTestId('delight-factor')).toBeInTheDocument();
    });
  });

  it('should complete session when all questions are answered', async () => {
    renderOnboardingFlow();
    
    const option = await screen.findByText('option1');
    fireEvent.click(option);

    await waitFor(() => {
      expect(sessionService.completeSession).toHaveBeenCalledWith(
        'session-123',
        expect.objectContaining({
          totalQuestions: 1
        })
      );
    });
  });
}); 