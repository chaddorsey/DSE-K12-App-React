// Import admin before anything else
import * as admin from 'firebase-admin';
import * as path from 'path';

// Set emulator env vars before any Firebase calls
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';
process.env.GCLOUD_PROJECT = 'dse-k12-connections';

// Initialize Firebase Admin first
admin.initializeApp({
  projectId: 'dse-k12-connections',
  credential: admin.credential.cert(
    path.resolve(__dirname, '../../dse-k12-connections-firebase-adminsdk-PRIVATE.json')
  ),
  databaseURL: `http://localhost:8080?ns=dse-k12-connections`
});

// Then import the services
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

async function initTestData() {
  try {
    // Only use emulators if explicitly set
    if (process.env.USE_EMULATOR) {
      process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
      process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
    }

    const auth = getAuth();
    const db = getFirestore();

    // Create test users with different roles
    const users = [
      { email: 'admin@test.com', role: 'admin' },
      { email: 'manager@test.com', role: 'manager' },
      { email: 'user@test.com', role: 'user' }
    ];

    for (const user of users) {
      const userRecord = await auth.createUser({
        email: user.email,
        password: 'testpass123'
      });

      await Promise.all([
        auth.setCustomUserClaims(userRecord.uid, { role: user.role }),
        db.doc(`users/${userRecord.uid}`).set({
          email: user.email,
          role: user.role
        })
      ]);

      console.log(`Created ${user.role} user: ${user.email}`);
    }

  } catch (error) {
    console.error('Error initializing test data:', error);
    process.exit(1);
  }
}

// Make sure emulators are running first
initTestData(); 