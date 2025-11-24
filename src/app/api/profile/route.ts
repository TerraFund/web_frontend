import { NextRequest, NextResponse } from 'next/server';

const mockProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'investor',
  kycStatus: 'verified',
  avatar: '/avatars/john.jpg',
  bio: 'Experienced investor in sustainable agriculture projects.',
  location: 'Kigali, Rwanda',
  joinedDate: '2023-01-15',
  investments: 5,
  totalInvested: 25000,
  carbonCredits: 1250,
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockProfile,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const updatedProfile = { ...mockProfile, ...body };

  return NextResponse.json({
    success: true,
    data: updatedProfile,
  });
}