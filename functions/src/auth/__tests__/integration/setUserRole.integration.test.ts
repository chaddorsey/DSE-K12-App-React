import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions-test';
import { setUserRole } from '../../setUserRole';

const testEnv = functions();

describe('setUserRole Integration', () => {
  beforeAll(() => {
    // Initialize with emulator settings
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
    process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  });

  beforeEach(async () => {
    // Clear data between tests
    await admin.firestore().recursiveDelete(admin.firestore().collection('users'));
  });

  it('should set user role in both Auth and Firestore', async () => {
    // Create test user
    const userRecord = await admin.auth().createUser({
      email: 'test@example.com',
      password: 'password123'
    });

    // Create initial user document
    await admin.firestore()
      .doc(`users/${userRecord.uid}`)
      .set({ email: 'test@example.com' });

    // Test the function
    const wrapped = testEnv.wrap(setUserRole);
    await wrapped(
      { uid: userRecord.uid, role: 'manager' },
      { auth: { token: { admin: true } } }
    );

    // Verify Auth claims
    const updatedUser = await admin.auth().getUser(userRecord.uid);
    expect(updatedUser.customClaims).toEqual({ role: 'manager' });

    // Verify Firestore
    const userDoc = await admin.firestore().doc(`users/${userRecord.uid}`).get();
    expect(userDoc.data()?.role).toBe('manager');
  });
}); 