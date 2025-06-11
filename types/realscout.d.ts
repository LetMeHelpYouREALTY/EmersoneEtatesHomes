
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-widget-embed': {
        id?: string;
        'widget-id'?: string;
        [key: string]: any;
      };
      'realscout-office-listings': {
        'agent-encoded-id'?: string;
        'sort-order'?: string;
        'listing-status'?: string;
        'property-types'?: string;
        [key: string]: any;
      };
    }
  }
}

export {};
