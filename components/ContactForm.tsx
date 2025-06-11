import { useState, FormEvent } from 'react';
import { ContactFormData } from '@/types';
import styles from '../styles/Home.module.css';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyType: string;
  priceRange: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyType: 'luxury-home',
    priceRange: '500k-1m'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus<'idle' | 'success' | 'error'>>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          propertyType: 'luxury-home',
          priceRange: '500k-1m'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className={styles.section} style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <div className="contact-form-container">
        <div className="form-header">
          <h2>Ready to Find Your Dream Home?</h2>
          <p>Connect with Dr. Duffy and our luxury real estate team</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="form-group">
              <label htmlFor="propertyType">Property Interest</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="luxury-home">Luxury Home</option>
                <option value="investment">Investment Property</option>
                <option value="vacation-home">Vacation Home</option>
                <option value="commercial">Commercial Property</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="priceRange">Price Range</label>
            <select
              id="priceRange"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
            >
              <option value="500k-1m">$500K - $1M</option>
              <option value="1m-2m">$1M - $2M</option>
              <option value="2m-5m">$2M - $5M</option>
              <option value="5m+">$5M+</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your dream home or any specific requirements..."
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <div className="status-message success">
              Thank you! We&apos;ll be in touch within 24 hours.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="status-message error">
              Something went wrong. Please try again or call us directly.
            </div>
          )}
        </form>
      </div>

      <style jsx>{`
        .contact-form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .form-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .form-header h2 {
          font-size: 2.5rem;
          color: #1e40af;
          margin-bottom: 1rem;
        }

        .form-header p {
          font-size: 1.2rem;
          color: #64748b;
        }

        .contact-form {
          background: white;
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .status-message {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 600;
        }

        .status-message.success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .status-message.error {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-form {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}