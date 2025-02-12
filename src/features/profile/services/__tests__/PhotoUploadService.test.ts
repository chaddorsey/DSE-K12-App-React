import { PhotoUploadService } from '../PhotoUploadService';
import { storage } from '@/config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { StorageError } from 'firebase/storage';

jest.mock('@/config/firebase', () => ({
  storage: {
    ref: jest.fn()
  }
}));

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn()
}));

describe('PhotoUploadService', () => {
  let service: PhotoUploadService;
  const mockUserId = 'test-user-123';
  const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
  
  beforeEach(() => {
    service = new PhotoUploadService();
    jest.clearAllMocks();
  });

  describe('validateFile', () => {
    it('should accept valid image files', () => {
      const validFiles = [
        new File([''], 'photo.jpg', { type: 'image/jpeg' }),
        new File([''], 'photo.png', { type: 'image/png' }),
        new File([''], 'photo.webp', { type: 'image/webp' })
      ];
      
      validFiles.forEach(file => {
        expect(() => service.validateFile(file)).not.toThrow();
      });
    });

    it('should reject non-image files', () => {
      const invalidFiles = [
        new File([''], 'document.pdf', { type: 'application/pdf' }),
        new File([''], 'script.js', { type: 'text/javascript' }),
        new File([''], 'style.css', { type: 'text/css' })
      ];
      
      invalidFiles.forEach(file => {
        expect(() => service.validateFile(file)).toThrow('Invalid file type');
      });
    });

    it('should reject files over size limit', () => {
      const largeFile = new File(['x'.repeat(5 * 1024 * 1024 + 1)], 'large.jpg', { type: 'image/jpeg' });
      expect(() => service.validateFile(largeFile)).toThrow('File too large');
    });

    it('should reject files with no type', () => {
      const fileWithNoType = new File([''], 'mystery-file', { type: '' });
      expect(() => service.validateFile(fileWithNoType)).toThrow('Invalid file type');
    });

    it('should handle null or undefined files', () => {
      expect(() => service.validateFile(null as unknown as File)).toThrow('No file provided');
      expect(() => service.validateFile(undefined as unknown as File)).toThrow('No file provided');
    });
  });

  describe('uploadPhoto', () => {
    const validFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const mockDownloadURL = 'https://example.com/photo.jpg';

    beforeEach(() => {
      (ref as jest.Mock).mockReturnValue('storage-ref');
      (uploadBytes as jest.Mock).mockResolvedValue({ ref: 'uploaded-ref' });
      (getDownloadURL as jest.Mock).mockResolvedValue(mockDownloadURL);
    });

    it('should upload file to correct storage location', async () => {
      const result = await service.uploadPhoto(validFile, mockUserId);
      
      expect(ref).toHaveBeenCalledWith(storage, `users/${mockUserId}/profile.jpg`);
      expect(uploadBytes).toHaveBeenCalledWith('storage-ref', validFile);
      expect(result).toBe(mockDownloadURL);
    });

    it('should throw error on upload failure', async () => {
      const uploadError = new Error('Upload failed');
      (uploadBytes as jest.Mock).mockRejectedValue(uploadError);

      await expect(service.uploadPhoto(validFile, mockUserId)).rejects.toThrow('Upload failed');
    });

    it('should handle storage errors with specific codes', async () => {
      const storageError = new Error('Storage quota exceeded') as StorageError;
      storageError.code = 'storage/quota-exceeded';
      (uploadBytes as jest.Mock).mockRejectedValue(storageError);

      await expect(service.uploadPhoto(validFile, mockUserId))
        .rejects.toThrow('Storage quota exceeded');
    });

    it('should handle invalid user ID', async () => {
      await expect(service.uploadPhoto(validFile, '')).rejects.toThrow('Invalid user ID');
      await expect(service.uploadPhoto(validFile, ' ')).rejects.toThrow('Invalid user ID');
    });

    it('should handle getDownloadURL failure', async () => {
      (uploadBytes as jest.Mock).mockResolvedValue({ ref: 'uploaded-ref' });
      (getDownloadURL as jest.Mock).mockRejectedValue(new Error('Failed to get download URL'));

      await expect(service.uploadPhoto(validFile, mockUserId))
        .rejects.toThrow('Failed to get download URL');
    });

    it('uploads photo with correct path format', async () => {
      const mockStorageRef = { fullPath: `users/${mockUserId}/profile_test.jpg` };
      const mockDownloadURL = 'https://example.com/photo.jpg';

      (ref as jest.Mock).mockReturnValue(mockStorageRef);
      (uploadBytes as jest.Mock).mockResolvedValue({ ref: mockStorageRef });
      (getDownloadURL as jest.Mock).mockResolvedValue(mockDownloadURL);

      const result = await service.uploadPhoto(mockFile, mockUserId);

      expect(ref).toHaveBeenCalledWith(
        storage,
        `users/${mockUserId}/profile_test.jpg`
      );
      expect(uploadBytes).toHaveBeenCalledWith(mockStorageRef, mockFile);
      expect(result).toBe(mockDownloadURL);
    });
  });
}); 