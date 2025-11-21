import { NextRequest, NextResponse } from 'next/server';

const mockTransactions = [
  {
    id: '1',
    type: 'investment',
    amount: 50000,
    currency: 'USD',
    status: 'completed',
    description: 'Investment in Coffee Farm Plot #5',
    landId: '1',
    createdAt: '2025-11-20T10:00:00Z',
    completedAt: '2025-11-20T10:05:00Z',
  },
  {
    id: '2',
    type: 'payment',
    amount: 2500,
    currency: 'USD',
    status: 'pending',
    description: 'Monthly rental payment',
    landId: '2',
    createdAt: '2025-11-19T15:30:00Z',
  },
  {
    id: '3',
    type: 'refund',
    amount: 1000,
    currency: 'USD',
    status: 'completed',
    description: 'Refund for cancelled proposal',
    proposalId: '3',
    createdAt: '2025-11-18T12:00:00Z',
    completedAt: '2025-11-18T12:10:00Z',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const status = searchParams.get('status');

  let transactions = mockTransactions;

  if (type) {
    transactions = transactions.filter(t => t.type === type);
  }

  if (status) {
    transactions = transactions.filter(t => t.status === status);
  }

  return NextResponse.json({
    success: true,
    data: transactions,
  });
}