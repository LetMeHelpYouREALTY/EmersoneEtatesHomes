
import Script from "next/script";
import { useEffect, useState } from "react";

interface RealScoutWidgetProps {
  widgetId?: string;
  height?: string;
}

export default function RealScoutWidget({ 
  widgetId = "lv_emerson_estates", 
  height = "600px" 
}: RealScoutWidgetProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div style={{ height, background: "#f5f5f5" }}>Loading properties...</div>;
  }

  return (
    <>
      <Script
        src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
        strategy="lazyOnload"
      />
      <div style={{ height }}>
        <realscout-listings widget-id={widgetId}></realscout-listings>
      </div>
    </>
  );
}
