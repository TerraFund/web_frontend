import { NextRequest, NextResponse } from 'next/server';

const mockVerification = {
  status: 'pending', // pending, approved, rejected
  submittedAt: '2025-11-15T08:00:00Z',
  documents: [
    { type: 'id_card', status: 'approved', submittedAt: '2025-11-15T08:00:00Z' },
    { type: 'proof_of_address', status: 'pending', submittedAt: '2025-11-15T08:05:00Z' },
  ],
  notes: 'Additional document required for proof of address',
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockVerification,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Mock document upload
  const newDoc = {
    type: body.type,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };

  mockVerification.documents.push(newDoc);

  return NextResponse.json({
    success: true,
    data: mockVerification,
  });
}