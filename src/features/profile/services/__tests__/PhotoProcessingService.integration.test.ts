import { PhotoProcessingService, ProcessingProgress } from '../PhotoProcessingService';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('PhotoProcessingService Integration', () => {
  let service: PhotoProcessingService;
  let progressEvents: ProcessingProgress[];

  beforeEach(() => {
    service = new PhotoProcessingService();
    progressEvents = [];
  });

  // Helper to load test images
  const loadTestImage = (filename: string): File => {
    const path = resolve(__dirname, '../__fixtures__', filename);
    const buffer = readFileSync(path);
    return new File([buffer], filename, { type: 'image/jpeg' });
  };

  describe('end-to-end photo processing', () => {
    it('should process actual JPEG image', async () => {
      const file = loadTestImage('test-photo.jpg');
      
      const result = await service.processPhoto(file, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8,
        format: 'jpeg',
        onProgress: (progress) => progressEvents.push(progress)
      });

      // Verify thumbnail dimensions
      const thumbnailImg = await createImageFromBlob(result.thumbnail);
      expect(thumbnailImg.width).toBeLessThanOrEqual(150);
      expect(thumbnailImg.height).toBeLessThanOrEqual(150);

      // Verify optimized dimensions
      const optimizedImg = await createImageFromBlob(result.optimized);
      expect(optimizedImg.width).toBeLessThanOrEqual(800);
      expect(optimizedImg.height).toBeLessThanOrEqual(600);

      // Verify file sizes
      expect(result.optimized.size).toBeLessThan(file.size);
      expect(result.thumbnail.size).toBeLessThan(result.optimized.size);
    });

    it('should handle WebP conversion', async () => {
      const file = loadTestImage('test-photo.jpg');
      
      const result = await service.processPhoto(file, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8,
        format: 'webp'
      });

      expect(result.optimized.type).toBe('image/webp');
      // WebP should typically be smaller than JPEG
      expect(result.optimized.size).toBeLessThan(file.size);
    });

    it('should maintain image quality within acceptable limits', async () => {
      const file = loadTestImage('test-photo.jpg');
      
      const result = await service.processPhoto(file, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8,
        format: 'jpeg'
      });

      // You might want to implement SSIM or PSNR comparison here
      // For now, we'll just check basic quality indicators
      expect(result.optimized.size / file.size).toBeGreaterThan(0.5); // Not too compressed
    });
  });

  // Helper to create Image from Blob
  const createImageFromBlob = (blob: Blob): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  };
}); 