
import React, { useEffect, useState } from 'react';

interface RealScoutWidgetProps {
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  className?: string;
}

const RealScoutWidget: React.FC<RealScoutWidgetProps> = ({
  agentEncodedId = "QWdlbnQtMjI1MDUw",
  sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  listingStatus = "For Sale",
  propertyTypes = "SFR,MF",
  className = ""
}) => {
  const [isClient, setIsClient] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if widget script is loaded
    const checkWidget = () => {
      if (typeof window !== 'undefined' && window.customElements) {
        const isDefined = window.customElements.get('realscout-office-listings');
        if (isDefined) {
          setWidgetLoaded(true);
        } else {
          // Try again after a short delay
          setTimeout(checkWidget, 500);
        }
      }
    };

    checkWidget();
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className={`realscout-placeholder ${className}`} style={{ minHeight: '400px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading property listings...</p>
      </div>
    );
  }

  return (
    <div className={`realscout-container ${className}`}>
      {widgetLoaded ? (
        <realscout-office-listings
          agent-encoded-id={agentEncodedId}
          sort-order={sortOrder}
          listing-status={listingStatus}
          property-types={propertyTypes}
        />
      ) : (
        <div className="realscout-loading" style={{ minHeight: '400px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Loading RealScout widget...</p>
        </div>
      )}
    </div>
  );
};

export default RealScoutWidget;
