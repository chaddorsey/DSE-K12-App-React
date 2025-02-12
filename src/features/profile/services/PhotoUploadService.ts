import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';

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

  async uploadPhoto(file: File, userId: string): Promise<string> {
    try {
      console.log('Starting photo upload:', {
        userId,
        fileType: file.type,
        fileSize: file.size,
        storagePath: `users/${userId}/profile_${file.name}`
      });

      if (!userId?.trim()) {
        throw new Error('Invalid user ID');
      }

      this.validateFile(file);
      
      const fileName = `profile_${file.name}`;
      const storageRef = ref(this.storage, `users/${userId}/${fileName}`);
      
      console.log('Uploading to:', storageRef.fullPath);
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Upload successful:', snapshot);
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Download URL:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Upload error details:', {
        error,
        code: error instanceof Error ? (error as any).code : undefined,
        message: error instanceof Error ? error.message : String(error)
      });
      
      if (error instanceof Error && 'code' in error) {
        switch ((error as any).code) {
          case 'storage/unauthorized':
            throw new Error('Not authorized to upload photos');
          case 'storage/quota-exceeded':
            throw new Error('Storage quota exceeded');
          default:
            throw error;
        }
      }
      throw error;
    }
  }
} 