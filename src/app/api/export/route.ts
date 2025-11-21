import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'lands'; // lands, users, investments

  // Mock data export
  const mockData = {
    lands: [
      { id: '1', title: 'Coffee Farm', location: 'Central Kenya', size: 25 },
      { id: '2', title: 'Maize Field', location: 'Rift Valley', size: 50 },
    ],
    users: [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'investor' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'landowner' },
    ],
    investments: [
      { id: '1', amount: 50000, landId: '1', investorId: '1', status: 'active' },
    ],
  };

  const data = mockData[type as keyof typeof mockData] || [];

  // In real app, generate CSV or JSON file
  return NextResponse.json({
    success: true,
    data,
    message: `Exported ${data.length} ${type} records`,
  });
}