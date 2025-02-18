import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const getUserId = async (email: string) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email.toLowerCase()));
  
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const user = snapshot.docs[0];
    console.log('Found user:', {
      id: user.id,
      ...user.data()
    });
    return user.id;
  }
  
  console.log('No user found with email:', email);
  return null;
};

// Get the ID for user@test.com
getUserId('user@test.com'); 