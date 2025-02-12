require('dotenv').config();
export {};

import * as admin from 'firebase-admin';
import { getEmulatorConfig } from './utils/get-emulator-config';

// Initialize admin SDK
const app = admin.initializeApp({
  projectId: 'dse-k12-connections',
  storageBucket: 'dse-k12-connections.appspot.com'
});

const emulators = getEmulatorConfig();

// Set up emulator environment variables with dynamic ports
process.env.FIRESTORE_EMULATOR_HOST = `localhost:${emulators.firestore?.port || 8080}`;
process.env.FIREBASE_AUTH_EMULATOR_HOST = `localhost:${emulators.auth?.port || 9099}`;
process.env.FIREBASE_STORAGE_EMULATOR_HOST = `localhost:${emulators.storage?.port || 9199}`;

async function updateUserPhoto(email: string, imageName: string): Promise<void> {
  try {
    // Get user by email
    const userRecord = await app.auth().getUserByEmail(email);
    
    // Create emulator-compatible photo URL with dynamic port
    const storagePort = emulators.storage?.port || 9199;
    const photoURL = `http://localhost:${storagePort}/v0/b/dse-k12-connections.appspot.com/o/users%2F${userRecord.uid}%2Fprofile_${imageName}?alt=media`;

    // Update user profile
    await app.auth().updateUser(userRecord.uid, {
      photoURL
    });

    // Also update in Firestore
    await app.firestore().collection('users').doc(userRecord.uid).update({
      photoURL
    });

    console.log(`✓ Updated photo URL for ${email} to ${photoURL}`);
  } catch (error) {
    console.error(`✗ Failed to update photo for ${email}:`, error);
  }
}

// Usage example:
const email = process.argv[2];
const imageName = process.argv[3];

if (!email || !imageName) {
  console.error('Usage: npm run update:photo:dev user@email.com image-name.jpg');
  process.exit(1);
}

updateUserPhoto(email, imageName); 