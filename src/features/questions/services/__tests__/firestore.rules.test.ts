import {
  assertSucceeds,
  assertFails,
  initializeTestEnvironment,
  RulesTestEnvironment
} from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Firestore Security Rules', () => {
  let testEnv: RulesTestEnvironment;
  const userId = 'user123';
  const otherUserId = 'user456';

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'demo-test',
      firestore: {
        rules: readFileSync(
          resolve(__dirname, '../../../../../firestore.rules'),
          'utf8'
        )
      }
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

  describe('Response Rules', () => {
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

    it('prevents users from reading others responses', async () => {
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

  describe('Guess Rules', () => {
    it('allows users to submit guesses for questions they have answered', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();
      await setDoc(doc(db, 'responses/r1'), {
        userId,
        questionId: 'q1'
      });

      await assertSucceeds(
        setDoc(doc(db, 'guesses/g1'), {
          userId,
          questionId: 'q1'
        })
      );
    });

    it('prevents guessing for unanswered questions', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();
      await assertFails(
        setDoc(doc(db, 'guesses/g2'), {
          userId,
          questionId: 'q2' // No response exists for q2
        })
      );
    });
  });
}); 