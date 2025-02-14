import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';
import { storage } from '@/config/firebase';
import { FirebaseError } from 'firebase/app';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export class PhotoUploadService {
  private storage: FirebaseStorage;

  constructor() {
    const storage = getStorage();
    if (!storage) {
      throw new Error('Firebase Storage not initialized');
    }
    this.storage = storage;
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

  async uploadPhoto(userId: string, file: File): Promise<string> {
    if (!userId || !file) {
      throw new Error('Missing required parameters');
    }

    try {
      console.log('Starting photo upload:', {
        userId,
        fileType: file.type,
        fileSize: file.size,
        fileName: file.name
      });

      // Create storage reference
      const photoRef = ref(storage, `profile-photos/${userId}`);
      
      // Upload the file
      const snapshot = await uploadBytes(photoRef, file);
      console.log('Photo uploaded successfully');
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Photo download URL:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Upload error details:', {
        error,
        code: error instanceof FirebaseError ? error.code : undefined,
        message: error instanceof FirebaseError ? error.message : 'Unknown error'
      });

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'storage/unauthorized':
            throw new Error('Not authorized to upload photos');
          case 'storage/quota-exceeded':
            throw new Error('Storage quota exceeded');
          default:
            throw new Error(`Upload failed: ${error.message}`);
        }
      }
      throw new Error('Failed to upload photo');
    }
  }

  async removePhoto(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      const photoRef = ref(storage, `profile-photos/${userId}`);
      await deleteObject(photoRef);
      console.log('Photo removed successfully');
    } catch (error) {
      console.error('Error removing photo:', error);
      if (error instanceof FirebaseError && error.code === 'storage/unauthorized') {
        throw new Error('Not authorized to remove this photo');
      }
      throw new Error('Failed to remove photo');
    }
  }
} 