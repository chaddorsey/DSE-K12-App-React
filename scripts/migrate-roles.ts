import { db } from '../src/config/firebase';
import { collection, getDocs, writeBatch } from 'firebase/firestore';
import chalk from 'chalk';

async function migrateRoles() {
  try {
    console.log(chalk.blue('Starting role migration...'));

    // Update known users
    const knownUsersRef = collection(db, 'known_users');
    const knownUsersSnapshot = await getDocs(knownUsersRef);
    const knownUsersBatch = writeBatch(db);
    
    knownUsersSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.role === 'teacher') {
        knownUsersBatch.update(doc.ref, { role: 'admin' });
      } else if (data.role === 'student') {
        knownUsersBatch.update(doc.ref, { role: 'user' });
      }
    });

    // Update users
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    const usersBatch = writeBatch(db);
    
    usersSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.role === 'teacher') {
        usersBatch.update(doc.ref, { role: 'admin' });
      } else if (data.role === 'student') {
        usersBatch.update(doc.ref, { role: 'user' });
      }
    });

    await Promise.all([
      knownUsersBatch.commit(),
      usersBatch.commit()
    ]);

    console.log(chalk.green('Successfully migrated roles'));
  } catch (error) {
    console.error(chalk.red('Error migrating roles:'));
    console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
    process.exit(1);
  }
}

migrateRoles(); 