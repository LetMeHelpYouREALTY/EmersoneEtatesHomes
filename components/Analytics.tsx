
import { useEffect } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const Analytics = () => {
  const trackEvent = (event: AnalyticsEvent) => {
    // Google Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  };

  useEffect(() => {
    // Track widget interactions
    const trackWidgetInteraction = (element: Element, widgetType: string) => {
      element.addEventListener('click', () => {
        trackEvent({
          action: 'widget_interaction',
          category: 'engagement',
          label: widgetType
        });
      });
    };

    // Track calculator usage
    const calculatorButtons = document.querySelectorAll('[data-analytics="calculator"]');
    calculatorButtons.forEach(button => {
      trackWidgetInteraction(button, 'mortgage_calculator');
    });

    // Track property searches
    const propertyElements = document.querySelectorAll('[data-analytics="property"]');
    propertyElements.forEach(element => {
      trackWidgetInteraction(element, 'property_search');
    });

    // Track contact form interactions
    const contactForms = document.querySelectorAll('[data-analytics="contact"]');
    contactForms.forEach(form => {
      form.addEventListener('submit', () => {
        trackEvent({
          action: 'form_submission',
          category: 'conversion',
          label: 'contact_form'
        });
      });
    });

    // Track page scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        trackEvent({
          action: 'scroll_depth',
          category: 'engagement',
          label: `${scrollPercent}%`,
          value: scrollPercent
        });
      }
    };

    window.addEventListener('scroll', trackScrollDepth);

    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, []);

  return null; // This component doesn't render anything
};

// Utility function to track custom events
export const trackCustomEvent = (event: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Custom Analytics Event:', event);
  }
};

export default Analytics;
