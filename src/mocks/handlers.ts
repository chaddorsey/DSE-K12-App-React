import { http, HttpResponse } from 'msw';

interface LoginRequest {
  email: string;
  password: string;
}

interface ResetPasswordRequest {
  username: string;
  newPassword: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Mock user store
const users = new Map<string, User>([
  ['test@example.com', {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }]
]);

export const handlers = [
  http.get('http://localhost:3001/dashboard.overview', () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        title: 'Dashboard Overview',
        stats: {
          totalUsers: users.size,
          activeUsers: 50,
          totalSessions: 1000,
          averageSessionDuration: '45m',
          engagementRate: '78%',
          completionRate: '82%'
        },
        recentActivity: {
          newUsers: 15,
          completedSessions: 125,
          activeQuizzes: 45
        },
        trends: {
          userGrowth: '+12%',
          sessionGrowth: '+8%',
          completionTrend: '+5%'
        }
      }
    });
  }),

  http.post<LoginRequest>('http://localhost:3001/auth/login', async ({ request }) => {
    const { email, password } = await request.json() as LoginRequest;
    
    const user = users.get(email);
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      return HttpResponse.json({
        status: 'success',
        token: 'mock-jwt-token',
        user: userWithoutPassword
      });
    }

    return new HttpResponse(
      JSON.stringify({ 
        status: 'error',
        message: 'Invalid email or password'
      }), 
      { status: 401 }
    );
  }),

  http.post<ResetPasswordRequest>('http://localhost:3001/auth/reset-password', async ({ request }) => {
    const { username, newPassword } = await request.json() as ResetPasswordRequest;
    
    // Simulate server validation
    if (!username || !newPassword) {
      return new HttpResponse(
        JSON.stringify({ 
          status: 'error',
          message: 'Invalid request parameters'
        }), 
        { status: 400 }
      );
    }

    // Find user by email (username)
    const user = users.get(username);
    if (!user) {
      return new HttpResponse(
        JSON.stringify({ 
          status: 'error',
          message: 'User not found'
        }), 
        { status: 404 }
      );
    }

    // Update password in mock store
    users.set(username, {
      ...user,
      password: newPassword
    });

    return HttpResponse.json({
      status: 'success',
      message: 'Password reset successful'
    });
  }),
]; 