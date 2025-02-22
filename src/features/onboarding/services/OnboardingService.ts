import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { 
  Question, 
  QuestionResponse, 
  QuestionContext 
} from '../../questions/types/questions';
import { logger } from '@/utils/logger';

export interface OnboardingSession {
  id: string;
  userId: string;
  questions: Question[];
  responses: QuestionResponse[];
  currentQuestionIndex: number;
  completed: boolean;
  startedAt: string;
  completedAt?: string;
}

export class OnboardingService {
  private readonly COLLECTION = 'onboarding';

  async getLatestSession(userId: string): Promise<OnboardingSession | null> {
    try {
      const sessionsRef = collection(db, this.COLLECTION);
      const userSessions = query(
        sessionsRef,
        where('userId', '==', userId)
      );

      const snapshot = await getDocs(userSessions);
      if (snapshot.empty) return null;

      const sessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as OnboardingSession[];

      return sessions.sort((a, b) => 
        b.startedAt.localeCompare(a.startedAt)
      )[0];
    } catch (error) {
      logger.error('Error fetching onboarding session:', error);
      throw error;
    }
  }

  async createSession(userId: string, questions: Question[]): Promise<OnboardingSession> {
    try {
      const sessionsRef = collection(db, this.COLLECTION);
      const docRef = doc(sessionsRef);

      const session: OnboardingSession = {
        id: docRef.id,
        userId,
        questions,
        responses: [],
        currentQuestionIndex: 0,
        completed: false,
        startedAt: new Date().toISOString()
      };

      await setDoc(docRef, session);
      return session;
    } catch (error) {
      logger.error('Error creating onboarding session:', error);
      throw error;
    }
  }

  async updateSession(sessionId: string, updates: Partial<OnboardingSession>): Promise<void> {
    try {
      const sessionRef = doc(db, this.COLLECTION, sessionId);
      await setDoc(sessionRef, updates, { merge: true });
    } catch (error) {
      logger.error('Error updating onboarding session:', error);
      throw error;
    }
  }
} 