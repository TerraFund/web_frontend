import { NextResponse } from 'next/server';

const mockCategories = [
  {
    id: '1',
    name: 'Agricultural Land',
    description: 'Land suitable for farming and crop cultivation',
    count: 45,
    subcategories: ['Coffee Farms', 'Maize Fields', 'Fruit Orchards', 'Vegetable Gardens'],
  },
  {
    id: '2',
    name: 'Forest Land',
    description: 'Forested areas for conservation and timber',
    count: 23,
    subcategories: ['Natural Forests', 'Plantations', 'Conservation Areas'],
  },
  {
    id: '3',
    name: 'Pasture Land',
    description: 'Grasslands suitable for livestock grazing',
    count: 18,
    subcategories: ['Grasslands', 'Savannas', 'Meadows'],
  },
  {
    id: '4',
    name: 'Mixed Use',
    description: 'Land with multiple potential uses',
    count: 12,
    subcategories: ['Agroforestry', 'Integrated Farms', 'Recreational'],
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockCategories,
  });
}