# Firebase Implementation Design

## Overview
Implementation plan for transitioning from local development to Firebase-backed production system, maintaining development velocity while ensuring a robust deployment path.

## Architecture Components

### 1. Firebase Services Required
- Authentication (Email/Password, Google OAuth)
- Firestore (NoSQL Database)
- Cloud Functions (API endpoints)
- Hosting (Web deployment)
- Storage (User avatars, assets)
- Emulators (Local development)

### 2. Data Model

```typescript
// Users Collection
interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Timestamp;
  lastLogin: Timestamp;
}

// Profiles Collection
interface Profile {
  userId: string;
  interests: string[];
  department?: string;
  role?: string;
  onboardingCompleted: boolean;
  questionResponses: {
    [questionId: string]: {
      value: string | number | string[];
      timestamp: Timestamp;
    }
  }
}

// Connections Collection
interface Connection {
  userId: string;
  recognizedUserId: string;
  level: 'FACE' | 'NAME' | 'TALKED' | 'KNOW_WELL';
  timestamp: Timestamp;
  lastUpdated: Timestamp;
  context?: string;
}

// Questions Collection
interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  category: string;
  requiredForOnboarding: boolean;
}
```

## Implementation Phases

### Phase 1: Local Development Setup
1. Install Firebase tools and emulators
```bash
npm install -g firebase-tools
firebase init
firebase init emulators
```

2. Create Firebase configuration wrapper:
```typescript
// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // ... other config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export { app, auth, db };
```

### Phase 2: Authentication Integration
1. Update AuthContext to use Firebase:
```typescript
// src/features/auth/AuthContext.tsx
import { auth } from '../../services/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  // ... rest of provider
};
```

### Phase 3: Data Layer Implementation
1. Create Firestore service hooks:
```typescript
// src/hooks/useFirestore.ts
import { db } from '../services/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export function useConnections(userId: string) {
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'connections'),
      where('userId', '==', userId)
    );

    return onSnapshot(q, (snapshot) => {
      setConnections(
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    });
  }, [userId]);

  return connections;
}
```

### Phase 4: Migration Path
1. Create data migration scripts:
```typescript
// scripts/migrate-to-firebase.ts
import { db } from '../src/services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { mockUsers } from '../src/mocks/data';

async function migrateUsers() {
  const usersRef = collection(db, 'users');
  for (const user of mockUsers) {
    await addDoc(usersRef, {
      ...user,
      createdAt: new Date(),
      lastLogin: new Date()
    });
  }
}
```

## Development Workflow
1. Local Development:
   ```bash
   # Start emulators
   firebase emulators:start
   
   # Start React app
   npm start
   ```

2. Testing:
   ```bash
   # Run tests with emulator
   firebase emulators:exec 'npm test'
   ```

3. Deployment:
   ```bash
   # Build and deploy
   npm run build
   firebase deploy
   ```

## Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    match /connections/{connectionId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Next Steps
1. Set up Firebase project and emulators
2. Update AuthContext to use Firebase auth
3. Create Firestore data layer
4. Write migration scripts
5. Implement security rules
6. Test with emulators
7. Deploy to staging environment 