import Head from 'next/head'
import Link from 'next/link'
import { ReactNode, Component, ErrorInfo } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
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
  description = "Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121."
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.emersonestateshomes.com" />
      </Head>

      <header className="header">
        <div className="header-container">
          <Link href="/" className="logo">
            <img 
              src="/bhhs-logo.jpg" 
              alt="Berkshire Hathaway HomeServices" 
              className="logo-img"
              width="50"
              height="50"
              loading="eager"
            />
            <span className="logo-text">Emerson Estates</span>
          </Link>

          <nav className="nav" role="navigation" aria-label="Main navigation">
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
          </nav>

          <button 
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            onClick={() => {
              const nav = document.querySelector('.nav');
              nav?.classList.toggle('nav-open');
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
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
        .error-fallback {
          padding: 2rem;
          text-align: center;
          background: #fee;
          border: 1px solid #fcc;
          border-radius: 4px;
          margin: 1rem;
        }

        :global(.header) {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 1rem 0;
        }

        :global(.header-container) {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          position: relative;
        }

        :global(.logo) {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        :global(.logo:hover) {
          color: #3498db;
          transform: translateY(-2px);
        }

        :global(.logo-img) {
          border-radius: 8px;
          transition: transform 0.3s ease;
        }

        :global(.logo:hover .logo-img) {
          transform: scale(1.1);
        }

        :global(.logo-text) {
          background: linear-gradient(45deg, #3498db, #e74c3c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        :global(.nav) {
          display: flex;
          gap: 2rem;
          align-items: center;
          transition: all 0.3s ease;
        }

        :global(.nav-link) {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-decoration: none;
          color: rgba(255,255,255,0.9);
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        :global(.nav-link::before) {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(52, 152, 219, 0.3), rgba(231, 76, 60, 0.3));
          transition: left 0.3s ease;
        }

        :global(.nav-link:hover::before) {
          left: 0;
        }

        :global(.nav-link:hover) {
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        :global(.nav-icon) {
          font-size: 1.2rem;
          z-index: 1;
          position: relative;
        }

        :global(.nav-text) {
          font-size: 0.9rem;
          z-index: 1;
          position: relative;
        }

        :global(.mobile-menu-toggle) {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          gap: 4px;
        }

        :global(.mobile-menu-toggle span) {
          width: 25px;
          height: 3px;
          background: white;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        :global(.footer) {
          background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
          color: white;
          padding: 3rem 0 1rem;
          margin-top: 4rem;
        }

        :global(.footer-container) {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        :global(.footer-content) {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        :global(.footer-section h3) {
          color: #3498db;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        :global(.footer-section a) {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        :global(.footer-section a:hover) {
          color: #3498db;
        }

        :global(.footer-bottom) {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 1rem;
          text-align: center;
          color: rgba(255,255,255,0.6);
        }

        @media (max-width: 768px) {
          :global(.nav) {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #2c3e50;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          :global(.nav.nav-open) {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          :global(.nav-link) {
            flex-direction: row;
            justify-content: flex-start;
            gap: 1rem;
            width: 100%;
            padding: 1rem;
            border-radius: 8px;
          }

          :global(.mobile-menu-toggle) {
            display: flex;
          }

          :global(.header-container) {
            padding: 0 1rem;
          }

          :global(.logo) {
            font-size: 1.3rem;
          }

          :global(.footer-content) {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}