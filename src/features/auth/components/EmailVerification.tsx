import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NotificationBanner } from '@/components/NotificationBanner';
import { authService } from '../services/AuthService';

export const EmailVerification: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      await authService.sendVerificationEmail(user);
      // Show success message
    } catch (error) {
      console.error('Error resending verification:', error);
      // Show error message
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <NotificationBanner
        type="success"
        title="Account Created Successfully!"
        message="Your account has been created. Please check your email to verify your account."
      />
      
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-4">
          We've sent a verification email to <strong>{user.email}</strong>.
          {process.env.NODE_ENV === 'development' && (
            <span className="block mt-2 text-sm text-gray-500">
              Check the verification link at: http://localhost:9099/auth
            </span>
          )}
        </p>
        <p className="text-sm text-gray-500">
          Please check your email and click the verification link to continue.
        </p>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
            <li>Click the verification link in your email</li>
            <li>Return to the login page</li>
            <li>Sign in with your new account</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleResendVerification}
          disabled={isResending}
          className="text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
        >
          {isResending ? 'Sending...' : 'Resend verification email'}
        </button>
      </div>
    </div>
  );
}; 