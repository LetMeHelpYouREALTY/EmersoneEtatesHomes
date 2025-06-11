import React from 'react';

interface RealScoutWidgetProps {
  className?: string;
}

declare global {
  interface JSXIntrinsicElements {
    'realscout-office-listings': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      'agent-encoded-id'?: string;
      'sort-order'?: string;
      'listing-status'?: string;
      'property-types'?: string;
    }, HTMLElement>;
  }
}

const RealScoutWidget: React.FC<RealScoutWidgetProps> = ({ className = '' }) => {
  return (
    <div className={`realscout-widget ${className}`}>
      <realscout-office-listings
        agent-encoded-id="QWdlbnQtMjI1MDUw"
        sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
        listing-status="For Sale"
        property-types="SFR,MF"
      />

      <style jsx>{`
        .realscout-widget {
          width: 100%;
          min-height: 400px;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default RealScoutWidget;