// At the top of the file
require('dotenv').config();

// Make it a module first
export {};

// Set environment
process.env.NODE_ENV = 'development';

// Import admin methods only
import * as admin from 'firebase-admin';
import { parse } from 'csv-parse';
import * as fs from 'fs/promises';
import * as path from 'path';
import { getEmulatorConfig } from './utils/get-emulator-config';

// ANSI color codes
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

type CsvParseCallback = (error: Error | undefined, records: UserData[]) => void;

// Initialize admin SDK with unique name
const app = admin.initializeApp({
  projectId: 'dse-k12-connections',
  storageBucket: 'dse-k12-connections.appspot.com'
}, 'populate-users');

const emulators = getEmulatorConfig();

// Set up emulator environment variables with dynamic ports
process.env.FIRESTORE_EMULATOR_HOST = `localhost:${emulators.firestore?.port || 8080}`;
process.env.FIREBASE_AUTH_EMULATOR_HOST = `localhost:${emulators.auth?.port || 9099}`;
process.env.FIREBASE_STORAGE_EMULATOR_HOST = `localhost:${emulators.storage?.port || 9199}`;

// Initialize services
const auth = app.auth();
const db = app.firestore();

// Log initialization
console.log('Firebase initialized with emulators:', {
  firestore: process.env.FIRESTORE_EMULATOR_HOST,
  auth: process.env.FIREBASE_AUTH_EMULATOR_HOST,
  storage: process.env.FIREBASE_STORAGE_EMULATOR_HOST,
  environment: process.env.NODE_ENV
});

async function populateUsers(): Promise<void> {
  try {
    // Read and parse CSV
    const csvContent = await fs.readFile(path.join(process.cwd(), 'public/data/simpsons_users.csv'), 'utf-8');
    const records: UserData[] = await new Promise((resolve, reject) => {
      parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
      }, ((err: Error | undefined, records: UserData[]) => {
        if (err) reject(err);
        else resolve(records);
      }) as CsvParseCallback);
    });

    console.log(`${colors.blue}Found ${records.length} users to process${colors.reset}`);

    for (const record of records) {
      try {
        // Try to get existing user first
        let userRecord;
        try {
          userRecord = await auth.getUserByEmail(record.email);
          console.log(`${colors.blue}• User exists: ${record.email}${colors.reset}`);
        } catch (error) {
          // Create new user if doesn't exist
          userRecord = await auth.createUser({
            email: record.email,
            password: 'temporary-password',
            displayName: record.displayName
          });
          console.log(`${colors.green}✓ Created user: ${record.email}${colors.reset}`);
        }

        // Use a placeholder photo URL
        const photoURL = '/assets/avatars/default-avatar.jpg';

        // Create Firestore document
        await db.collection('users').doc(userRecord.uid).set({
          email: record.email,
          displayName: record.displayName,
          role: record.role,
          organization: record.organization,
          photoURL,
          createdAt: new Date(),
          lastLoginAt: new Date(),
          needsPhotoUpload: true  // Flag to prompt for photo upload
        });

      } catch (error) {
        console.error(`${colors.red}✗ Failed to process user ${record.email}:${colors.reset}`, error);
      }
    }

    console.log(`${colors.green}\nPopulation complete!${colors.reset}`);
    process.exit(0);
  } catch (error) {
    console.error(`${colors.red}Population failed:${colors.reset}`, error);
    process.exit(1);
  }
}

// Run the script
populateUsers(); 