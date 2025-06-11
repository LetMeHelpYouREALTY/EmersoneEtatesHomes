
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
        strategy="beforeInteractive"
      />
      
      <style jsx>{`
        realscout-office-listings {
          --rs-listing-divider-color: rgb(101, 141, 172);
          width: 100%;
        }
      `}</style>

      <div className={className}>
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
