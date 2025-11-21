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