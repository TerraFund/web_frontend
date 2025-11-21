// API Constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Mapbox
export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// User Roles
export const USER_ROLES = {
  LANDOWNER: 'landowner',
  INVESTOR: 'investor',
  ADMIN: 'admin',
} as const;

// Land Status
export const LAND_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  SOLD: 'sold',
} as const;

// Proposal Status
export const PROPOSAL_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const;

// KYC Status
export const KYC_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const;

// Regions
export const KENYA_REGIONS = [
  'Central',
  'Coast',
  'Eastern',
  'Nairobi',
  'North Eastern',
  'Nyanza',
  'Rift Valley',
  'Western',
] as const;

// Soil Types
export const SOIL_TYPES = [
  'Clay',
  'Sandy',
  'Loam',
  'Silt',
  'Peat',
  'Chalk',
] as const;

// Water Sources
export const WATER_SOURCES = [
  'River',
  'Lake',
  'Well',
  'Rainwater',
  'Irrigation',
  'Dam',
] as const;

// Crop Types
export const CROP_TYPES = [
  'Maize',
  'Coffee',
  'Tea',
  'Beans',
  'Rice',
  'Wheat',
  'Potatoes',
  'Tomatoes',
  'Mangoes',
  'Avocados',
] as const;

// Irrigation Types
export const IRRIGATION_TYPES = [
  'Rainfed',
  'Drip Irrigation',
  'Sprinkler',
  'Flood Irrigation',
  'Furrow',
] as const;