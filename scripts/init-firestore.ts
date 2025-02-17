const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const stagingServiceAccount = require('../service-account.json');
const prodServiceAccount = require('../service-account-prod.json');

async function initFirestore(env: 'staging' | 'prod') {
  try {
    const projectId = env === 'prod' ? 'dseconnections' : 'dse-k12-connections';
    
    // Initialize admin app
    const app = initializeApp({
      credential: cert(env === 'prod' ? prodServiceAccount : stagingServiceAccount),
    }, env);

    const db = getFirestore(app);

    // Initialize required collections with a placeholder document
    const collections = ['users', 'profiles', 'questions', 'responses'];
    
    for (const collectionName of collections) {
      const doc = db.collection(collectionName).doc('_placeholder_');
      await doc.set({
        _created: new Date(),
        _note: 'Collection initialization placeholder'
      });
      console.log(`[${env.toUpperCase()}] Created ${collectionName} collection`);
    }

  } catch (error) {
    console.error(`[${env.toUpperCase()}] Error initializing Firestore:`, error);
  }
}

// Initialize both environments
Promise.all([
  initFirestore('staging'),
  initFirestore('prod')
]); 