import React, { useEffect, useState } from 'react';

interface RealScoutWidgetProps {
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  className?: string;
}

export default function RealScoutWidget({
  agentEncodedId = "QWdlbnQtMjI1MDUw",
  sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  listingStatus = "For Sale",
  propertyTypes = "SFR,MF",
  className = ""
}: RealScoutWidgetProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Load RealScout script if not already loaded
    if (!document.querySelector('script[src*="realscout-web-components"]')) {
      const script = document.createElement('script');
      script.src = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
      script.type = 'module';
      script.async = true;
      script.onload = () => {
        setTimeout(() => setIsLoaded(true), 1000);
      };
      document.head.appendChild(script);

      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        realscout-office-listings {
          --rs-listing-divider-color: rgb(101, 141, 172);
          width: 100%;
          display: block;
          min-height: 400px;
        }
      `;
      document.head.appendChild(style);
    } else {
      setIsLoaded(true);
    }
  }, []);

  // Don't render on server side
  if (!isClient) {
    return (
      <div 
        className={className} 
        style={{ 
          minHeight: '400px', 
          background: '#f8f9fa', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid #e1e5e9',
          borderRadius: '8px'
        }}
      >
        <p>Loading property listings...</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div 
        className={className} 
        style={{ 
          minHeight: '400px', 
          background: '#f8f9fa', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid #e1e5e9',
          borderRadius: '8px'
        }}
      >
        <p>Loading property listings...</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <realscout-office-listings
        agent-encoded-id={agentEncodedId}
        sort-order={sortOrder}
        listing-status={listingStatus}
        property-types={propertyTypes}
      />
    </div>
  );
}