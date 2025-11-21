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

    // Mock successful login
    const user = {
      id: '1',
      name: 'John Doe',
      email,
      role: 'investor',
      kyc_status: 'verified',
    };

    const token = 'mock-jwt-token-' + Date.now();

    return NextResponse.json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}