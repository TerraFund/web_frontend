import { NextResponse } from 'next/server';

const mockRegions = [
  {
    id: '1',
    name: 'Kigali City',
    code: 'KG',
    description: 'Urban center with surrounding agricultural lands',
    landCount: 25,
    averagePrice: 1500, // per acre
    climate: 'Temperate',
    soilType: 'Volcanic',
    coordinates: [-1.9403, 29.8739],
  },
  {
    id: '2',
    name: 'Northern Province',
    code: 'NP',
    description: 'Mountainous region with volcanic soil and coffee cultivation',
    landCount: 20,
    averagePrice: 1200,
    climate: 'Temperate',
    soilType: 'Volcanic',
    coordinates: [-1.6761, 29.2320],
  },
  {
    id: '3',
    name: 'Southern Province',
    code: 'SP',
    description: 'Agricultural heartland with fertile plains',
    landCount: 18,
    averagePrice: 1300,
    climate: 'Temperate',
    soilType: 'Fertile alluvial',
    coordinates: [-2.1734, 29.6333],
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