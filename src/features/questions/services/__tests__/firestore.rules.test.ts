import {
  assertSucceeds,
  assertFails,
  initializeTestEnvironment,
  RulesTestEnvironment
} from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

describe('Firestore Security Rules', () => {
  let testEnv: RulesTestEnvironment;
  const userId = 'user123';
  const otherUserId = 'user456';

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'demo-test',
      firestore: { rules: readFileSync('firestore.rules', 'utf8') }
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  describe('Questions', () => {
    it('allows authenticated users to read questions', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();
      await assertSucceeds(getDoc(doc(db, 'questions/q1')));
    });

    it('allows users to create their own questions', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();
      await assertSucceeds(setDoc(doc(db, 'questions/q1'), {
        type: 'XY',
        prompt: 'Test',
        metadata: { author: userId }
      }));
    });

    it('prevents users from creating questions for others', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();
      await assertFails(setDoc(doc(db, 'questions/q1'), {
        metadata: { author: otherUserId }
      }));
    });
  });

  describe('Responses', () => {
    beforeEach(async () => {
      // Set up test data
      const adminDb = testEnv.unauthenticatedContext().firestore();
      await setDoc(doc(adminDb, 'responses/r1'), {
        userId,
        questionId: 'q1',
        value: { type: 'XY', coordinates: { x: 0.5, y: 0.5 } }
      });
    });

    it('allows users to read their own responses', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();
      await assertSucceeds(getDoc(doc(db, 'responses/r1')));
    });

    it('prevents users from reading others responses without connection', async () => {
      const db = testEnv.authenticatedContext(otherUserId).firestore();
      await assertFails(getDoc(doc(db, 'responses/r1')));
    });

    it('allows connected users to read responses', async () => {
      const adminDb = testEnv.unauthenticatedContext().firestore();
      await setDoc(doc(adminDb, 'connections/c1'), {
        users: [userId, otherUserId],
        status: 'accepted'
      });

      const db = testEnv.authenticatedContext(otherUserId).firestore();
      await assertSucceeds(getDoc(doc(db, 'responses/r1')));
    });
  });

  describe('Guesses', () => {
    beforeEach(async () => {
      const adminDb = testEnv.unauthenticatedContext().firestore();
      await setDoc(doc(adminDb, 'guesses/g1'), {
        userId,
        targetUserId: otherUserId,
        questionId: 'q1'
      });
      await setDoc(doc(adminDb, 'responses/r1'), {
        userId: otherUserId,
        questionId: 'q1'
      });
    });

    it('allows users to read their own guesses', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();
      await assertSucceeds(getDoc(doc(db, 'guesses/g1')));
    });

    it('allows target users to read guesses after responding', async () => {
      const db = testEnv.authenticatedContext(otherUserId).firestore();
      await assertSucceeds(getDoc(doc(db, 'guesses/g1')));
    });

    it('prevents target users from reading guesses before responding', async () => {
      const adminDb = testEnv.unauthenticatedContext().firestore();
      await setDoc(doc(adminDb, 'guesses/g2'), {
        userId,
        targetUserId: otherUserId,
        questionId: 'q2' // No response exists for q2
      });

      const db = testEnv.authenticatedContext(otherUserId).firestore();
      await assertFails(getDoc(doc(db, 'guesses/g2')));
    });
  });
}); 