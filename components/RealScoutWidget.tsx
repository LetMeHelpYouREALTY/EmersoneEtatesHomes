
import React, { useEffect } from 'react';

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
  useEffect(() => {
    // Ensure the script is loaded
    if (!document.querySelector('script[src*="realscout-web-components"]')) {
      const script = document.createElement('script');
      script.src = 'https://em.realscout.com/widgets/realscout-web-components.umd.js';
      script.type = 'module';
      document.head.appendChild(script);
    }

    // Add CSS if not already present
    if (!document.querySelector('style[data-realscout-styles]')) {
      const style = document.createElement('style');
      style.setAttribute('data-realscout-styles', 'true');
      style.textContent = `
        realscout-office-listings {
          --rs-listing-divider-color: rgb(101, 141, 172);
          width: 100%;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

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
