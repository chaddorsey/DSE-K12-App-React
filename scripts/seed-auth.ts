import { initializeApp } from 'firebase/app';
import { FirebaseError } from 'firebase/app';
import { 
  getAuth, 
  connectAuthEmulator, 
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, doc, setDoc } from 'firebase/firestore';
import { fetchWithRetry } from '../src/utils/fetch';

const app = initializeApp({
  apiKey: "test-api-key",
  authDomain: "localhost",
  projectId: "demo-project"
});

const auth = getAuth(app);
const db = getFirestore(app);

const waitForEmulators = async () => {
  try {
    await fetchWithRetry('http://localhost:9098/', { maxRetries: 5, delayMs: 1000 });
    console.log('Auth emulator is ready');
    
    await fetchWithRetry('http://localhost:8081/', { maxRetries: 5, delayMs: 1000 });
    console.log('Firestore emulator is ready');
  } catch (error) {
    console.error('Failed to connect to emulators:', error);
    process.exit(1);
  }
};

connectAuthEmulator(auth, "http://localhost:9098", { disableWarnings: true });
connectFirestoreEmulator(db, 'localhost', 8081);

const testUsers = [
  {
    email: 'test@example.com',
    password: 'password123',
    displayName: 'Test User',
    role: 'student'
  },
  {
    email: 'teacher@example.com',
    password: 'password123',
    displayName: 'Test Teacher',
    role: 'teacher'
  }
];

async function seedUsers() {
  await waitForEmulators();
  console.log('Starting user seeding...');
  
  for (const user of testUsers) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        emailVerified: true,
        createdAt: new Date(),
        lastLoginAt: new Date()
      });

      console.log(`Created user: ${user.email}`);
    } catch (error: unknown) {
      if (
        error instanceof FirebaseError && 
        'code' in error && 
        error.code === 'auth/email-already-in-use'
      ) {
        console.log(`User ${user.email} already exists, skipping...`);
        continue;
      }
      console.error(`Error creating user ${user.email}:`, error);
    }
  }
}

seedUsers().then(() => {
  console.log('Seeding complete');
  process.exit(0);
}).catch(error => {
  console.error('Seeding failed:', error);
  process.exit(1);
});

export {}; // This makes the file a module 