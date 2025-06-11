import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Emerson Estates - Luxury Homes in Las Vegas, NV",
  description = "Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121. Premium properties with modern amenities and community features."
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.emersonestateshomes.com" />
      </Head>

      <header style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            Emerson Estates
          </Link>

          <nav>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: '2rem'
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
                  Homes
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
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer style={{
        background: '#1a1a1a',
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
        marginTop: '4rem'
      }}>
        <p>&copy; 2024 Emerson Estates. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;