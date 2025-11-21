import { NextResponse } from 'next/server';

const mockStats = {
  investments: {
    total: 5,
    active: 3,
    completed: 2,
    totalValue: 250000,
    averageROI: 12.5,
  },
  lands: {
    owned: 2,
    listed: 1,
    rented: 1,
    totalArea: 75, // acres
  },
  carbonCredits: {
    purchased: 1250,
    generated: 890,
    retired: 360,
  },
  activity: {
    proposalsSent: 8,
    proposalsReceived: 12,
    contractsSigned: 5,
    paymentsMade: 3,
  },
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockStats,
  });
}