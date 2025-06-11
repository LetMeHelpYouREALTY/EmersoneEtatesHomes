
import React from 'react';

interface MarketStatsProps {
  className?: string;
}

export default function MarketStats({ className = "" }: MarketStatsProps) {
  const stats = [
    { label: "Average Home Value", value: "$850K", change: "+12%" },
    { label: "Days on Market", value: "28", change: "-15%" },
    { label: "Properties Sold", value: "142", change: "+8%" },
    { label: "Market Growth", value: "18%", change: "+3%" }
  ];

  return (
    <section className={`market-stats ${className}`}>
      <div className="stats-container">
        <div className="stats-header">
          <h2>Las Vegas Luxury Market Insights</h2>
          <p>Current market trends for premium properties</p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change} vs last year
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .market-stats {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          padding: 4rem 2rem;
          margin: 2rem 0;
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

        .stat-change.negative {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .stats-header h2 {
            font-size: 2rem;
          }

          .stat-value {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function MarketStats() {
  const [stats, setStats] = useState({
    averagePrice: 850000,
    medianPrice: 795000,
    daysOnMarket: 18,
    soldLastMonth: 12
  });

  return (
    <section className={styles.section} id="market">
      <h2 className={styles.sectionTitle}>Las Vegas Luxury Market</h2>
      <p className={styles.subtitle}>Current trends in premium real estate</p>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            ${(stats.averagePrice / 1000).toFixed(0)}K
          </div>
          <div className={styles.statLabel}>Average Home Price</div>
          <div className={styles.statTrend}>↗️ +5.2% YoY</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statNumber}>
            ${(stats.medianPrice / 1000).toFixed(0)}K
          </div>
          <div className={styles.statLabel}>Median Price</div>
          <div className={styles.statTrend}>↗️ +3.8% YoY</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.daysOnMarket}</div>
          <div className={styles.statLabel}>Avg. Days on Market</div>
          <div className={styles.statTrend}>↘️ Fast Sales</div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.soldLastMonth}</div>
          <div className={styles.statLabel}>Sold This Month</div>
          <div className={styles.statTrend}>🔥 Hot Market</div>
        </div>
      </div>
      
      <div className={styles.marketInsight}>
        <h3>Market Insight</h3>
        <p>
          The Las Vegas luxury market continues to show strong performance with 
          high demand for premium properties in gated communities. Emerson Estates 
          represents exceptional value in this competitive market.
        </p>
      </div>
    </section>
  );
}
