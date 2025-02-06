import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

// Mock child components (same as App.test.tsx)
jest.mock('./components/NetworkStatusIndicator', () => ({
  NetworkStatusIndicator: () => <div data-testid="network-status">Network Status</div>
}));

jest.mock('./components/Dashboard', () => ({
  Dashboard: () => <div data-testid="dashboard">Dashboard</div>
}));

jest.mock('./components/UserProfile', () => ({
  UserProfile: () => <div data-testid="user-profile">User Profile</div>
}));

jest.mock('./components/Settings', () => ({
  Settings: () => <div data-testid="settings">Settings</div>
}));

describe('App Routing', () => {
  it('should render dashboard at root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('should render user profile at /profile route', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });

  it('should render settings at /settings route', () => {
    render(
      <MemoryRouter initialEntries={['/settings']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('settings')).toBeInTheDocument();
  });

  it('should handle unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
}); 