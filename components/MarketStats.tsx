import React, { useState, useEffect, useMemo } from 'react';

interface MarketStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  description: string;
}

interface MarketStatsProps {
  className?: string;
  showTitle?: boolean;
  animated?: boolean;
}

const MarketStats: React.FC<MarketStatsProps> = ({
  className = '',
  showTitle = true,
  animated = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  const marketStats = useMemo<MarketStat[]>(() => [
    {
      label: 'Median Home Price',
      value: '$485,000',
      change: '+5.2%',
      trend: 'up',
      icon: '🏠',
      description: 'Year over year growth in Las Vegas luxury market'
    },
    {
      label: 'Days on Market',
      value: '28 days',
      change: '-12%',
      trend: 'down',
      icon: '📅',
      description: 'Average time luxury homes stay on market'
    },
    {
      label: 'Inventory Level',
      value: '2.1 months',
      change: 'stable',
      trend: 'stable',
      icon: '📊',
      description: 'Current supply of available luxury homes'
    },
    {
      label: 'Price per Sq Ft',
      value: '$185',
      change: '+3.8%',
      trend: 'up',
      icon: '📐',
      description: 'Average price per square foot in premium areas'
    },
    {
      label: 'Sold Properties',
      value: '247',
      change: '+15.3%',
      trend: 'up',
      icon: '✅',
      description: 'Luxury homes sold this quarter'
    },
    {
      label: 'Market Activity',
      value: 'Very Active',
      change: '+8.7%',
      trend: 'up',
      icon: '⚡',
      description: 'Current buyer demand and market engagement'
    }
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            if (animated) {
              // Animate numerical values
              const numericStats = marketStats.filter(stat => 
                stat.value.includes('$') || stat.value.includes('days') || stat.value.includes('months')
              );

              numericStats.forEach((stat, index) => {
                const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
                let currentValue = 0;
                const increment = numericValue / 50;

                const animation = setInterval(() => {
                  currentValue += increment;
                  if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(animation);
                  }
                  setAnimatedValues(prev => ({
                    ...prev,
                    [stat.label]: currentValue
                  }));
                }, 20 + index * 10);
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('market-stats');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [animated, marketStats]);

  const formatAnimatedValue = (stat: MarketStat): string => {
    if (!animated || !animatedValues[stat.label]) {
      return stat.value;
    }

    const animatedVal = animatedValues[stat.label];
    if (animatedVal === undefined) {
      return stat.value;
    }

    if (stat.value.includes('$')) {
      return `$${Math.round(animatedVal).toLocaleString()}`;
    } else if (stat.value.includes('days')) {
      return `${Math.round(animatedVal)} days`;
    } else if (stat.value.includes('months')) {
      return `${animatedVal.toFixed(1)} months`;
    }

    return stat.value;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '➖';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#10b981';
      case 'down':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div 
      id="market-stats"
      className={`market-stats ${className} ${isVisible ? 'visible' : ''}`}
      data-analytics="market-stats"
    >
      {showTitle && (
        <div className="stats-header">
          <h2 className="stats-title">Las Vegas Luxury Market Insights</h2>
          <p className="stats-subtitle">
            Current market trends and statistics for premium properties in Las Vegas
          </p>
          <div className="stats-meta">
            <span className="update-time">Last updated: {new Date().toLocaleDateString()}</span>
            <span className="data-source">Source: MLS & Market Analysis</span>
          </div>
        </div>
      )}

      <div className="stats-grid">
        {marketStats.map((stat, index) => (
          <div 
            key={stat.label}
            className={`stat-card ${isVisible ? 'animate' : ''}`}
            style={{
              animationDelay: animated ? `${index * 0.1}s` : '0s'
            }}
          >
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-trend">
                <span 
                  className="trend-indicator"
                  style={{ color: getTrendColor(stat.trend) }}
                >
                  {getTrendIcon(stat.trend)}
                </span>
              </div>
            </div>

            <div className="stat-content">
              <div className="stat-value">
                {formatAnimatedValue(stat)}
              </div>
              <div className="stat-label">{stat.label}</div>

              {stat.change !== 'stable' && (
                <div 
                  className="stat-change"
                  style={{ color: getTrendColor(stat.trend) }}
                >
                  {stat.change}
                </div>
              )}

              <div className="stat-description">
                {stat.description}
              </div>
            </div>

            <div className="stat-hover-overlay">
              <div className="hover-content">
                <h4>{stat.label}</h4>
                <p>{stat.description}</p>
                <div className="hover-details">
                  <span>Current: {stat.value}</span>
                  {stat.change !== 'stable' && (
                    <span>Change: {stat.change}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="stats-footer">
        <div className="market-summary">
          <h3>Market Summary</h3>
          <p>
            Las Vegas luxury real estate market continues to show strong performance with 
            steady price appreciation and healthy buyer demand. The market remains favorable 
            for both buyers and sellers in the premium segment.
          </p>
        </div>

        <div className="consultation-cta">
          <h4>Get Personalized Market Analysis</h4>
          <p>Receive detailed insights specific to your property interests</p>
          <button 
            className="cta-button"
            onClick={() => {
              // Track interaction
              if (typeof window !== 'undefined' && window.trackAnalyticsEvent) {
                window.trackAnalyticsEvent({
                  action: 'market_analysis_request',
                  category: 'conversion',
                  label: 'market_stats_widget'
                });
              }
            }}
          >
            Request Analysis
          </button>
        </div>
      </div>

      <style jsx>{`
        .market-stats {
          padding: 40px 0;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .market-stats.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stats-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .stats-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #1a365d, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stats-subtitle {
          font-size: 16px;
          color: #64748b;
          margin-bottom: 16px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .stats-meta {
          display: flex;
          justify-content: center;
          gap: 24px;
          font-size: 12px;
          color: #94a3b8;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
        }

        .stat-card.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          border-color: #2563eb;
        }

        .stat-card:hover .stat-hover-overlay {
          opacity: 1;
          visibility: visible;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .stat-icon {
          font-size: 32px;
          background: linear-gradient(135deg, #f0f9ff, #dbeafe);
          padding: 12px;
          border-radius: 12px;
          display: inline-block;
        }

        .stat-trend {
          font-size: 20px;
        }

        .trend-indicator {
          display: inline-block;
          animation: pulse 2s infinite;
        }

        .stat-content {
          position: relative;
          z-index: 2;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 4px;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-change {
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 8px;
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 12px;
          background: rgba(16, 185, 129, 0.1);
        }

        .stat-description {
          font-size: 12px;
          color: #94a3b8;
          line-height: 1.4;
        }

        .stat-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .hover-content {
          text-align: center;
        }

        .hover-content h4 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .hover-content p {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 16px;
        }

        .hover-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12px;
          opacity: 0.8;
        }

        .stats-footer {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
          margin-top: 40px;
          padding-top: 40px;
          border-top: 1px solid #e2e8f0;
        }

        .market-summary h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 12px;
        }

        .market-summary p {
          color: #64748b;
          line-height: 1.6;
        }

        .consultation-cta {
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          text-align: center;
        }

        .consultation-cta h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 8px;
        }

        .consultation-cta p {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 16px;
        }

        .cta-button {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .stats-footer {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .stats-title {
            font-size: 24px;
          }

          .stat-card {
            padding: 20px;
          }

          .stat-value {
            font-size: 24px;
          }

          .stats-meta {
            flex-direction: column;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .market-stats {
            padding: 20px 0;
          }

          .stats-header {
            margin-bottom: 24px;
          }

          .consultation-cta {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default MarketStats;