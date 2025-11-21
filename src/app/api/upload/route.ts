import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Mock file upload
  // In real app, handle multipart form data and upload to S3 or similar

  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({
      success: false,
      error: 'No file provided',
    }, { status: 400 });
  }

  // Mock upload response
  const mockUpload = {
    id: Date.now().toString(),
    filename: file.name,
    size: file.size,
    type: file.type,
    url: `https://storage.example.com/uploads/${file.name}`,
    uploadedAt: new Date().toISOString(),
  };

  return NextResponse.json({
    success: true,
    data: mockUpload,
  });
}