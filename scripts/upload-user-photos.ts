require('dotenv').config();
export {};

// Import admin SDK instead of client SDK
import * as admin from 'firebase-admin';
import { parse } from 'csv-parse';
import * as fs from 'fs/promises';
import * as path from 'path';
import { getEmulatorConfig } from './utils/get-emulator-config';

// ANSI colors for logging
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  blue: '\x1b[34m'
};

interface UserData {
  email: string;
  displayName: string;
  role: string;
  organization: string;
  image: string;
}

async function uploadUserPhotos(): Promise<void> {
  try {
    // Initialize admin SDK with unique name
    const app = admin.initializeApp({
      projectId: 'dse-k12-connections',
      storageBucket: 'dse-k12-connections.appspot.com'
    }, 'upload-photos');

    const emulators = getEmulatorConfig();

    // Set up emulator environment variables with dynamic ports
    process.env.FIRESTORE_EMULATOR_HOST = `localhost:${emulators.firestore?.port || 8080}`;
    process.env.FIREBASE_AUTH_EMULATOR_HOST = `localhost:${emulators.auth?.port || 9099}`;
    process.env.FIREBASE_STORAGE_EMULATOR_HOST = `localhost:${emulators.storage?.port || 9199}`;

    const auth = app.auth();
    const storage = app.storage();
    const bucket = storage.bucket();

    // Read and parse CSV
    const csvContent = await fs.readFile(path.join(process.cwd(), 'public/data/simpsons_users.csv'), 'utf-8');
    const records: UserData[] = await new Promise((resolve, reject) => {
      parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
      }, (err: Error | undefined, records: UserData[]) => {
        if (err) reject(err);
        else resolve(records);
      });
    });

    console.log(`${colors.blue}Found ${records.length} users to process${colors.reset}`);

    // Process each user
    for (const record of records) {
      try {
        const userRecord = await auth.getUserByEmail(record.email);
        console.log(`${colors.blue}• Processing: ${record.email}${colors.reset}`);

        // Read and upload photo file
        const photoPath = path.join(process.cwd(), 'public/assets/avatars', record.image);
        const file = await fs.readFile(photoPath);
        
        const fileName = `users/${userRecord.uid}/profile_${record.image}`;
        const fileRef = bucket.file(fileName);
        
        await fileRef.save(file, {
          metadata: { contentType: 'image/jpeg' }
        });

        // Create emulator-compatible photo URL with dynamic port
        const storagePort = emulators.storage?.port || 9199;
        const photoURL = `http://localhost:${storagePort}/v0/b/dse-k12-connections.appspot.com/o/users%2F${userRecord.uid}%2Fprofile_${record.image}?alt=media`;

        // Update user profile
        await auth.updateUser(userRecord.uid, {
          photoURL
        });

        console.log(`${colors.green}✓ Uploaded photo for: ${record.email}${colors.reset}`);

      } catch (error) {
        console.error(`${colors.red}✗ Failed to process user ${record.email}:${colors.reset}`, error);
      }
    }

    console.log(`${colors.green}\nPhoto upload complete!${colors.reset}`);
    process.exit(0);
  } catch (error) {
    console.error(`${colors.red}Photo upload failed:${colors.reset}`, error);
    process.exit(1);
  }
}

// Run the script
uploadUserPhotos(); 