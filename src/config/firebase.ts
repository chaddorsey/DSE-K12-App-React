import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'fake-api-key',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'demo-local',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'demo-local.firebaseapp.com',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'demo-local.appspot.com',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
} 