
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Contact: NextPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Contact Us - Emerson Estates</title>
        <meta name="description" content="Contact Emerson Estates for more information about our luxury homes in Las Vegas. Schedule a tour or speak with our sales team." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h2>Emerson Estates</h2>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="/">Home</a></li>
            <li><a href="/homes">Available Homes</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/amenities">Amenities</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.subtitle}>Let&apos;s Find Your Perfect Home</p>
            <p className={styles.description}>
              Ready to learn more about Emerson Estates? Our knowledgeable sales team is here 
              to answer your questions and schedule a personal tour of our community.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.contactInfo}>
            <div className={styles.contactCard}>
              <h3>Sales Office</h3>
              <p>123 Emerson Estates Blvd<br />Las Vegas, NV 89123</p>
              <p><strong>Phone:</strong> (702) 555-HOMES</p>
              <p><strong>Email:</strong> info@emersonestates.com</p>
            </div>
            <div className={styles.contactCard}>
              <h3>Office Hours</h3>
              <p><strong>Monday - Saturday:</strong><br />9:00 AM - 6:00 PM</p>
              <p><strong>Sunday:</strong><br />10:00 AM - 5:00 PM</p>
              <p><strong>Model Homes:</strong><br />Open Daily</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Send Us a Message</h2>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {submitted ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '2rem', 
                background: '#e8f5e8', 
                borderRadius: '10px',
                color: '#2c3e50'
              }}>
                <h3>Thank you for your interest!</h3>
                <p>We&apos;ve received your message and will contact you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className={styles.ctaButton}
                  style={{ marginTop: '1rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '1rem',
                    borderRadius: '5px',
                    border: '2px solid #ddd',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    padding: '1rem',
                    borderRadius: '5px',
                    border: '2px solid #ddd',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    padding: '1rem',
                    borderRadius: '5px',
                    border: '2px solid #ddd',
                    fontSize: '1rem'
                  }}
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  style={{
                    padding: '1rem',
                    borderRadius: '5px',
                    border: '2px solid #ddd',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
                <button type="submit" className={styles.ctaButton}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Directions</h2>
          <div className={styles.communityGrid}>
            <div className={styles.communityCard}>
              <h3>From McCarran Airport</h3>
              <p>Take I-215 West to Exit 12 (Eastern Ave). Turn right and follow signs to Emerson Estates. Approximately 25 minutes.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>From Las Vegas Strip</h3>
              <p>Take I-15 South to I-215 East to Exit 12 (Eastern Ave). Turn left and follow signs to Emerson Estates. Approximately 20 minutes.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>From Henderson</h3>
              <p>Take Eastern Ave North directly to Emerson Estates. The community will be on your right. Approximately 15 minutes.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Emerson Estates. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
