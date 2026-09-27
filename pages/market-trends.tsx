
import type { NextPage, GetStaticProps } from "next";
import Parser from "rss-parser";
import Layout from "../components/Layout";
import SEOHead from "../components/SEOHead";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface TrendData {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category: string;
}

interface MarketTrendsProps {
  trends: TrendData[];
  error?: string;
}

const MarketTrends: NextPage<MarketTrendsProps> = ({ trends, error }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Layout
      title="Las Vegas Real Estate Market Trends - Emerson Estates"
      description="Discover the latest Las Vegas real estate market trends, home values, and investment insights to make informed property decisions."
    >
      <SEOHead
        title="Las Vegas Real Estate Market Trends - Emerson Estates"
        description="Discover the latest Las Vegas real estate market trends, home values, and investment insights to make informed property decisions."
        keywords="Las Vegas real estate trends, market analysis, home values, property investment, Nevada real estate"
        pathname="/market-trends"
      />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Las Vegas Market Trends</h1>
            <p className={styles.subtitle}>Expert Analysis & Market Insights</p>
            <p className={styles.description}>
              Stay ahead of the Las Vegas real estate market with the latest trends, 
              pricing analysis, and expert insights to guide your property decisions.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="trends-container">
            <div className="intro-section">
              <h2 className={styles.sectionTitle}>Current Market Overview</h2>
              <div className="market-highlights">
                <div className="highlight-card">
                  <h3>🏠 Market Activity</h3>
                  <p>Las Vegas continues to show strong market fundamentals with steady demand in luxury segments.</p>
                </div>
                <div className="highlight-card">
                  <h3>📈 Price Trends</h3>
                  <p>Premium properties in gated communities like Emerson Estates maintain strong value appreciation.</p>
                </div>
                <div className="highlight-card">
                  <h3>🎯 Investment Outlook</h3>
                  <p>Strategic locations near the Strip and with desert views continue to attract discerning buyers.</p>
                </div>
              </div>
            </div>

            {!error && trends.length > 0 && (
              <div className="trends-section">
                <h2 className={styles.sectionTitle}>Latest Market Insights</h2>
                <div className="trends-grid">
                  {trends.slice(0, 6).map((trend, index) => (
                    <article key={index} className="trend-card">
                      <div className="trend-content">
                        <div className="trend-meta">
                          <time className="trend-date">{formatDate(trend.pubDate)}</time>
                          <span className="trend-category">{trend.category}</span>
                        </div>
                        
                        <h3 className="trend-title">
                          <a
                            href={trend.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="trend-link"
                          >
                            {trend.title}
                          </a>
                        </h3>
                        
                        <p className="trend-excerpt">{trend.description}</p>
                        
                        <a
                          href={trend.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="read-more"
                        >
                          Read Analysis →
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
                
                <div className="view-all-section">
                  <Link href="/blog" className="view-all-btn">
                    View All Market Insights
                  </Link>
                </div>
              </div>
            )}

            <div className="cta-section">
              <h2 className={styles.sectionTitle}>Get Personalized Market Analysis</h2>
              <p className={styles.sectionDescription}>
                Ready to make your move in the Las Vegas luxury market? 
                Get expert guidance from Dr. Jan Duffy with personalized market analysis.
              </p>
              <Link href="/contact" className={styles.ctaButton}>
                Schedule Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .trends-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .intro-section {
          margin-bottom: 60px;
        }

        .market-highlights {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .highlight-card {
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          padding: 30px;
          border-radius: 12px;
          border-left: 4px solid #2563eb;
          transition: transform 0.2s ease;
        }

        .highlight-card:hover {
          transform: translateY(-2px);
        }

        .highlight-card h3 {
          color: #1e293b;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .highlight-card p {
          color: #475569;
          line-height: 1.6;
        }

        .trends-section {
          margin-bottom: 60px;
        }

        .trends-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .trend-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .trend-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .trend-content {
          padding: 24px;
        }

        .trend-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .trend-date {
          color: #6b7280;
        }

        .trend-category {
          background: #dbeafe;
          color: #1d4ed8;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .trend-title {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 12px;
          color: #1a365d;
        }

        .trend-link {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .trend-link:hover {
          color: #2563eb;
        }

        .trend-excerpt {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .read-more {
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .read-more:hover {
          color: #1d4ed8;
        }

        .view-all-section {
          text-align: center;
          margin-top: 40px;
        }

        .view-all-btn {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          transition: all 0.2s ease;
        }

        .view-all-btn:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .cta-section {
          background: linear-gradient(135deg, #1e293b, #334155);
          color: white;
          padding: 60px 40px;
          border-radius: 16px;
          text-align: center;
        }

        .cta-section h2 {
          color: white;
          margin-bottom: 16px;
        }

        .cta-section p {
          color: #e2e8f0;
          margin-bottom: 32px;
        }

        @media (max-width: 768px) {
          .trends-container {
            padding: 0 16px;
          }

          .market-highlights {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .trends-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .highlight-card,
          .trend-content {
            padding: 20px;
          }

          .cta-section {
            padding: 40px 20px;
          }
        }
      `}</style>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const parser = new Parser();

    const feed = await parser.parseURL('https://www.simplifyingthemarket.com/en/feed?a=956758-ef2edda2f940e018328655620ea05f18');
    
    const trends: TrendData[] = feed.items.slice(0, 6).map((item: Parser.Item) => ({
      title: item.title || 'Market Update',
      description: item.contentSnippet || item.content || '',
      link: item.link || '#',
      pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
      category: 'Market Analysis'
    }));

    return {
      props: {
        trends
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching market trends:', error);
    
    return {
      props: {
        trends: [],
        error: 'Unable to load market trends at this time.'
      },
      revalidate: 300
    };
  }
};

export default MarketTrends;
