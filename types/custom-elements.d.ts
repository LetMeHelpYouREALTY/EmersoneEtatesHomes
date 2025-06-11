
declare namespace JSX {
  interface IntrinsicElements {
    'realscout-widget-embed': {
      id?: string;
      'widget-id'?: string;
      className?: string;
      children?: React.ReactNode;
    } & React.HTMLAttributes<HTMLElement>;
    'realscout-office-listings': {
      'agent-encoded-id'?: string;
      'sort-order'?: string;
      'listing-status'?: string;
      'property-types'?: string;
      className?: string;
      children?: React.ReactNode;
    } & React.HTMLAttributes<HTMLElement>;
  }
}

// Alternative: If using React 18+ with module declaration
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-widget-embed': {
        id?: string;
        'widget-id'?: string;
        className?: string;
        children?: React.ReactNode;
      } & React.HTMLAttributes<HTMLElement>;
      'realscout-office-listings': {
        'agent-encoded-id'?: string;
        'sort-order'?: string;
        'listing-status'?: string;
        'property-types'?: string;
        className?: string;
        children?: React.ReactNode;
      } & React.HTMLAttributes<HTMLElement>;
    }
  }
}
