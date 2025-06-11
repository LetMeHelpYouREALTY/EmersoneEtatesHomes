
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Extend the global namespace
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly NEXT_PUBLIC_SITE_URL?: string;
      readonly REALSCOUT_API_KEY?: string;
    }
  }

  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Module declarations for assets
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

export {};
