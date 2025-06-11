import type { NextPage } from "next";
import Layout from "../components/Layout";
import ContactForm from "../components/ContactForm";
import SEOHead from "../components/SEOHead";
import styles from "../styles/Home.module.css";

const ContactPage: NextPage = () => {
  return (
    <Layout>
      <SEOHead
        title="Contact Dr. Duffy - Luxury Real Estate Expert | Emerson Estates"
        description="Contact Dr. Duffy and the Emerson Estates team for luxury real estate in Las Vegas. Expert guidance, personalized service, and exclusive property access."
        keywords="contact real estate agent Las Vegas, Dr. Duffy realtor, luxury homes contact, Emerson Estates contact"
        pathname="/contact"
      />

      <main>
        {/* Hero Section */}
        <section className={styles.section} style={{ 
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', 
          color: 'white',
          textAlign: 'center',
          padding: '4rem 2rem 2rem'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '700' }}>
              Let&apos;s Find Your Perfect Home
            </h1>
            <p style={{ fontSize: '1.3rem', opacity: '0.9', marginBottom: '2rem' }}>
              Ready to discover luxury living in Las Vegas? Our expert team is here to guide you every step of the way.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <ContactForm />

        {/* Contact Information */}
        <section className={styles.section} style={{ background: '#0f172a', color: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

              <div className="contact-info-card">
                <h3>📍 Visit Our Office</h3>
                <p>
                  <strong>Emerson Estates</strong><br />
                  2583 Regency Cove Ct<br />
                  Las Vegas, NV 89121
                </p>
                <a 
                  href="https://maps.google.com/?q=2583+Regency+Cove+Ct,+Las+Vegas,+NV+89121"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#fbbf24', textDecoration: 'none' }}
                >
                  Get Directions →
                </a>
              </div>

              <div className="contact-info-card">
                <h3>📞 Call or Text</h3>
                <p>
                  <strong>Dr. Duffy - Direct Line</strong><br />
                  <a href="tel:+17025551234" style={{ color: '#fbbf24', textDecoration: 'none', fontSize: '1.2rem' }}>
                    (702) 555-1234
                  </a>
                </p>
                <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>
                  Available 7 days a week<br />
                  8:00 AM - 8:00 PM
                </p>
              </div>

              <div className="contact-info-card">
                <h3>✉️ Email Us</h3>
                <p>
                  <a 
                    href="mailto:dr.duffy@emersonestateshomes.com"
                    style={{ color: '#fbbf24', textDecoration: 'none' }}
                  >
                    dr.duffy@emersonestateshomes.com
                  </a>
                </p>
                <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>
                  We respond within 2 hours<br />
                  during business hours
                </p>
              </div>

            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <h3 style={{ color: '#fbbf24', marginBottom: '1rem' }}>Why Choose Our Team?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                <div>
                  <strong>🏆 Top 1% Producer</strong>
                  <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>Consistently in the top tier of luxury home sales</p>
                </div>
                <div>
                  <strong>📚 PhD Expertise</strong>
                  <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>Academic rigor applied to real estate analysis</p>
                </div>
                <div>
                  <strong>🤝 Personal Service</strong>
                  <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>Dedicated attention to every client</p>
                </div>
                <div>
                  <strong>🏘️ Local Knowledge</strong>
                  <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>Deep understanding of Las Vegas luxury market</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .contact-info-card {
          background: rgba(255,255,255,0.1);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .contact-info-card h3 {
          color: #fbbf24;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .contact-info-card p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default ContactPage;