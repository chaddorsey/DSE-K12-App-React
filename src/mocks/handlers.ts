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

interface CreateAccountRequest {
  email: string;
  password: string;
  name: string;
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

// Helper function to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

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

  http.post<CreateAccountRequest>('http://localhost:3001/auth/create-account', async ({ request }) => {
    const { email, password, name } = await request.json() as CreateAccountRequest;
    
    // Validate required fields
    if (!email || !password || !name) {
      return new HttpResponse(
        JSON.stringify({ 
          status: 'error',
          message: 'All fields are required'
        }), 
        { status: 400 }
      );
    }

    // Check if user already exists
    if (users.has(email)) {
      return new HttpResponse(
        JSON.stringify({ 
          status: 'error',
          message: 'Email already registered'
        }), 
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: generateId(),
      email,
      password,
      name
    };
    users.set(email, newUser);

    // Return success without password
    const { password: _, ...userWithoutPassword } = newUser;
    return HttpResponse.json({
      status: 'success',
      message: 'Account created successfully',
      user: userWithoutPassword
    });
  }),
]; 