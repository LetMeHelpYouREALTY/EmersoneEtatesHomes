
import React, { useState, useEffect } from 'react';
import Script from 'next/script';

interface RealScoutWidgetProps {
  className?: string;
}

const RealScoutWidget: React.FC<RealScoutWidgetProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [agentId, setAgentId] = useState<string | null>(null);

  useEffect(() => {
    // Get agent ID from environment variables
    const envAgentId = process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID;
    
    if (!envAgentId) {
      console.warn('RealScout Agent ID not configured in environment variables');
      setHasError(true);
      setIsLoading(false);
      return;
    }

    setAgentId(envAgentId);
    
    // Simulate loading time for widget initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleScriptLoad = () => {
    console.log('RealScout script loaded successfully');
    setIsLoading(false);
  };

  const handleScriptError = () => {
    console.error('Failed to load RealScout script');
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError || !agentId) {
    return (
      <div className={`realscout-widget ${className}`}>
        <div className="widget-placeholder">
          <div className="placeholder-content">
            <div className="placeholder-icon">🏠</div>
            <h3>Property Listings Coming Soon</h3>
            <p>
              We're setting up our property search integration. In the meantime, 
              please contact us directly to view available homes in Emerson Estates.
            </p>
            <div className="contact-buttons">
              <a href="/contact" className="contact-btn primary">
                Contact Us
              </a>
              <a href="tel:+17025551234" className="contact-btn secondary">
                Call Now
              </a>
            </div>
            
            {/* Sample Properties Display */}
            <div className="sample-properties">
              <h4>Featured Properties</h4>
              <div className="property-grid">
                <div className="property-card">
                  <div className="property-image-placeholder"></div>
                  <div className="property-info">
                    <div className="property-price">$650,000</div>
                    <div className="property-details">3 bed • 2 bath • 2,100 sq ft</div>
                    <div className="property-address">Emerson Estates, Las Vegas, NV</div>
                  </div>
                </div>
                <div className="property-card">
                  <div className="property-image-placeholder"></div>
                  <div className="property-info">
                    <div className="property-price">$750,000</div>
                    <div className="property-details">4 bed • 3 bath • 2,800 sq ft</div>
                    <div className="property-address">Emerson Estates, Las Vegas, NV</div>
                  </div>
                </div>
                <div className="property-card">
                  <div className="property-image-placeholder"></div>
                  <div className="property-info">
                    <div className="property-price">$850,000</div>
                    <div className="property-details">4 bed • 3.5 bath • 3,200 sq ft</div>
                    <div className="property-address">Emerson Estates, Las Vegas, NV</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .realscout-widget {
            min-height: 500px;
            background: white;
            border-radius: 12px;
            overflow: hidden;
          }

          .widget-placeholder {
            padding: 3rem 2rem;
            text-align: center;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .placeholder-content {
            max-width: 800px;
          }

          .placeholder-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }

          .placeholder-content h3 {
            color: #1e40af;
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .placeholder-content p {
            color: #64748b;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
          }

          .contact-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 3rem;
          }

          .contact-btn {
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.3s ease;
          }

          .contact-btn:hover {
            transform: translateY(-2px);
          }

          .contact-btn.primary {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
          }

          .contact-btn.secondary {
            background: white;
            color: #1e40af;
            border: 2px solid #1e40af;
          }

          .sample-properties {
            text-align: left;
          }

          .sample-properties h4 {
            color: #1e40af;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .property-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .property-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }

          .property-card:hover {
            transform: translateY(-3px);
          }

          .property-image-placeholder {
            height: 180px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
          }

          .property-image-placeholder::after {
            content: '🏠';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
          }

          .property-info {
            padding: 1.5rem;
          }

          .property-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 0.5rem;
          }

          .property-details {
            color: #64748b;
            margin-bottom: 0.5rem;
          }

          .property-address {
            color: #9ca3af;
            font-size: 0.9rem;
          }

          @media (max-width: 768px) {
            .contact-buttons {
              flex-direction: column;
              align-items: center;
            }

            .property-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`realscout-widget ${className}`}>
      {isLoading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading property listings...</p>
        </div>
      )}

      <Script
        src={`https://api.realscout.com/widgets/${agentId}.js`}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        strategy="afterInteractive"
      />

      <div 
        id="realscout-widget-container"
        style={{ display: isLoading ? 'none' : 'block' }}
      ></div>

      <style jsx>{`
        .realscout-widget {
          min-height: 500px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 500px;
          padding: 2rem;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        .loading-state p {
          color: #64748b;
          font-size: 1.1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RealScoutWidget;
