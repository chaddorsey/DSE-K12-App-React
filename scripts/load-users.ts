require('dotenv').config();
export {};

import { execSync } from 'child_process';

// ANSI colors for logging
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  blue: '\x1b[34m'
};

async function loadUsers(): Promise<void> {
  try {
    console.log(`${colors.blue}Starting full user load sequence...${colors.reset}\n`);

    // Step 1: Clear emulator data (optional)
    console.log(`${colors.blue}1. Clearing emulator data...${colors.reset}`);
    try {
      execSync('rm -rf ./emulator-data');
      console.log(`${colors.green}✓ Emulator data cleared${colors.reset}\n`);
    } catch (error) {
      console.log(`${colors.blue}• No emulator data to clear${colors.reset}\n`);
    }

    // Step 2: Create users
    console.log(`${colors.blue}2. Creating users...${colors.reset}`);
    execSync('npm run populate:users:dev', { stdio: 'inherit' });
    console.log(`${colors.green}✓ Users created${colors.reset}\n`);

    // Step 3: Upload photos
    console.log(`${colors.blue}3. Uploading photos...${colors.reset}`);
    execSync('npm run upload:photos:dev', { stdio: 'inherit' });
    console.log(`${colors.green}✓ Photos uploaded${colors.reset}\n`);

    // Step 4: Update photo URLs
    console.log(`${colors.blue}4. Updating photo URLs...${colors.reset}`);
    execSync('npm run update:photos:dev', { stdio: 'inherit' });
    console.log(`${colors.green}✓ Photo URLs updated${colors.reset}\n`);

    console.log(`${colors.green}✓ User load sequence complete!${colors.reset}`);
    process.exit(0);
  } catch (error) {
    console.error(`${colors.red}✗ User load sequence failed:${colors.reset}`, error);
    process.exit(1);
  }
}

// Run the sequence
loadUsers(); 