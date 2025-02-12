import { PhotoUploadService } from '../PhotoUploadService';
import { storage, auth } from '@/config/firebase';
import { connectStorageEmulator, ref, getDownloadURL } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';

describe('PhotoUploadService Integration', () => {
  let service: PhotoUploadService;
  let userId: string;

  beforeAll(async () => {
    // Connect to Firebase emulators
    if (process.env.NODE_ENV === 'test') {
      connectStorageEmulator(storage, 'localhost', 9199);
    }

    // Sign in anonymously to get a test user
    const userCredential = await signInAnonymously(auth);
    userId = userCredential.user.uid;
  });

  beforeEach(() => {
    service = new PhotoUploadService();
  });

  afterEach(async () => {
    // Clean up uploaded files
    try {
      const fileRef = ref(storage, `users/${userId}/profile.jpg`);
      await deleteObject(fileRef);
    } catch (error) {
      // Ignore errors if file doesn't exist
    }
  });

  it('should upload file and return download URL', async () => {
    // Create a test image file
    const imageData = new Uint8Array([
      0xFF, 0xD8, 0xFF, 0xE0, // JPEG SOI marker
      0x00, 0x10, // Length
      0x4A, 0x46, 0x49, 0x46, 0x00, // JFIF identifier
      0x01, 0x01, // Version
      0x00, // Units
      0x00, 0x01, // X density
      0x00, 0x01, // Y density
      0x00, 0x00  // Thumbnail
    ]);
    const file = new File([imageData], 'test.jpg', { type: 'image/jpeg' });

    // Upload the file
    const downloadURL = await service.uploadPhoto(file, userId);

    // Verify the upload
    expect(downloadURL).toMatch(/^https:\/\//);
    
    // Verify we can download the file
    const fileRef = ref(storage, `users/${userId}/profile.jpg`);
    const url = await getDownloadURL(fileRef);
    expect(url).toBe(downloadURL);
  });

  it('should handle concurrent uploads', async () => {
    const file1 = new File(['test1'], 'test1.jpg', { type: 'image/jpeg' });
    const file2 = new File(['test2'], 'test2.jpg', { type: 'image/jpeg' });

    // Upload two files concurrently
    const [url1, url2] = await Promise.all([
      service.uploadPhoto(file1, userId),
      service.uploadPhoto(file2, userId)
    ]);

    expect(url1).toBeDefined();
    expect(url2).toBeDefined();
    expect(url1).not.toBe(url2);
  });

  it('should handle large files', async () => {
    // Create a 4MB file (just under limit)
    const largeData = new Uint8Array(4 * 1024 * 1024);
    const largeFile = new File([largeData], 'large.jpg', { type: 'image/jpeg' });

    const downloadURL = await service.uploadPhoto(largeFile, userId);
    expect(downloadURL).toBeDefined();
  });

  it('should fail with unauthorized user', async () => {
    // Sign out to test unauthorized access
    await auth.signOut();

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    await expect(service.uploadPhoto(file, 'unauthorized-user'))
      .rejects.toThrow('Unauthorized to upload');
  });

  it('should handle network errors', async () => {
    // Disconnect from emulator temporarily
    const originalFetch = global.fetch;
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    await expect(service.uploadPhoto(file, userId))
      .rejects.toThrow('Network error');

    global.fetch = originalFetch;
  });

  it('should maintain file type during upload', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const downloadURL = await service.uploadPhoto(file, userId);

    // Verify the content type
    const response = await fetch(downloadURL);
    expect(response.headers.get('content-type')).toBe('image/png');
  });
}); 