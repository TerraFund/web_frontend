import { NextResponse } from 'next/server';

// In-memory array for demo persistence
const mockLands = [
  {
    id: '1',
    title: 'Highland Organic Coffee Estate',
    name: 'Highland Organic Coffee Estate',
    location: 'Huye District, Southern Province',
    region: 'Southern Province',
    size: 45.5,
    annual_price: 18500,
    price_per_ha: 406,
    crop_suitability: 'Arabica Coffee, Macadamia, Tea',
    soil_quality: 'Volcanic Loam (pH 6.2)',
    soil_ph: '6.2',
    water_source: 'Natural Spring & Drip System',
    irrigation_type: 'Solar Drip Irrigation',
    elevation: 1750,
    rainfall: '1400mm/yr',
    status: 'VERIFIED',
    verified: true,
    published: true,
    owner_name: 'Geofrey Kayin',
    owner_id: 'landowner-1',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    description: 'Prime agricultural highland estate with rich volcanic soil, optimal altitude for Arabica coffee, and integrated drip irrigation infrastructure.',
    documents_verified: true,
    created_at: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    title: 'Rift Valley Commercial Maize & Soybean Plot',
    name: 'Rift Valley Commercial Maize & Soybean Plot',
    location: 'Nyagatare, Eastern Province',
    region: 'Eastern Province',
    size: 120.0,
    annual_price: 32000,
    price_per_ha: 266,
    crop_suitability: 'Hybrid Maize, Soybean, Sunflower',
    soil_quality: 'Clay Loam (pH 6.8)',
    soil_ph: '6.8',
    water_source: 'River Canal & Center Pivot',
    irrigation_type: 'Center Pivot',
    elevation: 1350,
    rainfall: '950mm/yr',
    status: 'VERIFIED',
    verified: true,
    published: true,
    owner_name: 'John Doe',
    owner_id: 'landowner-2',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80',
    description: 'Flat, high-yield mechanized farming terrain with direct river canal access and pivot irrigation suitability.',
    documents_verified: true,
    created_at: '2024-02-01T10:30:00Z',
  },
  {
    id: '3',
    title: 'Musanze Premium Avocado & Horticulture Valley',
    name: 'Musanze Premium Avocado & Horticulture Valley',
    location: 'Musanze, Northern Province',
    region: 'Northern Province',
    size: 28.0,
    annual_price: 14200,
    price_per_ha: 507,
    crop_suitability: 'Hass Avocado, French Beans, Snow Peas',
    soil_quality: 'Volcanic Soil (pH 6.4)',
    soil_ph: '6.4',
    water_source: 'Borehole & Rain Catchment',
    irrigation_type: 'Micro Sprinklers',
    elevation: 1850,
    rainfall: '1600mm/yr',
    status: 'PENDING_VERIFICATION',
    verified: false,
    published: true,
    owner_name: 'Geofrey Kayin',
    owner_id: 'landowner-1',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
    description: 'Export-grade horticulture land equipped with cold-chain storage access points and high organic matter content.',
    documents_verified: false,
    created_at: '2024-02-20T14:15:00Z',
  },
  {
    id: '4',
    title: 'Bugesera Solar Farm & Smart Greenhouse Zone',
    name: 'Bugesera Solar Farm & Smart Greenhouse Zone',
    location: 'Bugesera, Eastern Province',
    region: 'Eastern Province',
    size: 60.0,
    annual_price: 21500,
    price_per_ha: 358,
    crop_suitability: 'Greenhouse Tomatoes, Peppers, Melons',
    soil_quality: 'Sandy Loam (pH 6.5)',
    soil_ph: '6.5',
    water_source: 'Lake Intake & Solar Pump',
    irrigation_type: 'Automated Drip',
    elevation: 1300,
    rainfall: '900mm/yr',
    status: 'LEASED',
    verified: true,
    published: true,
    owner_name: 'Geofrey Kayin',
    owner_id: 'landowner-1',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80',
    description: 'Fully fenced commercial agricultural parcel with smart greenhouse kits and 50kW solar irrigation pumps installed.',
    documents_verified: true,
    created_at: '2024-03-02T11:00:00Z',
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const myLands = searchParams.get('myLands');
    const ownerId = searchParams.get('ownerId');
    const status = searchParams.get('status');

    let filtered = [...mockLands];

    if (myLands === 'true' || ownerId) {
      // Return lands belonging to default landowner or matched ownerId
      const targetOwner = ownerId || 'landowner-1';
      filtered = filtered.filter(l => l.owner_id === targetOwner || l.owner_name.includes('Kayin'));
    }

    if (status && status !== 'ALL') {
      filtered = filtered.filter(l => l.status === status);
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length,
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

    const newLand = {
      id: `land-${Date.now()}`,
      title: body.name || body.title || 'New Agricultural Land Plot',
      name: body.name || body.title || 'New Agricultural Land Plot',
      location: body.location || `${body.region || 'Eastern Province'}, Rwanda`,
      region: body.region || 'Eastern Province',
      size: parseFloat(body.size) || 10,
      annual_price: parseFloat(body.annualPrice || body.annual_price) || 12000,
      price_per_ha: Math.round((parseFloat(body.annualPrice || body.annual_price) || 12000) / (parseFloat(body.size) || 10)),
      crop_suitability: body.recommendedCrops || body.crop_suitability || 'Maize, Beans, Vegetables',
      soil_quality: body.soilType ? `${body.soilType} (pH ${body.soilPh || '6.5'})` : 'Rich Fertile Loam',
      soil_ph: body.soilPh || '6.5',
      water_source: body.waterSource || 'Borehole & Rain Catchment',
      irrigation_type: body.irrigationType || 'Drip System',
      elevation: parseInt(body.elevation) || 1500,
      rainfall: body.rainfall || '1200mm/yr',
      status: 'PENDING_VERIFICATION',
      verified: false,
      published: true,
      owner_name: 'Geofrey Kayin',
      owner_id: 'landowner-1',
      image: body.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      description: body.description || 'Newly submitted agricultural land plot ready for verification and lease opportunities.',
      documents_verified: body.documentsUploaded || false,
      created_at: new Date().toISOString(),
    };

    // Prepend to mock lands list
    mockLands.unshift(newLand);

    return NextResponse.json({
      success: true,
      message: 'Land listing submitted successfully and queued for verification!',
      data: newLand,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process land submission' },
      { status: 500 }
    );
  }
}