declare namespace JSX {
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

declare global {
  interface Window {
    customElements: CustomElementRegistry;
  }

  interface CustomElementRegistry {
    get(name: string): CustomElementConstructor | undefined;
    define(name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void;
    upgrade(root: Node): void;
    whenDefined(name: string): Promise<CustomElementConstructor>;
  }
}

export {};