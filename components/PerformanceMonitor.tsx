
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Web Vitals monitoring
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });

      // Performance observer for navigation timing
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navigationEntry = entry as PerformanceNavigationTiming;
              console.log('Page Load Time:', navigationEntry.loadEventEnd - navigationEntry.fetchStart);
            }
          }
        });
        
        observer.observe({ type: 'navigation', buffered: true });
      }
    }
  }, []);

  return null;
};

export default PerformanceMonitor;
