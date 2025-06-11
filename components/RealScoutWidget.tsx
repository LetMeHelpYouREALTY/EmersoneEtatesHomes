
import React from 'react'

interface RealScoutWidgetProps {
  widgetId?: string;
  className?: string;
}

const RealScoutWidget: React.FC<RealScoutWidgetProps> = ({ 
  widgetId = "realscout-widget", 
  className = "" 
}) => {
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
