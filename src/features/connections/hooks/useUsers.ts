import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { User } from '../types/user';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        
        const userData = snapshot.docs.map(doc => {
          const data = doc.data();
          const avatarPath = data.photoURL || 
            (data.image ? `/assets/avatars/${data.image}` : '/assets/avatars/default.png');

          return {
            id: doc.id,
            name: data.displayName || 'Anonymous User',
            avatar: avatarPath,
            role: data.role || 'user',
            department: data.organization || 'Unknown',
            email: data.email
          };
        });

        setUsers(userData);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch users'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, isLoading, error };
}; 