import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { db } from '../../../config/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import type { IUser } from '../../auth/types';
import { logger } from '../../../utils/logger';
import './UserSearch.css';

interface UserSearchProps {
  onUserSelect: (user: IUser) => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ onUserSelect }) => {
  const { user: currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      logger.debug('🔍 USER SEARCH: Starting search', { email });
      const usersRef = collection(db, 'users');
      
      logger.debug('🔍 USER SEARCH: Query params', { 
        collection: 'users',
        email: email.toLowerCase()
      });

      const q = query(
        usersRef,
        where('email', '==', email.toLowerCase()),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      logger.debug('🔍 USER SEARCH: Results', { 
        empty: querySnapshot.empty,
        size: querySnapshot.size,
        docs: querySnapshot.docs.map(doc => ({
          id: doc.id,
          email: doc.data().email,
          displayName: doc.data().displayName
        }))
      });
      
      if (querySnapshot.empty) {
        const error = 'No user found with that email';
        logger.debug('Search failed:', { error });
        setError(error);
        return;
      }

      const user = {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data()
      } as IUser;

      if (user.id === currentUser?.id) {
        const error = 'You cannot quiz about yourself';
        logger.debug('Search failed:', { error });
        setError(error);
        return;
      }

      console.group('🔍 Found User');
      console.log('User data:', {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        rawData: querySnapshot.docs[0].data()
      });
      console.groupEnd();
      
      onUserSelect(user);
    } catch (error) {
      logger.error('Error searching user:', error);
      setError('Failed to search for user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-search">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="email"
          placeholder="Enter user's email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="search-input"
          required
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Find User'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}; 