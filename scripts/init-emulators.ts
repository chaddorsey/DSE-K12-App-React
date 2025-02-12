const { mkdir, access } = require('fs/promises');
const { constants } = require('fs');

async function initEmulators() {
  try {
    // Check if emulator-data directory exists
    try {
      await access('./emulator-data', constants.F_OK);
      console.log('Emulator data directory already exists');
    } catch {
      // Create emulator-data directory if it doesn't exist
      await mkdir('./emulator-data');
      console.log('Created emulator-data directory');
    }
  } catch (error) {
    console.error('Error initializing emulators:', error);
    process.exit(1);
  }
}

initEmulators().catch(console.error);

export {}; // Make this a module 