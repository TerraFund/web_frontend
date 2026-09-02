import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Mock authentication - in real app, verify credentials
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const isAdmin = email.toLowerCase() === 'geofreykayin@gmail.com';

    // Mock successful login
    const user = {
      id: isAdmin ? 'admin-1' : '1',
      name: isAdmin ? 'Geofrey Kayin' : 'John Doe',
      email,
      role: isAdmin ? 'admin' : 'investor',
      kyc_status: 'verified',
    };

    const token = 'mock-jwt-token-' + Date.now();

    const response = NextResponse.json({
      success: true,
      user,
      token,
      data: { user, token },
    });

    // Set auth token cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}