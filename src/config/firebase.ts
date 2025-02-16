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
  FirebaseStorage,
  StorageService 
} from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

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
const isEmulator = process.env.NODE_ENV === 'development';

// Initialize Firebase app with storage module
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: isEmulator ? 'localhost' : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: isEmulator ? 'dse-k12-connections-dev.appspot.com' : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

debug('Config values:', firebaseConfig);
debug('Environment:', { isEmulator, nodeEnv: process.env.NODE_ENV });

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
debug('Firebase app initialized');

// Initialize base services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = process.env.NODE_ENV === 'production' ? getAnalytics(app) : null;

// Initialize storage with error handling
let storage: FirebaseStorage | null = null;
try {
  debug('Initializing Firebase Storage...');
  storage = getStorage();
  debug('Firebase Storage initialized successfully');
} catch (error) {
  console.error('❌ Error initializing Firebase Storage:', error);
  debug('Firebase Storage initialization failed', error);
}

// Connect to emulators in development
if (isEmulator) {
  try {
    debug('Connecting to emulators...');
    
    // Connect auth and firestore emulators
    connectAuthEmulator(auth, 'http://localhost:9099');
    debug('Auth emulator connected');
    
    connectFirestoreEmulator(db, 'localhost', 8080);
    debug('Firestore emulator connected');
    
    // Connect storage emulator if available
    if (storage) {
      try {
        debug('Connecting storage to emulator...');
        connectStorageEmulator(storage, 'localhost', 9199);
        debug('Storage emulator connected');
      } catch (error) {
        console.error('❌ Error connecting storage to emulator:', error);
        debug('Storage emulator connection failed', error);
        storage = null;
      }
    }
    
    console.log('✅ Connected to Firebase emulators');
  } catch (error) {
    console.error('❌ Error connecting to emulators:', error);
    debug('Emulator connection failed', error);
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
    await signInAnonymously(auth);
    debug('Anonymous auth successful');
    return true;
  } catch (error) {
    console.error('Firebase connection test failed:', error);
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