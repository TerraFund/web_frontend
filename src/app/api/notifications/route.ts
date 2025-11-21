import { NextRequest, NextResponse } from 'next/server';

const mockNotifications = [
  {
    id: '1',
    type: 'proposal',
    title: 'New Proposal Received',
    message: 'You have received a new investment proposal for Land #123',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Processed',
    message: 'Your payment of $5000 has been processed successfully',
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockNotifications,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newNotification = {
    id: Date.now().toString(),
    ...body,
    read: false,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    data: newNotification,
  });
}