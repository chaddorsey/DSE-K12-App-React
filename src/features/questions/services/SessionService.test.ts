import { SessionService } from './SessionService';
import { mockFirestore } from '../../../mocks/mockFirestore';

describe('SessionService', () => {
  let sessionService: SessionService;

  beforeEach(() => {
    sessionService = new SessionService(mockFirestore);
  });

  it('should create a new session', async () => {
    const sessionId = await sessionService.startSession('user1', 'ONBOARDING');
    expect(sessionId).toBeDefined();
  });

  it('should complete a session', async () => {
    const sessionId = await sessionService.startSession('user1', 'ONBOARDING');
    await sessionService.completeSession(sessionId, { totalQuestions: 5 });
    // Add verification
  });
}); 