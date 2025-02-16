import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, isStorageAvailable } from '../../../config/firebase';
import { FirebaseError } from 'firebase/app';
import { firebaseUpdateProfile } from '@/utils/firebaseUpdateProfile';
import { auth, db } from '@/config/firebase';
import { ProfileService } from '@/features/profile/services/ProfileService';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const debug = (message: string, ...args: any[]) => {
  console.log(`[PhotoUploadService] ${message}`, ...args);
};

export class PhotoUploadService {
  constructor() {
    debug('Initializing PhotoUploadService');
    debug('Storage available:', isStorageAvailable());
    debug('Storage object:', storage);
    
    if (!isStorageAvailable()) {
      console.warn('Firebase Storage is not available - some features may be limited');
    }
  }

  validateFile(file: File | null | undefined): void {
    if (!file) {
      throw new Error('No file provided');
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Invalid file type');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File too large');
    }
  }

  async uploadPhoto(file: File, userId: string): Promise<string> {
    debug('Attempting to upload photo');
    if (!isStorageAvailable()) {
      debug('Storage not available for upload');
      throw new Error('Storage not available');
    }

    try {
      const storageRef = ref(storage!, `users/${userId}/profile_${Date.now()}`);
      debug('Created storage reference:', storageRef);
      
      const snapshot = await uploadBytes(storageRef, file);
      debug('Upload successful:', snapshot);
      
      const downloadUrl = await getDownloadURL(snapshot.ref);
      debug('Got download URL:', downloadUrl);
      
      return downloadUrl;
    } catch (error) {
      debug('Upload failed:', error);
      throw error;
    }
  }

  async removePhoto(userId: string): Promise<void> {
    if (!isStorageAvailable()) {
      throw new Error('Storage not available');
    }

    try {
      const photoRef = ref(storage, `users/${userId}/profile`);
      await deleteObject(photoRef);
    } catch (error) {
      console.error('Error removing photo:', error);
      throw error;
    }
  }
}

export const photoUploadService = new PhotoUploadService(); 