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

          <div className="agent-contact">
            <a href="tel:+17025551234" className="contact-button">
              📞 Call Dr. Duffy
            </a>
            <a href="mailto:drduffy@emersonestateshomes.com" className="contact-button">
              ✉️ Send Email
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .agent-profile {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 4rem 2rem;
          border-radius: 12px;
          margin: 2rem 0;
        }

        .agent-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
          align-items: center;
        }

        .agent-image img {
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          width: 100%;
          height: auto;
        }

        .agent-info h2 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
          font-size: 2rem;
        }

        .agent-info h3 {
          color: #e74c3c;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        .agent-title {
          color: #666;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .agent-credentials {
          margin-bottom: 2rem;
        }

        .credential {
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .agent-contact {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .contact-button {
          background: #e74c3c;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .contact-button:hover {
          background: #c0392b;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .agent-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .agent-profile {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </section>
  );
}