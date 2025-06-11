
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function AgentProfile() {
  return (
    <section className={styles['section']} style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', color: 'white' }}>
      <div className="agent-profile">
        <div className="agent-content">
          <div className="agent-image">
            <Image
              src="/Dr. Duffy Blue_Headshot_1749651931522.jpg"
              alt="Dr. Duffy - Real Estate Professional"
              width={300}
              height={300}
              className="agent-photo"
              priority
              unoptimized
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/bhhs-logo.jpg';
              }}
            />
            <div className="agent-badge">
              <span>🏆</span>
              <span>Top 1% Producer</span>
            </div>
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

            <div className="achievements">
              <div className="achievement">
                <span className="achievement-number">$500M+</span>
                <span className="achievement-label">Career Sales Volume</span>
              </div>
              <div className="achievement">
                <span className="achievement-number">1,200+</span>
                <span className="achievement-label">Homes Sold</span>
              </div>
              <div className="achievement">
                <span className="achievement-number">98%</span>
                <span className="achievement-label">Client Satisfaction</span>
              </div>
            </div>

            <div className="contact-buttons">
              <a href="/contact" className="btn primary">
                Schedule Consultation
              </a>
              <a href="tel:+17025551234" className="btn secondary">
                Call Now
              </a>
            </div>
          </div>
        </div>

        <div className="testimonials">
          <h3>What Clients Say</h3>
          <div className="testimonial-grid">
            <div className="testimonial">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>&quot;Dr. Duffy&apos;s expertise and attention to detail made our home buying experience seamless. His knowledge of the luxury market is unmatched.&quot;</p>
              <cite>- Sarah & Michael K.</cite>
            </div>
            <div className="testimonial">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>&quot;Professional, knowledgeable, and always available. Dr. Duffy helped us find our dream home in Emerson Estates and negotiated an excellent deal.&quot;</p>
              <cite>- Jennifer R.</cite>
            </div>
            <div className="testimonial">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>&quot;His analytical approach and market insights gave us confidence throughout the entire process. Highly recommend for luxury real estate.&quot;</p>
              <cite>- David & Lisa M.</cite>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .agent-profile {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .agent-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 4rem;
        }

        .agent-image {
          position: relative;
          text-align: center;
        }

        .agent-photo {
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
        }

        .agent-photo:hover {
          transform: scale(1.05);
        }

        .agent-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: #1f2937;
          padding: 0.75rem 1rem;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 30px rgba(251, 191, 36, 0.3);
        }

        .agent-info h2 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .agent-info h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: rgba(255,255,255,0.9);
        }

        .agent-title {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.8);
          margin-bottom: 2rem;
        }

        .agent-credentials {
          margin-bottom: 2rem;
        }

        .credential {
          background: rgba(255,255,255,0.1);
          padding: 1rem;
          margin: 0.75rem 0;
          border-radius: 12px;
          border-left: 4px solid #fbbf24;
          backdrop-filter: blur(10px);
        }

        .credential strong {
          color: #fbbf24;
        }

        .achievements {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .achievement {
          text-align: center;
          background: rgba(255,255,255,0.1);
          padding: 1.5rem 1rem;
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .achievement-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #fbbf24;
          margin-bottom: 0.5rem;
        }

        .achievement-label {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
        }

        .contact-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1rem 2rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s ease;
          text-align: center;
          flex: 1;
          min-width: 180px;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .btn.primary {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: #1f2937;
        }

        .btn.secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255,255,255,0.3);
        }

        .testimonials {
          text-align: center;
        }

        .testimonials h3 {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #fbbf24;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .testimonial {
          background: rgba(255,255,255,0.1);
          padding: 2rem;
          border-radius: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .stars {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .testimonial p {
          font-style: italic;
          line-height: 1.6;
          margin-bottom: 1rem;
          color: rgba(255,255,255,0.9);
        }

        .testimonial cite {
          font-weight: 600;
          color: #fbbf24;
        }

        @media (max-width: 768px) {
          .agent-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .achievements {
            grid-template-columns: 1fr;
          }

          .contact-buttons {
            flex-direction: column;
          }

          .agent-info h2 {
            font-size: 2rem;
          }

          .testimonial-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
