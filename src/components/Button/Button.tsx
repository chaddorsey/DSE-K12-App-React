import React from 'react';
import './Button.css';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<IButtonProps> = ({
  children,
  loading = false,
  variant = 'primary',
  size = 'medium',
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`button button--${variant} button--${size} ${loading ? 'button--loading' : ''} ${className || ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="button__loader" />
      ) : children}
    </button>
  );
}; 