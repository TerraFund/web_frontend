import { NextResponse } from 'next/server';

const defaultSettings = {
  platform: {
    name: 'TerraFund',
    description: 'Decentralized Land Investment Platform',
    contactEmail: 'admin@terrafund.com',
    supportEmail: 'support@terrafund.com',
  },
  security: {
    sessionTimeout: 30,
    passwordMinLength: 8,
    twoFactorRequired: false,
    ipWhitelist: '',
  },
  payments: {
    escrowFee: 2.5,
    platformFee: 5.0,
    minInvestment: 1000,
    maxInvestment: 100000,
    currency: 'USD',
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    disputeAlerts: true,
    systemAlerts: true,
  },
  features: {
    aiRecommendations: true,
    disputeResolution: true,
    escrowService: true,
    kycRequired: true,
  },
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: defaultSettings,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const updates = await request.json();

    // In a real app, this would update the database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: { ...defaultSettings, ...updates },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}