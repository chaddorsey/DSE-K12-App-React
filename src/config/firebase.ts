import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, signInAnonymously } from 'firebase/auth';
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

const firebaseConfig = process.env.NODE_ENV === 'development' ? {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000",
  measurementId: "G-0000000000"
} : {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

console.log('Initializing Firebase with config:', {
  ...firebaseConfig,
  apiKey: '***' // Hide actual API key
});

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = typeof window !== 'undefined' ? getStorage(app) : null;
export const analytics = typeof window !== 'undefined' && process.env.NODE_ENV === 'production' ? 
  isSupported().then(() => getAnalytics(app)) : 
  Promise.resolve(null);

if (process.env.NODE_ENV === 'development') {
  console.log('Connecting to Firebase emulators...');
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  if (storage) {
    connectStorageEmulator(storage, 'localhost', 9199);
  }
  console.log('Emulator connections established');
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