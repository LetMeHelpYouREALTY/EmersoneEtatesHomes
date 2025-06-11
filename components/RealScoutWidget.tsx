
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
          min-height: 400px;
          position: relative;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 12px;
          overflow: hidden;
        }
        
        realscout-office-listings {
          --rs-listing-divider-color: rgb(101, 141, 172);
          --rs-primary-color: #2563eb;
          --rs-secondary-color: #1e40af;
          width: 100%;
          display: block;
          min-height: 400px;
        }
        
        .loading-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          color: #6b7280;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className={`widget-container ${className}`}>
        <div className="loading-placeholder">
          <div className="spinner"></div>
          <p>Loading luxury properties...</p>
          <small>Powered by RealScout</small>
        </div>
        
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
