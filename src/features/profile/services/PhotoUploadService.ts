import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, isStorageAvailable } from '../../../config/firebase';
import { FirebaseError } from 'firebase/app';
import { firebaseUpdateProfile } from '@/utils/firebaseUpdateProfile';
import { auth, db } from '@/config/firebase';
import { ProfileService } from '@/features/profile/services/ProfileService';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const debug = (message: string, ...args: any[]) => {
  console.log(`[PhotoUploadService] ${message}`, ...args);
};

export class PhotoUploadService {
  private storage: FirebaseStorage | null = null;
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
    this.initializeStorage();
  }

  private initializeStorage() {
    debug('Initializing PhotoUploadService');
    this.storage = getStorage();
    debug('Storage available:', this.isStorageAvailable());
    debug('Storage object:', this.storage);
  }

  private isStorageAvailable(): boolean {
    return isStorageAvailable();
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

  async uploadPhoto(file: File): Promise<string> {
    debug('Attempting to upload photo');
    
    if (!this.storage || !this.isStorageAvailable()) {
      throw new Error('Storage not available');
    }

    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const filename = `profile_${timestamp}`;
    
    // Create reference to user's profile photo
    const storageRef = ref(this.storage, `users/${this.userId}/${filename}`);
    debug('Created storage reference:', storageRef);

    try {
      // Upload the file
      const uploadResult = await uploadBytes(storageRef, file);
      debug('Upload successful:', uploadResult);

      // Get the download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);
      debug('Got download URL:', downloadURL);

      return downloadURL;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  }

  async removePhoto(photoURL: string): Promise<void> {
    if (!this.storage || !this.isStorageAvailable()) {
      throw new Error('Storage not available');
    }

    try {
      // Extract just the filename from the full URL
      const decodedUrl = decodeURIComponent(photoURL);
      const matches = decodedUrl.match(/\/([^/?]+)\?/);
      const filename = matches ? matches[1] : '';
      
      if (!filename) {
        throw new Error('Invalid photo URL format');
      }

      // Create reference to the file using the correct path structure
      const photoRef = ref(this.storage, `users/${this.userId}/${filename}`);
      
      // Delete the file
      await deleteObject(photoRef);
      debug('Photo removed successfully');
    } catch (error) {
      debug('Error removing photo:', error);
      throw error;
    }
  }
} 