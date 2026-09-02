import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const conversations = [
      {
        id: '1',
        name: 'Sarah Smith (Investor)',
        lastMessage: 'I\'d like to discuss the Gasabo Coffee Plot lease terms...',
        timestamp: '2m ago',
        unread: 1,
        avatar: 'SS',
        online: true,
        landTitle: 'Gasabo Coffee & Grain Plot #1',
        landLocation: 'Gasabo District, Kigali',
        proposedAmount: '$42,000 / yr',
        proposedDuration: '36 Months',
      },
      {
        id: '2',
        name: 'David K. AgroFund',
        lastMessage: 'The soil analysis report for Musanze looks great!',
        timestamp: '1h ago',
        unread: 0,
        avatar: 'DK',
        online: true,
        landTitle: 'Musanze Organic Tea & Farm Estate',
        landLocation: 'Musanze, Northern Province',
        proposedAmount: '$85,000 / yr',
        proposedDuration: '60 Months',
      },
      {
        id: '3',
        name: 'Robert Mukasa (Landowner)',
        lastMessage: 'Can we schedule a physical site visit this Friday?',
        timestamp: '3h ago',
        unread: 0,
        avatar: 'RM',
        online: false,
        landTitle: 'Bugesera Commercial Plot',
        landLocation: 'Bugesera, Eastern Province',
        proposedAmount: '$38,000 / yr',
        proposedDuration: '24 Months',
      },
    ];

    const messages: Record<string, any[]> = {
      '1': [
        { id: 'm1', sender: 'Sarah Smith', content: 'Hello! I am interested in leasing your 4.2 Hectare coffee plot in Gasabo.', timestamp: '10:15 AM', isOwn: false },
        { id: 'm2', sender: 'You', content: 'Welcome Sarah! The plot features perennial water access and rich volcanic loam.', timestamp: '10:18 AM', isOwn: true },
        { id: 'm3', sender: 'Sarah Smith', content: 'I\'d like to discuss the Gasabo Coffee Plot lease terms and escrow milestone schedule.', timestamp: '10:20 AM', isOwn: false },
      ],
      '2': [
        { id: 'm10', sender: 'David K.', content: 'The soil lab analysis for Musanze looks outstanding.', timestamp: '09:00 AM', isOwn: false },
        { id: 'm11', sender: 'You', content: 'Thanks David! We confirmed high potassium and pH 5.8 optimal for tea.', timestamp: '09:05 AM', isOwn: true },
      ],
    };

    return NextResponse.json({
      success: true,
      data: {
        conversations,
        messages,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chat conversations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { conversationId, content } = body;

    const reply = {
      id: 'm-' + Date.now(),
      sender: 'You',
      content: content || 'Message sent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    return NextResponse.json({
      success: true,
      message: reply,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Message send failed' },
      { status: 500 }
    );
  }
}