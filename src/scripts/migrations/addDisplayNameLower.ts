import { db } from '../../config/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export async function addDisplayNameLowerToUsers() {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);

  const updates = snapshot.docs.map(async (userDoc) => {
    const userData = userDoc.data();
    if (!userData.displayNameLower && userData.displayName) {
      await updateDoc(doc(db, 'users', userDoc.id), {
        displayNameLower: userData.displayName.toLowerCase()
      });
    }
  });

  await Promise.all(updates);
  console.log('Migration complete');
} 