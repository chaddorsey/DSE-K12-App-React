import { User, updateProfile } from 'firebase/auth';

export async function firebaseUpdateProfile(
  user: User,
  updates: {
    displayName?: string | null;
    photoURL?: string | null;
  }
): Promise<void> {
  try {
    await updateProfile(user, updates);
  } catch (error) {
    console.error('Error updating Firebase profile:', error);
    throw error;
  }
} 