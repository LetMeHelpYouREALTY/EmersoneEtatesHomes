
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ 
  children, 
  title = "Emerson Estates - Luxury Homes in Las Vegas", 
  description = "Discover luxury living at Emerson Estates. Premium homes with world-class amenities in Las Vegas, Nevada." 
}: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Available Homes', href: '/homes' },
    { name: 'Community', href: '/community' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://emersonestateshomes.com${router.asPath}`} />
        <meta property="og:image" content="https://emersonestateshomes.com/design 05_new 2_1749651606209.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://emersonestateshomes.com/design 05_new 2_1749651606209.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Emerson Estates",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2583 Regency Cove Ct",
                "addressLocality": "Las Vegas",
                "addressRegion": "Nevada",
                "postalCode": "89121",
                "addressCountry": "US"
              },
              "description": description,
              "url": "https://emersonestateshomes.com"
            })
          }}
        />
      </Head>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <span className="logo-text">Emerson Estates</span>
            <span className="logo-subtitle">Luxury Living</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${router.pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contact" className="nav-cta">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`mobile-nav-link ${router.pathname === item.href ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="/contact" 
            className="mobile-nav-cta"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Emerson Estates</h3>
              <p>Luxury living in the heart of Las Vegas. Experience the perfect blend of elegance, comfort, and community.</p>
              <div className="contact-info">
                <p>📍 2583 Regency Cove Ct, Las Vegas, NV 89121</p>
                <p>📞 <a href="tel:+17025551234">(702) 555-1234</a></p>
                <p>✉️ <a href="mailto:info@emersonestateshomes.com">info@emersonestateshomes.com</a></p>
              </div>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>Luxury Home Sales</li>
                <li>Property Management</li>
                <li>Investment Consultation</li>
                <li>Market Analysis</li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Connect With Us</h4>
              <div className="social-links">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="LinkedIn">💼</a>
                <a href="#" aria-label="YouTube">📺</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Emerson Estates. All rights reserved.</p>
            <div className="footer-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          text-decoration: none;
          display: flex;
          flex-direction: column;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e40af;
          line-height: 1;
        }

        .logo-subtitle {
          font-size: 0.75rem;
          color: #64748b;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          text-decoration: none;
          color: #374151;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #1e40af;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          height: 2px;
          background: #1e40af;
        }

        .nav-cta {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s ease;
        }

        .nav-cta:hover {
          transform: translateY(-2px);
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hamburger {
          width: 25px;
          height: 3px;
          background: #374151;
          margin: 3px 0;
          transition: 0.3s;
        }

        .hamburger.active:nth-child(1) {
          transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active:nth-child(3) {
          transform: rotate(45deg) translate(-5px, -6px);
        }

        .mobile-nav {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .mobile-nav.open {
          max-height: 400px;
        }

        .mobile-nav-link,
        .mobile-nav-cta {
          display: block;
          padding: 1rem 2rem;
          text-decoration: none;
          color: #374151;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          transition: background 0.3s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: #f8fafc;
          color: #1e40af;
        }

        .mobile-nav-cta {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          font-weight: 600;
          margin: 1rem 2rem;
          border-radius: 8px;
          text-align: center;
          border: none;
        }

        main {
          margin-top: 80px;
          min-height: calc(100vh - 80px);
        }

        .footer {
          background: #1f2937;
          color: white;
          padding: 3rem 0 1rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .footer-section h3,
        .footer-section h4 {
          color: #fbbf24;
          margin-bottom: 1rem;
        }

        .footer-section p,
        .footer-section li {
          color: #d1d5db;
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section a {
          color: #d1d5db;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: #fbbf24;
        }

        .contact-info {
          margin-top: 1rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transition: background 0.3s ease;
          font-size: 1.2rem;
        }

        .social-links a:hover {
          background: #fbbf24;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer-links {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}
