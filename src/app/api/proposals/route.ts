import { NextResponse } from 'next/server';

const mockProposals = [
  {
    id: '1',
    investor_id: '1',
    land_id: '1',
    amount: 25000,
    duration: 3,
    message: 'Interested in your maize field',
    status: 'pending',
    created_at: '2024-01-15T10:00:00Z',
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockProposals,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch proposals' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newProposal = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newProposal,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create proposal' },
      { status: 500 }
    );
  }
}