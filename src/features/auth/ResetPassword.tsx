import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiClient } from '../../services/api';
import { logger } from '../../utils/logger';
import './AuthForms.css';

interface ResetPasswordInputs {
  username: string;
  newPassword: string;
  confirmPassword: string;
}

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordInputs>();
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const newPassword = watch('newPassword');

  const onSubmit = async (data: ResetPasswordInputs) => {
    try {
      setIsResetting(true);
      setResetError(null);

      const response = await apiClient.post('auth/reset-password', {
        username: data.username,
        newPassword: data.newPassword
      });

      if (response.status === 'error') {
        throw new Error(response.message);
      }

      logger.info('Password reset successful', { username: data.username });
      setResetSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Password reset failed';
      setResetError(message);
      logger.error('Password reset failed', { 
        error, 
        username: data.username,
        isNetworkError: error instanceof Error && error.message === 'Failed to fetch'
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        {resetSuccess && (
          <div className="success-message">
            Password reset successful! Redirecting to login...
          </div>
        )}
        {resetError && (
          <div className="error-message">
            {resetError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              {...register('username', { required: 'Username is required' })}
              disabled={isResetting}
            />
            {errors.username && (
              <span className="error-text">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              {...register('newPassword', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              disabled={isResetting}
            />
            {errors.newPassword && (
              <span className="error-text">{errors.newPassword.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === newPassword || 'Passwords do not match'
              })}
              disabled={isResetting}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isResetting}
          >
            {isResetting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}; 