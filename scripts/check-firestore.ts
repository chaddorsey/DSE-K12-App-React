const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, CollectionReference } = require('firebase-admin/firestore');

const stagingServiceAccount = require('../service-account.json');
const prodServiceAccount = require('../service-account-prod.json');

interface FirestoreCollection {
  id: string;
}

async function checkFirestore(env: 'staging' | 'prod') {
  try {
    const projectId = env === 'prod' ? 'dseconnections' : 'dse-k12-connections';
    
    // Initialize admin app with correct service account
    const app = initializeApp({
      credential: cert(env === 'prod' ? prodServiceAccount : stagingServiceAccount),
    }, env);

    const db = getFirestore(app);

    // Test write access to a test collection
    const testDoc = db.collection('_test_').doc('connection-test');
    await testDoc.set({ timestamp: new Date() });
    await testDoc.delete();
    console.log(`[${env.toUpperCase()}] Firestore write test: success`);

    // Check collections
    const collections = await db.listCollections() as FirestoreCollection[];
    console.log(`[${env.toUpperCase()}] Collections:`, 
      collections.map((col: FirestoreCollection) => col.id).join(', ') || 'No collections yet');

    // Check required collections exist
    const requiredCollections = ['users', 'profiles', 'questions', 'responses'];
    const missingCollections = requiredCollections.filter(
      required => !collections.find(col => col.id === required)
    );
    
    if (missingCollections.length > 0) {
      console.log(`[${env.toUpperCase()}] Missing collections:`, missingCollections.join(', '));
    } else {
      console.log(`[${env.toUpperCase()}] All required collections exist`);
    }

  } catch (error) {
    console.error(`[${env.toUpperCase()}] Error checking Firestore:`, error);
  }
}

// Check both environments
Promise.all([
  checkFirestore('staging'),
  checkFirestore('prod')
]); 