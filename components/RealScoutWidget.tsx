
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';

interface RealScoutWidgetProps {
  className?: string;
}

interface Property {
  id: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  image: string;
  features: string[];
  status: 'active' | 'pending' | 'sold';
}

const RealScoutWidget: React.FC<RealScoutWidgetProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending'>('all');

  // Sample properties for demonstration
  const sampleProperties: Property[] = [
    {
      id: '1',
      price: '$650,000',
      beds: 3,
      baths: 2.5,
      sqft: 2100,
      address: '2583 Regency Cove Ct, Las Vegas, NV 89121',
      image: '/design 05_new 2_1749651606209.jpg',
      features: ['Gated Community', 'Pool Access', 'Modern Kitchen', 'Walk-in Closets'],
      status: 'active'
    },
    {
      id: '2',
      price: '$750,000',
      beds: 4,
      baths: 3,
      sqft: 2800,
      address: '2590 Emerson Estates Dr, Las Vegas, NV 89121',
      image: '/Best BHHS LOgo_1749650714182.jpg',
      features: ['Master Suite', 'Granite Counters', '3-Car Garage', 'Covered Patio'],
      status: 'active'
    },
    {
      id: '3',
      price: '$850,000',
      beds: 4,
      baths: 3.5,
      sqft: 3200,
      address: '2595 Luxury Lane, Las Vegas, NV 89121',
      image: '/new-logo.jpg',
      features: ['Wine Cellar', 'Home Theater', 'Guest Casita', 'Resort-Style Pool'],
      status: 'pending'
    }
  ];

  const filteredProperties = filterStatus === 'all' 
    ? sampleProperties 
    : sampleProperties.filter(prop => prop.status === filterStatus);

  useEffect(() => {
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

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'property_view', {
        event_category: 'engagement',
        event_label: property.id
      });
    }
  };

  const handleContactAgent = (propertyId: string) => {
    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_request', {
        event_category: 'conversion',
        event_label: propertyId
      });
    }
    
    // Redirect to contact form with property info
    window.location.href = `/contact?property=${propertyId}`;
  };

  if (hasError || !agentId) {
    return (
      <div className={`realscout-widget ${className}`} data-analytics="property">
        <div className="widget-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="widget-header"
          >
            <h2>Featured Properties in Emerson Estates</h2>
            <p>Discover luxury homes in Las Vegas' premier community</p>
          </motion.div>

          <div className="filter-bar">
            <div className="filter-buttons">
              {['all', 'active', 'pending'].map((status) => (
                <button
                  key={status}
                  className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                  onClick={() => setFilterStatus(status as any)}
                >
                  {status === 'all' ? 'All Properties' : status.charAt(0).toUpperCase() + status.slice(1)}
                  <span className="count">
                    ({status === 'all' ? sampleProperties.length : sampleProperties.filter(p => p.status === status).length})
                  </span>
                </button>
              ))}
            </div>
            
            <div className="search-controls">
              <input 
                type="text" 
                placeholder="Search by address..." 
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>
          </div>

          <div className="properties-grid">
            <AnimatePresence>
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`property-card ${property.status}`}
                  onClick={() => handlePropertyClick(property)}
                >
                  <div className="property-image">
                    <img src={property.image} alt={property.address} />
                    <div className="status-badge">{property.status}</div>
                    <div className="favorite-btn">♡</div>
                  </div>
                  
                  <div className="property-content">
                    <div className="property-price">{property.price}</div>
                    <div className="property-specs">
                      <span>{property.beds} bed</span>
                      <span>{property.baths} bath</span>
                      <span>{property.sqft.toLocaleString()} sq ft</span>
                    </div>
                    <div className="property-address">{property.address}</div>
                    
                    <div className="property-features">
                      {property.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="feature-tag">{feature}</span>
                      ))}
                      {property.features.length > 2 && (
                        <span className="feature-more">+{property.features.length - 2} more</span>
                      )}
                    </div>

                    <div className="property-actions">
                      <button 
                        className="action-btn primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactAgent(property.id);
                        }}
                      >
                        Contact Agent
                      </button>
                      <button className="action-btn secondary">
                        Schedule Tour
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProperties.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="no-properties"
            >
              <div className="no-properties-icon">🏠</div>
              <h3>No properties found</h3>
              <p>Try adjusting your filters or check back later for new listings.</p>
            </motion.div>
          )}

          <div className="widget-footer">
            <div className="contact-info">
              <h4>Ready to Find Your Dream Home?</h4>
              <p>Our experienced agents are here to help you navigate the Emerson Estates market.</p>
              <div className="contact-buttons">
                <a href="/contact" className="contact-btn primary">
                  Contact Our Team
                </a>
                <a href="tel:+17025551234" className="contact-btn secondary">
                  Call (702) 555-1234
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Property Modal */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="property-modal-overlay"
              onClick={() => setSelectedProperty(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="property-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="modal-close"
                  onClick={() => setSelectedProperty(null)}
                >
                  ×
                </button>
                
                <div className="modal-image">
                  <img src={selectedProperty.image} alt={selectedProperty.address} />
                </div>
                
                <div className="modal-content">
                  <div className="modal-header">
                    <h2>{selectedProperty.price}</h2>
                    <div className="modal-specs">
                      <span>{selectedProperty.beds} beds</span>
                      <span>{selectedProperty.baths} baths</span>
                      <span>{selectedProperty.sqft.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                  
                  <p className="modal-address">{selectedProperty.address}</p>
                  
                  <div className="modal-features">
                    <h4>Features & Amenities</h4>
                    <div className="features-list">
                      {selectedProperty.features.map((feature, idx) => (
                        <span key={idx} className="feature-item">✓ {feature}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    <button 
                      className="modal-btn primary"
                      onClick={() => handleContactAgent(selectedProperty.id)}
                    >
                      Contact Agent
                    </button>
                    <button className="modal-btn secondary">
                      Schedule Tour
                    </button>
                    <button className="modal-btn tertiary">
                      Calculate Payment
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx>{`
          .realscout-widget {
            min-height: 600px;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }

          .widget-container {
            padding: 2rem;
          }

          .widget-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .widget-header h2 {
            color: #1e40af;
            font-size: 2.25rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .widget-header p {
            color: #64748b;
            font-size: 1.1rem;
          }

          .filter-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            gap: 1rem;
          }

          .filter-buttons {
            display: flex;
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 0.75rem 1.5rem;
            border: 2px solid #e5e7eb;
            background: white;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .filter-btn:hover,
          .filter-btn.active {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            border-color: #1e40af;
          }

          .count {
            background: rgba(255,255,255,0.2);
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.75rem;
          }

          .search-controls {
            display: flex;
            gap: 0.5rem;
          }

          .search-input {
            padding: 0.75rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            min-width: 200px;
          }

          .search-btn {
            padding: 0.75rem 1rem;
            background: #1e40af;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }

          .properties-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          }

          .property-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            border: 2px solid transparent;
          }

          .property-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
            border-color: #3b82f6;
          }

          .property-card.pending {
            opacity: 0.8;
          }

          .property-image {
            height: 220px;
            position: relative;
            overflow: hidden;
          }

          .property-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .property-card:hover .property-image img {
            transform: scale(1.05);
          }

          .status-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
          }

          .property-card.active .status-badge {
            background: #10b981;
          }

          .property-card.pending .status-badge {
            background: #f59e0b;
          }

          .favorite-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.3s ease;
          }

          .favorite-btn:hover {
            background: #ef4444;
            color: white;
          }

          .property-content {
            padding: 1.5rem;
          }

          .property-price {
            font-size: 1.75rem;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 0.5rem;
          }

          .property-specs {
            display: flex;
            gap: 1rem;
            color: #64748b;
            margin-bottom: 0.75rem;
            font-weight: 500;
          }

          .property-address {
            color: #9ca3af;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            line-height: 1.4;
          }

          .property-features {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .feature-tag {
            background: #e0f2fe;
            color: #0369a1;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.75rem;
            font-weight: 500;
          }

          .feature-more {
            background: #f1f5f9;
            color: #64748b;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.75rem;
          }

          .property-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }

          .action-btn {
            padding: 0.75rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            font-size: 0.9rem;
          }

          .action-btn.primary {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            border: none;
          }

          .action-btn.secondary {
            background: white;
            color: #1e40af;
            border: 2px solid #e5e7eb;
          }

          .action-btn:hover {
            transform: translateY(-1px);
          }

          .no-properties {
            text-align: center;
            padding: 4rem 2rem;
            color: #64748b;
          }

          .no-properties-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }

          .widget-footer {
            background: #f8fafc;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
          }

          .contact-info h4 {
            color: #1e40af;
            margin-bottom: 0.5rem;
          }

          .contact-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1.5rem;
          }

          .contact-btn {
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.3s ease;
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

          .contact-btn:hover {
            transform: translateY(-2px);
          }

          /* Property Modal Styles */
          .property-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 2rem;
          }

          .property-modal {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
          }

          .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            background: rgba(0,0,0,0.8);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            z-index: 1001;
          }

          .modal-image {
            height: 300px;
            overflow: hidden;
          }

          .modal-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .modal-content {
            padding: 2rem;
          }

          .modal-header {
            margin-bottom: 1rem;
          }

          .modal-header h2 {
            color: #1e40af;
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }

          .modal-specs {
            display: flex;
            gap: 1.5rem;
            color: #64748b;
            font-weight: 500;
          }

          .modal-address {
            color: #9ca3af;
            margin-bottom: 2rem;
            font-size: 1.1rem;
          }

          .modal-features h4 {
            color: #1e40af;
            margin-bottom: 1rem;
          }

          .features-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.5rem;
            margin-bottom: 2rem;
          }

          .feature-item {
            color: #059669;
            font-weight: 500;
          }

          .modal-actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }

          .modal-btn {
            padding: 1rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .modal-btn.primary {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            border: none;
          }

          .modal-btn.secondary {
            background: white;
            color: #1e40af;
            border: 2px solid #1e40af;
          }

          .modal-btn.tertiary {
            background: #f1f5f9;
            color: #64748b;
            border: 2px solid #e5e7eb;
          }

          @media (max-width: 768px) {
            .filter-bar {
              flex-direction: column;
              gap: 1rem;
            }

            .properties-grid {
              grid-template-columns: 1fr;
            }

            .contact-buttons {
              flex-direction: column;
            }

            .search-controls {
              width: 100%;
            }

            .search-input {
              flex: 1;
              min-width: auto;
            }

            .modal-actions {
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
          <div className="loading-animation">
            <div className="loading-house">🏠</div>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
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
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 500px;
          padding: 2rem;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .loading-animation {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }

        .loading-house {
          font-size: 4rem;
          animation: bounce 2s infinite;
        }

        .loading-dots {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .loading-dots span {
          width: 12px;
          height: 12px;
          background: #3b82f6;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: 0.3s;
        }

        .loading-dots span:nth-child(3) {
          animation-delay: 0.6s;
        }

        .loading-state p {
          color: #64748b;
          font-size: 1.2rem;
          font-weight: 500;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default RealScoutWidget;
