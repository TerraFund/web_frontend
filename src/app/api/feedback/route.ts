import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { rating, feedback, category } = body;

  // Mock storing feedback
  console.log('Feedback received:', { rating, feedback, category });

  return NextResponse.json({
    success: true,
    message: 'Thank you for your feedback!',
  });
}

export async function GET() {
  // Mock feedback stats
  const mockStats = {
    averageRating: 4.2,
    totalFeedback: 156,
    categories: {
      usability: 45,
      features: 38,
      performance: 28,
      support: 25,
      other: 20,
    },
  };

  return NextResponse.json({
    success: true,
    data: mockStats,
  });
}