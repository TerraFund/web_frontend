import { NextResponse } from 'next/server';

const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'landowner',
    kyc_status: 'verified',
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    role: 'investor',
    kyc_status: 'pending',
    created_at: '2024-01-15T10:00:00Z',
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockUsers,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}