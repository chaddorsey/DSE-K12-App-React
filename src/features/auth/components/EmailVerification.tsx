import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NotificationBanner } from '@/components/NotificationBanner';
import { authService } from '../services/AuthService';
import { User as FirebaseUser } from 'firebase/auth';

export const EmailVerification: React.FC = () => {
  const [isResending, setIsResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Check verification status on mount and when user changes
    if (user?.emailVerified) {
      setVerificationStatus('success');
      // Redirect after a short delay to show success message
      const timer = setTimeout(() => navigate('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleResendVerification = async () => {
    if (!user) return;
    
    try {
      setIsResending(true);
      await authService.sendVerificationEmail(user);
      setNotificationMessage('Verification email sent!');
    } catch (error) {
      console.error('Error sending verification:', error);
      setNotificationMessage('Failed to send verification email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {verificationStatus === 'success' ? (
          <NotificationBanner
            type="success"
            message="Email verified successfully! Redirecting..."
          />
        ) : notificationMessage ? (
          <NotificationBanner
            type={notificationMessage.includes('Failed') ? 'error' : 'success'}
            message={notificationMessage}
          />
        ) : (
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify your email
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please check your email for a verification link
            </p>
          </div>
        )}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
          <p className="text-gray-600 mb-4">
            We've sent a verification email to <strong>{user?.email}</strong>.
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
    </div>
  );
}; 