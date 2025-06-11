
import React, { useEffect, useState, useRef } from 'react';

interface RealScoutWidgetProps {
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  className?: string;
}

declare global {
  interface Window {
    customElements: CustomElementRegistry;
  }
}

function RealScoutWidget({ 
  agentEncodedId = "QWdlbnQtMjI1MDUw",
  sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  listingStatus = "For Sale",
  propertyTypes = "SFR,MF",
  className = ""
}: RealScoutWidgetProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const widgetRef = useRef<HTMLDivElement>(null);
  const maxRetries = 3;

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let mounted = true;
    let checkInterval: NodeJS.Timeout;
    let errorTimeout: NodeJS.Timeout;

    const checkWidgetAvailability = () => {
      try {
        if (typeof window !== 'undefined' && 
            window.customElements && 
            window.customElements.get('realscout-office-listings')) {
          
          if (mounted) {
            setIsLoaded(true);
            setHasError(false);
          }
          return true;
        }
        return false;
      } catch (error) {
        console.warn('RealScout widget check failed:', error);
        return false;
      }
    };

    const initializeWidget = () => {
      // Initial check
      if (checkWidgetAvailability()) {
        return;
      }

      // Set up periodic checking
      checkInterval = setInterval(() => {
        if (checkWidgetAvailability()) {
          clearInterval(checkInterval);
        }
      }, 1000);

      // Set error timeout
      errorTimeout = setTimeout(() => {
        if (mounted && !isLoaded && retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          setHasError(false);
          // Retry initialization
          setTimeout(initializeWidget, 2000);
        } else if (mounted && !isLoaded) {
          setHasError(true);
        }
      }, 8000);
    };

    // Start initialization after a short delay
    const initTimeout = setTimeout(initializeWidget, 500);

    return () => {
      mounted = false;
      clearInterval(checkInterval);
      clearTimeout(errorTimeout);
      clearTimeout(initTimeout);
    };
  }, [isClient, retryCount, isLoaded]);

  // Server-side rendering fallback
  if (!isClient) {
    return (
      <div 
        className={className} 
        style={{ 
          minHeight: '400px', 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '8px',
          border: '1px solid #e1e5e9'
        }}
      >
        <div style={{ textAlign: 'center', color: '#666' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 10px'
          }}></div>
          <p>Loading property listings...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div 
        className={className} 
        style={{ 
          minHeight: '400px', 
          background: '#f8f9fa', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: 'center', 
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}
      >
        <div>
          <h3 style={{ color: '#495057', marginBottom: '1rem' }}>
            Property Listings Temporarily Unavailable
          </h3>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            We're experiencing technical difficulties with our property widget.
          </p>
          <p style={{ color: '#495057', fontWeight: 'bold' }}>
            For current listings, please call: <br />
            <a href="tel:7025554637" style={{ color: '#007bff', textDecoration: 'none' }}>
              (702) 555-HOMES
            </a>
          </p>
          <button 
            onClick={() => {
              setHasError(false);
              setRetryCount(0);
              setIsLoaded(false);
            }}
            style={{
              marginTop: '1rem',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (!isLoaded) {
    return (
      <div 
        className={className} 
        style={{ 
          minHeight: '400px', 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '8px',
          border: '1px solid #e1e5e9'
        }}
      >
        <div style={{ textAlign: 'center', color: '#666' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 10px'
          }}></div>
          <p>Loading property listings{retryCount > 0 ? ` (attempt ${retryCount + 1})` : ''}...</p>
        </div>
      </div>
    );
  }

  // Render the actual widget
  return (
    <div className={className} ref={widgetRef}>
      <realscout-office-listings
        agent-encoded-id={agentEncodedId}
        sort-order={sortOrder}
        listing-status={listingStatus}
        property-types={propertyTypes}
      />
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default RealScoutWidget;
