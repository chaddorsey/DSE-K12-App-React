import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from './AuthContext';
import { usePerformanceMonitoring } from '../../monitoring/hooks/useMonitoring';
import { logger } from '../../utils/logger';
import './LoginForm.css';

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
}).required();

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  usePerformanceMonitoring('LoginForm');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      logger.info('Login successful');
      navigate('/dashboard');
    } catch (error) {
      logger.error('Login failed', { error });
      // Handle login error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}; 