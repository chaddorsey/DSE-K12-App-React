import { Firestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';

export class SessionService {
  private readonly COLLECTION_NAME = 'sessions';

  constructor(private readonly firestore: Firestore) {}

  async startSession(userId: string, type: 'ONBOARDING' | 'QUIZ'): Promise<string> {
    const session = {
      userId,
      type,
      startTime: Date.now(),
      completed: false,
      totalQuestions: 0,
      currentQuestionIndex: 0
    };

    const docRef = await addDoc(collection(this.firestore, this.COLLECTION_NAME), session);
    return docRef.id;
  }

  async completeSession(sessionId: string, metrics: {
    totalQuestions: number;
    score?: number;
  }): Promise<void> {
    await updateDoc(doc(this.firestore, this.COLLECTION_NAME, sessionId), {
      completed: true,
      endTime: Date.now(),
      ...metrics
    });
  }
} 