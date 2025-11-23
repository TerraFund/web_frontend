import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, password, phone, role } = await request.json();

    // Mock validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Mock user creation
    const user = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role,
      kyc_status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const token = 'mock-jwt-token-' + Date.now();

    const response = NextResponse.json({
      success: true,
      data: { user, token },
      message: 'Registration successful. Please verify your email.',
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
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}