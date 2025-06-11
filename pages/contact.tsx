import type { NextPage } from "next";
import { useState } from "react";
import Layout from "../components/Layout";
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
    <Layout 
      title="Contact Us - Emerson Estates" 
      description="Contact Emerson Estates for more information about our luxury homes in Las Vegas. Schedule a tour or speak with our sales team."
    >
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.subtitle}>Let&apos;s Start Your Journey Home</p>
            <p className={styles.description}>
              Ready to learn more about Emerson Estates? Our sales team is here to help 
              you find your perfect home in our luxury community.
            </p>
          </div>
        </section>

        <section className={styles.contactSection}>
          {submitted ? (
            <div className={styles.thankYou}>
              <h2>Thank You!</h2>
              <p>We&apos;ve received your message and will contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          )}

          <div className={styles.contactInfo}>
            <h3>Visit Our Sales Office</h3>
            <p>123 Emerson Estates Blvd<br />Las Vegas, NV 89123</p>
            <p>Phone: (702) 555-0123<br />Email: sales@emersonestates.com</p>
            <p>Hours: Monday - Sunday, 9 AM - 6 PM</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;