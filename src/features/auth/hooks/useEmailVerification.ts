import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { auth } from '@/config/firebase';

export const useEmailVerification = () => {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Reload the auth state periodically to check verification
    const interval = setInterval(async () => {
      try {
        await auth.currentUser?.reload();
        setIsChecking(false);
      } catch (error) {
        console.error('Error checking verification:', error);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [user]);

  return {
    isVerified: user?.emailVerified ?? false,
    isChecking,
  };
}; 