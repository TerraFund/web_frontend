import { NextRequest, NextResponse } from 'next/server';

const mockWeather = {
  location: 'Central Kenya',
  coordinates: [-0.0236, 37.9062],
  current: {
    temperature: 22,
    humidity: 65,
    precipitation: 0,
    windSpeed: 5,
    condition: 'Partly cloudy',
    lastUpdated: '2025-11-21T12:00:00Z',
  },
  forecast: [
    {
      date: '2025-11-22',
      temperature: { min: 18, max: 26 },
      condition: 'Sunny',
      precipitation: 0,
    },
    {
      date: '2025-11-23',
      temperature: { min: 19, max: 25 },
      condition: 'Light rain',
      precipitation: 20,
    },
    {
      date: '2025-11-24',
      temperature: { min: 17, max: 24 },
      condition: 'Cloudy',
      precipitation: 10,
    },
  ],
  seasonal: {
    rainfall: 'Moderate',
    temperature: 'Temperate',
    growingSeason: 'Year-round with peaks in April-May and October-November',
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  // Mock location-based weather
  if (lat && lng) {
    mockWeather.coordinates = [parseFloat(lat), parseFloat(lng)];
  }

  return NextResponse.json({
    success: true,
    data: mockWeather,
  });
}