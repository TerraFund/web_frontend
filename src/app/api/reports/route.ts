import { NextRequest, NextResponse } from 'next/server';

const mockReports = [
  {
    id: '1',
    type: 'carbon_credits',
    title: 'Monthly Carbon Credit Report',
    data: {
      totalCredits: 1250,
      generated: 150,
      redeemed: 25,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'financial',
    title: 'Financial Summary',
    data: {
      totalInvested: 50000,
      returns: 7500,
      roi: 15,
    },
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockReports,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newReport = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    data: newReport,
  });
}