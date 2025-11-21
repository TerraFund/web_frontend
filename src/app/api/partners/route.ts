import { NextResponse } from 'next/server';

const mockPartners = [
  {
    id: '1',
    name: 'Kenya Forest Service',
    type: 'Government',
    description: 'National forest conservation and management authority',
    logo: '/partners/kfs.png',
    website: 'https://kfs.go.ke',
    projects: 12,
    impact: '50000 hectares protected',
  },
  {
    id: '2',
    name: 'World Wildlife Fund',
    type: 'NGO',
    description: 'Global conservation organization',
    logo: '/partners/wwf.png',
    website: 'https://wwf.org',
    projects: 8,
    impact: '25000 tons CO2 sequestered',
  },
  {
    id: '3',
    name: 'Carbon Trade Exchange',
    type: 'Private',
    description: 'Carbon credit trading platform',
    logo: '/partners/cte.png',
    website: 'https://carbontrade.com',
    projects: 15,
    impact: '$2M in carbon credits traded',
  },
  {
    id: '4',
    name: 'Agricultural Research Institute',
    type: 'Research',
    description: 'Agricultural research and development',
    logo: '/partners/ari.png',
    website: 'https://ari.go.ke',
    projects: 6,
    impact: 'Improved crop yields by 25%',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockPartners,
  });
}