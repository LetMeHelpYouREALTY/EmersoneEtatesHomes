
import type { NextPage } from "next";
import Layout from "../components/Layout";
import SEOHead from "../components/SEOHead";
import styles from "../styles/Home.module.css";

const ServicesPage: NextPage = () => {
  return (
    <Layout>
      <SEOHead
        title="Real Estate Services Las Vegas | Luxury Home Buying & Selling | Dr. Duffy"
        description="Comprehensive luxury real estate services in Las Vegas. Home buying, selling, investment consulting, market analysis, and property management by Dr. Duffy."
        keywords="Las Vegas real estate services, luxury home buying, property selling, investment consulting, market analysis, property management"
        pathname="/services"
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
              Comprehensive Real Estate Services
            </h1>
            <p style={{ fontSize: '1.3rem', opacity: '0.9' }}>
              Full-service luxury real estate solutions tailored to your unique needs in Las Vegas
            </p>
          </div>
        </section>

        {/* Main Services */}
        <section className={styles.section}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1e40af' }}>
              Our Core Services
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {/* Home Buying */}
              <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#1e40af' }}>Luxury Home Buying</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Expert guidance through every step of purchasing your dream luxury home in Las Vegas. 
                  From initial search to closing, we ensure a smooth and successful transaction.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Personalized property search</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Market analysis and pricing guidance</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Negotiation expertise</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Professional network access</li>
                </ul>
              </div>

              {/* Home Selling */}
              <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#1e40af' }}>Luxury Home Selling</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Maximize your property's value with our comprehensive selling strategy. Professional marketing, 
                  staging advice, and expert negotiation to achieve the best possible outcome.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Comprehensive market analysis</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Professional photography & staging</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Targeted marketing campaigns</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Expert pricing strategy</li>
                </ul>
              </div>

              {/* Investment Consulting */}
              <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#1e40af' }}>Investment Consulting</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Leverage Dr. Duffy's analytical expertise to make informed real estate investment decisions. 
                  Data-driven insights for building and managing your property portfolio.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ ROI analysis and projections</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Market trend evaluation</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Portfolio diversification strategy</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Risk assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Services */}
        <section className={styles.section} style={{ background: '#f8fafc' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1e40af' }}>
              Specialized Services
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>🔍 Market Analysis</h4>
                <p>Comprehensive market reports and trend analysis to inform your real estate decisions</p>
              </div>
              
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>🏡 Property Valuation</h4>
                <p>Accurate property valuations using advanced analytical methods and market data</p>
              </div>
              
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>📋 Relocation Services</h4>
                <p>Complete relocation assistance for clients moving to or from Las Vegas</p>
              </div>
              
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>🤝 Referral Network</h4>
                <p>Access to trusted professionals including lenders, inspectors, and contractors</p>
              </div>
              
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>📱 Technology Solutions</h4>
                <p>Cutting-edge tools and platforms for property search and transaction management</p>
              </div>
              
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '8px' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1rem' }}>⚡ Concierge Service</h4>
                <p>White-glove service for all your real estate needs and related requirements</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className={styles.section}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1e40af' }}>
              Our Proven Process
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: '#1e40af', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>1</div>
                <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>Initial Consultation</h4>
                <p>Understanding your goals, timeline, and preferences</p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: '#1e40af', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>2</div>
                <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>Strategy Development</h4>
                <p>Creating a customized plan tailored to your specific needs</p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: '#1e40af', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>3</div>
                <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>Implementation</h4>
                <p>Executing the strategy with precision and attention to detail</p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: '#1e40af', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>4</div>
                <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>Successful Closing</h4>
                <p>Ensuring a smooth transaction and celebrating your success</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.section} style={{ 
          background: '#1e40af', 
          color: 'white', 
          textAlign: 'center',
          padding: '4rem 2rem'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
              Ready to Get Started?
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
              Contact Dr. Duffy today to discuss your real estate goals and discover how our 
              comprehensive services can help you achieve them.
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
                Schedule Consultation
              </a>
              <a 
                href="tel:(702)555-1234" 
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
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ServicesPage;
