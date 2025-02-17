import * as admin from 'firebase-admin';

export default async function globalSetup() {
  admin.initializeApp();
} 