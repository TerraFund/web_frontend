import { NextResponse } from 'next/server';

const mockDisputes = [
  {
    id: '1',
    title: 'Contract Breach - Payment Delay',
    parties: 'John Doe vs Sarah Smith',
    status: 'open',
    priority: 'high',
    created_at: '2024-01-20T10:00:00Z',
    description: 'Investor claims landowner delayed payment release after milestone completion.',
    plaintiff: { id: '2', name: 'Sarah Smith', role: 'investor' },
    defendant: { id: '1', name: 'John Doe', role: 'landowner' },
    contract_id: 'C001',
  },
  {
    id: '2',
    title: 'Land Quality Dispute',
    parties: 'Mike Chen vs David Kim',
    status: 'investigating',
    priority: 'medium',
    created_at: '2024-01-18T14:00:00Z',
    description: 'Investor alleges land quality does not match description provided.',
    plaintiff: { id: '3', name: 'Mike Chen', role: 'investor' },
    defendant: { id: '4', name: 'David Kim', role: 'landowner' },
    contract_id: 'C002',
  },
  {
    id: '3',
    title: 'Contract Terms Misunderstanding',
    parties: 'Alice Brown vs Bob Wilson',
    status: 'resolved',
    priority: 'low',
    created_at: '2024-01-15T09:00:00Z',
    description: 'Parties disagreed on revenue sharing terms interpretation.',
    plaintiff: { id: '5', name: 'Alice Brown', role: 'investor' },
    defendant: { id: '6', name: 'Bob Wilson', role: 'landowner' },
    contract_id: 'C003',
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockDisputes,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch disputes' },
      { status: 500 }
    );
  }
}