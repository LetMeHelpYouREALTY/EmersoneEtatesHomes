
import React from 'react';
import styles from '../styles/Home.module.css';

export default function MarketStats() {
  const stats = {
    averagePrice: 850000,
    medianPrice: 695000,
    daysOnMarket: 28,
    priceChange: '+8.5%',
    totalSales: 145,
    luxuryInventory: 23
  };

  return (
    <section className={styles.section} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white' }}>
      <div className="market-stats">
        <div className="stats-header">
          <h2>Las Vegas Luxury Market Insights</h2>
          <p>Current market data for premium properties in the Las Vegas area</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">${(stats.averagePrice / 1000).toFixed(0)}K</div>
            <div className="stat-label">Average Luxury Home Price</div>
            <div className="stat-change positive">{stats.priceChange} YoY</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">${(stats.medianPrice / 1000).toFixed(0)}K</div>
            <div className="stat-label">Median Sale Price</div>
            <div className="stat-change positive">+12.3% YoY</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{stats.daysOnMarket}</div>
            <div className="stat-label">Avg Days on Market</div>
            <div className="stat-change positive">-15% vs National</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{stats.totalSales}</div>
            <div className="stat-label">Luxury Sales (Q4)</div>
            <div className="stat-change positive">+22% vs Q3</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{stats.luxuryInventory}</div>
            <div className="stat-label">Premium Listings Available</div>
            <div className="stat-change">Low Inventory</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">96%</div>
            <div className="stat-label">Price to List Ratio</div>
            <div className="stat-change positive">Strong Market</div>
          </div>
        </div>

        <div className="market-insight">
          <h3>Market Analysis</h3>
          <p>
            The Las Vegas luxury market continues to show strong performance with limited inventory 
            driving competitive pricing. Properties in premium communities like Emerson Estates are 
            experiencing high demand from both local and out-of-state buyers seeking luxury living 
            in Nevada&apos;s tax-favorable environment.
          </p>
        </div>
      </div>

      <style jsx>{`
        .market-stats {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .stats-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .stats-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .stats-header p {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          padding: 2rem;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #fbbf24;
        }

        .stat-label {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          opacity: 0.9;
        }

        .stat-change {
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          display: inline-block;
        }

        .stat-change.positive {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .market-insight {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 12px;
          border-left: 4px solid #fbbf24;
        }

        .market-insight h3 {
          margin: 0 0 1rem 0;
          color: #fbbf24;
          font-size: 1.5rem;
        }

        .market-insight p {
          margin: 0;
          line-height: 1.6;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }
          
          .stat-card {
            padding: 1.5rem;
          }
          
          .stat-value {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
