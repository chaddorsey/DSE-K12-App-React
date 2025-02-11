import { auth, db } from '../config/firebase';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function cleanupFirestore() {
  const collections = ['users', 'profiles', 'connections'];
  for (const collectionName of collections) {
    const snapshot = await getDocs(collection(db, collectionName));
    await Promise.all(snapshot.docs.map(doc => deleteDoc(doc.ref)));
  }
}

export async function createTestUser() {
  const email = `test-${Date.now()}@example.com`;
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email,
    'password123'
  );
  return user;
} 