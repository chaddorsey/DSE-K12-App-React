import { http, HttpResponse } from 'msw';

interface LoginRequest {
  email: string;
  password: string;
}

export const handlers = [
  http.get('http://localhost:3001/dashboard.overview', () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        title: 'Dashboard Overview',
        stats: {
          totalUsers: 100,
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
    
    // Simple mock validation
    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        status: 'success',
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com'
        }
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
]; 