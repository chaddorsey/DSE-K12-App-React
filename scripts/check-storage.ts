const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('../service-account.json');

async function checkStorage() {
  try {
    // Initialize admin app
    const app = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: "dse-k12-connections.firebasestorage.app"
    });

    // Get storage
    const storage = getStorage(app);
    const bucket = storage.bucket();

    // Check if bucket exists
    const [exists] = await bucket.exists();
    console.log('Bucket exists:', exists);
    console.log('Bucket name:', bucket.name);

  } catch (error) {
    console.error('Error checking storage:', error);
  }
}

checkStorage(); 