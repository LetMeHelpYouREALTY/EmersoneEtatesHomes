import { useEffect } from 'react'

interface RealScoutWidgetProps {
  agentEncodedId?: string
  sortOrder?: string
  listingStatus?: string
  propertyTypes?: string
  className?: string
}

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-encoded-id'?: string
        'sort-order'?: string
        'listing-status'?: string
        'property-types'?: string
      }
    }
  }
}

export default function RealScoutWidget({ 
  agentEncodedId = "QWdlbnQtMjI1MDUw",
  sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  listingStatus = "For Sale",
  propertyTypes = "SFR,MF",
  className = ""
}: RealScoutWidgetProps) {
  useEffect(() => {
    // No additional setup needed - web components handle themselves
    console.log('RealScout widget mounted')
  }, [])

  return (
    <div className={`realscout-widget-container ${className}`}>
      <realscout-office-listings
        agent-encoded-id={agentEncodedId}
        sort-order={sortOrder}
        listing-status={listingStatus}
        property-types={propertyTypes}
      />
    </div>
  )
}