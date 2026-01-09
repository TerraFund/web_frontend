import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const analytics = {
      userGrowth: [
        { month: 'Jan', users: 120 },
        { month: 'Feb', users: 180 },
        { month: 'Mar', users: 250 },
        { month: 'Apr', users: 320 },
        { month: 'May', users: 450 },
        { month: 'Jun', users: 580 },
      ],
      dealVolume: [
        { month: 'Jan', deals: 5 },
        { month: 'Feb', deals: 8 },
        { month: 'Mar', deals: 12 },
        { month: 'Apr', deals: 15 },
        { month: 'May', deals: 18 },
        { month: 'Jun', deals: 23 },
      ],
      revenue: [
        { month: 'Jan', revenue: 25000 },
        { month: 'Feb', revenue: 35000 },
        { month: 'Mar', revenue: 42000 },
        { month: 'Apr', revenue: 55000 },
        { month: 'May', revenue: 68000 },
        { month: 'Jun', revenue: 82000 },
      ],
      userDistribution: [
        { name: 'Landowners', value: 45, color: '#0B6E4F' },
        { name: 'Investors', value: 35, color: '#F4A261' },
        { name: 'Admins', value: 20, color: '#1E3932' },
      ],
      platformMetrics: {
        totalUsers: 1247,
        totalLands: 89,
        activeDeals: 23,
        pendingVerifications: 12,
        monthlyRevenue: 82000,
      },
    };

    return NextResponse.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}