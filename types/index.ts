
// Global type definitions for the project

export interface PropertyListing {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  address: string;
  images: string[];
  description: string;
  features: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyInterest?: string;
}

export interface AgentInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  bio: string;
  image: string;
  credentials: string[];
}

export interface CommunityAmenity {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'recreation' | 'wellness' | 'dining' | 'business';
}

export interface MarketData {
  averagePrice: number;
  medianPrice: number;
  pricePerSqFt: number;
  monthsSupply: number;
  daysOnMarket: number;
  lastUpdated: string;
}
