process.env.NODE_ENV = 'development';

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { db, auth } from '../src/config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface UserData {
  email: string;
  displayName: string;
  role: string;
  organization: string;
  image?: string;
}

async function loadUsersFromCSV(filePath: string): Promise<UserData[]> {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  return new Promise((resolve, reject) => {
    const users: UserData[] = [];
    
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    })
    .on('data', (row) => {
      console.log('Processing row:', row);
      users.push({
        email: row.email,
        displayName: row.displayName,
        role: row.role || 'user',
        organization: row.organization,
        image: row.image
      });
    })
    .on('end', () => resolve(users))
    .on('error', reject);
  });
}

async function createUser(userData: UserData) {
  try {
    const password = 'password123';
    
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      password
    );

    const photoURL = userData.image ? 
      `/assets/avatars/${userData.image}` : 
      null;

    // Update the auth profile
    await updateProfile(userCredential.user, {
      displayName: userData.displayName,
      photoURL
    });

    // Add user data to Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role,
      organization: userData.organization,
      photoURL,
      createdAt: new Date().toISOString()
    });

    console.log(`Created user: ${userData.email} with photo: ${photoURL || 'none'}`);
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    console.error(`Failed to create user ${userData.email}:`, 
      err.message || 'Unknown error'
    );
  }
}

async function populateUsers() {
  try {
    // Wait for emulators to be ready
    console.log('Waiting for emulators to be ready...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const csvPath = path.join(__dirname, '../public/data/simpsons_users.csv');
    const users = await loadUsersFromCSV(csvPath);
    
    console.log(`Found ${users.length} users in CSV`);
    
    for (const user of users) {
      await createUser(user);
    }
    
    console.log('User population complete');
    process.exit(0);
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error('Failed to populate users:', 
      err.message || 'Unknown error'
    );
    process.exit(1);
  }
}

// Run the script
populateUsers(); 