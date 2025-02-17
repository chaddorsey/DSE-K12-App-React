import * as admin from 'firebase-admin';

export default async function globalTeardown() {
  await admin.app().delete();
} 