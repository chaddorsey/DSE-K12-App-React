/**
 * Script to check bundle size against limits in CI
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { bundleLimits } from '../config/bundle-limits';

function checkBundleSize(): void {
  // Build with stats
  execSync('webpack --json > stats.json', { stdio: 'inherit' });
  
  const stats = JSON.parse(fs.readFileSync('stats.json', 'utf8'));
  const assets = stats.assets as Array<{ name: string; size: number }>;

  // Group assets by chunk
  const sizes: { [key: string]: number } = {};
  let totalSize = 0;

  assets.forEach(asset => {
    const [chunk] = asset.name.split('.');
    sizes[chunk] = (sizes[chunk] || 0) + asset.size;
    totalSize += asset.size;
  });

  // Check against limits
  let failed = false;

  Object.entries(sizes).forEach(([chunk, size]) => {
    const limit = bundleLimits.chunks[chunk];
    if (limit && size > limit) {
      console.error(
        `❌ ${chunk} bundle size ${(size / 1024).toFixed(2)}KB ` +
        `exceeds limit ${(limit / 1024).toFixed(2)}KB`
      );
      failed = true;
    }
  });

  if (totalSize > bundleLimits.total) {
    console.error(
      `❌ Total bundle size ${(totalSize / 1024).toFixed(2)}KB ` +
      `exceeds limit ${(bundleLimits.total / 1024).toFixed(2)}KB`
    );
    failed = true;
  }

  fs.unlinkSync('stats.json');

  if (failed) {
    process.exit(1);
  }

  console.log('✅ Bundle size check passed');
}

checkBundleSize(); 