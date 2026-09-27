export interface RealScoutProperty {
  readonly id: string;
  readonly address: string;
  readonly price: number;
  readonly bedrooms: number;
  readonly bathrooms: number;
  readonly squareFootage: number;
  readonly imageUrl?: string;
  readonly listingDate: string;
  readonly status: 'active' | 'pending' | 'sold';
  readonly propertyType: 'single-family' | 'condo' | 'townhouse' | 'land';
  readonly description?: string;
  readonly features?: readonly string[];
}

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly message: string;
  readonly propertyId?: string;
  readonly inquiryType: 'general' | 'property' | 'selling' | 'buying';
}

export interface MarketStatistics {
  readonly averagePrice: number;
  readonly medianPrice: number;
  readonly daysOnMarket: number;
  readonly totalListings: number;
  readonly soldThisMonth: number;
  readonly priceGrowth: number;
  readonly lastUpdated: string;
}

export interface AgentInfo {
  readonly name: string;
  readonly title: string;
  readonly email: string;
  readonly phone: string;
  readonly bio: string;
  readonly photoUrl: string;
  readonly licenseNumber: string;
  readonly yearsExperience: number;
  readonly specialties: readonly string[];
  readonly achievements: readonly string[];
}

export interface SEOMetaData {
  readonly title: string;
  readonly description: string;
  readonly keywords?: readonly string[];
  readonly canonicalUrl?: string;
  readonly ogImage?: string;
  readonly ogType?: string;
  readonly twitterCard?: 'summary' | 'summary_large_image';
}

export type AnalyticsEventPayload = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, unknown>;
};

export type PropertyViewData = {
  type?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
};
