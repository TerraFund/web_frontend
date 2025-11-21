// TypeScript type definitions for TerraFund platform
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'landowner' | 'investor' | 'admin';
  kyc_status: 'pending' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
}

// Land types
export interface Land {
  id: string;
  owner_id: string;
  location: string;
  size: number;
  crop_suitability: string;
  soil_quality: string;
  water_source: string;
  elevation: number;
  status: 'draft' | 'published' | 'sold';
  verified: boolean;
  published: boolean;
}

// Proposal types
export interface Proposal {
  id: string;
  investor_id: string;
  land_id: string;
  amount: number;
  duration: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  created_at: string;
}

// Chat types
export interface Chat {
  id: string;
  user1_id: string;
  user2_id: string;
  proposal_id: string;
  last_message: string;
}

export interface Message {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  timestamp: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form types
export interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'landowner' | 'investor';
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface LandForm {
  name: string;
  size: string;
  coordinates: string;
  region: string;
  soilType: string;
  elevation: string;
  waterSource: string;
  recommendedCrops: string;
  irrigationType: string;
  rainfall: string;
  soilPh: string;
  fertilityIndex: string;
}

// UI State types
export type Theme = 'light' | 'dark';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';