import { NextResponse } from 'next/server';

const mockSustainability = {
  global: {
    totalCarbonSequestered: 1250000, // tons CO2
    activeProjects: 89,
    averageSequesteredPerAcre: 15.2,
    topProjects: [
      { id: '1', name: 'Coffee Farm Reforestation', sequestered: 25000 },
      { id: '2', name: 'Maize Field Conservation', sequestered: 18000 },
    ],
  },
  user: {
    personalContribution: 1250, // tons CO2
    projectsSupported: 3,
    certificates: [
      { id: '1', amount: 500, issued: '2025-10-01', status: 'active' },
      { id: '2', amount: 750, issued: '2025-11-01', status: 'active' },
    ],
    impact: {
      treesPlanted: 1250,
      hectaresProtected: 25,
      biodiversityScore: 8.5,
    },
  },
  calculator: {
    factors: {
      treeType: { coffee: 12, acacia: 8, pine: 6 },
      soilType: { volcanic: 1.2, alluvial: 1.0, sandy: 0.8 },
      rainfall: { high: 1.3, medium: 1.0, low: 0.7 },
    },
    estimateCarbon: (area: number, treeType: string, soilType: string, rainfall: string) => {
      const base = 10; // tons per acre per year
      const treeFactor = mockSustainability.calculator.factors.treeType[treeType as keyof typeof mockSustainability.calculator.factors.treeType] || 1;
      const soilFactor = mockSustainability.calculator.factors.soilType[soilType as keyof typeof mockSustainability.calculator.factors.soilType] || 1;
      const rainFactor = mockSustainability.calculator.factors.rainfall[rainfall as keyof typeof mockSustainability.calculator.factors.rainfall] || 1;
      return Math.round(area * base * treeFactor * soilFactor * rainFactor);
    },
  },
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockSustainability,
  });
}