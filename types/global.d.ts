
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }

  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly NEXT_PUBLIC_SITE_URL?: string;
      readonly NEXT_PUBLIC_GA_ID?: string;
      readonly NEXT_PUBLIC_REALSCOUT_API_KEY?: string;
      readonly CONTACT_EMAIL?: string;
      readonly SMTP_HOST?: string;
      readonly SMTP_PORT?: string;
      readonly SMTP_USER?: string;
      readonly SMTP_PASS?: string;
    }
  }
}

declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.ico' {
  const src: string;
  export default src;
}

interface RealScoutProperty {
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

interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly message: string;
  readonly propertyId?: string;
  readonly inquiryType: 'general' | 'property' | 'selling' | 'buying';
}

interface MarketStatistics {
  readonly averagePrice: number;
  readonly medianPrice: number;
  readonly daysOnMarket: number;
  readonly totalListings: number;
  readonly soldThisMonth: number;
  readonly priceGrowth: number;
  readonly lastUpdated: string;
}

interface AgentInfo {
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

interface SEOMetaData {
  readonly title: string;
  readonly description: string;
  readonly keywords?: readonly string[];
  readonly canonicalUrl?: string;
  readonly ogImage?: string;
  readonly ogType?: string;
  readonly twitterCard?: 'summary' | 'summary_large_image';
}

export {};
