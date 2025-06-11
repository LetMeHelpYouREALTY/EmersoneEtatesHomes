import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHome, FaBuilding, FaUsers, FaSwimmingPool, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <FaHome className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Emerson Estates</h1>
                <p className="text-sm text-gray-600">Luxury Living in Las Vegas</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-amber-500 text-white'
                        : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-gray-200">
            <div className="py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-amber-500 text-white'
                        : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <FaHome className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Emerson Estates</h3>
                  <p className="text-gray-400">Luxury Living in Las Vegas</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Experience the finest in luxury living at Emerson Estates. Our premium homes offer 
                modern amenities, stunning views, and an exclusive community lifestyle in the heart of Las Vegas.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors duration-300">
                  <FaFacebook />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors duration-300">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors duration-300">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-amber-400 mt-1" />
                  <div>
                    <p className="text-gray-300">2583 Regency Cove Ct</p>
                    <p className="text-gray-300">Las Vegas, NV 89121</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-amber-400" />
                  <p className="text-gray-300">(702) 555-0123</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-amber-400" />
                  <p className="text-gray-300">info@emersonestateshomes.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Emerson Estates. All rights reserved. | 
              <Link href="#" className="text-amber-400 hover:text-amber-300 ml-1">Privacy Policy</Link> | 
              <Link href="#" className="text-amber-400 hover:text-amber-300 ml-1">Terms of Service</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout