import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.development' });

// Initialize admin SDK for emulator
admin.initializeApp({
  projectId: 'demo-local',
  credential: admin.credential.applicationDefault()
});

// Set up emulator environment variables
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';

// Export the database instance
export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();

// Log emulator mode in development
if (process.env.NODE_ENV === 'development') {
  console.log('Running Firebase Admin with emulators:', {
    firestore: process.env.FIRESTORE_EMULATOR_HOST,
    auth: process.env.FIREBASE_AUTH_EMULATOR_HOST,
    storage: process.env.FIREBASE_STORAGE_EMULATOR_HOST
  });
} 