import React, { useEffect, useState } from 'react';

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return;

    // Wait for the RealScout script to load
    const checkWidget = () => {
      if (window.customElements && window.customElements.get('realscout-office-listings')) {
        setIsLoaded(true);
      } else {
        // Retry after a short delay
        setTimeout(checkWidget, 500);
      }
    };

    // Start checking after a short delay to allow script to load
    const timer = setTimeout(checkWidget, 1000);

    // Set error state after 10 seconds if still not loaded
    const errorTimer = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(errorTimer);
    };
  }, [isLoaded]);

  // Don't render on server side to prevent hydration mismatch
  if (typeof window === 'undefined') {
    return (
      <div className={className} style={{ minHeight: '400px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading property listings...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={className} style={{ minHeight: '400px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <div>
          <h3>Property Listings Temporarily Unavailable</h3>
          <p>Please contact us directly for current listings:</p>
          <p><strong>(702) 555-HOMES</strong></p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={className} style={{ minHeight: '400px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading property listings...</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {React.createElement('realscout-office-listings', {
        'agent-encoded-id': agentEncodedId,
        'sort-order': sortOrder,
        'listing-status': listingStatus,
        'property-types': propertyTypes
      })}
    </div>
  );
}

export default RealScoutWidget;