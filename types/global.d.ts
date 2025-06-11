
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
    RealScout?: {
      initWidget?: (config: Record<string, unknown>) => void;
    };
  }
  
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_SITE_URL?: string;
      VERCEL_URL?: string;
    }
  }
}

export {};
