import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { User } from '../types/user';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        console.log('Fetching users from Firestore...');
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        
        console.log('Found', snapshot.docs.length, 'users in Firestore');
        
        // Log first user as example
        if (snapshot.docs.length > 0) {
          console.log('Example user document:', {
            id: snapshot.docs[0].id,
            data: snapshot.docs[0].data()
          });
        }

        const fetchedUsers = snapshot.docs.map(doc => {
          const data = doc.data();
          const user = {
            id: doc.id,
            name: data.displayName || 'Anonymous User',
            avatar: data.photoURL || '/assets/avatars/default-avatar.jpg',
            role: data.role || 'user',
            department: data.organization || 'Unknown',
            email: data.email
          } as User;
          console.log('Processed user:', user);
          return user;
        });

        console.log('Total processed users:', fetchedUsers.length);
        setUsers(fetchedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, isLoading, error };
} 