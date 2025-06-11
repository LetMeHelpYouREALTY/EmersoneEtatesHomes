import { useEffect, useState } from 'react';

const RealScoutWidget = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div style={{ width: '100%', height: '600px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading property listings...</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <realscout-widget
        search-type="list"
        entity-type="new-home-community"
        entity-id="COMMUNITY_ID"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default RealScoutWidget;