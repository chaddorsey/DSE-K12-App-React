import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Question, QuestionCategory } from '../types/questions';
import { logger } from '@/utils/logger';

export class QuestionService {
  private readonly COLLECTION = 'questions';

  async getOnboardingQuestions(): Promise<Question[]> {
    try {
      const questionsRef = collection(db, this.COLLECTION);
      const q = query(
        questionsRef,
        where('includeInOnboarding', '==', true),
        orderBy('number', 'asc')
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
    } catch (error) {
      logger.error('Error fetching onboarding questions:', error);
      throw error;
    }
  }

  async getQuestionsByCategory(category: QuestionCategory): Promise<Question[]> {
    try {
      const questionsRef = collection(db, this.COLLECTION);
      const q = query(
        questionsRef,
        where('category', '==', category),
        orderBy('number', 'asc')
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
    } catch (error) {
      logger.error('Error fetching questions by category:', error);
      throw error;
    }
  }

  async getQuestionById(id: string): Promise<Question | null> {
    try {
      const questionsRef = collection(db, this.COLLECTION);
      const q = query(questionsRef, where('id', '==', id));
      const snapshot = await getDocs(q);

      if (snapshot.empty) return null;

      return {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
      } as Question;
    } catch (error) {
      logger.error('Error fetching question by id:', error);
      throw error;
    }
  }
} 