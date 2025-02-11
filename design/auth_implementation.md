# Authentication Implementation Plan

## Phase 1: Local Firebase Setup (1-2 days)

1. Initial Setup
```bash
npm install firebase @firebase/auth @firebase/firestore
npm install -g firebase-tools
firebase login
firebase init
firebase init emulators
```

2. Environment Configuration
```typescript:dset-app/src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'fake-api-key',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'demo-local',
  // ... other config
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

3. Update AuthContext
```typescript:dset-app/src/features/auth/AuthContext.tsx
import { User } from 'firebase/auth';
import { auth } from '../../config/firebase';

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ... implementation
};
```

## Phase 2: User Profile Management (2-3 days)

1. Profile Service
```typescript:dset-app/src/services/profileService.ts
import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface UserProfile {
  userId: string;
  displayName: string;
  department?: string;
  interests: string[];
  onboardingCompleted: boolean;
}

export const profileService = {
  async createProfile(userId: string, data: Partial<UserProfile>) {
    await setDoc(doc(db, 'profiles', userId), {
      userId,
      ...data,
      createdAt: new Date(),
      onboardingCompleted: false
    });
  },

  async getProfile(userId: string) {
    const snap = await getDoc(doc(db, 'profiles', userId));
    return snap.data() as UserProfile;
  }
};
```

2. Profile Hook
```typescript:dset-app/src/hooks/useProfile.ts
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import type { UserProfile } from '../services/profileService';

export function useProfile(userId: string | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    return onSnapshot(doc(db, 'profiles', userId), (doc) => {
      setProfile(doc.data() as UserProfile);
      setLoading(false);
    });
  }, [userId]);

  return { profile, loading };
}
```

## Phase 3: Testing Infrastructure (1-2 days)

1. Test Utils
```typescript:dset-app/src/test-utils/firebase.ts
import { auth, db } from '../config/firebase';

export async function cleanupFirestore() {
  const collections = ['users', 'profiles', 'connections'];
  for (const collection of collections) {
    const snapshot = await db.collection(collection).get();
    snapshot.docs.forEach(doc => doc.ref.delete());
  }
}

export async function createTestUser() {
  const email = `test-${Date.now()}@example.com`;
  const { user } = await auth.createUserWithEmailAndPassword(
    email,
    'password123'
  );
  return user;
}
```

2. Test Setup
```typescript:dset-app/src/setupTests.ts
import { cleanupFirestore } from './test-utils/firebase';

beforeEach(async () => {
  await cleanupFirestore();
});
```

## Development Workflow

1. Start local development:
```bash
# Terminal 1: Start Firebase emulators
firebase emulators:start

# Terminal 2: Start React app
npm start
```

2. Running tests:
```bash
# Run tests with emulator
firebase emulators:exec 'npm test'
```

## Next Steps
1. Set up Firebase project and emulators
2. Implement AuthContext with Firebase
3. Create basic sign-in/sign-up flows
4. Add profile management
5. Update existing components to use auth state 