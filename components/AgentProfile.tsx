
import React from 'react';

interface AgentProfileProps {
  className?: string;
}

export default function AgentProfile({ className = "" }: AgentProfileProps) {
  return (
    <section className={`agent-profile ${className}`}>
      <div className="agent-container">
        <div className="agent-image">
          <img 
            src="/professional-headshot.jpg" 
            alt="Dr. Duffy - Real Estate Professional"
            width="200"
            height="250"
            loading="lazy"
          />
        </div>
        <div className="agent-info">
          <h2>Meet Your Luxury Real Estate Expert</h2>
          <h3>Dr. Duffy</h3>
          <p className="agent-title">Senior Real Estate Advisor | Berkshire Hathaway HomeServices</p>
          
          <div className="agent-credentials">
            <div className="credential">
              <strong>Specialization:</strong> Luxury Properties & Investment Real Estate
            </div>
            <div className="credential">
              <strong>Experience:</strong> 15+ Years in Las Vegas Market
            </div>
            <div className="credential">
              <strong>Certifications:</strong> CRS, GRI, ABR
            </div>
          </div>

          <p className="agent-description">
            With deep expertise in the Las Vegas luxury market, Dr. Duffy brings unparalleled 
            knowledge and personalized service to every client. Specializing in high-end properties 
            and investment opportunities, Dr. Duffy ensures you find not just a house, but your perfect home.
          </p>

          <div className="agent-contact">
            <a href="tel:+17025551234" className="contact-btn primary">
              📞 Schedule Consultation
            </a>
            <a href="mailto:dr.duffy@emersonestateshomes.com" className="contact-btn secondary">
              ✉️ Send Message
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .agent-profile {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 4rem 2rem;
          margin: 2rem 0;
        }

        .agent-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          align-items: center;
        }

        .agent-image img {
          width: 100%;
          height: auto;
          border-radius: 15px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .agent-image img:hover {
          transform: scale(1.05);
        }

        .agent-info h2 {
          color: #2c3e50;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .agent-info h3 {
          color: #1e3a8a;
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .agent-title {
          color: #6b7280;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .agent-credentials {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          margin: 1.5rem 0;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .credential {
          margin-bottom: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .credential:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .agent-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #374151;
          margin: 1.5rem 0;
        }

        .agent-contact {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .contact-btn {
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .contact-btn.primary {
          background: #1e3a8a;
          color: white;
        }

        .contact-btn.primary:hover {
          background: #1e40af;
          transform: translateY(-2px);
        }

        .contact-btn.secondary {
          background: white;
          color: #1e3a8a;
          border: 2px solid #1e3a8a;
        }

        .contact-btn.secondary:hover {
          background: #1e3a8a;
          color: white;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .agent-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .agent-info h2 {
            font-size: 2rem;
          }

          .contact-btn {
            width: 100%;
            justify-content: center;
          }

          .agent-contact {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
