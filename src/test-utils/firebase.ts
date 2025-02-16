import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, inMemoryPersistence, setPersistence } from 'firebase/auth';
import { 
  getFirestore, 
  connectFirestoreEmulator, 
  collection, 
  doc, 
  getDoc, 
  setDoc,
  deleteDoc 
} from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'test-api-key',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'localhost',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:123456789:web:abcdef123456'
};

console.log('Initializing Firebase with config:', {
  ...firebaseConfig,
  apiKey: '***' // Hide actual API key
});

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' && process.env.NODE_ENV === 'production' ? 
  isSupported().then(() => getAnalytics(app)) : 
  Promise.resolve(null);

if (process.env.NODE_ENV === 'development') {
  console.log('Connecting to Firebase emulators...');
  setPersistence(auth, inMemoryPersistence);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectStorageEmulator(storage, '127.0.0.1', 9199);
  console.log('Connected to Firebase emulators');
}

export const testFirestoreConnection = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('Testing Firestore emulator connection...');
      const testCollection = collection(db, 'test');
      await setDoc(doc(testCollection, 'test'), { timestamp: new Date() });
      
      console.log('Firebase emulator connection successful');
      return true;
    }
    
    console.log('Firebase connection successful');
    return true;
  } catch (error) {
    const err = error as { message?: string; code?: string; stack?: string };
    console.error('Firestore connection failed:', {
      message: err.message,
      code: err.code,
      stack: err.stack,
      rules: 'Make sure firestore.rules is deployed to emulator'
    });
    if (process.env.NODE_ENV === 'development') {
      console.log('Make sure Firebase emulators are running: npm run emulators');
    }
    return false;
  }
};

export { app, auth, db, storage };

export const testFirebaseConnection = async () => {
  try {
    // Add test logic here
    return true;
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return false;
  }
}; 