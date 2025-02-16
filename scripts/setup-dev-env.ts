const dotenv = require('dotenv');
const path = require('path');
const { db } = require('./firebase-admin-config');

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, '../.env.development')
});

console.log('Running Firebase Admin with emulators:', {
  firestore: 'localhost:8080',
  auth: 'localhost:9099',
  storage: 'localhost:9199'
});

async function setupDevEnvironment() {
  const userCount = Number(process.env.REACT_APP_DUMMY_USER_COUNT) || 50;
  
  try {
    console.log('Starting development environment setup...');
    
    // Create test users collection
    const batch = db.batch();
    const usersCollection = db.collection('users');
    
    console.log(`Creating ${userCount} test users...`);
    
    for (let i = 0; i < userCount; i++) {
      const userRef = usersCollection.doc(`test-user-${i}`);
      batch.set(userRef, {
        email: `test-user-${i}@example.com`,
        displayName: `Test User ${i}`,
        role: i === 0 ? 'admin' : 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    await batch.commit();
    console.log('✅ Successfully created test users');
    
  } catch (error) {
    console.error('❌ Error setting up development environment:', error);
    process.exit(1);
  }
}

// Only run setup if in development
if (process.env.NODE_ENV === 'development') {
  setupDevEnvironment().catch(console.error);
} else {
  console.log('Skipping dev setup in non-development environment');
} 