import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRole } from '../types/auth';

const validRoles: UserRole[] = ['user', 'manager', 'admin'];

export const setUserRole = functions.https.onCall(async (data, context) => {
  // Type check the input
  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can set roles'
    );
  }

  const { uid, role } = data;
  
  // Validate input
  if (!uid || !validRoles.includes(role as UserRole)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Invalid user ID or role'
    );
  }

  try {
    // Update custom claims
    await admin.auth().setCustomUserClaims(uid, { role });
    
    // Update user document
    await admin.firestore().doc(`users/${uid}`).update({ role });

    return { success: true };
  } catch (error) {
    console.error('Error setting user role:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Error setting user role'
    );
  }
}); 