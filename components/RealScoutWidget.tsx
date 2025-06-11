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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={className} style={{
        minHeight: '400px',
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px'
      }}>
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