
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-widget-embed': {
        id?: string;
        'widget-id'?: string;
        'agent-encoded-id'?: string;
        'sort-order'?: string;
        'listing-status'?: string;
        'property-types'?: string;
        children?: React.ReactNode;
        [key: string]: any;
      } & React.HTMLAttributes<HTMLElement>;
      'realscout-office-listings': {
        'agent-encoded-id'?: string;
        'sort-order'?: string;
        'listing-status'?: string;
        'property-types'?: string;
        children?: React.ReactNode;
        [key: string]: any;
      } & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export {};
