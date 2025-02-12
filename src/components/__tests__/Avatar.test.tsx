import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from '../Avatar';
import { getAvatarUrl } from '@/utils/avatar';

jest.mock('@/utils/avatar', () => ({
  getAvatarUrl: jest.fn()
}));

describe('Avatar', () => {
  beforeEach(() => {
    (getAvatarUrl as jest.Mock).mockReset();
    (getAvatarUrl as jest.Mock).mockImplementation((src, name) => src || `https://ui-avatars.com/api/?name=${name}`);
  });

  it('renders with correct size classes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];
    const sizeClasses = {
      xs: 'w-4 h-4',
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16'
    };

    sizes.forEach(size => {
      const { rerender } = render(<Avatar name="Test User" size={size} />);
      expect(screen.getByAltText('Avatar for Test User')).toHaveClass(sizeClasses[size]);
      rerender(<></>);
    });
  });

  it('shows loading state initially', () => {
    render(<Avatar name="Test User" />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('removes loading state after image loads', () => {
    render(<Avatar name="Test User" />);
    const img = screen.getByAltText('Avatar for Test User');
    fireEvent.load(img);
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('falls back to default avatar on error', () => {
    (getAvatarUrl as jest.Mock)
      .mockImplementationOnce(() => 'invalid-url')
      .mockImplementationOnce(() => 'fallback-url');

    render(<Avatar name="Test User" src="invalid-url" />);
    const img = screen.getByAltText('Avatar for Test User');
    fireEvent.error(img);
    expect(getAvatarUrl).toHaveBeenCalledTimes(2);
    expect(img.src).toBe('http://localhost/fallback-url');
  });

  it('applies custom className', () => {
    render(<Avatar name="Test User" className="custom-class" />);
    expect(screen.getByAltText('Avatar for Test User')).toHaveClass('custom-class');
  });

  it('applies all required styling classes', () => {
    render(<Avatar name="Test User" />);
    const img = screen.getByAltText('Avatar for Test User');
    
    expect(img).toHaveClass(
      'rounded-full',
      'object-cover',
      'shadow-sm',
      'ring-1',
      'ring-gray-200',
      'transition-transform',
      'duration-200',
      'hover:scale-105'
    );
  });

  // Test accessibility
  it('provides proper alt text', () => {
    render(<Avatar name="Test User" />);
    expect(screen.getByAltText('Avatar for Test User')).toBeInTheDocument();
  });

  it('maintains aspect ratio', () => {
    render(<Avatar name="Test User" />);
    const container = screen.getByAltText('Avatar for Test User').parentElement;
    expect(container).toHaveClass('relative');
    expect(container?.style.aspectRatio).toBe('1');
  });
}); 