
import { useEffect, useState } from 'react'
import { FaHome, FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface Property {
  id: string
  price: string
  beds: number
  baths: number
  sqft: string
  address: string
  image: string
}

const RealScoutWidget = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Mock data for demonstration
  const mockProperties: Property[] = [
    {
      id: '1',
      price: '$650,000',
      beds: 3,
      baths: 2,
      sqft: '2,100',
      address: '2583 Regency Cove Ct, Las Vegas, NV',
      image: '/api/placeholder/400/300'
    },
    {
      id: '2',
      price: '$725,000',
      beds: 4,
      baths: 3,
      sqft: '2,650',
      address: '2591 Regency Cove Ct, Las Vegas, NV',
      image: '/api/placeholder/400/300'
    },
    {
      id: '3',
      price: '$850,000',
      beds: 5,
      baths: 4,
      sqft: '3,200',
      address: '2599 Regency Cove Ct, Las Vegas, NV',
      image: '/api/placeholder/400/300'
    }
  ]

  useEffect(() => {
    // Simulate API call with error handling
    const timer = setTimeout(() => {
      try {
        setProperties(mockProperties)
        setLoading(false)
        setError(null)
      } catch (err) {
        setError('Failed to load properties')
        setLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="loading mx-auto mb-4"></div>
        <p className="text-gray-600">Loading available properties...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Available Properties</h3>
        <p className="text-gray-600">Discover your perfect home at Emerson Estates</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {/* Property Image */}
            <div className="relative h-48 bg-gradient-to-br from-amber-400 to-orange-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaHome className="text-white text-4xl" />
              </div>
              <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                New Listing
              </div>
            </div>

            {/* Property Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-2xl font-bold text-amber-600">{property.price}</h4>
                <div className="flex items-center space-x-1 text-gray-600">
                  <FaDollarSign className="text-sm" />
                  <span className="text-sm">Est. Payment</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 text-gray-700">
                <div className="flex items-center space-x-1">
                  <FaBed className="text-amber-500" />
                  <span className="font-medium">{property.beds} Beds</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaBath className="text-amber-500" />
                  <span className="font-medium">{property.baths} Baths</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaRuler className="text-amber-500" />
                  <span className="font-medium">{property.sqft} sq ft</span>
                </div>
              </div>

              <div className="flex items-start space-x-2 mb-6">
                <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" />
                <p className="text-gray-600 text-sm">{property.address}</p>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300">
                  View Details
                </button>
                <button className="flex-1 border border-amber-500 text-amber-600 hover:bg-amber-50 py-2 px-4 rounded-lg font-medium transition-colors duration-300">
                  Schedule Tour
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
        <h4 className="text-xl font-bold text-gray-900 mb-2">
          Don't See What You're Looking For?
        </h4>
        <p className="text-gray-600 mb-4">
          Our team can help you find the perfect property that matches your specific needs and budget.
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
          Contact Our Experts
        </button>
      </div>

      {/* Real Estate Widget Integration */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <div className="text-center mb-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Advanced Property Search
          </h4>
          <p className="text-gray-600 text-sm">
            Use our advanced search tools to find properties that match your exact criteria
          </p>
        </div>
        
        {/* Placeholder for RealScout widget */}
        <div className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
          <FaHome className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">RealScout Property Search Widget</p>
          <p className="text-sm text-gray-400">
            This area will be populated with the actual RealScout widget for property search functionality.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RealScoutWidget
