import { NextResponse } from 'next/server';

const mockConversations = [
  {
    id: '1',
    participants: ['user1', 'user2'],
    landId: '1',
    landTitle: 'Coffee Farm Plot #5',
    lastMessage: 'Thank you for your interest in my land.',
    lastMessageTime: '2025-11-21T11:30:00Z',
    unreadCount: 2,
    status: 'active',
  },
  {
    id: '2',
    participants: ['user1', 'user3'],
    landId: '2',
    landTitle: 'Maize Field #12',
    lastMessage: 'When can we schedule a site visit?',
    lastMessageTime: '2025-11-20T16:45:00Z',
    unreadCount: 0,
    status: 'active',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockConversations,
  });
}