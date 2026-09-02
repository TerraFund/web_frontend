import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Mock proposal detail payload
    const proposalData: Record<string, any> = {
      '1': {
        id: '1',
        landId: '1',
        landTitle: 'Gasabo Coffee & Grain Plot #1',
        landLocation: 'Gasabo District, Kigali Province',
        proposedAmount: '$42,000',
        proposedDurationMonths: 36,
        status: 'PENDING',
        created_at: '2024-01-19T11:00:00Z',
        investorName: 'Sarah Smith',
        investorEmail: 'sarah@example.com',
        investorPhone: '+254 712 345 678',
        landownerName: 'Gasabo Co-op',
        landownerEmail: 'john@example.com',
        intendedCrop: 'Specialty Arabica Coffee',
        paymentTerms: 'Annual Advance via TerraFund Escrow',
        notes: 'We intend to establish organic washed coffee processing and drip irrigation for 4.2 Hectares.',
        escrowStatus: 'SECURED_IN_ESCROW',
        milestones: [
          { step: 1, title: 'Contract Execution & Escrow Lock', completed: true, date: '2024-01-19' },
          { step: 2, title: 'Land Site Handover & Soil Audit', completed: false, date: 'Pending' },
          { step: 3, title: 'Season 1 Planting & Irrigation Setup', completed: false, date: 'Pending' },
          { step: 4, title: 'First Harvest Yield Profit Split', completed: false, date: 'Pending' },
        ],
      },
      '2': {
        id: '2',
        landId: '2',
        landTitle: 'Musanze Organic Tea & Farm Estate',
        landLocation: 'Musanze, Northern Province',
        proposedAmount: '$85,000',
        proposedDurationMonths: 60,
        status: 'ACCEPTED',
        created_at: '2024-01-12T09:30:00Z',
        investorName: 'David K. AgroFund',
        investorEmail: 'david@agrofund.com',
        investorPhone: '+250 788 999 888',
        landownerName: 'Alice Johnson',
        landownerEmail: 'alice@example.com',
        intendedCrop: 'Highland Tea & Organic Potato',
        paymentTerms: 'Bi-Annual Installments via Escrow',
        notes: 'Long-term 5-year lease proposal with modern cold storage facility installation.',
        escrowStatus: 'FUNDS_RELEASED_STEP_1',
        milestones: [
          { step: 1, title: 'Contract Execution & Escrow Lock', completed: true, date: '2024-01-12' },
          { step: 2, title: 'Land Site Handover & Soil Audit', completed: true, date: '2024-01-15' },
          { step: 3, title: 'Season 1 Planting & Irrigation Setup', completed: false, date: 'In Progress' },
          { step: 4, title: 'First Harvest Yield Profit Split', completed: false, date: 'Pending' },
        ],
      },
    };

    const proposal = proposalData[id] || {
      id,
      landId: '1',
      landTitle: `Lease Proposal #${id}`,
      landLocation: 'Eastern Province, Rwanda',
      proposedAmount: '$38,000',
      proposedDurationMonths: 24,
      status: 'PENDING',
      created_at: new Date().toISOString(),
      investorName: 'GreenEarth Ventures',
      investorEmail: 'info@greenearth.com',
      investorPhone: '+250 788 111 222',
      landownerName: 'Robert Mukasa',
      landownerEmail: 'robert@example.com',
      intendedCrop: 'Hass Avocado',
      paymentTerms: 'Annual Escrow Milestone Release',
      notes: 'Agricultural lease proposal focused on export-quality Hass Avocado orchard development.',
      escrowStatus: 'AWAITING_DEPOSIT',
      milestones: [
        { step: 1, title: 'Contract Execution & Escrow Lock', completed: false, date: 'Pending' },
        { step: 2, title: 'Land Site Handover & Soil Audit', completed: false, date: 'Pending' },
        { step: 3, title: 'Season 1 Planting & Irrigation Setup', completed: false, date: 'Pending' },
      ],
    };

    return NextResponse.json({
      success: true,
      data: proposal,
      proposal,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch proposal details' },
      { status: 500 }
    );
  }
}