
/// <reference types="react" />
import * as React from 'react';

interface RealScoutWidgetProps {
  widgetId?: string;
  className?: string;
}

const RealScoutWidget = ({ 
  widgetId = "realscout-widget", 
  className = "" 
}: RealScoutWidgetProps): React.ReactElement => {
  return React.createElement('div', { className }, 
    React.createElement('realscout-widget-embed', {
      id: widgetId,
      'widget-id': '64c8c5f4b4c8e50014a8b4e2'
    })
  );
};

export default RealScoutWidget;
