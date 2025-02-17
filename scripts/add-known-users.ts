const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const stagingServiceAccount = require('../service-account.json');
const prodServiceAccount = require('../service-account-prod.json');

async function addKnownUsers(env: 'staging' | 'prod') {
  try {
    const projectId = env === 'prod' ? 'dseconnections' : 'dse-k12-connections';
    
    // Initialize admin app
    const app = initializeApp({
      credential: cert(env === 'prod' ? prodServiceAccount : stagingServiceAccount),
    }, env);

    const db = getFirestore(app);

    // Add test known users
    const knownUsers = [
      {
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'user',
        organization: 'Test Org'
      }
      // Add more test users as needed
    ];
    
    for (const userData of knownUsers) {
      await db.collection('known_users').doc(userData.email).set({
        ...userData,
        createdAt: new Date().toISOString()
      });
      console.log(`[${env.toUpperCase()}] Added known user:`, userData.email);
    }

  } catch (error) {
    console.error(`[${env.toUpperCase()}] Error adding known users:`, error);
  }
}

// Add to both environments
Promise.all([
  addKnownUsers('staging'),
  addKnownUsers('prod')
]); 