import * as admin from 'firebase-admin';

// For emulators, initialize with minimal config
const app = admin.initializeApp({
  projectId: 'dse-k12-connections',
  storageBucket: 'dse-k12-connections.appspot.com'
});

// Set up emulator environment variables before initializing services
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';
process.env.GOOGLE_CLOUD_PROJECT = 'dse-k12-connections';

// Initialize services
export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage();

// Log emulator mode
if (process.env.NODE_ENV === 'development') {
  console.log('Running in emulator mode with hosts:', {
    auth: process.env.FIREBASE_AUTH_EMULATOR_HOST,
    firestore: process.env.FIRESTORE_EMULATOR_HOST,
    storage: process.env.FIREBASE_STORAGE_EMULATOR_HOST,
    project: process.env.GOOGLE_CLOUD_PROJECT
  });
} 