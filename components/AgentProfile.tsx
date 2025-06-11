
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function AgentProfile() {
  return (
    <section className={styles.section} style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', color: 'white' }}>
      <div className="agent-profile">
        <div className="agent-image">
          <Image
            src="/professional-headshot.jpg"
            alt="Dr. Duffy - Real Estate Professional"
            width={200}
            height={200}
            className="agent-photo"
            priority
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/bhhs-logo.jpg';
            }}
          />
        </div>
        
        <div className="agent-info">
          <h2>Dr. Duffy</h2>
          <h3>Your Luxury Real Estate Expert</h3>
          <p className="agent-title">Berkshire Hathaway HomeServices Nevada Properties</p>
          
          <div className="agent-credentials">
            <div className="credential">
              <strong>🏆 Top Producer</strong> - Consistent multi-million dollar sales
            </div>
            <div className="credential">
              <strong>📚 PhD in Education</strong> - Bringing analytical expertise to real estate
            </div>
            <div className="credential">
              <strong>🏘️ Local Expert</strong> - Deep knowledge of Las Vegas luxury market
            </div>
            <div className="credential">
              <strong>💼 20+ Years Experience</strong> - Proven track record in high-end properties
            </div>
          </div>

          <p className="agent-description">
            With a unique combination of academic excellence and real estate expertise, Dr. Duffy provides 
            unparalleled service to discerning clients. Specializing in luxury properties and investment 
            opportunities in Las Vegas&apos; most prestigious communities.
          </p>

          <div className="agent-contact">
            <a href="tel:+17025551234" className="contact-btn primary">
              📞 Call Direct
            </a>
            <a href="mailto:dr.duffy@emersonestateshomes.com" className="contact-btn secondary">
              ✉️ Email Now
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .agent-profile {
          display: flex;
          align-items: center;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .agent-image {
          flex-shrink: 0;
        }

        .agent-photo {
          border-radius: 50%;
          border: 5px solid white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .agent-info {
          flex: 1;
        }

        .agent-info h2 {
          color: #ffffff;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .agent-info h3 {
          color: #fbbf24;
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .agent-title {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .agent-credentials {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 10px;
          margin: 1.5rem 0;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .credential {
          margin-bottom: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .credential:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .agent-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.9);
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
          background: #fbbf24;
          color: #1e40af;
        }

        .contact-btn.primary:hover {
          background: #f59e0b;
          transform: translateY(-2px);
        }

        .contact-btn.secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255,255,255,0.3);
        }

        .contact-btn.secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.5);
        }

        @media (max-width: 768px) {
          .agent-profile {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
          }

          .agent-contact {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
