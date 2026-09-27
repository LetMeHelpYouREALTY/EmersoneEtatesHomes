import React, { useEffect, useRef, useState, memo } from 'react';

interface RealScoutWidgetProps {
  agentId?: string;
  className?: string;
}

const RealScoutWidget: React.FC<RealScoutWidgetProps> = memo(({
  agentId = process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID || 'M2U5NGQ0NzctNTI2ZS00YjQzLTliZmUtNGYwNzYxNjY1ZWJj',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const widgetIdRef = useRef(`realscout-widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const container = containerRef.current;
    let script: HTMLScriptElement;

    const loadWidget = () => {
      if (!document.getElementById('realscout-widget-script')) {
        script = document.createElement('script');
        script.src = 'https://widget.realscout.com/office.js';
        script.async = true;
        script.id = 'realscout-widget-script';
        script.onerror = () => {
          setError('Failed to load RealScout widget script.');
          setIsLoaded(false);
        };

        document.body.appendChild(script);
      } else {
        script = document.getElementById('realscout-widget-script') as HTMLScriptElement;
      }

      script.onload = () => {
        if (container) {
          const widgetContainer = document.createElement('realscout-office-listings');
          widgetContainer.setAttribute('agent-encoded-id', agentId);
          widgetContainer.setAttribute('sort-order', 'STATUS_AND_SIGNIFICANT_CHANGE');
          widgetContainer.setAttribute('listing-status', 'For Sale');
          widgetContainer.setAttribute('property-types', 'SFR,MF');
          widgetContainer.id = widgetIdRef.current;

          container.innerHTML = '';
          container.appendChild(widgetContainer);

          setIsLoaded(true);
        }
      };
    };

    if (!isLoaded && !error) {
      loadWidget();
    }

    const handleMutations = (mutations: MutationRecord[]) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-rs-loaded') {
          if (container && mutation.target instanceof HTMLElement) {
            setIsLoaded(true);
          }
        }
      });
    };

    const observer = new MutationObserver(handleMutations);

    if (container) {
      observer.observe(container, {
        attributes: true,
        attributeFilter: ['data-rs-loaded'],
        childList: false,
        subtree: true
      });
    }

    return () => {
      if (script && script.parentNode) {
        script.onload = null;
        script.onerror = null;
      }

      if (container) {
        container.innerHTML = '';
      }

      observer.disconnect();
    };
  }, [agentId, error, isLoaded]);

  return (
    <div className={`realscout-widget-container ${className}`} key={widgetIdRef.current}>
      {error ? (
        <div className="widget-error">
          <h3>Unable to load property listings</h3>
          <p>{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setIsLoaded(false);
            }}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div 
            ref={containerRef}
            id={widgetIdRef.current}
            className="realscout-widget-content"
            style={{ 
              minHeight: '600px',
              background: isLoaded ? 'transparent' : '#f8f9fa',
              borderRadius: '8px',
              position: 'relative'
            }}
          />
          {!isLoaded && (
            <div className="widget-loading">
              <div className="loading-spinner"></div>
              <p>Loading property listings...</p>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .realscout-widget-container {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          position: relative;
        }

        .widget-error {
          padding: 20px;
          text-align: center;
          color: #777;
        }

        .retry-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }

        .widget-loading {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 8px;
        }

        .loading-spinner {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 2s linear infinite;
          margin-bottom: 10px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
});

RealScoutWidget.displayName = 'RealScoutWidget';

export default RealScoutWidget;