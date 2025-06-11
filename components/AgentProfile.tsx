
import React, { useState, useEffect } from 'react';

interface AgentProfileProps {
  className?: string;
  showFullBio?: boolean;
  showCredentials?: boolean;
  showTestimonials?: boolean;
  showContactCTA?: boolean;
}

interface Credential {
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

const AgentProfile: React.FC<AgentProfileProps> = ({
  className = '',
  showFullBio = true,
  showCredentials = true,
  showTestimonials = true,
  showContactCTA = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'bio' | 'credentials' | 'testimonials'>('bio');

  const credentials: Credential[] = [
    {
      title: 'Licensed Real Estate Professional',
      organization: 'Nevada Real Estate Division',
      year: '2018',
      description: 'Licensed to practice real estate in Nevada with specialization in luxury properties',
      icon: '🏆'
    },
    {
      title: 'Certified Luxury Home Marketing Specialist',
      organization: 'Institute for Luxury Home Marketing',
      year: '2020',
      description: 'Advanced certification in marketing and selling luxury properties',
      icon: '💎'
    },
    {
      title: 'Senior Real Estate Specialist',
      organization: 'SRES Council',
      year: '2019',
      description: 'Specialized training in serving the unique needs of senior clients',
      icon: '👥'
    },
    {
      title: 'Relocation Services Certified',
      organization: 'BHHS Nevada Properties',
      year: '2019',
      description: 'Expertise in assisting clients with local and national relocations',
      icon: '🚚'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Michael & Sarah Chen',
      role: 'Luxury Home Buyers',
      content: 'Dr. Duffy made our dream home purchase seamless. Her knowledge of the Las Vegas luxury market is unmatched, and her attention to detail gave us complete confidence throughout the process.',
      rating: 5
    },
    {
      name: 'Robert Martinez',
      role: 'Investment Property Owner',
      content: 'Working with Dr. Duffy on multiple investment properties has been exceptional. She understands market trends and always provides honest, professional advice that has saved me thousands.',
      rating: 5
    },
    {
      name: 'Jennifer Thompson',
      role: 'First-Time Home Buyer',
      content: 'As a first-time buyer, I was nervous about the process. Dr. Duffy guided me every step of the way with patience and expertise. I couldn\'t have asked for a better agent.',
      rating: 5
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('agent-profile');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ⭐
      </span>
    ));
  };

  const handleContactClick = () => {
    // Track interaction
    if (typeof window !== 'undefined' && (window as any).trackAnalyticsEvent) {
      (window as any).trackAnalyticsEvent({
        action: 'agent_contact_click',
        category: 'conversion',
        label: 'agent_profile_widget'
      });
    }
  };

  return (
    <div 
      id="agent-profile"
      className={`agent-profile ${className} ${isVisible ? 'visible' : ''}`}
      data-analytics="agent-profile"
    >
      <div className="profile-container">
        <div className="profile-header">
          <div className="agent-image-container">
            <img 
              src="/professional-headshot.jpg" 
              alt="Dr. Jan Duffy - Licensed Real Estate Professional"
              className="agent-image"
              width="200"
              height="200"
            />
            <div className="image-overlay">
              <div className="status-badge">Available</div>
            </div>
          </div>
          
          <div className="agent-info">
            <h2 className="agent-name">Dr. Jan Duffy</h2>
            <p className="agent-title">Licensed Real Estate Professional</p>
            <p className="agent-license">Nevada License #: S.0183086</p>
            
            <div className="agent-stats">
              <div className="stat">
                <div className="stat-number">150+</div>
                <div className="stat-label">Homes Sold</div>
              </div>
              <div className="stat">
                <div className="stat-number">$50M+</div>
                <div className="stat-label">In Sales</div>
              </div>
              <div className="stat">
                <div className="stat-number">5★</div>
                <div className="stat-label">Client Rating</div>
              </div>
            </div>

            <div className="contact-info">
              <a href="tel:+17027677105" className="contact-method primary">
                <span className="icon">📞</span>
                <span className="text">(702) 767-7105</span>
              </a>
              <a href="mailto:dr.jan.duffy@bhhs.com" className="contact-method">
                <span className="icon">✉️</span>
                <span className="text">dr.jan.duffy@bhhs.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="content-tabs">
            <button 
              className={`tab ${activeTab === 'bio' ? 'active' : ''}`}
              onClick={() => setActiveTab('bio')}
            >
              Biography
            </button>
            {showCredentials && (
              <button 
                className={`tab ${activeTab === 'credentials' ? 'active' : ''}`}
                onClick={() => setActiveTab('credentials')}
              >
                Credentials
              </button>
            )}
            {showTestimonials && (
              <button 
                className={`tab ${activeTab === 'testimonials' ? 'active' : ''}`}
                onClick={() => setActiveTab('testimonials')}
              >
                Testimonials
              </button>
            )}
          </div>

          <div className="tab-content">
            {activeTab === 'bio' && showFullBio && (
              <div className="bio-content">
                <h3>About Dr. Jan Duffy</h3>
                <div className="bio-text">
                  <p>
                    With over 6 years of dedicated service in Las Vegas real estate, Dr. Jan Duffy 
                    brings a unique combination of academic excellence and practical expertise to 
                    every client relationship. Her commitment to understanding each client's unique 
                    needs has earned her a reputation as one of the most trusted agents in the luxury market.
                  </p>
                  <p>
                    Dr. Duffy specializes in luxury residential properties, investment opportunities, 
                    and relocation services throughout the Las Vegas metropolitan area. Her deep 
                    knowledge of local neighborhoods, market trends, and negotiation strategies 
                    ensures her clients receive exceptional service and optimal results.
                  </p>
                  <p>
                    As a proud member of Berkshire Hathaway HomeServices Nevada Properties, 
                    Dr. Duffy leverages cutting-edge technology and extensive marketing resources 
                    to provide her clients with a competitive advantage in today's dynamic market.
                  </p>
                </div>

                <div className="specializations">
                  <h4>Areas of Expertise</h4>
                  <ul className="expertise-list">
                    <li>Luxury Home Sales & Marketing</li>
                    <li>Investment Property Analysis</li>
                    <li>Relocation Services</li>
                    <li>Market Analysis & Pricing Strategy</li>
                    <li>Negotiation & Contract Management</li>
                    <li>First-Time Buyer Guidance</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'credentials' && showCredentials && (
              <div className="credentials-content">
                <h3>Professional Credentials</h3>
                <div className="credentials-grid">
                  {credentials.map((credential, index) => (
                    <div key={index} className="credential-card">
                      <div className="credential-icon">{credential.icon}</div>
                      <div className="credential-info">
                        <h4 className="credential-title">{credential.title}</h4>
                        <p className="credential-org">{credential.organization}</p>
                        <p className="credential-year">Obtained: {credential.year}</p>
                        <p className="credential-desc">{credential.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && showTestimonials && (
              <div className="testimonials-content">
                <h3>Client Testimonials</h3>
                <div className="testimonials-grid">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                      <div className="testimonial-header">
                        <div className="client-info">
                          <h4 className="client-name">{testimonial.name}</h4>
                          <p className="client-role">{testimonial.role}</p>
                        </div>
                        <div className="rating">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                      <blockquote className="testimonial-content">
                        "{testimonial.content}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showContactCTA && (
          <div className="profile-footer">
            <div className="cta-section">
              <h3>Ready to Get Started?</h3>
              <p>Let's discuss your real estate goals and create a personalized strategy for success.</p>
              <div className="cta-buttons">
                <button 
                  className="cta-button primary"
                  onClick={handleContactClick}
                >
                  Schedule Consultation
                </button>
                <button 
                  className="cta-button secondary"
                  onClick={handleContactClick}
                >
                  Get Market Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .agent-profile {
          padding: 40px 0;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .agent-profile.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .profile-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .profile-header {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 40px;
          margin-bottom: 40px;
          align-items: start;
        }

        .agent-image-container {
          position: relative;
        }

        .agent-image {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #e2e8f0;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .image-overlay {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }

        .status-badge {
          background: #10b981;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        }

        .agent-info {
          padding-top: 10px;
        }

        .agent-name {
          font-size: 32px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #1a365d, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .agent-title {
          font-size: 18px;
          color: #2563eb;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .agent-license {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 24px;
        }

        .agent-stats {
          display: flex;
          gap: 32px;
          margin-bottom: 24px;
          padding: 20px 0;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #2563eb;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-method {
          display: flex;
          align-items: center;
          color: #374151;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }

        .contact-method:hover {
          background: #f8fafc;
          border-color: #2563eb;
          color: #2563eb;
        }

        .contact-method.primary {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          border-color: transparent;
        }

        .contact-method.primary:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .contact-method .icon {
          margin-right: 12px;
          font-size: 18px;
        }

        .profile-content {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        .content-tabs {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
        }

        .tab {
          flex: 1;
          padding: 16px 24px;
          background: transparent;
          border: none;
          font-size: 16px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 3px solid transparent;
        }

        .tab:hover {
          background: #f8fafc;
          color: #2563eb;
        }

        .tab.active {
          color: #2563eb;
          border-bottom-color: #2563eb;
          background: #f8fafc;
        }

        .tab-content {
          padding: 32px;
        }

        .bio-content h3,
        .credentials-content h3,
        .testimonials-content h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 24px;
        }

        .bio-text p {
          color: #374151;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .specializations {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }

        .specializations h4 {
          font-size: 18px;
          font-weight: 600;
          color: #1a365d;
          margin-bottom: 16px;
        }

        .expertise-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .expertise-list li {
          color: #374151;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
          position: relative;
          padding-left: 20px;
        }

        .expertise-list li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: bold;
        }

        .credentials-grid {
          display: grid;
          gap: 24px;
        }

        .credential-card {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .credential-icon {
          font-size: 32px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          flex-shrink: 0;
        }

        .credential-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a365d;
          margin-bottom: 4px;
        }

        .credential-org {
          font-size: 14px;
          color: #2563eb;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .credential-year {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 8px;
        }

        .credential-desc {
          font-size: 14px;
          color: #374151;
          line-height: 1.5;
        }

        .testimonials-grid {
          display: grid;
          gap: 24px;
        }

        .testimonial-card {
          padding: 24px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .testimonial-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 16px;
        }

        .client-name {
          font-size: 16px;
          font-weight: 600;
          color: #1a365d;
          margin-bottom: 4px;
        }

        .client-role {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .rating {
          display: flex;
          gap: 2px;
        }

        .star {
          font-size: 14px;
          opacity: 0.3;
        }

        .star.filled {
          opacity: 1;
        }

        .testimonial-content {
          font-style: italic;
          color: #374151;
          line-height: 1.6;
          margin: 0;
        }

        .profile-footer {
          margin-top: 32px;
          padding: 32px;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          text-align: center;
        }

        .cta-section h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 12px;
        }

        .cta-section p {
          color: #64748b;
          margin-bottom: 24px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .cta-button {
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
        }

        .cta-button.primary:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .cta-button.secondary {
          background: white;
          color: #2563eb;
          border: 1px solid #2563eb;
        }

        .cta-button.secondary:hover {
          background: #2563eb;
          color: white;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .profile-header {
            grid-template-columns: 1fr;
            gap: 24px;
            text-align: center;
          }

          .agent-image {
            width: 150px;
            height: 150px;
            margin: 0 auto;
          }

          .agent-stats {
            justify-content: center;
            gap: 24px;
          }

          .content-tabs {
            flex-direction: column;
          }

          .tab {
            text-align: left;
          }

          .tab-content {
            padding: 24px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .expertise-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .profile-container {
            padding: 0 16px;
          }

          .agent-name {
            font-size: 24px;
          }

          .agent-stats {
            gap: 16px;
          }

          .stat-number {
            font-size: 20px;
          }

          .tab-content {
            padding: 20px;
          }

          .credential-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AgentProfile;
