
import React, { useState } from 'react';
import Script from 'next/script';

interface RealScoutWidgetProps {
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  className?: string;
}

function RealScoutWidget({ 
  agentEncodedId = process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID || "QWdlbnQtMjI1MDUw",
  sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE", 
  listingStatus = "For Sale",
  propertyTypes = "SFR,MF,TH",
  className = ""
}: RealScoutWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  return (
    <>
      <Script
        src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
        strategy="afterInteractive"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      
      <style jsx>{`
        .widget-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #ffffff;
        }
        
        realscout-office-listings {
          --rs-listing-divider-color: rgb(101, 141, 172);
          --rs-primary-color: #2563eb;
          --rs-secondary-color: #1e40af;
          width: 100%;
          display: block;
          margin: 0;
          padding: 0;
        }

        .widget-loading,
        .widget-error {
          text-align: center;
          padding: 3rem 2rem;
          background: #f8fafc;
          border-radius: 12px;
          border: 2px dashed #cbd5e1;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .widget-error h3 {
          color: #dc2626;
          margin-bottom: 1rem;
        }

        .error-cta {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: #1e40af;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          transition: background 0.3s ease;
        }

        .error-cta:hover {
          background: #1e3a8a;
        }
      `}</style>

      <div className={`widget-container ${className}`}>
        {isLoading && (
          <div className="widget-loading">
            <div className="loading-spinner"></div>
            <p>Loading property listings...</p>
          </div>
        )}
        
        {hasError && (
          <div className="widget-error">
            <h3>Unable to load property listings</h3>
            <p>Please contact us directly for available properties.</p>
            <a href="/contact" className="error-cta">Contact Us</a>
          </div>
        )}
        
        {!hasError && (
          React.createElement('realscout-office-listings', {
            'agent-encoded-id': agentEncodedId,
            'sort-order': sortOrder,
            'listing-status': listingStatus,
            'property-types': propertyTypes
          })
        )}
      </div>
    </>
  );
}

export default RealScoutWidget;
