const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const stagingServiceAccount = require('../service-account.json');
const prodServiceAccount = require('../service-account-prod.json');

async function checkAuth(env: 'staging' | 'prod') {
  try {
    const projectId = env === 'prod' ? 'dseconnections' : 'dse-k12-connections';
    
    // Initialize admin app with correct service account
    const app = initializeApp({
      credential: cert(env === 'prod' ? prodServiceAccount : stagingServiceAccount),
    }, env);

    const auth = getAuth(app);

    // Try to list users (limit to 1 just to test access)
    const { users, pageSize } = await auth.listUsers(1);
    console.log(`[${env.toUpperCase()}] Auth configured - can list users`);
    console.log(`[${env.toUpperCase()}] First user email:`, users[0]?.email || 'No users yet');
    console.log(`[${env.toUpperCase()}] User count:`, pageSize);

    // Check if auth is working by trying to get a non-existent user
    try {
      await auth.getUserByEmail('test@nonexistent.com');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log(`[${env.toUpperCase()}] Auth queries working correctly`);
      } else {
        throw error;
      }
    }

  } catch (error) {
    console.error(`[${env.toUpperCase()}] Error checking auth:`, error);
  }
}

// Check both environments
Promise.all([
  checkAuth('staging'),
  checkAuth('prod')
]); 