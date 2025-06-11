import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHome, FaBuilding, FaUsers, FaSwimmingPool, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter()

  const navigation = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Available Homes', href: '/homes', icon: FaBuilding },
    { name: 'Community', href: '/community', icon: FaUsers },
    { name: 'Amenities', href: '/amenities', icon: FaSwimmingPool },
    { name: 'Contact', href: '/contact', icon: FaPhone },
  ]

  const isActive = (path: string) => router.pathname === path

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ 
        background: 'white', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000 
      }}>
        <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            height: '80px' 
          }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <FaHome style={{ color: 'white', fontSize: '20px' }} />
              </div>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Emerson Estates</h1>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Luxury Living in Las Vegas</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      background: isActive(item.href) ? '#f59e0b' : 'transparent',
                      color: isActive(item.href) ? 'white' : '#374151',
                      fontWeight: '500'
                    }}
                  >
                    <Icon style={{ fontSize: '14px' }} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: '#111827', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {/* Company Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #f59e0b, #ea580c)', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <FaHome style={{ color: 'white', fontSize: '20px' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Emerson Estates</h3>
                  <p style={{ color: '#9ca3af', margin: 0 }}>Luxury Living in Las Vegas</p>
                </div>
              </div>
              <p style={{ color: '#d1d5db', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Experience the finest in luxury living at Emerson Estates. Our premium homes offer 
                modern amenities, stunning views, and an exclusive community lifestyle in the heart of Las Vegas.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1.5rem' }}>Contact Information</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <FaMapMarkerAlt style={{ color: '#f59e0b', marginTop: '4px' }} />
                  <div>
                    <p style={{ color: '#d1d5db', margin: 0 }}>2583 Regency Cove Ct</p>
                    <p style={{ color: '#d1d5db', margin: 0 }}>Las Vegas, NV 89121</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaPhone style={{ color: '#f59e0b' }} />
                  <p style={{ color: '#d1d5db', margin: 0 }}>(702) 555-0123</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaEnvelope style={{ color: '#f59e0b' }} />
                  <p style={{ color: '#d1d5db', margin: 0 }}>info@emersonestateshomes.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ 
            borderTop: '1px solid #374151', 
            marginTop: '3rem', 
            paddingTop: '2rem', 
            textAlign: 'center' 
          }}>
            <p style={{ color: '#9ca3af', margin: 0 }}>
              © 2024 Emerson Estates. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout