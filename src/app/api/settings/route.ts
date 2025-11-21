import { NextRequest, NextResponse } from 'next/server';

const mockSettings = {
  notifications: {
    email: true,
    push: false,
    proposals: true,
    payments: true,
  },
  privacy: {
    profileVisibility: 'public',
    showInvestments: true,
  },
  preferences: {
    language: 'en',
    currency: 'USD',
    theme: 'system',
  },
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockSettings,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const updatedSettings = { ...mockSettings, ...body };

  return NextResponse.json({
    success: true,
    data: updatedSettings,
  });
}