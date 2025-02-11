import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Home } from '../Home';

expect.extend(toHaveNoViolations);

describe('Home', () => {
  const renderHome = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  };

  it('renders welcome message', () => {
    renderHome();
    
    expect(screen.getByText('Welcome to DSET')).toBeInTheDocument();
  });

  it('renders onboarding link', () => {
    renderHome();
    
    const link = screen.getByRole('link', { name: /start onboarding/i });
    expect(link).toHaveAttribute('href', '/onboarding');
  });

  it('renders connections demo link', () => {
    renderHome();
    
    const link = screen.getByRole('link', { name: /connections demo/i });
    expect(link).toHaveAttribute('href', '/connections');
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = renderHome();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has proper heading hierarchy', () => {
      renderHome();
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2s = screen.getAllByRole('heading', { level: 2 });
      
      expect(h1).toHaveTextContent('Welcome to DSET');
      expect(h2s).toHaveLength(2);
    });

    it('has accessible link text', () => {
      renderHome();
      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
        expect(link).not.toHaveTextContent(/click here/i);
      });
    });

    it('has sufficient color contrast', () => {
      renderHome();
      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        const styles = window.getComputedStyle(link);
        expect(styles.color).not.toBe(styles.backgroundColor);
      });
    });
  });
}); 