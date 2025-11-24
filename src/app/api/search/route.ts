import { NextRequest, NextResponse } from 'next/server';

const mockLands = [
  {
    id: '1',
    title: 'Coffee Farm Plot #5',
    location: 'Kigali City',
    size: 25,
    cropSuitability: 'Coffee, Tea',
  },
  {
    id: '2',
    title: 'Maize Field #12',
    location: 'Northern Province',
    size: 50,
    cropSuitability: 'Maize, Beans',
  },
  {
    id: '3',
    title: 'Fruit Orchard #8',
    location: 'Southern Province',
    size: 15,
    cropSuitability: 'Mangoes, Avocados',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';
  const minSize = searchParams.get('minSize') ? parseInt(searchParams.get('minSize')!) : 0;
  const maxSize = searchParams.get('maxSize') ? parseInt(searchParams.get('maxSize')!) : Infinity;

  let results = mockLands;

  if (query) {
    results = results.filter(land =>
      land.title.toLowerCase().includes(query.toLowerCase()) ||
      land.cropSuitability.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (location) {
    results = results.filter(land =>
      land.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  results = results.filter(land => land.size >= minSize && land.size <= maxSize);

  return NextResponse.json({
    success: true,
    data: results,
    total: results.length,
  });
}