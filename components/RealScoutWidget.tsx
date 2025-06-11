
import { useEffect, useState } from 'react'

interface RealScoutWidgetProps {
  widgetId?: string;
  className?: string;
}

const RealScoutWidget: React.FC<RealScoutWidgetProps> = ({ 
  widgetId = "realscout-widget", 
  className = "" 
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`realscout-loading ${className}`}>
        <p>Loading property listings...</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <realscout-widget-embed 
        id={widgetId}
        widget-id="64c8c5f4b4c8e50014a8b4e2"
      />
    </div>
  );
};

export default RealScoutWidget;
