const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const stagingServiceAccount = require('../service-account.json');
const prodServiceAccount = require('../service-account-prod.json');

async function checkStorage(env: 'staging' | 'prod') {
  try {
    const projectId = env === 'prod' ? 'dseconnections' : 'dse-k12-connections';
    const bucketName = env === 'prod' ? 
      'dseconnections.firebasestorage.app' : 
      'dse-k12-connections.firebasestorage.app';

    // Initialize admin app with correct service account
    const app = initializeApp({
      credential: cert(env === 'prod' ? prodServiceAccount : stagingServiceAccount),
      storageBucket: bucketName
    }, env);

    // Get storage
    const storage = getStorage(app);
    const bucket = storage.bucket();

    // Check if bucket exists
    const [exists] = await bucket.exists();
    console.log(`[${env.toUpperCase()}] Bucket exists:`, exists);
    console.log(`[${env.toUpperCase()}] Bucket name:`, bucket.name);

  } catch (error) {
    console.error(`[${env.toUpperCase()}] Error checking storage:`, error);
  }
}

// Check both environments
Promise.all([
  checkStorage('staging'),
  checkStorage('prod')
]); 