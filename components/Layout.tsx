import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ContactForm from './ContactForm';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showContactModal?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = React.memo(({
  children,
  title = 'Emerson Estates - Luxury Homes in Las Vegas',
  description = 'Discover luxury living at Emerson Estates with Dr. Jan Duffy, your trusted real estate expert in Las Vegas.',
  showContactModal = false,
  className = ''
}) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(showContactModal);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsContactModalOpen(showContactModal);
  }, [showContactModal]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navigation = React.useMemo(() => [
    { name: 'Home', href: '/' },
    { name: 'Available Homes', href: '/homes' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Neighborhoods', href: '/neighborhoods' },
    { name: 'Community', href: '/community' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Nearby Amenities', href: '/nearby-amenities' },
    { name: 'Market Insights', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ], []);

  const isActivePage = (href: string) => {
    return router.pathname === href;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL + router.asPath} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/design 05_new 2_1749651606209.jpg`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/design 05_new 2_1749651606209.jpg`} />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Jan Duffy" />
        <meta name="keywords" content="luxury homes, Las Vegas real estate, Emerson Estates, Dr. Jan Duffy, BHHS Nevada Properties" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL + router.asPath} />
      </Head>

      <div className={`layout ${className}`}>
        {/* Header */}
        <header className={`header ${isScrolled ? 'scrolled' : ''}`} data-analytics="header">
          <div className="header-container">
            {/* Logo */}
            <div className="logo-section">
              <Link href="/" className="logo-link" onClick={closeMenu}>
                <Image 
                  src="/bhhs-logo.jpg" 
                  alt="Berkshire Hathaway HomeServices Nevada Properties"
                  className="logo-image"
                  width={60}
                  height={60}
                />
                <div className="logo-text">
                  <div className="brand-name">Emerson Estates</div>
                  <div className="agent-name">Dr. Jan Duffy</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" data-analytics="navigation">
              <ul className="nav-list">
                {navigation.map((item) => (
                  <li key={item.name} className="nav-item">
                    <Link
                      href={item.href}
                      className={`nav-link ${isActivePage(item.href) ? 'active' : ''}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              <button
                onClick={openContactModal}
                className="cta-button primary"
                data-analytics="contact-cta"
              >
                Contact Agent
              </button>

              <button
                className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
                data-analytics="mobile-menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
            <nav className="mobile-nav-container">
              <ul className="mobile-nav-list">
                {navigation.map((item) => (
                  <li key={item.name} className="mobile-nav-item">
                    <Link
                      href={item.href}
                      className={`mobile-nav-link ${isActivePage(item.href) ? 'active' : ''}`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mobile-nav-actions">
                <button
                  onClick={() => {
                    openContactModal();
                    closeMenu();
                  }}
                  className="cta-button primary full-width"
                >
                  Contact Agent
                </button>

                <div className="agent-contact-info">
                  <a href="tel:+17027677105" className="contact-link">
                    📞 (702) 767-7105
                  </a>
                  <a href="mailto:dr.jan.duffy@bhhs.com" className="contact-link">
                    ✉️ dr.jan.duffy@bhhs.com
                  </a>
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer" data-analytics="footer">
          <div className="footer-container">
            {/* Agent Section */}
            <div className="footer-section agent-section">
              <div className="agent-info">
                <Image 
                  src="/professional-headshot.jpg" 
                  alt="Dr. Jan Duffy"
                  className="agent-photo"
                  width={80}
                  height={80}
                  style={{ 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    marginBottom: '1rem'
                  }}
                />
                <div className="agent-details">
                  <h3 className="agent-name">Dr. Jan Duffy</h3>
                  <p className="agent-title">Licensed Real Estate Professional</p>
                  <p className="agent-license">License #: S.0183086</p>
                </div>
              </div>

              <div className="contact-methods">
                <a href="tel:+17027677105" className="contact-method">
                  <span className="icon">📞</span>
                  <span className="text">(702) 767-7105</span>
                </a>
                <a href="mailto:dr.jan.duffy@bhhs.com" className="contact-method">
                  <span className="icon">✉️</span>
                  <span className="text">dr.jan.duffy@bhhs.com</span>
                </a>
                <div className="contact-method">
                  <span className="icon">📍</span>
                  <span className="text">Las Vegas, Nevada</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                <li><span className="footer-link">Luxury Home Sales</span></li>
                <li><span className="footer-link">Investment Properties</span></li>
                <li><span className="footer-link">Market Analysis</span></li>
                <li><span className="footer-link">Property Consultation</span></li>
                <li><span className="footer-link">Relocation Services</span></li>
              </ul>
            </div>

            {/* Company Info */}
            <div className="footer-section">
              <h4 className="footer-title">Brokerage</h4>
              <div className="brokerage-info">
                <Image 
                  src="/bhhs-logo.jpg" 
                  alt="BHHS Nevada Properties"
                  className="brokerage-logo"
                  width={60}
                  height={60}
                />
                <div className="brokerage-details">
                  <p className="brokerage-name">Berkshire Hathaway<br />HomeServices Nevada Properties</p>
                  <p className="brokerage-address">Las Vegas, NV</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-container">
              <div className="footer-bottom-content">
                <p className="copyright">
                  © {new Date().getFullYear()} Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties. All rights reserved.
                </p>
                <div className="footer-links-bottom">
                  <span className="footer-link">Privacy Policy</span>
                  <span className="footer-link">Terms of Service</span>
                  <span className="footer-link">Equal Housing Opportunity</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Contact Modal */}
        {isContactModalOpen && (
          <div className="modal-overlay active" onClick={closeContactModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={closeContactModal}
                aria-label="Close contact form"
              >
                ✕
              </button>
              <ContactForm
                onSuccess={() => {
                  closeContactModal();
                }}
                showTitle={true}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Header Styles */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .logo-section {
          display: flex;
          align-items: center;
        }

        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }

        .logo-image {
          border-radius: 8px;
          margin-right: 12px;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 18px;
          font-weight: 700;
          color: #1a365d;
          line-height: 1.2;
        }

        .agent-name {
          font-size: 14px;
          color: #2563eb;
          font-weight: 500;
        }

        .desktop-nav {
          display: none;
        }

        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 32px;
        }

        .nav-link {
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #2563eb;
          background: rgba(37, 99, 235, 0.1);
        }

        .nav-link.active {
          color: #2563eb;
          background: rgba(37, 99, 235, 0.1);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cta-button {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .cta-button.full-width {
          width: 100%;
        }

        .mobile-menu-toggle {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .mobile-menu-toggle span {
          width: 25px;
          height: 3px;
          background: #374151;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .mobile-menu-toggle span:nth-child(1) {
          margin-bottom: 5px;
        }

        .mobile-menu-toggle span:nth-child(2) {
          margin-bottom: 5px;
        }

        .mobile-menu-toggle.open span:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }

        .mobile-menu-toggle.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-toggle.open span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        .mobile-nav {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 1001;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
        }

        .mobile-nav.open {
          transform: translateX(0);
        }

        .mobile-nav-container {
          padding: 20px;
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-nav-item {
          margin-bottom: 8px;
        }

        .mobile-nav-link {
          display: block;
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          font-size: 18px;
          padding: 12px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: #2563eb;
          background: rgba(37, 99, 235, 0.1);
        }

        .mobile-nav-actions {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
        }

        .agent-contact-info {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-link {
          color: #374151;
          text-decoration: none;
          font-size: 14px;
          padding: 8px 0;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-top: 80px;
        }

        /* Footer */
        .footer {
          background: linear-gradient(135deg, #1e293b, #334155);
          color: white;
          margin-top: 60px;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
        }

        .footer-section.agent-section {
          grid-column: span 2;
        }

        .footer-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #e2e8f0;
        }

        .agent-info {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
        }

        .agent-photo {
          border-radius: 50%;
          margin-right: 16px;
          border: 3px solid rgba(255, 255, 255, 0.2);
        }

        .agent-name {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 4px;
          color: #e2e8f0;
        }

        .agent-title,
        .agent-license {
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 2px;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-method {
          display: flex;
          align-items: center;
          color: #e2e8f0;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s ease;
        }

        .contact-method:hover {
          color: #60a5fa;
        }

        .contact-method .icon {
          margin-right: 8px;
          font-size: 16px;
        }

        .footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .footer-link:hover {
          color: #e2e8f0;
        }

        .brokerage-info {
          display: flex;
          align-items: center;
        }

        .brokerage-logo {
          border-radius: 8px;
          margin-right: 12px;
        }

        .brokerage-name {
          font-weight: 600;
          color: #e2e8f0;
          font-size: 14px;
          line-height: 1.4;
          margin-bottom: 4px;
        }

        .brokerage-address {
          color: #94a3b8;
          font-size: 12px;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .copyright {
          color: #94a3b8;
          font-size: 12px;
          margin: 0;
        }

        .footer-links-bottom {
          display: flex;
          gap: 24px;
        }

        .footer-links-bottom .footer-link {
          font-size: 12px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .modal-overlay.active .modal-content {
          transform: translateY(0);
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #6b7280;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
          z-index: 1;
        }

        .modal-close:hover {
          background: #f3f4f6;
          color: #374151;
        }

        /* Responsive Design */
        @media (min-width: 768px) {
          .desktop-nav {
            display: block;
          }

          .mobile-menu-toggle {
            display: none;
          }

          .footer-bottom-content {
            flex-wrap: nowrap;
          }

          .footer-section.agent-section {
            grid-column: span 1;
          }
        }

        @media (max-width: 767px) {
          .header-container {
            height: 70px;
          }

          .main-content {
            margin-top: 70px;
          }

          .logo-image {
            width: 45px;
            height: 45px;
          }

          .brand-name {
            font-size: 16px;
          }

          .agent-name {
            font-size: 12px;
          }

          .cta-button {
            display: none;
          }

          .mobile-nav {
            top: 70px;
          }

          .mobile-menu-overlay {
            top: 70px;
          }

          .footer-container {
            padding: 40px 20px 20px;
            gap: 30px;
          }

          .agent-info {
            flex-direction: column;
            text-align: center;
          }

          .agent-photo {
            margin-right: 0;
            margin-bottom: 12px;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-links-bottom {
            flex-direction: column;
            gap: 8px;
          }
        }

        @media (max-width: 480px) {
          .header-container {
            padding: 0 16px;
          }

          .footer-container {
            padding: 30px 16px 15px;
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
});

Layout.displayName = 'Layout';

export default Layout;