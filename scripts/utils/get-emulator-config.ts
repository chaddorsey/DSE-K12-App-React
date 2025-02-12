import * as fs from 'fs';
import * as path from 'path';

interface EmulatorConfig {
  auth?: { port: number };
  firestore?: { port: number };
  storage?: { port: number };
  ui?: { port: number };
}

export function getEmulatorConfig(): EmulatorConfig {
  try {
    const firebaseConfig = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'firebase.json'), 'utf8')
    );
    return firebaseConfig.emulators || {};
  } catch (error) {
    console.warn('Failed to read firebase.json, using default ports:', error);
    return {
      auth: { port: 9099 },
      firestore: { port: 8080 },
      storage: { port: 9199 }
    };
  }
} 