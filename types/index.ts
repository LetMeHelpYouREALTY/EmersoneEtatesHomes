
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

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  url?: string;
  pathname?: string;
}

export interface ApiErrorResponse {
  message: string;
  success: false;
  error?: string;
}

export interface ApiSuccessResponse<T = any> {
  message: string;
  success: true;
  data?: T;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface LayoutProps {
  children: React.ReactNode;
}

export interface RealScoutWidgetProps {
  className?: string;
}
