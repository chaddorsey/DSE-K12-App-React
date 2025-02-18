import { addDisplayNameLowerToUsers } from './migrations/addDisplayNameLower';

async function runMigrations() {
  console.log('Starting migrations...');
  
  try {
    console.log('Adding displayNameLower to users...');
    await addDisplayNameLowerToUsers();
    console.log('Successfully added displayNameLower to users');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run the migrations
runMigrations();

// Make it a module
export {}; 