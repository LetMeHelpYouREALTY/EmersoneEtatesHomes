
import React, { useEffect, useState } from 'react';
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
  const [isClient, setIsClient] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`${className} animate-pulse bg-gray-200 h-96 rounded-lg flex items-center justify-center`}>
        <p className="text-gray-500">Loading property listings...</p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      
      <style jsx>{`
        realscout-office-listings {
          --rs-listing-divider-color: rgb(101, 141, 172);
          width: 100%;
          display: block;
          min-height: 400px;
        }
      `}</style>

      <div className={className}>
        {scriptLoaded && React.createElement('realscout-office-listings', {
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
