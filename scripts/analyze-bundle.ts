/**
 * Script to analyze bundle size and track changes
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface IBundleStats {
  timestamp: string;
  totalSize: number;
  chunks: {
    name: string;
    size: number;
  }[];
}

const STATS_FILE = path.join(__dirname, '../bundle-stats.json');

function getStats(): IBundleStats[] {
  try {
    return JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveStats(stats: IBundleStats[]): void {
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
}

function analyzeBuild(): void {
  // Build with stats
  execSync('webpack --json > stats.json', { stdio: 'inherit' });
  
  const stats = JSON.parse(fs.readFileSync('stats.json', 'utf8'));
  const bundleStats: IBundleStats = {
    timestamp: new Date().toISOString(),
    totalSize: stats.assets.reduce((sum: number, asset: any) => sum + asset.size, 0),
    chunks: stats.chunks.map((chunk: any) => ({
      name: chunk.names[0] || 'unnamed',
      size: chunk.size
    }))
  };

  // Save historical stats
  const history = getStats();
  history.push(bundleStats);
  saveStats(history);

  // Report changes
  if (history.length > 1) {
    const previous = history[history.length - 2];
    const sizeDiff = bundleStats.totalSize - previous.totalSize;
    console.log(`Bundle size change: ${sizeDiff > 0 ? '+' : ''}${sizeDiff} bytes`);
  }

  fs.unlinkSync('stats.json');
}

analyzeBuild(); 