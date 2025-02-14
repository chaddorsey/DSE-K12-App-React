export interface ProcessingProgress {
  stage: 'thumbnail' | 'optimize' | 'complete';
  progress: number; // 0-100
  currentTask?: string;
}

export interface PhotoProcessingOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'jpeg' | 'webp';
  onProgress?: (progress: ProcessingProgress) => void;
}

export interface ProcessedPhoto {
  original: Blob;
  thumbnail: Blob;
  optimized: Blob;
  metadata: {
    dimensions: { width: number; height: number };
    size: number;
    format: string;
  };
}

export class PhotoProcessingError extends Error {
  constructor(
    message: string,
    public readonly stage: 'load' | 'thumbnail' | 'optimize',
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'PhotoProcessingError';
  }
}

export class PhotoProcessingService {
  async processPhoto(file: File, options: PhotoProcessingOptions): Promise<ProcessedPhoto> {
    const { onProgress } = options;
    
    try {
      if (!file.type.startsWith('image/')) {
        throw new PhotoProcessingError('Invalid file type', 'load');
      }

      onProgress?.({ stage: 'thumbnail', progress: 0, currentTask: 'Starting thumbnail generation' });
      const thumbnail = await this.generateThumbnail(file, 150);
      onProgress?.({ stage: 'thumbnail', progress: 100, currentTask: 'Thumbnail complete' });

      onProgress?.({ stage: 'optimize', progress: 0, currentTask: 'Starting optimization' });
      const optimized = await this.optimizePhoto(file, options);
      onProgress?.({ stage: 'optimize', progress: 100, currentTask: 'Optimization complete' });

      const dimensions = await this.getImageDimensions(file);

      onProgress?.({ stage: 'complete', progress: 100 });

      return {
        original: file,
        thumbnail,
        optimized,
        metadata: {
          dimensions,
          size: file.size,
          format: options.format
        }
      };
    } catch (error) {
      if (error instanceof PhotoProcessingError) {
        throw error;
      }
      throw new PhotoProcessingError(
        'Failed to process photo',
        'load',
        error
      );
    }
  }

  async generateThumbnail(file: File, size: number): Promise<Blob> {
    let objectUrl: string | undefined;
    
    try {
      const img = await this.createImage(file);
      objectUrl = img.src;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new PhotoProcessingError('Canvas context not available', 'thumbnail');
      }

      const aspectRatio = img.width / img.height;
      
      if (aspectRatio > 1) {
        canvas.width = size;
        canvas.height = size / aspectRatio;
      } else {
        canvas.height = size;
        canvas.width = size * aspectRatio;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new PhotoProcessingError('Failed to create thumbnail', 'thumbnail'));
              return;
            }
            resolve(blob);
          },
          'image/jpeg',
          0.8
        );
      });
    } catch (error) {
      throw new PhotoProcessingError(
        'Failed to generate thumbnail',
        'thumbnail',
        error
      );
    } finally {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    }
  }

  async optimizePhoto(file: File, options: PhotoProcessingOptions): Promise<Blob> {
    let objectUrl: string | undefined;
    
    try {
      const img = await this.createImage(file);
      objectUrl = img.src;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new PhotoProcessingError('Canvas context not available', 'optimize');
      }

      const { width, height } = this.calculateDimensions(
        img.width,
        img.height,
        options.maxWidth,
        options.maxHeight
      );

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new PhotoProcessingError('Failed to optimize photo', 'optimize'));
              return;
            }
            resolve(blob);
          },
          `image/${options.format}`,
          options.quality
        );
      });
    } catch (error) {
      throw new PhotoProcessingError(
        'Failed to optimize photo',
        'optimize',
        error
      );
    } finally {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    }
  }

  private async getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    const img = await this.createImage(file);
    return {
      width: img.width,
      height: img.height
    };
  }

  private createImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      const cleanup = () => {
        URL.revokeObjectURL(objectUrl);
      };

      img.onload = () => {
        resolve(img);
      };

      img.onerror = () => {
        cleanup();
        reject(new PhotoProcessingError('Failed to load image', 'load'));
      };

      img.src = objectUrl;
    });
  }

  private calculateDimensions(
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    const aspectRatio = width / height;

    if (width <= maxWidth && height <= maxHeight) {
      return { width, height };
    }

    if (width / maxWidth > height / maxHeight) {
      return {
        width: maxWidth,
        height: Math.round(maxWidth / aspectRatio)
      };
    } else {
      return {
        width: Math.round(maxHeight * aspectRatio),
        height: maxHeight
      };
    }
  }
} 