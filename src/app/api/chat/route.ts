import { NextResponse } from 'next/server';

const mockMessages = [
  {
    id: '1',
    chat_id: '1',
    sender_id: '1',
    content: 'Hello! Interested in your land.',
    timestamp: '2024-01-15T10:00:00Z',
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    if (conversationId) {
      // Return messages for specific conversation
      return NextResponse.json({
        success: true,
        data: mockMessages.filter(m => m.chat_id === conversationId),
      });
    }

    // Return conversations
    const mockConversations = [
      {
        id: '1',
        user1_id: '1',
        user2_id: '2',
        proposal_id: '1',
        last_message: 'Hello! Interested in your land.',
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockConversations,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chat data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newMessage = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}