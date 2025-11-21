import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, preferences } = body;

  // Mock subscription
  console.log('Newsletter subscription:', { email, preferences });

  return NextResponse.json({
    success: true,
    message: 'Successfully subscribed to newsletter!',
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  // Mock unsubscription
  console.log('Newsletter unsubscription:', email);

  return NextResponse.json({
    success: true,
    message: 'Successfully unsubscribed from newsletter.',
  });
}