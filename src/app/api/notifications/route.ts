import { NextRequest, NextResponse } from 'next/server';

const mockNotifications = [
  {
    id: '1',
    type: 'proposal',
    title: 'New Investment Proposal',
    message: 'Sarah Johnson submitted a $25,000 investment proposal for your coffee farm in Kigali City',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    actionUrl: '/dashboard/proposals/1',
    metadata: { amount: 25000, landId: '1', userId: '2' }
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Received',
    message: 'You have received $15,000 from Mike Chen for the maize field investment',
    read: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    metadata: { amount: 15000 }
  },
  {
    id: '3',
    type: 'system',
    title: 'KYC Verification Complete',
    message: 'Your identity verification has been approved. You can now receive investments.',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium'
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message from Investor',
    message: 'David Kim: I\'m interested in your land portfolio. Can we schedule a call?',
    read: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    actionUrl: '/dashboard/chat?user=3'
  },
  {
    id: '5',
    type: 'land',
    title: 'Land Listing Approved',
    message: 'Your coffee farm plot has been approved and is now live on the platform',
    read: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    metadata: { landId: '1' }
  },
  {
    id: '6',
    type: 'review',
    title: 'New Review Received',
    message: 'You received a 5-star review from an investor: "Excellent communication and professional service"',
    read: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low'
  },
  {
    id: '7',
    type: 'system',
    title: 'Monthly Report Available',
    message: 'Your November investment report is ready. View your portfolio performance.',
    read: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'low',
    actionUrl: '/dashboard/reports'
  },
  {
    id: '8',
    type: 'payment',
    title: 'Escrow Funds Released',
    message: 'Funds from your recent land transaction have been released to your account',
    read: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'medium',
    metadata: { amount: 5000 }
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter'); // 'all', 'unread', 'read'
  const type = searchParams.get('type'); // notification type filter
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let filteredNotifications = mockNotifications;

  // Apply filters
  if (filter === 'unread') {
    filteredNotifications = filteredNotifications.filter(n => !n.read);
  } else if (filter === 'read') {
    filteredNotifications = filteredNotifications.filter(n => n.read);
  }

  if (type && type !== 'all') {
    filteredNotifications = filteredNotifications.filter(n => n.type === type);
  }

  // Sort by creation date (newest first)
  filteredNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);

  return NextResponse.json({
    success: true,
    data: paginatedNotifications,
    pagination: {
      page,
      limit,
      total: filteredNotifications.length,
      pages: Math.ceil(filteredNotifications.length / limit)
    },
    summary: {
      total: mockNotifications.length,
      unread: mockNotifications.filter(n => !n.read).length,
      read: mockNotifications.filter(n => n.read).length
    }
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

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, action } = body;

  // In a real app, this would update the database
  if (action === 'mark_read') {
    // Mark notification as read
  } else if (action === 'mark_unread') {
    // Mark notification as unread
  } else if (action === 'delete') {
    // Delete notification
  }

  return NextResponse.json({
    success: true,
    message: `Notification ${action} successful`
  });
}