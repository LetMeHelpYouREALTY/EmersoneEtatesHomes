import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ 
  children, 
  title = "Emerson Estates", 
  description = "Luxury homes in Las Vegas, NV" 
}: LayoutProps) {
  return (
    <div suppressHydrationWarning>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <nav style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ 
              margin: 0, 
              fontSize: '1.8rem', 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #fff, #bdc3c7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Emerson Estates
            </h1>
            <span style={{ 
              fontSize: '0.9rem', 
              opacity: 0.9,
              fontWeight: '300'
            }}>
              2583 Regency Cove Ct, Las Vegas, NV 89121
            </span>
          </div>

          <ul style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <li>
              <Link href="/" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid transparent'
              }}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/homes" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid transparent'
              }}>
                Available Homes
              </Link>
            </li>
            <li>
              <Link href="/community" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid transparent'
              }}>
                Community
              </Link>
            </li>
            <li>
              <Link href="/amenities" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid transparent'
              }}>
                Amenities
              </Link>
            </li>
            <li>
              <Link href="/contact" style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid transparent'
              }}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        {children}
      </main>

      <footer style={{
        background: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '3rem 2rem 2rem',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ marginBottom: '1rem', color: '#3498db' }}>Contact Us</h3>
              <p style={{ margin: '0.5rem 0', opacity: 0.9 }}>
                📍 2583 Regency Cove Ct<br />
                Las Vegas, NV 89121
              </p>
              <p style={{ margin: '0.5rem 0', opacity: 0.9 }}>
                📞 (702) 555-HOMES
              </p>
              <p style={{ margin: '0.5rem 0', opacity: 0.9 }}>
                ✉️ info@emersonestateshomes.com
              </p>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', color: '#3498db' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href="/homes" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>
                  Available Homes
                </Link>
                <Link href="/community" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>
                  Community Info
                </Link>
                <Link href="/amenities" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>
                  Amenities
                </Link>
                <Link href="/contact" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>
                  Contact Us
                </Link>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', color: '#3498db' }}>About Emerson Estates</h3>
              <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                Luxury living in the heart of Las Vegas. Experience modern amenities, 
                beautiful homes, and a vibrant community at Emerson Estates.
              </p>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '2rem',
            opacity: 0.8
          }}>
            <p>&copy; 2024 Emerson Estates. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}