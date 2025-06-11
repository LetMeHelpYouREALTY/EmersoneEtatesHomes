
import type { NextPage } from "next";
import Layout from "../components/Layout";
import SEOHead from "../components/SEOHead";
import styles from "../styles/Home.module.css";

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <SEOHead
        title="About Dr. Duffy & Emerson Estates | Luxury Real Estate Expert Las Vegas"
        description="Learn about Dr. Duffy, your trusted luxury real estate expert in Las Vegas. Discover the story behind Emerson Estates and our commitment to exceptional service."
        keywords="Dr. Duffy realtor, luxury real estate agent Las Vegas, Emerson Estates history, real estate expert Nevada, PhD realtor"
        pathname="/about"
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
              About Dr. Duffy & Emerson Estates
            </h1>
            <p style={{ fontSize: '1.3rem', opacity: '0.9' }}>
              Combining academic excellence with real estate expertise to serve Las Vegas luxury home buyers and sellers
            </p>
          </div>
        </section>

        {/* About Dr. Duffy */}
        <section className={styles.section}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <img 
                src="/Dr. Duffy Blue_Headshot_1749651931522.jpg" 
                alt="Dr. Duffy - Luxury Real Estate Expert"
                style={{ width: '100%', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
              />
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#1e40af' }}>
                Meet Dr. Duffy
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                With a PhD in his field and years of experience in luxury real estate, Dr. Duffy brings an analytical approach 
                and academic rigor to every transaction. His unique background allows him to understand market dynamics, 
                negotiate effectively, and provide clients with data-driven insights.
              </p>
              <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Specializing in luxury properties throughout Las Vegas, Dr. Duffy has built a reputation for exceptional 
                service, attention to detail, and results that exceed expectations. As a top 1% producer, he combines 
                professional expertise with personal dedication to every client.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                  <strong style={{ color: '#1e40af' }}>🎓 PhD Expertise</strong>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>Academic approach to real estate</p>
                </div>
                <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                  <strong style={{ color: '#1e40af' }}>🏆 Top 1% Producer</strong>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>Proven track record of success</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emerson Estates Story */}
        <section className={styles.section} style={{ background: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#1e40af' }}>
              The Emerson Estates Story
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Located at 2583 Regency Cove Ct in Las Vegas, NV 89121, Emerson Estates represents the pinnacle of 
              luxury living in Southern Nevada. Our community was designed with discerning buyers in mind, offering 
              elegant residences that blend modern amenities with timeless sophistication.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>🏘️ Premium Location</h3>
                <p>Strategically positioned in one of Las Vegas' most desirable neighborhoods, with easy access to the Strip, shopping, and top-rated schools.</p>
              </div>
              <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>🛡️ Secure Community</h3>
                <p>Gated community with 24/7 security, ensuring peace of mind and exclusive access for residents and their guests.</p>
              </div>
              <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#1e40af', marginBottom: '1rem' }}>🌟 Luxury Amenities</h3>
                <p>World-class amenities including resort-style pools, fitness centers, tennis courts, and beautifully landscaped common areas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className={styles.section}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#1e40af' }}>
              Our Mission
            </h2>
            <p style={{ fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              To provide exceptional real estate services that exceed client expectations through expertise, 
              integrity, and personalized attention. We believe that buying or selling a luxury home should 
              be an exciting and rewarding experience.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              <div>
                <strong style={{ color: '#1e40af' }}>🤝 Integrity</strong>
                <p style={{ marginTop: '0.5rem' }}>Honest, transparent communication in every transaction</p>
              </div>
              <div>
                <strong style={{ color: '#1e40af' }}>📊 Expertise</strong>
                <p style={{ marginTop: '0.5rem' }}>Data-driven insights and market knowledge</p>
              </div>
              <div>
                <strong style={{ color: '#1e40af' }}>⭐ Excellence</strong>
                <p style={{ marginTop: '0.5rem' }}>Commitment to exceptional results and service</p>
              </div>
              <div>
                <strong style={{ color: '#1e40af' }}>💝 Personal Touch</strong>
                <p style={{ marginTop: '0.5rem' }}>Individual attention to every client's unique needs</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AboutPage;
