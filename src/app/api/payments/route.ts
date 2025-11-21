import { NextResponse } from 'next/server';

const mockPayments = [
  {
    id: '1',
    contract_id: '1',
    amount: 25000,
    status: 'completed',
    type: 'escrow_deposit',
    created_at: '2024-01-15T10:00:00Z',
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockPayments,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newPayment = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newPayment,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}