
import type { NextPage } from "next";
import Layout from "../components/Layout";
import SEOHead from "../components/SEOHead";
import MarketStats from "../components/MarketStats";
import styles from "../styles/Home.module.css";

const MarketInsightsPage: NextPage = () => {
  return (
    <Layout>
      <SEOHead
        title="Las Vegas Real Estate Market Insights & Trends | Dr. Duffy Analysis"
        description="Expert analysis of Las Vegas luxury real estate market trends, property values, investment opportunities, and market forecasts by Dr. Duffy."
        keywords="Las Vegas real estate market, property values Las Vegas, luxury home trends, Nevada real estate analysis, market insights, investment opportunities"
        pathname="/market-insights"
      />

      <main>
        {/* Hero Section */}
        <section className={styles.section} style={{ 
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', 
          color: 'white',
          textAlign: 'center',
          padding: '4rem 2rem'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '700' }}>
              Las Vegas Real Estate Market Insights
            </h1>
            <p style={{ fontSize: '1.3rem', opacity: '0.9' }}>
              Expert analysis and data-driven insights from Dr. Duffy on the Las Vegas luxury real estate market
            </p>
          </div>
        </section>

        {/* Market Stats Component */}
        <MarketStats />

        {/* Market Analysis */}
        <section className={styles.section}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1e40af' }}>
              Current Market Analysis
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>📈 Market Trends</h3>
                <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                  The Las Vegas luxury market continues to show resilience with steady appreciation 
                  in premium neighborhoods. Inventory levels remain balanced, providing opportunities 
                  for both buyers and sellers.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Moderate price appreciation in luxury segment</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Stable inventory levels</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Strong buyer demand</li>
                </ul>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>🏠 Inventory Analysis</h3>
                <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                  Current inventory levels provide a balanced market with adequate choices for luxury 
                  home buyers while maintaining value appreciation for sellers.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ 3.2 months of luxury inventory</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ New listings coming to market regularly</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Quality properties moving quickly</li>
                </ul>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>💰 Price Dynamics</h3>
                <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                  Luxury home prices in Las Vegas have shown consistent growth, supported by 
                  limited supply and strong demand from relocating buyers.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Year-over-year appreciation: 5-8%</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Median luxury price: $1.2M</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Strong value retention in premium areas</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Opportunities */}
        <section className={styles.section} style={{ background: '#f8fafc' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1e40af' }}>
              Investment Opportunities
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#1e40af' }}>
                  Why Invest in Las Vegas Real Estate?
                </h3>
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Tax Advantages</h4>
                  <p style={{ marginBottom: '1rem' }}>Nevada's no state income tax policy makes it attractive for high-net-worth individuals and retirees.</p>
                  
                  <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Population Growth</h4>
                  <p style={{ marginBottom: '1rem' }}>Continued migration from California and other high-tax states drives housing demand.</p>
                  
                  <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Economic Diversification</h4>
                  <p style={{ marginBottom: '1rem' }}>Las Vegas economy has diversified beyond gaming into technology, healthcare, and logistics.</p>
                  
                  <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Infrastructure Development</h4>
                  <p>Ongoing infrastructure improvements enhance property values and livability.</p>
                </div>
              </div>
              
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1.5rem' }}>Investment Strategies</h4>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <strong>Buy and Hold</strong>
                  <p style={{ fontSize: '0.9rem', margin: '0.5rem 0', color: '#666' }}>
                    Long-term appreciation in premium neighborhoods
                  </p>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <strong>Luxury Rentals</strong>
                  <p style={{ fontSize: '0.9rem', margin: '0.5rem 0', color: '#666' }}>
                    High-end rental market for executives and relocating families
                  </p>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <strong>Fix and Flip</strong>
                  <p style={{ fontSize: '0.9rem', margin: '0.5rem 0', color: '#666' }}>
                    Renovation opportunities in established neighborhoods
                  </p>
                </div>
                
                <div>
                  <strong>Portfolio Diversification</strong>
                  <p style={{ fontSize: '0.9rem', margin: '0.5rem 0', color: '#666' }}>
                    Geographic diversification for out-of-state investors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Forecast */}
        <section className={styles.section}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1e40af' }}>
              Market Forecast & Outlook
            </h2>
            
            <div style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: '#1e40af', marginBottom: '0.5rem' }}>Next 6 Months</h4>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', margin: '0.5rem 0' }}>Stable</p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>Continued balanced market conditions</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: '#1e40af', marginBottom: '0.5rem' }}>12 Month Outlook</h4>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', margin: '0.5rem 0' }}>Growth</p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>Moderate appreciation expected</p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ color: '#1e40af', marginBottom: '0.5rem' }}>Long-term (3-5 years)</h4>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', margin: '0.5rem 0' }}>Strong</p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>Positive fundamentals support growth</p>
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>Key Factors Influencing the Market:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}>✓ Interest rate trends</li>
                    <li style={{ marginBottom: '0.5rem' }}>✓ California migration patterns</li>
                    <li style={{ marginBottom: '0.5rem' }}>✓ Economic growth and job creation</li>
                  </ul>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}>✓ New construction permits</li>
                    <li style={{ marginBottom: '0.5rem' }}>✓ Tourism and entertainment recovery</li>
                    <li style={{ marginBottom: '0.5rem' }}>✓ Infrastructure investments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Analysis CTA */}
        <section className={styles.section} style={{ 
          background: '#1e40af', 
          color: 'white', 
          textAlign: 'center',
          padding: '4rem 2rem'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
              Get Personalized Market Analysis
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
              Leverage Dr. Duffy's analytical expertise for customized market insights tailored to your 
              specific investment goals and property interests.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="/contact" 
                style={{ 
                  background: 'white', 
                  color: '#1e40af', 
                  padding: '1rem 2rem', 
                  borderRadius: '8px', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}
              >
                Request Analysis
              </a>
              <a 
                href="/services" 
                style={{ 
                  background: 'transparent', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: '8px', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  border: '2px solid white',
                  display: 'inline-block'
                }}
              >
                View Services
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default MarketInsightsPage;
