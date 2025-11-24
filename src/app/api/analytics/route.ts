import { NextResponse } from 'next/server';

const mockAnalytics = {
  totalUsers: 1250,
  totalLands: 89,
  totalInvestments: 234,
  totalValue: 1250000,
  monthlyGrowth: {
    users: 12.5,
    lands: 8.3,
    investments: 15.7,
  },
  topRegions: [
    { name: 'Kigali City', lands: 25, value: 450000 },
    { name: 'Northern Province', lands: 20, value: 380000 },
    { name: 'Southern Province', lands: 18, value: 320000 },
  ],
  recentActivity: [
    { type: 'investment', amount: 50000, date: '2025-11-20' },
    { type: 'land_added', count: 3, date: '2025-11-19' },
    { type: 'user_registered', count: 15, date: '2025-11-18' },
  ],
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockAnalytics,
  });
}