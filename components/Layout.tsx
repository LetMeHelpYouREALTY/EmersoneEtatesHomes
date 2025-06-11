import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { ReactNode, Component, ErrorInfo } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  className?: string
  noIndex?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<{children: ReactNode}, ErrorBoundaryState> {
  constructor(props: {children: ReactNode}) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Layout Error Boundary:', error, errorInfo)
    this.setState({ errorInfo: errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong loading this page.</h2>
          <p>Please refresh the page or contact support if the issue persists.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default function Layout({ 
  children, 
  title = "Emerson Estates - Luxury Living in Las Vegas",
  description = "Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121.",
  className,
  noIndex
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
        <link rel="canonical" href="https://www.emersonestateshomes.com" />
      </Head>

      <header className="header" role="banner">
        <div className="header-container">
          <div className="logo-section">
            <Link href="/" className="logo">
              <Image 
                src="/bhhs-logo.jpg" 
                alt="Berkshire Hathaway HomeServices" 
                className="logo-img"
                width={50}
                height={50}
                priority
              />
              <span className="logo-text">Emerson Estates</span>
            </Link>
          </div>

          <nav className="nav" role="navigation" aria-label="Main navigation">
            <div className="nav-links">
              <Link href="/" className="nav-link" aria-label="Go to homepage">
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Link>
              <Link href="/homes" className="nav-link" aria-label="View available homes">
                <span className="nav-icon">🏘️</span>
                <span className="nav-text">Available Homes</span>
              </Link>
              <Link href="/community" className="nav-link" aria-label="Learn about community">
                <span className="nav-icon">🌟</span>
                <span className="nav-text">Community</span>
              </Link>
              <Link href="/amenities" className="nav-link" aria-label="Explore amenities">
                <span className="nav-icon">🏊</span>
                <span className="nav-text">Amenities</span>
              </Link>
              <Link href="/contact" className="nav-link" aria-label="Contact us">
                <span className="nav-icon">📞</span>
                <span className="nav-text">Contact</span>
              </Link>
            </div>
          </nav>

          <div className="menu-section">
            <button 
              className="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
              onClick={() => {
                const navLinks = document.querySelector('.nav-links');
                navLinks?.classList.toggle('active');
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <main className="main" role="main">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>

      <footer className="footer" role="contentinfo">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Emerson Estates</h3>
              <address>
                2583 Regency Cove Ct<br />
                Las Vegas, NV 89121
              </address>
            </div>

            <div className="footer-section">
              <h3>Contact</h3>
              <p>
                <a href="tel:+17025551234">Phone: (702) 555-1234</a><br />
                <a href="mailto:info@emersonestateshomes.com">Email: info@emersonestateshomes.com</a>
              </p>
            </div>

            <div className="footer-section">
              <h3>Follow Us</h3>
              <p>Connect with us on social media for updates and new listings.</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Emerson Estates. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          padding: 1rem 2rem;
          gap: 1rem;
        }

        .logo-section {
          justify-self: start;
          min-width: 200px;
        }

        .nav {
          justify-self: center;
        }

        .menu-section {
          justify-self: end;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          transition: transform 0.3s ease;
          white-space: nowrap;
          position: relative;
        }

        .logo:hover {
          transform: scale(1.02);
        }

        .logo-img {
          border-radius: 6px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          flex-shrink: 0;
          background: white;
          padding: 2px;
        }

        .logo-text {
          display: inline-block;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          padding: 0.75rem 1.25rem;
          border-radius: 25px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: background-color 0.3s ease;
          flex-direction: column;
          width: 30px;
          height: 30px;
          justify-content: center;
          align-items: center;
        }

        .mobile-menu-toggle span {
          display: block;
          width: 20px;
          height: 2px;
          background: white;
          margin: 2px 0;
          transition: 0.3s;
        }

        .mobile-menu-toggle:hover {
          background: rgba(255,255,255,0.1);
        }

        .footer {
          background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
          color: white;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem 1rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          color: #fbbf24;
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }

        .footer-section p,
        .footer-section address {
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
          font-style: normal;
        }

        .footer-section a {
          color: #60a5fa;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: #fbbf24;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
        }

        .error-fallback {
          padding: 2rem;
          text-align: center;
          background: #fee;
          border: 1px solid #fcc;
          border-radius: 4px;
          margin: 1rem;
        }

        @media (max-width: 768px) {
          .header-container {
            grid-template-columns: 1fr auto;
            padding: 0.75rem 1rem;
            gap: 0.5rem;
          }

          .logo-section {
            min-width: 0;
          }

          .menu-section {
            grid-column: 2;
          }

          .nav {
            grid-column: 1 / -1;
            grid-row: 2;
            position: relative;
          }

          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            flex-direction: column;
            padding: 1rem;
            gap: 0.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            border-radius: 8px;
            margin-top: 0.5rem;
            z-index: 1000;
          }

          .nav-links.active {
            display: flex;
          }

          .nav-link {
            padding: 1rem;
            border-radius: 8px;
            justify-content: center;
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .logo {
            font-size: 1.1rem;
            gap: 0.5rem;
          }

          .logo-text {
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1.5rem;
          }
        }
      `}</style>
    </>
  )
}