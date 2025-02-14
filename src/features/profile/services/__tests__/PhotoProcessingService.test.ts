import { PhotoProcessingService, PhotoProcessingError, ProcessingProgress } from '../PhotoProcessingService';

describe('PhotoProcessingService', () => {
  let service: PhotoProcessingService;
  let mockImage: HTMLImageElement;
  let mockCanvas: HTMLCanvasElement;
  let mockContext: CanvasRenderingContext2D;
  let progressEvents: ProcessingProgress[];

  beforeEach(() => {
    service = new PhotoProcessingService();
    progressEvents = [];

    // Mock canvas and context
    mockContext = {
      drawImage: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    mockCanvas = {
      getContext: jest.fn().mockReturnValue(mockContext),
      toBlob: jest.fn().mockImplementation((callback) => callback(new Blob())),
      width: 0,
      height: 0,
    } as unknown as HTMLCanvasElement;

    // Mock Image
    mockImage = {
      width: 1000,
      height: 800,
      onload: null,
      onerror: null,
    } as unknown as HTMLImageElement;

    // Mock DOM methods
    global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');
    global.URL.revokeObjectURL = jest.fn();
    document.createElement = jest.fn().mockReturnValue(mockCanvas);

    // Mock Image constructor
    global.Image = jest.fn().mockImplementation(() => {
      const img = mockImage;
      setTimeout(() => img.onload?.(), 0); // Simulate async image load
      return img;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('processPhoto', () => {
    const createTestFile = (type = 'image/jpeg') => 
      new File(['test'], 'test.jpg', { type });

    const defaultOptions = {
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.8,
      format: 'jpeg' as const,
      onProgress: (progress: ProcessingProgress) => {
        progressEvents.push(progress);
      }
    };

    it('should process valid image file', async () => {
      const file = createTestFile();
      const result = await service.processPhoto(file, defaultOptions);

      expect(result).toEqual({
        original: expect.any(File),
        thumbnail: expect.any(Blob),
        optimized: expect.any(Blob),
        metadata: {
          dimensions: { width: 1000, height: 800 },
          size: expect.any(Number),
          format: 'jpeg'
        }
      });
    });

    it('should report progress correctly', async () => {
      const file = createTestFile();
      await service.processPhoto(file, defaultOptions);

      expect(progressEvents).toEqual([
        { stage: 'thumbnail', progress: 0, currentTask: 'Starting thumbnail generation' },
        { stage: 'thumbnail', progress: 100, currentTask: 'Thumbnail complete' },
        { stage: 'optimize', progress: 0, currentTask: 'Starting optimization' },
        { stage: 'optimize', progress: 100, currentTask: 'Optimization complete' },
        { stage: 'complete', progress: 100 }
      ]);
    });

    it('should reject invalid file types', async () => {
      const file = createTestFile('text/plain');
      
      await expect(service.processPhoto(file, defaultOptions))
        .rejects
        .toThrow(PhotoProcessingError);
    });

    it('should clean up resources on error', async () => {
      const file = createTestFile();
      mockCanvas.toBlob = jest.fn().mockImplementation(() => {
        throw new Error('Canvas error');
      });

      await expect(service.processPhoto(file, defaultOptions))
        .rejects
        .toThrow(PhotoProcessingError);

      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  describe('generateThumbnail', () => {
    it('should generate thumbnail with correct dimensions', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      mockImage.width = 1000;
      mockImage.height = 500;

      await service.generateThumbnail(file, 150);

      expect(mockCanvas.width).toBe(150);
      expect(mockCanvas.height).toBe(75);
      expect(mockContext.drawImage).toHaveBeenCalled();
    });

    it('should maintain aspect ratio for portrait images', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      mockImage.width = 500;
      mockImage.height = 1000;

      await service.generateThumbnail(file, 150);

      expect(mockCanvas.width).toBe(75);
      expect(mockCanvas.height).toBe(150);
    });

    it('should handle canvas context unavailable', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      mockCanvas.getContext = jest.fn().mockReturnValue(null);

      await expect(service.generateThumbnail(file, 150))
        .rejects
        .toThrow(PhotoProcessingError);
    });
  });

  describe('optimizePhoto', () => {
    const defaultOptions = {
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.8,
      format: 'jpeg' as const
    };

    it('should optimize image within size constraints', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      mockImage.width = 2000;
      mockImage.height = 1500;

      await service.optimizePhoto(file, defaultOptions);

      expect(mockCanvas.width).toBe(800);
      expect(mockCanvas.height).toBe(600);
    });

    it('should not upscale small images', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      mockImage.width = 400;
      mockImage.height = 300;

      await service.optimizePhoto(file, defaultOptions);

      expect(mockCanvas.width).toBe(400);
      expect(mockCanvas.height).toBe(300);
    });

    it('should use correct format and quality', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const spy = jest.spyOn(mockCanvas, 'toBlob');

      await service.optimizePhoto(file, {
        ...defaultOptions,
        format: 'webp',
        quality: 0.9
      });

      expect(spy).toHaveBeenCalledWith(
        expect.any(Function),
        'image/webp',
        0.9
      );
    });
  });

  describe('error handling', () => {
    it('should include stage information in errors', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      mockImage.onload = null;
      mockImage.onerror?.({} as ErrorEvent);

      try {
        await service.processPhoto(file, {
          maxWidth: 800,
          maxHeight: 600,
          quality: 0.8,
          format: 'jpeg'
        });
        fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeInstanceOf(PhotoProcessingError);
        expect((error as PhotoProcessingError).stage).toBe('load');
      }
    });
  });
}); 