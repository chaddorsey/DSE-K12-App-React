import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';

// Initialize Firebase Admin
initializeApp();

const ADMIN_EMAILS = [
  'your.admin@email.com',
  // Add other admin emails
];

const MANAGER_EMAILS = [
  'manager1@email.com',
  // Add other manager emails
];

async function setupAdminUsers() {
  try {
    const auth = getAuth();
    const db = getFirestore();

    // Set up admins
    for (const email of ADMIN_EMAILS) {
      const userRecord = await auth.getUserByEmail(email);
      await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' });
      await db.doc(`users/${userRecord.uid}`).update({ role: 'admin' });
      console.log(`Set admin role for ${email}`);
    }

    // Set up managers
    for (const email of MANAGER_EMAILS) {
      const userRecord = await auth.getUserByEmail(email);
      await auth.setCustomUserClaims(userRecord.uid, { role: 'manager' });
      await db.doc(`users/${userRecord.uid}`).update({ role: 'manager' });
      console.log(`Set manager role for ${email}`);
    }

  } catch (error) {
    console.error('Error setting up admin users:', error);
  }
}

// Add this to package.json scripts:
// "setup:admin": "ts-node scripts/setup-admin-users.ts" 