
import React, { useState, useEffect } from 'react';

interface MarketData {
  averagePrice: number;
  priceChange: number;
  daysOnMarket: number;
  soldLastMonth: number;
  inventoryLevel: string;
  marketTrend: 'up' | 'down' | 'stable';
}

const MarketStats: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData>({
    averagePrice: 675000,
    priceChange: 8.2,
    daysOnMarket: 23,
    soldLastMonth: 47,
    inventoryLevel: 'Low',
    marketTrend: 'up'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [animatedValues, setAnimatedValues] = useState({
    averagePrice: 0,
    priceChange: 0,
    daysOnMarket: 0,
    soldLastMonth: 0
  });

  useEffect(() => {
    // Simulate loading real market data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Animate numbers counting up
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const ease = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        setAnimatedValues({
          averagePrice: Math.floor(marketData.averagePrice * ease),
          priceChange: Math.floor(marketData.priceChange * ease * 10) / 10,
          daysOnMarket: Math.floor(marketData.daysOnMarket * ease),
          soldLastMonth: Math.floor(marketData.soldLastMonth * ease)
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedValues({
            averagePrice: marketData.averagePrice,
            priceChange: marketData.priceChange,
            daysOnMarket: marketData.daysOnMarket,
            soldLastMonth: marketData.soldLastMonth
          });
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isLoading, marketData]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10b981';
      case 'down': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <section className="market-stats">
      <div className="stats-container">
        <div className="stats-header">
          <h2>Las Vegas Luxury Market Report</h2>
          <p>Real-time market insights for premium properties in our area</p>
          <div className="last-updated">
            <span>📊 Last Updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-stats">
            <div className="loading-spinner"></div>
            <p>Loading latest market data...</p>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">🏠</div>
                <div className="stat-value">
                  {formatCurrency(animatedValues.averagePrice)}
                </div>
                <div className="stat-label">Average Home Price</div>
                <div className="stat-change positive">
                  +{animatedValues.priceChange}% vs last year
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-value">
                  {animatedValues.daysOnMarket} days
                </div>
                <div className="stat-label">Average Days on Market</div>
                <div className="stat-change neutral">
                  Fast-moving market
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-value">
                  {animatedValues.soldLastMonth}
                </div>
                <div className="stat-label">Homes Sold Last Month</div>
                <div className="stat-change positive">
                  High demand area
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-value">
                  {marketData.inventoryLevel}
                </div>
                <div className="stat-label">Inventory Level</div>
                <div className="stat-change neutral">
                  Limited supply
                </div>
              </div>
            </div>

            <div className="market-insights">
              <h3>Market Insights</h3>
              <div className="insights-grid">
                <div className="insight-card">
                  <div className="insight-header">
                    <span className="trend-icon">{getTrendIcon(marketData.marketTrend)}</span>
                    <h4>Market Trend</h4>
                  </div>
                  <p>
                    The luxury market in Las Vegas continues to show strong growth with 
                    increased buyer interest and limited inventory driving competitive conditions.
                  </p>
                </div>

                <div className="insight-card">
                  <div className="insight-header">
                    <span className="trend-icon">💡</span>
                    <h4>Investment Outlook</h4>
                  </div>
                  <p>
                    Premium properties in master-planned communities like Emerson Estates 
                    are seeing exceptional appreciation and strong resale values.
                  </p>
                </div>

                <div className="insight-card">
                  <div className="insight-header">
                    <span className="trend-icon">⏰</span>
                    <h4>Timing Recommendations</h4>
                  </div>
                  <p>
                    With low inventory and high demand, qualified buyers should act quickly. 
                    Pre-approval and flexible terms are essential in this competitive market.
                  </p>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <h3>Ready to Make Your Move?</h3>
              <p>Get a personalized market analysis for your dream home</p>
              <div className="cta-buttons">
                <a href="/contact" className="cta-btn primary">
                  Get Market Analysis
                </a>
                <a href="/homes" className="cta-btn secondary">
                  View Available Homes
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .market-stats {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .stats-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stats-header p {
          font-size: 1.2rem;
          color: #cbd5e1;
          margin-bottom: 1rem;
        }

        .last-updated {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .loading-stats {
          text-align: center;
          padding: 4rem 2rem;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(251, 191, 36, 0.3);
          border-top: 4px solid #fbbf24;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 2.5rem 2rem;
          border-radius: 20px;
          text-align: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-card.primary {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          transform: scale(1.05);
        }

        .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #fbbf24;
        }

        .stat-card.primary .stat-value {
          color: white;
        }

        .stat-label {
          font-size: 1.1rem;
          color: #cbd5e1;
          margin-bottom: 1rem;
        }

        .stat-change {
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
        }

        .stat-change.positive {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .stat-change.neutral {
          background: rgba(107, 114, 128, 0.2);
          color: #9ca3af;
        }

        .market-insights {
          margin-bottom: 4rem;
        }

        .market-insights h3 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #fbbf24;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .insight-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .insight-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .trend-icon {
          font-size: 1.5rem;
        }

        .insight-header h4 {
          color: #fbbf24;
          margin: 0;
        }

        .insight-card p {
          color: #cbd5e1;
          line-height: 1.6;
        }

        .cta-section {
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 3rem 2rem;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cta-section h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #fbbf24;
        }

        .cta-section p {
          font-size: 1.1rem;
          color: #cbd5e1;
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          padding: 1rem 2rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s ease;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
        }

        .cta-btn.primary {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: #1f2937;
        }

        .cta-btn.secondary {
          background: transparent;
          color: #fbbf24;
          border: 2px solid #fbbf24;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .insights-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .stats-header h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default MarketStats;
