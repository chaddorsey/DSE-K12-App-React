import { FC, ButtonHTMLAttributes } from 'react';
import { logger } from '../utils/logger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: FC<ButtonProps> = ({
  children,
  loading = false,
  variant = 'primary',
  onClick,
  className = '',
  ...props
}): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    logger.debug('Button clicked', { variant });
    onClick?.(e);
  };

  return (
    <button
      className={`button button--${variant} ${loading ? 'button--loading' : ''} ${className}`}
      onClick={handleClick}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}; 