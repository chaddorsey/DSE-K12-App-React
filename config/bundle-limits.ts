/**
 * Configuration for bundle size limits
 */

export interface IBundleLimits {
  /** Maximum size for individual chunks in bytes */
  chunks: {
    [key: string]: number;
  };
  /** Maximum total bundle size in bytes */
  total: number;
}

export const bundleLimits: IBundleLimits = {
  chunks: {
    main: 200 * 1024, // 200KB
    react: 120 * 1024, // 120KB
    router: 50 * 1024, // 50KB
    vendor: 300 * 1024 // 300KB
  },
  total: 1024 * 1024 // 1MB
}; 