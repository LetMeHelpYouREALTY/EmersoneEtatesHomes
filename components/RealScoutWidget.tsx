

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

interface RealScoutWidgetProps {
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  className?: string;
}

// Create a client-only component to avoid hydration issues
const ClientOnlyRealScoutWidget: React.FC<RealScoutWidgetProps> = ({
  agentEncodedId = "QWdlbnQtMjI1MDUw",
  sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  listingStatus = "For Sale",
  propertyTypes = "SFR,MF",
  className = ""
}) => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    // Ensure widget script is loaded
    const checkWidget = () => {
      if (typeof window !== 'undefined' && window.customElements) {
        const isDefined = window.customElements.get('realscout-office-listings');
        if (isDefined) {
          setWidgetLoaded(true);
        } else {
          // Retry after delay
          setTimeout(checkWidget, 1000);
        }
      }
    };

    checkWidget();
  }, []);

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
        <div 
          className="realscout-loading" 
          style={{ 
            minHeight: '400px', 
            backgroundColor: '#f5f5f5', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid #e0e0e0',
            borderRadius: '8px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 10px 0', color: '#666' }}>Loading property listings...</p>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '3px solid #f3f3f3', 
              borderTop: '3px solid #3498db', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Export as dynamic component with no SSR
const RealScoutWidget = dynamic(() => Promise.resolve(ClientOnlyRealScoutWidget), {
  ssr: false,
  loading: () => (
    <div 
      className="realscout-placeholder" 
      style={{ 
        minHeight: '400px', 
        backgroundColor: '#f5f5f5', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px solid #e0e0e0',
        borderRadius: '8px'
      }}
    >
      <p style={{ color: '#666' }}>Initializing property listings...</p>
    </div>
  )
});

export default RealScoutWidget;
