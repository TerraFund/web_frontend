import { NextResponse } from 'next/server';

const mockLands = [
  {
    id: '1',
    title: 'Coffee Farm Plot #5',
    owner: 'John Doe',
    status: 'published',
    verified: true,
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'Maize Field #12',
    owner: 'Mike Chen',
    status: 'pending',
    verified: false,
    created_at: '2024-01-15T10:00:00Z',
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockLands,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lands' },
      { status: 500 }
    );
  }
}