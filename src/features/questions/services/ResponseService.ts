import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  query, 
  where, 
  orderBy,
  getDocs,
  Timestamp,
  serverTimestamp,
  DocumentReference,
  updateDoc,
  increment,
  arrayUnion,
  writeBatch,
  runTransaction,
  addDoc
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { 
  QuestionResponse, 
  ResponseValue,
  ResponseMetrics,
  XYResponseValue,
  QuizResponse,
  OnboardingResponse,
  QuestionContext,
  QuestionType
} from '../types/questions';
import type { Firestore } from '@firebase/firestore';

interface GridCell {
  x: number;
  y: number;
}

export class ResponseService {
  private readonly BATCH_SIZE = 500;
  private readonly responsesRef = collection(db, 'responses');
  private readonly metricsRef = collection(db, 'response_metrics');
  private readonly COLLECTION_NAME = 'responses';
  private readonly METRICS_COLLECTION = 'response_metrics';

  constructor(private readonly firestore: Firestore) {}

  async saveResponse(response: QuestionResponse): Promise<QuestionResponse> {
    return runTransaction(this.firestore, async transaction => {
      // Save response
      const responseRef = doc(this.responsesRef);
      transaction.set(responseRef, {
        ...response,
        timestamp: serverTimestamp()
      });

      // Update metrics
      const metricsRef = doc(this.metricsRef, response.questionId);
      const metricsDoc = await transaction.get(metricsRef);

      if (!metricsDoc.exists()) {
        transaction.set(metricsRef, this.initializeMetrics(response));
      } else {
        transaction.update(metricsRef, this.calculateMetricsUpdate(response));
      }

      return {
        ...response,
        id: responseRef.id
      };
    });
  }

  async getResponsesBySession(sessionId: string): Promise<(QuestionResponse | QuizResponse)[]> {
    try {
      const responsesRef = collection(this.firestore, this.COLLECTION_NAME);
      const q = query(responsesRef, where('sessionId', '==', sessionId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as (QuestionResponse | QuizResponse)[];
    } catch (error) {
      console.error('Error getting responses by session:', error);
      throw new Error('Failed to get responses');
    }
  }

  async getResponsesByUser(userId: string): Promise<QuestionResponse[]> {
    try {
      const responsesRef = collection(this.firestore, this.COLLECTION_NAME);
      const q = query(responsesRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as QuestionResponse));
    } catch (error) {
      console.error('Error fetching user responses:', error);
      throw error;
    }
  }

  private isValidResponse(response: any): response is QuestionResponse | QuizResponse {
    return (
      response &&
      typeof response.userId === 'string' &&
      typeof response.questionId === 'string' &&
      typeof response.sessionId === 'string' &&
      response.value &&
      typeof response.value.type === 'string'
    );
  }

  async submitResponse(response: QuestionResponse): Promise<string> {
    return runTransaction(this.firestore, async (transaction) => {
      // Create response document
      const responseRef = doc(this.responsesRef);
      
      // Update metrics atomically
      const metricsRef = doc(this.metricsRef, response.questionId);
      const metricsDoc = await transaction.get(metricsRef);

      if (!metricsDoc.exists()) {
        transaction.set(metricsRef, this.initializeMetrics(response));
      } else {
        transaction.update(metricsRef, this.calculateMetricsUpdate(response));
      }

      // Set response data
      transaction.set(responseRef, {
        ...response,
        timestamp: serverTimestamp()
      });

      return responseRef.id;
    });
  }

  async submitBatchResponses(responses: QuestionResponse[]): Promise<string[]> {
    const batches = this.splitIntoBatches(responses, this.BATCH_SIZE);
    const responseIds: string[] = [];

    for (const batchResponses of batches) {
      const batch = writeBatch(this.firestore);
      
      for (const response of batchResponses) {
        const responseRef = doc(this.responsesRef);
        batch.set(responseRef, {
          ...response,
          timestamp: serverTimestamp()
        });
        responseIds.push(responseRef.id);
      }

      await batch.commit();
    }

    return responseIds;
  }

  private splitIntoBatches<T>(items: T[], size: number): T[][] {
    return items.reduce((batches, item) => {
      const currentBatch = batches[batches.length - 1];
      if (currentBatch.length < size) {
        currentBatch.push(item);
      } else {
        batches.push([item]);
      }
      return batches;
    }, [[]] as T[][]);
  }

  private initializeMetrics(response: QuestionResponse): ResponseMetrics {
    const baseMetrics = {
      questionId: response.questionId,
      totalResponses: 1,
      averageTimeToAnswer: response.metadata.timeToAnswer,
      lastUpdated: serverTimestamp()
    };

    // Add type-specific metrics
    switch (response.value.type) {
      case QuestionType.MC:
        return {
          ...baseMetrics,
          optionDistribution: {
            [response.value.selectedOption]: 1
          }
        };

      case QuestionType.XY:
        return {
          ...baseMetrics,
          quadrantDistribution: {
            [this.getQuadrant(response.value.position)]: 1
          }
        };

      default:
        return baseMetrics;
    }
  }

  private calculateMetricsUpdate(response: QuestionResponse) {
    const baseUpdate = {
      totalResponses: increment(1),
      lastUpdated: serverTimestamp()
    };

    // Add type-specific updates
    switch (response.value.type) {
      case QuestionType.MC:
        return {
          ...baseUpdate,
          [`optionDistribution.${response.value.selectedOption}`]: increment(1)
        };

      case QuestionType.XY:
        return {
          ...baseUpdate,
          [`quadrantDistribution.${this.getQuadrant(response.value.position)}`]: increment(1)
        };

      default:
        return baseUpdate;
    }
  }

  private async updateMetrics(response: QuestionResponse) {
    const metricsRef = collection(this.firestore, this.METRICS_COLLECTION);
    
    await runTransaction(this.firestore, async transaction => {
      // Update metrics based on response context
      if (response.context === QuestionContext.QUIZ) {
        // Update quiz-specific metrics
      } else if (response.context === QuestionContext.ONBOARDING) {
        // Update onboarding metrics
      }
    });
  }

  private async initializeMetrics(
    ref: DocumentReference,
    questionId: string
  ): Promise<void> {
    const metrics: ResponseMetrics = {
      questionId,
      totalResponses: 0,
      averageTimeToAnswer: 0,
      distribution: {},
      lastUpdated: Timestamp.now()
    };
    await setDoc(ref, metrics);
  }

  private async updateMultipleChoiceMetrics(
    ref: DocumentReference,
    value: Extract<ResponseValue, { type: 'MULTIPLE_CHOICE' }>
  ): Promise<void> {
    await updateDoc(ref, {
      [`distribution.${value.selectedOption}`]: increment(1),
      totalResponses: increment(1),
      lastUpdated: serverTimestamp()
    });
  }

  private async updateXYMetrics(
    ref: DocumentReference,
    value: Extract<ResponseValue, { type: 'XY' }>
  ): Promise<void> {
    const { coordinates, interactions } = value;
    const updates: Record<string, any> = {
      totalResponses: increment(1),
      lastUpdated: serverTimestamp()
    };

    // Update quadrant distribution
    const quadrant = this.getQuadrant(coordinates);
    updates[`distribution.quadrant:${quadrant}`] = increment(1);

    // Update grid distribution (3x3 grid)
    const gridCell = this.getGridCell(coordinates, 3);
    updates[`distribution.grid:${gridCell.x},${gridCell.y}`] = increment(1);

    // Update interaction patterns
    if (interactions.length > 0) {
      const patterns = this.analyzeInteractionPatterns(interactions);
      Object.entries(patterns).forEach(([key, value]) => {
        updates[`interactionPatterns.${key}`] = increment(value);
      });
    }

    await updateDoc(ref, updates);
  }

  private getQuadrant(coordinates: { x: number; y: number }): string {
    const { x, y } = coordinates;
    if (x < 0.5) {
      return y < 0.5 ? 'bottom-left' : 'top-left';
    } else {
      return y < 0.5 ? 'bottom-right' : 'top-right';
    }
  }

  private getGridCell(coordinates: { x: number; y: number }, gridSize: number): GridCell {
    return {
      x: Math.floor(coordinates.x * gridSize),
      y: Math.floor((1 - coordinates.y) * gridSize) // Invert Y for traditional grid coordinates
    };
  }

  private analyzeInteractionPatterns(
    interactions: XYResponseValue['interactions']
  ): Record<string, number> {
    const patterns = {
      horizontalMoves: 0,
      verticalMoves: 0,
      diagonalMoves: 0,
      clicks: 0
    };

    for (let i = 1; i < interactions.length; i++) {
      const prev = interactions[i - 1];
      const curr = interactions[i];

      if (curr.type === 'click') {
        patterns.clicks++;
        continue;
      }

      const dx = Math.abs(curr.position.x - prev.position.x);
      const dy = Math.abs(curr.position.y - prev.position.y);

      if (dx > 0.1 && dy > 0.1) {
        patterns.diagonalMoves++;
      } else if (dx > 0.1) {
        patterns.horizontalMoves++;
      } else if (dy > 0.1) {
        patterns.verticalMoves++;
      }
    }

    return patterns;
  }

  async getResponse(userId: string, questionId: string): Promise<QuestionResponse | null> {
    const responseDoc = await getDoc(doc(this.responsesRef, `${userId}_${questionId}`));
    if (!responseDoc.exists()) {
      return null;
    }
    return this.mapResponse(responseDoc);
  }

  private mapResponse(responseDoc: any): QuestionResponse | null {
    // Implement the mapping logic based on the structure of your response document
    // This is a placeholder and should be replaced with the actual implementation
    return responseDoc.data() as QuestionResponse;
  }

  async getResponsesByContext(userId: string, context: QuestionContext): Promise<QuestionResponse[]> {
    const q = query(
      collection(this.firestore, this.COLLECTION_NAME),
      where('userId', '==', userId),
      where('context', '==', context)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as QuestionResponse));
  }

  async getResponseMetrics(questionId: string): Promise<ResponseMetrics> {
    const metricsDoc = await getDoc(doc(this.firestore, this.METRICS_COLLECTION, questionId));
    return metricsDoc.data() as ResponseMetrics;
  }
} 