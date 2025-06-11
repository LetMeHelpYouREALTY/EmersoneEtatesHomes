
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import RealScoutWidget from '../components/RealScoutWidget'
import { motion } from 'framer-motion'
import { FaHome, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar, FaSwimmingPool, FaDumbbell, FaCar } from 'react-icons/fa'
import Link from 'next/link'

const Home: NextPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <>
      <Head>
        <title>Emerson Estates Homes - Luxury Living in Las Vegas, NV</title>
        <meta name="description" content="Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121. Premium properties with modern amenities and community features." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-screen">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium mb-4">
                  Premium Real Estate in Las Vegas
                </span>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Welcome to
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 block">
                    Emerson Estates
                  </span>
                </h1>
              </motion.div>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Experience luxury living in the heart of Las Vegas. Our premium homes offer modern amenities, 
                stunning desert views, and an exclusive community lifestyle.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/homes" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  View Available Homes
                </Link>
                <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  Schedule Tour
                </Link>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-amber-400" />
                  <span>2583 Regency Cove Ct, Las Vegas, NV 89121</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-amber-400" />
                  <span>(702) 555-0123</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-amber-500/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Emerson Estates?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the perfect blend of luxury, comfort, and community in our exclusive Las Vegas neighborhood.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              initial="initial"
              whileInView="animate"
              variants={stagger}
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                  <FaHome className="text-2xl text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Luxury Homes</h3>
                <p className="text-gray-600">Premium properties with modern designs, high-end finishes, and spacious layouts perfect for families.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <FaSwimmingPool className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Resort Amenities</h3>
                <p className="text-gray-600">Enjoy resort-style amenities including pools, fitness centers, and recreational facilities.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <FaMapMarkerAlt className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Prime Location</h3>
                <p className="text-gray-600">Strategically located in Las Vegas with easy access to entertainment, dining, and business districts.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Properties Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Explore Available Homes
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Browse our current selection of luxury properties and find your perfect home.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <RealScoutWidget />
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-4 gap-8 text-center"
              initial="initial"
              whileInView="animate"
              variants={stagger}
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <div className="text-4xl font-bold text-amber-400 mb-2">150+</div>
                <div className="text-gray-300">Happy Families</div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <div className="text-4xl font-bold text-amber-400 mb-2">25+</div>
                <div className="text-gray-300">Available Homes</div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <div className="text-4xl font-bold text-amber-400 mb-2">5★</div>
                <div className="text-gray-300">Community Rating</div>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <div className="text-4xl font-bold text-amber-400 mb-2">10+</div>
                <div className="text-gray-300">Years Experience</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Contact our expert team today to schedule a private tour and discover why Emerson Estates 
                is the premier choice for luxury living in Las Vegas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  Get Started Today
                </Link>
                <Link href="/homes" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  Browse Properties
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Home
