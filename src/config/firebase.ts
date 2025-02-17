import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getAuth, connectAuthEmulator, signInAnonymously } from 'firebase/auth';
import { 
  getFirestore, 
  connectFirestoreEmulator, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { 
  getStorage, 
  connectStorageEmulator, 
  FirebaseStorage 
} from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import '@firebase/storage';
import { logger } from '../utils/logger';

// Add debug logging
const debug = (message: string, ...args: any[]) => {
  console.log(`[Firebase Config] ${message}`, ...args);
};

// Set up global storage emulator host
declare global {
  interface Window {
    FIREBASE_STORAGE_EMULATOR_HOST?: string;
  }
}

// Check if we're in emulator mode
const isEmulator = process.env.REACT_APP_USE_EMULATORS === 'true';
const isDevelopment = process.env.NODE_ENV === 'development';

// Initialize Firebase with explicit storage config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

debug('Config values:', firebaseConfig);
debug('Environment:', { 
  isEmulator, 
  isDevelopment, 
  nodeEnv: process.env.NODE_ENV,
  storageBucket: firebaseConfig.storageBucket
});

// Check production config
console.log('Firebase Config:', {
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
});

// Initialize app
const app = initializeApp(firebaseConfig);
debug('Firebase app initialized');

// Initialize base services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = async () => {
  if (process.env.NODE_ENV === 'production' && await isSupported()) {
    try {
      return getAnalytics(app);
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
      return null;
    }
  }
  return null;
};

// Initialize storage
let storage: FirebaseStorage | null = null;
try {
  debug('Initializing Firebase Storage...');
  if (typeof window !== 'undefined') {  // Only initialize in browser
    storage = getStorage(app);
    debug('Firebase Storage initialized successfully');
  }
} catch (error) {
  console.error('❌ Error initializing Firebase Storage:', error);
  debug('Firebase Storage initialization failed', error);
}

// Connect emulators
if (isEmulator) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  if (storage) {
    connectStorageEmulator(storage, '127.0.0.1', 9199);
    debug('Storage emulator connected');
  }
}

if (process.env.NODE_ENV === 'development') {
  logger.info('Connecting to Firebase Auth emulator...');
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  logger.info('Connected to Firebase Auth emulator');
  connectFirestoreEmulator(db, 'localhost', 8080);
  if (storage) {
    connectStorageEmulator(storage, 'localhost', 9199);
    logger.info('Connected to Firebase Storage emulator');
  }
}

export { storage };

// Test connection functions
export const testFirebaseConnection = async () => {
  if (process.env.NODE_ENV === 'development') {
    debug('Development mode - skipping Firebase connection test');
    return true;
  }
  
  try {
    // Just verify the app is initialized
    if (auth && db && storage) {
      debug('Firebase services initialized successfully');
      return true;
    }
    throw new Error('One or more Firebase services failed to initialize');
  } catch (error) {
    console.error('Firebase initialization check failed:', error);
    debug('Connection test failed', error);
    return false;
  }
};

export const testFirestoreConnection = async () => {
  try {
    const testDoc = doc(db, '_test_/connection');
    await setDoc(testDoc, { timestamp: new Date() });
    await deleteDoc(testDoc);
    return true;
  } catch (error) {
    console.error('Firestore connection test failed:', error);
    return false;
  }
};

// Export a function to check if storage is available
export const isStorageAvailable = () => {
  if (!storage) {
    debug('Storage is null or undefined');
    return false;
  }
  try {
    const isAvailable = typeof storage.app !== 'undefined';
    debug('Storage availability check:', isAvailable);
    return isAvailable;
  } catch (error) {
    debug('Storage availability check failed', error);
    return false;
  }
};