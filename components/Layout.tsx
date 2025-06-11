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
        <link rel="canonical" href={`https://www.emersonestateshomes.com${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
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
            Emerson Estates
          </Link>

          <nav className="nav" role="navigation" aria-label="Main navigation">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/homes" className="nav-link">Available Homes</Link>
            <Link href="/community" className="nav-link">Community</Link>
            <Link href="/amenities" className="nav-link">Amenities</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>
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
      `}</style>
    </>
  )
}