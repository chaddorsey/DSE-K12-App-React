import { User, updateProfile as firebaseUpdateProfile } from 'firebase/auth';

export const firebaseUpdateProfile = async (
  user: User,
  updates: {
    displayName?: string | null;
    photoURL?: string | null;
  }
) => {
  try {
    await firebaseUpdateProfile(user, updates);
  } catch (error) {
    console.error('Error updating Firebase profile:', error);
    throw error;
  }
}; 