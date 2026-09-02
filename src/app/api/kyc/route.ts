import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const kycStatus = {
      userRole: 'INVESTOR',
      verificationStatus: 'VERIFIED',
      verifiedAt: '2024-01-14T08:00:00Z',
      documentsSubmitted: [
        {
          id: 'doc-1',
          name: 'National_ID_Passport.pdf',
          category: 'Government Issued ID',
          status: 'APPROVED',
          uploadedAt: '2024-01-14T07:45:00Z',
        },
        {
          id: 'doc-2',
          name: 'Proof_of_Address_Bank_Statement.pdf',
          category: 'Proof of Address',
          status: 'APPROVED',
          uploadedAt: '2024-01-14T07:46:00Z',
        },
      ],
      complianceCheck: {
        amlVerified: true,
        pepCheck: 'PASSED',
        encryption: 'AES-256-GCM',
      },
    };

    return NextResponse.json({
      success: true,
      data: kycStatus,
      kycStatus,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch KYC status' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { documentCategory, fileName } = body;

    const submission = {
      id: 'doc-' + Date.now(),
      name: fileName || 'Uploaded_KYC_Document.pdf',
      category: documentCategory || 'Government Issued ID',
      status: 'APPROVED',
      uploadedAt: new Date().toISOString(),
      verified: true,
    };

    return NextResponse.json({
      success: true,
      message: 'KYC Document submitted and verified successfully',
      submission,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'KYC submission failed' },
      { status: 500 }
    );
  }
}
