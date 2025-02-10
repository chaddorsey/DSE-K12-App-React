import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiClient } from '../../services/api';
import { logger } from '../../utils/logger';
import './AuthForms.css';

interface CreateAccountInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateAccountInputs>();
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState(false);
  const password = watch('password');

  const onSubmit = async (data: CreateAccountInputs) => {
    try {
      setIsCreating(true);
      setCreateError(null);

      const response = await apiClient.post('auth/create-account', {
        email: data.email,
        password: data.password,
        name: data.name
      });

      if (response.status === 'error') {
        throw new Error(response.message);
      }

      logger.info('Account created successfully', { email: data.email });
      setCreateSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Account creation failed';
      setCreateError(message);
      logger.error('Account creation failed', { 
        error, 
        email: data.email,
        isNetworkError: error instanceof Error && error.message === 'Failed to fetch'
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        {createSuccess && (
          <div className="success-message">
            Account created successfully! Redirecting to login...
          </div>
        )}
        {createError && (
          <div className="error-message">
            {createError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              disabled={isCreating}
            />
            {errors.name && (
              <span className="error-text">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              disabled={isCreating}
            />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              disabled={isCreating}
            />
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              disabled={isCreating}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isCreating}
          >
            {isCreating ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}; 