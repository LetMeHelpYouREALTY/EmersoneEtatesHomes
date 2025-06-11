
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Contact: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'buying',
    priceRange: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', interest: 'buying', priceRange: '', message: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout 
      title="Contact Us - Emerson Estates" 
      description="Contact our luxury real estate specialists. Schedule a private tour or get more information about available homes in Emerson Estates."
    >
      <Head>
        <title>Contact Us - Emerson Estates</title>
        <meta name="description" content="Contact our luxury real estate specialists. Schedule a private tour or get more information about available homes in Emerson Estates." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Contact Our Team</h1>
            <p className={styles.subtitle}>Ready to Find Your Dream Home?</p>
            <p className={styles.description}>
              Get in touch with our luxury real estate specialists for personalized service 
              and exclusive access to the finest properties in Las Vegas.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h2 className={styles.sectionTitle}>Send Us a Message</h2>
              
              {submitted ? (
                <div style={{ 
                  background: '#dcfce7', 
                  border: '1px solid #bbf7d0', 
                  padding: '2rem', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: '#166534', margin: '0 0 1rem 0' }}>Thank You!</h3>
                  <p style={{ color: '#166534', margin: 0 }}>
                    We've received your message and will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                    />
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                    >
                      <option value="buying">Buying a Home</option>
                      <option value="selling">Selling a Home</option>
                      <option value="investing">Investment Opportunities</option>
                      <option value="renting">Luxury Rentals</option>
                    </select>
                  </div>
                  
                  <select
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleChange}
                    style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
                  >
                    <option value="">Select Price Range</option>
                    <option value="500k-750k">$500K - $750K</option>
                    <option value="750k-1m">$750K - $1M</option>
                    <option value="1m-1.5m">$1M - $1.5M</option>
                    <option value="1.5m+">$1.5M+</option>
                  </select>
                  
                  <textarea
                    name="message"
                    placeholder="Tell us about your dream home or any specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', resize: 'vertical' }}
                  />
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: isSubmitting ? '#9ca3af' : '#2563eb',
                      color: 'white',
                      padding: '0.875rem 2rem',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            <div>
              <h2 className={styles.sectionTitle}>Get In Touch</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ 
                  background: 'white', 
                  padding: '2rem', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>📍 Visit Our Sales Office</h3>
                  <address style={{ fontStyle: 'normal', lineHeight: '1.6', color: '#4b5563' }}>
                    2583 Regency Cove Ct<br />
                    Las Vegas, NV 89121
                  </address>
                </div>
                
                <div style={{ 
                  background: 'white', 
                  padding: '2rem', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>📞 Call or Text</h3>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <a href="tel:+17025551234" style={{ color: '#2563eb', textDecoration: 'none' }}>
                      (702) 555-1234
                    </a>
                  </p>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>
                    Available 7 days a week
                  </p>
                </div>
                
                <div style={{ 
                  background: 'white', 
                  padding: '2rem', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>⏰ Office Hours</h3>
                  <div style={{ color: '#4b5563', lineHeight: '1.6' }}>
                    <p style={{ margin: '0 0 0.5rem 0' }}>Monday - Saturday: 9 AM - 6 PM</p>
                    <p style={{ margin: 0 }}>Sunday: 10 AM - 5 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Contact;
