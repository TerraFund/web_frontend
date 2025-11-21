import { NextResponse } from 'next/server';

const mockRegions = [
  {
    id: '1',
    name: 'Central Kenya',
    code: 'CK',
    description: 'Fertile central highlands with excellent agricultural potential',
    landCount: 25,
    averagePrice: 1500, // per acre
    climate: 'Temperate',
    soilType: 'Volcanic',
    coordinates: [-0.0236, 37.9062],
  },
  {
    id: '2',
    name: 'Rift Valley',
    code: 'RV',
    description: 'Diverse landscapes from lakes to mountains',
    landCount: 20,
    averagePrice: 1200,
    climate: 'Semi-arid to temperate',
    soilType: 'Mixed',
    coordinates: [-0.1022, 35.5296],
  },
  {
    id: '3',
    name: 'Western Kenya',
    code: 'WK',
    description: 'Lush western region with high rainfall',
    landCount: 18,
    averagePrice: 1300,
    climate: 'Tropical',
    soilType: 'Fertile alluvial',
    coordinates: [0.5143, 34.5970],
  },
  {
    id: '4',
    name: 'Coast Region',
    code: 'CR',
    description: 'Coastal areas with diverse ecosystems',
    landCount: 15,
    averagePrice: 1000,
    climate: 'Tropical coastal',
    soilType: 'Sandy to clay',
    coordinates: [-4.0435, 39.6682],
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockRegions,
  });
}