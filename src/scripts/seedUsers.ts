import { db, auth } from '../config/firebase-admin';
import { logger } from '../utils/logger';

interface FirebaseAuthError {
  code: string;
  message: string;
}

const seedUsers = async () => {
  try {
    const usersRef = db.collection('users');
    
    const testUsers = [
      {
        email: 'user@test.com',
        password: 'testpass123',
        displayName: 'Test User',
        role: 'user',
        emailVerified: true
      },
      {
        email: 'manager@test.com',
        password: 'testpass123',
        displayName: 'Test Manager',
        role: 'manager',
        emailVerified: true
      },
      {
        email: 'admin@test.com',
        password: 'testpass123',
        displayName: 'Test Admin',
        role: 'admin',
        emailVerified: true
      }
    ];

    logger.info('Seeding users...');
    for (const userData of testUsers) {
      // Create auth user
      try {
        const userRecord = await auth.createUser({
          email: userData.email,
          password: userData.password,
          displayName: userData.displayName,
          emailVerified: userData.emailVerified
        });
        
        // Set custom claims for role
        await auth.setCustomUserClaims(userRecord.uid, {
          role: userData.role,
          name: userData.displayName
        });

        // Create Firestore document
        await usersRef.doc(userRecord.uid).set({
          email: userData.email,
          displayName: userData.displayName,
          role: userData.role,
          emailVerified: userData.emailVerified,
          createdAt: new Date(),
          uid: userRecord.uid
        });

        logger.info('Added user:', {
          email: userData.email,
          uid: userRecord.uid,
          role: userData.role
        });
      } catch (error) {
        const authError = error as FirebaseAuthError;
        if (authError.code === 'auth/email-already-exists') {
          logger.info('User already exists:', userData.email);
          continue;
        }
        throw error;
      }
    }

    // Verify users were added
    const snapshot = await usersRef.get();
    logger.info('Users in database:', {
      count: snapshot.size,
      users: snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    });

  } catch (error) {
    logger.error('Error seeding users:', error);
  }
};

if (require.main === module) {
  seedUsers()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
} 