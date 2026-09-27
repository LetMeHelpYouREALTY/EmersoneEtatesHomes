import type { AnalyticsEventPayload, PropertyViewData } from './domain';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    ga?: (...args: unknown[]) => void;
    trackAnalyticsEvent?: (payload: AnalyticsEventPayload) => void;
    trackPropertyView?: (propertyId: string, propertyData: PropertyViewData) => void;
    trackAnalytics?: {
      trackEvent: (payload: AnalyticsEventPayload) => void;
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly NEXT_PUBLIC_SITE_URL?: string;
      readonly NEXT_PUBLIC_GA_ID?: string;
      readonly NEXT_PUBLIC_GTM_ID?: string;
      readonly NEXT_PUBLIC_STREAM_ID?: string;
      readonly NEXT_PUBLIC_STREAM_URL?: string;
      readonly NEXT_PUBLIC_REALSCOUT_API_KEY?: string;
      readonly NEXT_PUBLIC_REALSCOUT_AGENT_ID?: string;
      readonly CONTACT_EMAIL?: string;
      readonly SMTP_HOST?: string;
      readonly SMTP_PORT?: string;
      readonly SMTP_USER?: string;
      readonly SMTP_PASS?: string;
    }
  }
}

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

export {};
