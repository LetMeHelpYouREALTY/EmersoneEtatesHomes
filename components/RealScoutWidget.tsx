import React from 'react';

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