
import type { NextPage } from "next";
import Layout from "../components/Layout";
import SEOHead from "../components/SEOHead";
import styles from "../styles/Home.module.css";

const NeighborhoodsPage: NextPage = () => {
  return (
    <Layout>
      <SEOHead
        title="Las Vegas Luxury Neighborhoods Guide | Emerson Estates & Premium Communities"
        description="Explore luxury neighborhoods in Las Vegas including Emerson Estates, Summerlin, Henderson, and other premium communities. Complete area guide by Dr. Duffy."
        keywords="Las Vegas luxury neighborhoods, Emerson Estates location, Summerlin homes, Henderson Nevada, luxury communities Las Vegas, premium neighborhoods"
        pathname="/neighborhoods"
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
              Las Vegas Luxury Neighborhoods
            </h1>
            <p style={{ fontSize: '1.3rem', opacity: '0.9' }}>
              Discover the finest communities and neighborhoods for luxury living in Las Vegas
            </p>
          </div>
        </section>

        {/* Emerson Estates Feature */}
        <section className={styles.section}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1e40af' }}>
                Emerson Estates - Our Premier Community
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                Located at 2583 Regency Cove Ct, Las Vegas, NV 89121
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#1e40af' }}>
                  Why Choose Emerson Estates?
                </h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Emerson Estates represents the pinnacle of luxury living in Las Vegas. This exclusive gated community 
                  offers residents a perfect blend of privacy, security, and convenience with world-class amenities 
                  and stunning desert landscapes.
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#1e40af', marginRight: '0.5rem' }}>🏡</span>
                    Luxury single-family homes with premium finishes
                  </li>
                  <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#1e40af', marginRight: '0.5rem' }}>🛡️</span>
                    24/7 gated security and controlled access
                  </li>
                  <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#1e40af', marginRight: '0.5rem' }}>🏊‍♂️</span>
                    Resort-style amenities and recreation facilities
                  </li>
                  <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#1e40af', marginRight: '0.5rem' }}>📍</span>
                    Prime location with easy access to Las Vegas Strip
                  </li>
                </ul>
              </div>
              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '1.5rem' }}>Community Features</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <strong>Pool & Spa</strong>
                    <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>Heated resort-style pool</p>
                  </div>
                  <div>
                    <strong>Fitness Center</strong>
                    <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>State-of-the-art equipment</p>
                  </div>
                  <div>
                    <strong>Tennis Courts</strong>
                    <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>Professional-grade courts</p>
                  </div>
                  <div>
                    <strong>Playground</strong>
                    <p style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>Family-friendly areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Premium Neighborhoods */}
        <section className={styles.section} style={{ background: '#f8fafc' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1e40af' }}>
              Other Premium Las Vegas Neighborhoods
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {/* Summerlin */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>Summerlin</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Master-planned community on the west side of Las Vegas, known for its parks, golf courses, 
                  and family-friendly atmosphere. Home to Red Rock Casino and excellent schools.
                </p>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <p><strong>Average Home Price:</strong> $500K - $2M+</p>
                  <p><strong>Notable Features:</strong> Golf courses, parks, shopping</p>
                  <p><strong>Best For:</strong> Families, golf enthusiasts</p>
                </div>
              </div>

              {/* Henderson */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>Henderson</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Affluent suburb southeast of Las Vegas with excellent schools, low crime rates, 
                  and beautiful master-planned communities. Close to Lake Las Vegas.
                </p>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <p><strong>Average Home Price:</strong> $400K - $1.5M+</p>
                  <p><strong>Notable Features:</strong> Top schools, safety, Lake Las Vegas</p>
                  <p><strong>Best For:</strong> Families, professionals</p>
                </div>
              </div>

              {/* The Ridges */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>The Ridges</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Ultra-luxury community in Summerlin with custom estates, guard gates, 
                  and stunning views of the Las Vegas valley and Red Rock Canyon.
                </p>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <p><strong>Average Home Price:</strong> $1M - $5M+</p>
                  <p><strong>Notable Features:</strong> Custom estates, views, exclusivity</p>
                  <p><strong>Best For:</strong> Luxury buyers, executives</p>
                </div>
              </div>

              {/* Spanish Hills */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>Spanish Hills</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Upscale community in southwest Las Vegas featuring large lots, 
                  custom homes, and proximity to top-rated schools and shopping.
                </p>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <p><strong>Average Home Price:</strong> $600K - $2M+</p>
                  <p><strong>Notable Features:</strong> Large lots, custom homes</p>
                  <p><strong>Best For:</strong> Custom home buyers</p>
                </div>
              </div>

              {/* MacDonald Highlands */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>MacDonald Highlands</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Exclusive Henderson community with luxury homes, golf course, 
                  and panoramic views of the Las Vegas Strip and surrounding mountains.
                </p>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <p><strong>Average Home Price:</strong> $800K - $3M+</p>
                  <p><strong>Notable Features:</strong> Golf course, Strip views</p>
                  <p><strong>Best For:</strong> Luxury buyers, retirees</p>
                </div>
              </div>

              {/* Anthem */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>Anthem</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Master-planned community in Henderson with parks, trails, 
                  community centers, and a variety of housing options from condos to estates.
                </p>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  <p><strong>Average Home Price:</strong> $350K - $1M+</p>
                  <p><strong>Notable Features:</strong> Parks, trails, community amenities</p>
                  <p><strong>Best For:</strong> Active families, first-time luxury buyers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Benefits */}
        <section className={styles.section}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1e40af' }}>
              Why Las Vegas for Luxury Living?
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☀️</div>
                <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>Year-Round Sunshine</h4>
                <p>Over 300 days of sunshine annually with mild winters and warm summers</p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
                <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>No State Income Tax</h4>
                <p>Nevada has no state income tax, making it attractive for high earners</p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎭</div>
                <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>World-Class Entertainment</h4>
                <p>Access to shows, dining, gaming, and cultural attractions on the Strip</p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏌️‍♂️</div>
                <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>Golf Paradise</h4>
                <p>Dozens of championship golf courses designed by world-renowned architects</p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✈️</div>
                <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>Strategic Location</h4>
                <p>Easy access to California, Arizona, and Utah with McCarran International Airport</p>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏞️</div>
                <h4 style={{ marginBottom: '1rem', color: '#1e40af' }}>Natural Beauty</h4>
                <p>Close to Red Rock Canyon, Lake Tahoe, and other natural attractions</p>
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
              Find Your Perfect Neighborhood
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
              Let Dr. Duffy help you discover the ideal Las Vegas neighborhood for your lifestyle and goals. 
              Schedule a consultation to explore your options.
            </p>
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
              Explore Neighborhoods with Dr. Duffy
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default NeighborhoodsPage;
