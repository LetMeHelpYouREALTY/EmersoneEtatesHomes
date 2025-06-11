
import React from 'react';
import Script from 'next/script';

interface RealScoutWidgetProps {
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  className?: string;
}

function RealScoutWidget({ 
  agentEncodedId = "QWdlbnQtMjI1MDUw",
  sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  listingStatus = "For Sale",
  propertyTypes = "SFR,MF",
  className = ""
}: RealScoutWidgetProps) {
  return (
    <>
      <Script
        src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
        strategy="afterInteractive"
      />
      
      <style jsx>{`
        .widget-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #ffffff;
        }
        
        realscout-office-listings {
          --rs-listing-divider-color: rgb(101, 141, 172);
          --rs-primary-color: #2563eb;
          --rs-secondary-color: #1e40af;
          width: 100%;
          display: block;
          margin: 0;
          padding: 0;
        }
      `}</style>

      <div className={`widget-container ${className}`}>
        {React.createElement('realscout-office-listings', {
          'agent-encoded-id': agentEncodedId,
          'sort-order': sortOrder,
          'listing-status': listingStatus,
          'property-types': propertyTypes
        })}
      </div>
    </>
  );
}

export default RealScoutWidget;
