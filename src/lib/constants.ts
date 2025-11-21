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

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  PROPOSAL: 'proposal',
  PAYMENT: 'payment',
  CONTRACT: 'contract',
  SYSTEM: 'system',
  MARKETING: 'marketing',
} as const;

// File Types
export const FILE_TYPES = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  CONTRACT: 'contract',
  CERTIFICATE: 'certificate',
} as const;

// Carbon Credit Status
export const CARBON_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  TRADED: 'traded',
  RETIRED: 'retired',
} as const;

// Subscription Types
export const SUBSCRIPTION_TYPES = {
  FREE: 'free',
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

// Report Types
export const REPORT_TYPES = {
  FINANCIAL: 'financial',
  CARBON: 'carbon',
  SUSTAINABILITY: 'sustainability',
  PERFORMANCE: 'performance',
} as const;