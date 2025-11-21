import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { action } = await request.json();
    const { id } = params;

    // Mock proposal update
    let status = 'pending';
    if (action === 'accept') status = 'accepted';
    if (action === 'reject') status = 'rejected';
    if (action === 'cancel') status = 'cancelled';

    return NextResponse.json({
      success: true,
      data: { id, status },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update proposal' },
      { status: 500 }
    );
  }
}