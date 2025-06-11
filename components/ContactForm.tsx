import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'either';
  timeframe: string;
  budget: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ContactFormProps {
  className?: string;
  propertyId?: string;
  onSubmitSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  className = '', 
  propertyId,
  onSubmitSuccess 
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    propertyInterest: propertyId || '',
    message: '',
    preferredContact: 'either',
    timeframe: '',
    budget: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const totalSteps = 3;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'phone':
        const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
        return value && !phoneRegex.test(value) ? 'Please enter a valid phone number' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const validateStep = (step: number): boolean => {
    const stepErrors: FormErrors = {};

    switch (step) {
      case 1:
        stepErrors.name = validateField('name', formData.name);
        stepErrors.email = validateField('email', formData.email);
        if (formData.phone) {
          stepErrors.phone = validateField('phone', formData.phone);
        }
        break;
      case 2:
        // Optional fields, no validation needed
        break;
      case 3:
        stepErrors.message = validateField('message', formData.message);
        break;
    }

    const hasErrors = Object.values(stepErrors).some(error => error !== '');
    setErrors(stepErrors);
    return !hasErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Track analytics
    if (typeof window !== 'undefined' && window.trackAnalyticsEvent) {
      window.trackAnalyticsEvent({
        action: 'form_field_interaction',
        category: 'engagement',
        label: name,
        customParameters: { field_name: name, step: currentStep }
      });
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          propertyId,
          timestamp: new Date().toISOString(),
          source: 'contact_form'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        if (onSubmitSuccess) onSubmitSuccess();

        // Track conversion
        if (typeof window !== 'undefined' && window.trackAnalyticsEvent) {
          window.trackAnalyticsEvent({
            action: 'contact_form_submission',
            category: 'conversion',
            label: propertyId ? `property_${propertyId}` : 'general_inquiry'
          });
        }

        // Reset form after delay
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            propertyInterest: propertyId || '',
            message: '',
            preferredContact: 'either',
            timeframe: '',
            budget: ''
          });
          setCurrentStep(1);
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step"
          >
            <h3>Let&apos;s Get to Know You</h3>
            <p>Tell us how to reach you</p>

            <div className="input-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="Your full name"
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="your.email@example.com"
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
                placeholder="(702) 555-0123"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="preferredContact">Preferred Contact Method</label>
              <select
                id="preferredContact"
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleInputChange}
              >
                <option value="either">Either Email or Phone</option>
                <option value="email">Email Only</option>
                <option value="phone">Phone Only</option>
              </select>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step"
          >
            <h3>Your Property Interests</h3>
            <p>Help us understand what you&apos;re looking for</p>

            <div className="input-group">
              <label htmlFor="propertyInterest">Specific Property Interest</label>
              <input
                type="text"
                id="propertyInterest"
                name="propertyInterest"
                value={formData.propertyInterest}
                onChange={handleInputChange}
                placeholder="Property address or MLS number"
              />
            </div>

            <div className="input-group">
              <label htmlFor="timeframe">Purchase Timeframe</label>
              <select
                id="timeframe"
                name="timeframe"
                value={formData.timeframe}
                onChange={handleInputChange}
              >
                <option value="">Select timeframe</option>
                <option value="immediately">Ready to buy now</option>
                <option value="1-3months">1-3 months</option>
                <option value="3-6months">3-6 months</option>
                <option value="6-12months">6-12 months</option>
                <option value="over-1year">Over 1 year</option>
                <option value="just-looking">Just browsing</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="budget">Budget Range</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
              >
                <option value="">Select budget range</option>
                <option value="under-500k">Under $500K</option>
                <option value="500k-750k">$500K - $750K</option>
                <option value="750k-1m">$750K - $1M</option>
                <option value="1m-1.5m">$1M - $1.5M</option>
                <option value="1.5m-2m">$1.5M - $2M</option>
                <option value="over-2m">Over $2M</option>
              </select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="form-step"
          >
            <h3>Tell Us More</h3>
            <p>Any additional details or questions?</p>

            <div className="input-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? 'error' : ''}
                placeholder="Tell us about your needs, questions, or anything else we should know..."
                rows={5}
                required
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <div className="form-summary">
              <h4>Review Your Information</h4>
              <div className="summary-item">
                <strong>Name:</strong> {formData.name}
              </div>
              <div className="summary-item">
                <strong>Email:</strong> {formData.email}
              </div>
              {formData.phone && (
                <div className="summary-item">
                  <strong>Phone:</strong> {formData.phone}
                </div>
              )}
              {formData.timeframe && (
                <div className="summary-item">
                  <strong>Timeframe:</strong> {formData.timeframe.replace('-', ' ')}
                </div>
              )}
              {formData.budget && (
                <div className="summary-item">
                  <strong>Budget:</strong> {formData.budget.replace('-', ' - ')}
                </div>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`contact-form success-state ${className}`}
      >
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h3>Thank You!</h3>
          <p>Your message has been received. We&apos;ll get back to you within 24 hours.</p>
          <div className="success-details">
            <p>📧 Email confirmation sent to: <strong>{formData.email}</strong></p>
            <p>🕐 Expected response time: <strong>Within 24 hours</strong></p>
          </div>
        </div>

        <style jsx>{`
          .success-state {
            text-align: center;
            padding: 3rem;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border-radius: 20px;
          }

          .success-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }

          .success-content h3 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .success-details {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.2);
          }

          .success-details p {
            margin: 0.5rem 0;
            opacity: 0.9;
          }
        `}</style>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className={`contact-form ${className}`}
      data-analytics="contact"
    >
      <div className="form-container">
        <div className="form-header">
          <h2>Get In Touch</h2>
          <p>Ready to find your dream home? Let&apos;s start the conversation.</p>

          <div className="progress-bar">
            <div className="progress-track">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="step-indicators">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`step-indicator ${i + 1 <= currentStep ? 'active' : ''}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form-fields">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="error-state"
            >
              <p>⚠️ Something went wrong. Please try again or call us at (702) 555-1234.</p>
            </motion.div>
          )}

          <div className="form-navigation">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="nav-btn secondary"
                disabled={isSubmitting}
              >
                ← Previous
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="nav-btn primary"
                disabled={isSubmitting}
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="nav-btn primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            )}
          </div>
        </form>

        <div className="form-footer">
          <div className="contact-alternatives">
            <div className="alternative">
              <span className="icon">📞</span>
              <div>
                <strong>Call Direct</strong>
                <p>(702) 555-1234</p>
              </div>
            </div>
            <div className="alternative">
              <span className="icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>info@emersonestateshomes.com</p>
              </div>
            </div>
            <div className="alternative">
              <span className="icon">🕐</span>
              <div>
                <strong>Response Time</strong>
                <p>Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-form {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          overflow: hidden;
          max-width: 600px;
          margin: 0 auto;
        }

        .form-container {
          padding: 2.5rem;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          color: #1e40af;
          font-size: 2.25rem;
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: #64748b;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .progress-bar {
          margin-bottom: 2rem;
        }

        .progress-track {
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          border-radius: 3px;
        }

        .step-indicators {
          display: flex;
          justify-content: space-between;
          max-width: 200px;
          margin: 0 auto;
        }

        .step-indicator {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          color: #9ca3af;
          transition: all 0.3s ease;
        }

        .step-indicator.active {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
        }

        .form-step {
          min-height: 400px;
        }

        .form-step h3 {
          color: #1e40af;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .form-step p {
          color: #64748b;
          margin-bottom: 2rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
        }

        .input-group input,
        .input-group select,
        .input-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          font-family: inherit;
        }

        .input-group input:focus,
        .input-group select:focus,
        .input-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .input-group input.error,
        .input-group textarea.error {
          border-color: #ef4444;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: block;
        }

        .form-summary {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 12px;
          margin-top: 2rem;
        }

        .form-summary h4 {
          color: #1e40af;
          margin-bottom: 1rem;
        }

        .summary-item {
          margin-bottom: 0.5rem;
          color: #64748b;
        }

        .form-navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          gap: 1rem;
        }

        .nav-btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 120px;
          justify-content: center;
        }

        .nav-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .nav-btn.primary {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          margin-left: auto;
        }

        .nav-btn.secondary {
          background: white;
          color: #1e40af;
          border: 2px solid #e5e7eb;
        }

        .nav-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .error-state {
          background: #fef2f2;
          color: #dc2626;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
          text-align: center;
        }

        .form-footer {
          background: #f8fafc;
          padding: 2rem;
          margin-top: 2rem;
        }

        .contact-alternatives {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          text-align: center;
        }

        .alternative {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .alternative .icon {
          font-size: 1.5rem;
        }

        .alternative strong {
          color: #1e40af;
          font-size: 0.9rem;
        }

        .alternative p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 1.5rem;
          }

          .form-step {
            min-height: 350px;
          }

          .contact-alternatives {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .form-navigation {
            flex-direction: column;
          }

          .nav-btn.primary {
            margin-left: 0;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ContactForm;