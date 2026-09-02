import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Mock detailed land metadata
    const landData: Record<string, any> = {
      '1': {
        id: '1',
        title: 'Kigali Prime Volcanic Agricultural Plot #1',
        location: 'Gasabo District, Kigali Province',
        coordinates: '1°56\'24.8"S 30°03\'35.9"E',
        sizeInHectares: 4.5,
        pricePerHectare: 8500,
        leasePricePerYear: 35000,
        soilType: 'Fertile Volcanic Loam',
        soilPh: 6.4,
        organicMatter: '4.8%',
        waterAccess: 'Perennial Stream & Drip Irrigation Infrastructure',
        cropSuitability: ['Specialty Arabica Coffee', 'Export Maize', 'Organic Beans'],
        verified: true,
        titleDeedNumber: 'UPI 1/02/14/03/88421',
        ownerName: 'John Doe (Gasabo Co-op)',
        ownerEmail: 'john@example.com',
        ownerPhone: '+250 788 123 456',
        description: 'Prime agricultural land situated on gentle volcanic slopes in Gasabo. Ideal for high-value export crops with established water access and road infrastructure.',
        images: [
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
        ],
        agronomyReport: {
          nitrogenContent: 'High (0.24%)',
          phosphorusContent: 'Optimal (35 ppm)',
          potassiumContent: 'Rich (210 ppm)',
          drainageScore: '92 / 100',
          historicalYield: '4.2 Tons / Ha (2023)',
        },
      },
      '2': {
        id: '2',
        title: 'Musanze Highland Tea & Farm Estate #3',
        location: 'Musanze District, Northern Province',
        coordinates: '1°29\'58.2"S 29°38\'04.1"E',
        sizeInHectares: 10.2,
        pricePerHectare: 12000,
        leasePricePerYear: 75000,
        soilType: 'Highland Alluvial Humus',
        soilPh: 5.8,
        organicMatter: '5.6%',
        waterAccess: 'Natural River Spring & High Rainfall Belt',
        cropSuitability: ['Highland Tea', 'Export Pyrethrum', 'Irish Potatoes'],
        verified: true,
        titleDeedNumber: 'UPI 2/01/08/04/99102',
        ownerName: 'Alice Johnson',
        ownerEmail: 'alice@example.com',
        ownerPhone: '+250 785 987 654',
        description: 'High-altitude fertile estate located at the foothills of Musanze. Exceptional cool climate soil ideal for tea, pyrethrum, and horticulture.',
        images: [
          'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        ],
        agronomyReport: {
          nitrogenContent: 'Optimal (0.21%)',
          phosphorusContent: 'High (42 ppm)',
          potassiumContent: 'Optimal (195 ppm)',
          drainageScore: '95 / 100',
          historicalYield: '6.8 Tons / Ha (2023)',
        },
      },
    };

    const land = landData[id] || {
      id,
      title: `Agricultural Plot #${id}`,
      location: 'Eastern Province, Rwanda',
      coordinates: '2°04\'12.1"S 30°25\'18.4"E',
      sizeInHectares: 6.0,
      pricePerHectare: 7500,
      leasePricePerYear: 45000,
      soilType: 'Clay Loam',
      soilPh: 6.2,
      organicMatter: '4.1%',
      waterAccess: 'Borehole & Rainwater Harvesting',
      cropSuitability: ['Hass Avocado', 'Vegetables', 'Chili'],
      verified: true,
      titleDeedNumber: `UPI 3/04/11/02/${id}000`,
      ownerName: 'Robert Mukasa',
      ownerEmail: 'robert@example.com',
      ownerPhone: '+250 788 000 111',
      description: 'Extensive agricultural plot suited for commercial fruit tree cultivation and modern greenhouse farming.',
      images: [
        'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      ],
      agronomyReport: {
        nitrogenContent: 'Optimal (0.18%)',
        phosphorusContent: 'Optimal (30 ppm)',
        potassiumContent: 'Rich (180 ppm)',
        drainageScore: '88 / 100',
        historicalYield: '5.1 Tons / Ha (2023)',
      },
    };

    return NextResponse.json({
      success: true,
      data: land,
      land,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch land details' },
      { status: 500 }
    );
  }
}
