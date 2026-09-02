import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const transactions = [
      {
        id: 'tx-101',
        type: 'ESCROW_DEPOSIT',
        channel: 'MTN Mobile Money',
        channelDetails: '+250 788 123 456',
        amount: 35000,
        status: 'COMPLETED',
        date: '2024-01-15T10:30:00Z',
        description: 'Annual Lease Escrow Deposit for Gasabo Coffee & Grain Plot #1',
        contractId: 'C-88421',
        reference: 'MOMO-88492019',
      },
      {
        id: 'tx-102',
        type: 'MILESTONE_RELEASE',
        channel: 'Escrow Release',
        channelDetails: 'TerraFund Smart Contract',
        amount: 15000,
        status: 'COMPLETED',
        date: '2024-01-18T14:15:00Z',
        description: 'Milestone 1 Payout: Land Handover & Soil Preparation Audit',
        contractId: 'C-88421',
        reference: 'ESCROW-REL-002',
      },
      {
        id: 'tx-103',
        type: 'ESCROW_LOCK',
        channel: 'Visa Card',
        channelDetails: '**** 4242',
        amount: 50000,
        status: 'LOCKED_IN_ESCROW',
        date: '2024-01-20T09:45:00Z',
        description: '5-Year Lease Escrow Lock for Musanze Organic Tea Estate',
        contractId: 'C-99102',
        reference: 'CARD-VISA-9912',
      },
      {
        id: 'tx-104',
        type: 'REVENUE_PAYOUT',
        channel: 'Airtel Money',
        channelDetails: '+250 733 987 654',
        amount: 4200,
        status: 'COMPLETED',
        date: '2024-01-25T16:20:00Z',
        description: 'Monthly Harvest Profit Distribution',
        contractId: 'C-88421',
        reference: 'AIRTEL-771029',
      },
    ];

    const walletSummary = {
      availableBalance: 38500,
      escrowLockedFunds: 85000,
      totalLeaseEarnings: 12400,
      currency: 'USD',
    };

    return NextResponse.json({
      success: true,
      data: {
        transactions,
        walletSummary,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payments data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, channel, phoneOrCard, contractId } = body;

    if (!amount || !channel) {
      return NextResponse.json(
        { success: false, error: 'Amount and payment channel are required' },
        { status: 400 }
      );
    }

    const newTransaction = {
      id: 'tx-' + Date.now(),
      type: 'ESCROW_DEPOSIT',
      channel,
      channelDetails: phoneOrCard || '+250 788 000 000',
      amount: Number(amount),
      status: 'COMPLETED',
      date: new Date().toISOString(),
      description: `Escrow Deposit for Contract ${contractId || '#C-LOCAL'}`,
      contractId: contractId || 'C-LOCAL',
      reference: `${channel.toUpperCase().replace(/\s+/g, '')}-${Date.now()}`,
    };

    return NextResponse.json({
      success: true,
      message: 'Deposit processed and funds locked in escrow',
      transaction: newTransaction,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}