import { NextRequest, NextResponse } from 'next/server';

const mockBookmarks = [
  { id: '1', landId: '1', title: 'Coffee Farm Plot #5', addedAt: '2025-11-20T10:00:00Z' },
  { id: '2', landId: '3', title: 'Fruit Orchard #8', addedAt: '2025-11-19T15:30:00Z' },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockBookmarks,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newBookmark = {
    id: Date.now().toString(),
    ...body,
    addedAt: new Date().toISOString(),
  };

  mockBookmarks.push(newBookmark);

  return NextResponse.json({
    success: true,
    data: newBookmark,
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const index = mockBookmarks.findIndex(b => b.id === id);
  if (index > -1) {
    mockBookmarks.splice(index, 1);
  }

  return NextResponse.json({
    success: true,
    message: 'Bookmark removed',
  });
}