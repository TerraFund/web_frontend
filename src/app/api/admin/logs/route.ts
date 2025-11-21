import { NextResponse } from 'next/server';

const mockLogs = [
  {
    id: '1',
    level: 'info',
    message: 'User john.doe@example.com logged in',
    timestamp: '2025-11-21T10:30:00Z',
    userId: '1',
  },
  {
    id: '2',
    level: 'warn',
    message: 'Failed login attempt for user@example.com',
    timestamp: '2025-11-21T10:25:00Z',
    ip: '192.168.1.1',
  },
  {
    id: '3',
    level: 'error',
    message: 'Payment processing failed for transaction #12345',
    timestamp: '2025-11-21T10:20:00Z',
    transactionId: '12345',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockLogs,
  });
}