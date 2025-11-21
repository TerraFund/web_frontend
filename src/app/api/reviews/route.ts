import { NextRequest, NextResponse } from 'next/server';

const mockReviews = [
  {
    id: '1',
    landId: '1',
    userId: '2',
    userName: 'Jane Smith',
    rating: 5,
    comment: 'Excellent land with great potential for coffee farming.',
    createdAt: '2025-11-18T14:20:00Z',
  },
  {
    id: '2',
    landId: '1',
    userId: '3',
    userName: 'Bob Johnson',
    rating: 4,
    comment: 'Good location and soil quality. Worth considering.',
    createdAt: '2025-11-17T09:15:00Z',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const landId = searchParams.get('landId');

  const reviews = landId ? mockReviews.filter(r => r.landId === landId) : mockReviews;

  return NextResponse.json({
    success: true,
    data: reviews,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newReview = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };

  mockReviews.push(newReview);

  return NextResponse.json({
    success: true,
    data: newReview,
  });
}