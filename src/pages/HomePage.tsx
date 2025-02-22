import React from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { OnboardingButton } from '@/components/OnboardingButton';

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      {user?.isNewUser && (
        <OnboardingButton />
      )}
      {/* Rest of home page content */}
    </div>
  );
}; 