import { NextResponse } from 'next/server';

// Mock data - in real app this would come from database
const mockLands = [
  {
    id: '1',
    title: 'Coffee Farm Plot #5',
    location: 'Kigali City',
    size: 25,
    crop_suitability: 'Coffee, Tea',
    soil_quality: 'Excellent',
    water_source: 'River',
    elevation: 1800,
    status: 'published',
    verified: true,
    published: true,
  },
  {
    id: '2',
    title: 'Maize Field #12',
    location: 'Rift Valley',
    size: 50,
    crop_suitability: 'Maize, Beans',
    soil_quality: 'Good',
    water_source: 'Well',
    elevation: 1500,
    status: 'published',
    verified: true,
    published: true,
  },
];

export async function GET() {
  try {
    // In real app, fetch from database with filters
    return NextResponse.json({
      success: true,
      data: mockLands,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lands' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // In real app, validate and save to database
    const newLand = {
      id: Date.now().toString(),
      ...body,
      status: 'draft',
      verified: false,
      published: false,
    };

    return NextResponse.json({
      success: true,
      data: newLand,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create land' },
      { status: 500 }
    );
  }
}