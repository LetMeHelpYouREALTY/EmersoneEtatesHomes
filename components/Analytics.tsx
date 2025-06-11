
import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

interface AnalyticsProps {
  trackPageViews?: boolean;
  trackWidgetInteractions?: boolean;
  trackFormSubmissions?: boolean;
  enableDebugMode?: boolean;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

const Analytics: React.FC<AnalyticsProps> = ({
  trackPageViews = true,
  trackWidgetInteractions = true,
  trackFormSubmissions = true,
  enableDebugMode = false
}) => {
  const router = useRouter();

  // Initialize analytics
  useEffect(() => {
    // Initialize Google Analytics if GA_ID is provided
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (gaId) {
      initializeGoogleAnalytics(gaId);
    }

    // Initialize other analytics services here
    initializeCustomAnalytics();

    if (enableDebugMode) {
      console.log('Analytics initialized');
    }
  }, [enableDebugMode]);

  // Track page views
  useEffect(() => {
    if (!trackPageViews) return;

    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, trackPageViews]);

  // Initialize Google Analytics
  const initializeGoogleAnalytics = (gaId: string) => {
    // Add GA script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', gaId, {
      page_location: window.location.href,
      page_title: document.title,
      custom_map: {
        dimension1: 'property_interest',
        dimension2: 'price_range',
        dimension3: 'user_type'
      }
    });
  };

  // Initialize custom analytics
  const initializeCustomAnalytics = () => {
    // Track real estate specific metrics
    trackEvent({
      action: 'session_start',
      category: 'engagement',
      label: 'website_visit',
      customParameters: {
        timestamp: new Date().toISOString(),
        page: router.asPath,
        user_agent: navigator.userAgent,
        referrer: document.referrer
      }
    });
  };

  // Track page views
  const trackPageView = useCallback((url: string) => {
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_location: url,
        page_title: document.title
      });
    }

    // Custom page view tracking
    trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: url,
      customParameters: {
        timestamp: new Date().toISOString(),
        previous_page: document.referrer
      }
    });

    if (enableDebugMode) {
      console.log('Page view tracked:', url);
    }
  }, [enableDebugMode]);

  // Track custom events
  const trackEvent = useCallback(({
    action,
    category,
    label,
    value,
    customParameters
  }: AnalyticsEvent) => {
    // Google Analytics event tracking
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...customParameters
      });
    }

    // Custom event tracking for real estate metrics
    const eventData = {
      action,
      category,
      label,
      value,
      timestamp: new Date().toISOString(),
      page: router.asPath,
      ...customParameters
    };

    // Send to custom analytics endpoint (if available)
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      }).catch(error => {
        if (enableDebugMode) {
          console.warn('Analytics endpoint error:', error);
        }
      });
    }

    if (enableDebugMode) {
      console.log('Event tracked:', eventData);
    }
  }, [router.asPath, enableDebugMode]);

  // Set up event listeners for widget interactions
  useEffect(() => {
    if (!trackWidgetInteractions) return;

    const trackWidgetEvent = (event: Event) => {
      const target = event.target as HTMLElement;
      const widgetType = target.closest('[data-widget]')?.getAttribute('data-widget');
      
      if (widgetType) {
        trackEvent({
          action: 'widget_interaction',
          category: 'widgets',
          label: widgetType,
          customParameters: {
            interaction_type: event.type,
            widget_element: target.tagName.toLowerCase()
          }
        });
      }
    };

    // Track clicks on calculator
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.property-calculator')) {
        trackEvent({
          action: 'calculator_use',
          category: 'tools',
          label: 'mortgage_calculator',
          customParameters: {
            element: target.tagName.toLowerCase(),
            text_content: target.textContent?.substring(0, 50)
          }
        });
      }
    });

    // Track property search interactions
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.realscout-widget')) {
        trackEvent({
          action: 'property_search',
          category: 'listings',
          label: 'realscout_widget',
          customParameters: {
            interaction: 'property_view'
          }
        });
      }
    });

    return () => {
      document.removeEventListener('click', trackWidgetEvent);
    };
  }, [trackWidgetInteractions, trackEvent]);

  // Set up form submission tracking
  useEffect(() => {
    if (!trackFormSubmissions) return;

    const trackFormSubmission = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formType = form.getAttribute('data-form-type') || 'contact';
      
      trackEvent({
        action: 'form_submission',
        category: 'leads',
        label: formType,
        value: 1,
        customParameters: {
          form_id: form.id,
          timestamp: new Date().toISOString()
        }
      });
    };

    document.addEventListener('submit', trackFormSubmission);
    return () => {
      document.removeEventListener('submit', trackFormSubmission);
    };
  }, [trackFormSubmissions, trackEvent]);

  // Expose tracking functions globally for other components
  useEffect(() => {
    // Make tracking functions available globally
    (window as any).trackAnalytics = {
      trackEvent,
      trackPageView,
      trackPropertyView: (propertyId: string, price?: number) => {
        trackEvent({
          action: 'property_view',
          category: 'listings',
          label: propertyId,
          value: price,
          customParameters: {
            property_id: propertyId,
            price: price
          }
        });
      },
      trackContactFormView: () => {
        trackEvent({
          action: 'contact_form_view',
          category: 'leads',
          label: 'form_impression'
        });
      },
      trackPhoneClick: () => {
        trackEvent({
          action: 'phone_click',
          category: 'leads',
          label: 'phone_contact',
          value: 1
        });
      },
      trackEmailClick: () => {
        trackEvent({
          action: 'email_click',
          category: 'leads',
          label: 'email_contact',
          value: 1
        });
      },
      trackCalculatorUse: (calculationType: string) => {
        trackEvent({
          action: 'calculator_use',
          category: 'tools',
          label: calculationType
        });
      }
    };
  }, [trackEvent, trackPageView]);

  // Performance monitoring
  useEffect(() => {
    // Track page load performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing;
          const loadTime = perfData.loadEventEnd - perfData.navigationStart;
          
          trackEvent({
            action: 'page_load_time',
            category: 'performance',
            label: router.asPath,
            value: loadTime,
            customParameters: {
              load_time_ms: loadTime,
              dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
              first_paint: perfData.responseStart - perfData.navigationStart
            }
          });
        }, 1000);
      });
    }
  }, [router.asPath, trackEvent]);

  // Error tracking
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackEvent({
        action: 'javascript_error',
        category: 'errors',
        label: event.message,
        customParameters: {
          filename: event.filename,
          line_number: event.lineno,
          column_number: event.colno,
          stack_trace: event.error?.stack
        }
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [trackEvent]);

  // This component doesn't render anything visible
  return null;
};

export default Analytics;
