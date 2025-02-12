import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, doc, setDoc } from 'firebase/firestore';

const app = initializeApp({
  apiKey: "test-api-key",
  authDomain: "localhost",
  projectId: "demo-project"
});

const auth = getAuth(app);
const db = getFirestore(app);

connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, 'localhost', 8080);

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
  for (const user of testUsers) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      
      // Add user data to Firestore
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
    } catch (error) {
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