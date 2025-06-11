
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': {
        'agent-encoded-id'?: string;
        'sort-order'?: string;
        'listing-status'?: string;
        'property-types'?: string;
        children?: React.ReactNode;
      };
    }
  }
}

export {};
