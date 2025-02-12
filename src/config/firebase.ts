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
  apiKey: "test-api-key",
  authDomain: "localhost",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-ABCDEF123"
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
export const storage = getStorage(app);
export const analytics = process.env.NODE_ENV === 'production' ? 
  isSupported().then(() => getAnalytics(app)) : 
  Promise.resolve(null);

if (process.env.NODE_ENV === 'development') {
  console.log('Connecting to Firebase emulators...');
  connectAuthEmulator(auth, 'http://localhost:5005');
  connectFirestoreEmulator(db, 'localhost', 5006);
  connectStorageEmulator(storage, 'localhost', 5008);
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
    console.error('Firestore connection failed:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
      rules: 'Make sure firestore.rules is deployed to emulator'
    });
    if (process.env.NODE_ENV === 'development') {
      console.log('Make sure Firebase emulators are running: npm run emulators');
    }
    return false;
  }
}; 