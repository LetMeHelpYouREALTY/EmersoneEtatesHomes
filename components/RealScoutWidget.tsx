
import React from 'react';
import dynamic from 'next/dynamic';

interface RealScoutWidgetProps {
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  className?: string;
}

// Create a client-only component to avoid hydration issues
const ClientOnlyRealScoutWidget = dynamic(
  () => Promise.resolve(function RealScoutWidgetClient({
    agentEncodedId = "QWdlbnQtMjI1MDUw",
    sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
    listingStatus = "For Sale",
    propertyTypes = "SFR,MF",
    className = ""
  }: RealScoutWidgetProps) {
    return (
      <div className={className}>
        {React.createElement('realscout-office-listings', {
          'agent-encoded-id': agentEncodedId,
          'sort-order': sortOrder,
          'listing-status': listingStatus,
          'property-types': propertyTypes
        })}
      </div>
    );
  }),
  {
    ssr: false,
    loading: () => (
      <div style={{
        minHeight: '400px',
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <p style={{ color: '#666', fontSize: '16px' }}>Loading property listings...</p>
      </div>
    )
  }
);

function RealScoutWidget(props: RealScoutWidgetProps) {
  return <ClientOnlyRealScoutWidget {...props} />;
}

export default RealScoutWidget;
