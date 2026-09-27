import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import type { PropertyViewData } from '../types/domain';

interface AnalyticsProps {
  trackPageViews?: boolean;
  trackWidgetInteractions?: boolean;
  trackFormSubmissions?: boolean;
  enableDebugMode?: boolean;
}

interface TrackEventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, unknown>;
}

const Analytics: React.FC<AnalyticsProps> = ({
  trackPageViews = true,
  trackWidgetInteractions = true,
  trackFormSubmissions = true,
  enableDebugMode = false
}) => {
  const router = useRouter();

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    const gtmId = process.env['NEXT_PUBLIC_GTM_ID'];

    const initializeGoogleAnalytics = (measurementId: string) => {
      if (typeof window === 'undefined') return;
      if (window.gtag) return;

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer ?? [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };

      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: trackPageViews,
        custom_map: {
          custom_parameter_1: 'property_type',
          custom_parameter_2: 'user_segment'
        },
        allow_enhanced_conversions: true,
        automatic_screen_view: true
      });

      window.gtag('config', measurementId, {
        custom_parameter_1: 'luxury_homes',
        custom_parameter_2: 'las_vegas_market'
      });
    };

    const initializeGoogleTagManager = (containerId: string) => {
      if (typeof window === 'undefined') return;

      const script = document.createElement('script');
      script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${containerId}');
    `;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
      document.body.appendChild(noscript);
    };

    const initializeCustomAnalytics = () => {
      const sessionId = Date.now().toString();
      sessionStorage.setItem('analytics_session', sessionId);

      const deviceInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        sessionId
      };

      localStorage.setItem('device_info', JSON.stringify(deviceInfo));
    };

    if (gaId) {
      initializeGoogleAnalytics(gaId);
    }

    if (gtmId) {
      initializeGoogleTagManager(gtmId);
    }

    initializeCustomAnalytics();

    if (enableDebugMode) {
      console.log('🔍 Analytics initialized', { gaId: !!gaId, gtmId: !!gtmId });
    }
  }, [enableDebugMode, trackPageViews]);

  // Track events
  const trackEvent = useCallback(({
    action,
    category,
    label,
    value,
    customParameters = {}
  }: TrackEventProps) => {
    if (typeof window === 'undefined') return;

    // Enhanced parameters for real estate
    const enhancedParams = {
      event_category: category,
      event_label: label,
      value: value,
      page_location: window.location.href,
      page_referrer: document.referrer,
      user_agent: navigator.userAgent,
      timestamp: Date.now(),
      ...customParameters
    };

    // Google Analytics GA4
    if (window.gtag) {
      window.gtag('event', action, enhancedParams);
      
      // Special tracking for real estate events
      if (category === 'property') {
        window.gtag('event', 'property_interaction', {
          property_type: (customParameters['propertyType'] as string | undefined) || 'luxury_home',
          interaction_type: action,
          location: 'emerson_estates',
          agent: 'dr_jan_duffy'
        });
      }
      
      if (category === 'conversion') {
        window.gtag('event', 'generate_lead', {
          currency: 'USD',
          value: value || 0,
          lead_type: action,
          source: 'website'
        });
      }
    }

    // Custom analytics
    const eventData = {
      timestamp: new Date().toISOString(),
      action,
      category,
      label,
      value,
      url: window.location.href,
      referrer: document.referrer,
      sessionId: sessionStorage.getItem('analytics_session'),
      streamId: process.env['NEXT_PUBLIC_STREAM_ID'],
      streamUrl: process.env['NEXT_PUBLIC_STREAM_URL'],
      ...customParameters
    };

    // Store locally for potential batch sending
    const existingEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    existingEvents.push(eventData);
    localStorage.setItem('analytics_events', JSON.stringify(existingEvents.slice(-100))); // Keep last 100 events

    if (enableDebugMode) {
      console.log('📊 Event tracked:', eventData);
    }
  }, [enableDebugMode]);

  // Track page views
  const trackPageView = useCallback((url: string) => {
    if (typeof window === 'undefined') return;

    const pageData = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: url,
      referrer: document.referrer
    };

    // Google Analytics
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', pageData);
    }

    // Custom tracking
    trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: url,
      customParameters: pageData
    });
  }, [trackEvent]);

  // Track page views on route changes
  useEffect(() => {
    if (!trackPageViews) return;

    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, trackPageViews, trackPageView]);

  // Track widget interactions
  useEffect(() => {
    if (!trackWidgetInteractions) return;

    const handleWidgetInteraction = (event: Event) => {
      const target = event.target as HTMLElement;
      const widget = target.closest('[data-analytics]');
      
      if (widget) {
        const widgetType = widget.getAttribute('data-analytics');
        const actionType = target.tagName.toLowerCase() === 'button' ? 'click' : 'interaction';
        
        trackEvent({
          action: 'widget_interaction',
          category: 'engagement',
          label: `${widgetType}_${actionType}`,
          customParameters: {
            widget_type: widgetType,
            element_type: target.tagName,
            element_text: target.textContent?.slice(0, 50),
            element_class: target.className
          }
        });
      }
    };

    document.addEventListener('click', handleWidgetInteraction);
    document.addEventListener('change', handleWidgetInteraction);

    return () => {
      document.removeEventListener('click', handleWidgetInteraction);
      document.removeEventListener('change', handleWidgetInteraction);
    };
  }, [trackWidgetInteractions, trackEvent]);

  // Track form submissions
  useEffect(() => {
    if (!trackFormSubmissions) return;

    const handleFormSubmission = (event: Event) => {
      const form = event.target as HTMLFormElement;
      if (form.tagName === 'FORM') {
        const formData = new FormData(form);
        const formFields = Array.from(formData.keys());
        
        trackEvent({
          action: 'form_submission',
          category: 'conversion',
          label: form.id || form.className || 'unknown_form',
          customParameters: {
            form_fields: formFields,
            form_method: form.method,
            form_action: form.action
          }
        });
      }
    };

    document.addEventListener('submit', handleFormSubmission);
    return () => document.removeEventListener('submit', handleFormSubmission);
  }, [trackFormSubmissions, trackEvent]);

  // Performance monitoring
  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    const trackPerformance = () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        const firstPaint = perfData.responseStart - perfData.navigationStart;

        trackEvent({
          action: 'page_performance',
          category: 'performance',
          label: router.asPath,
          value: loadTime,
          customParameters: {
            load_time_ms: loadTime,
            dom_content_loaded_ms: domContentLoaded,
            first_paint_ms: firstPaint,
            dns_lookup_ms: perfData.domainLookupEnd - perfData.domainLookupStart,
            tcp_connect_ms: perfData.connectEnd - perfData.connectStart,
            server_response_ms: perfData.responseEnd - perfData.requestStart
          }
        });
      }, 1000);
    };

    if (document.readyState !== 'complete') {
      window.addEventListener('load', trackPerformance);
      return () => window.removeEventListener('load', trackPerformance);
    }

    trackPerformance();
    return undefined;
  }, [router.asPath, trackEvent]);

  // Error tracking
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackEvent({
        action: 'javascript_error',
        category: 'errors',
        label: event.message.slice(0, 100),
        customParameters: {
          filename: event.filename,
          line_number: event.lineno,
          column_number: event.colno,
          stack_trace: event.error?.stack?.slice(0, 500),
          user_agent: navigator.userAgent
        }
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackEvent({
        action: 'promise_rejection',
        category: 'errors',
        label: String(event.reason).slice(0, 100),
        customParameters: {
          reason: String(event.reason),
          stack: event.reason?.stack?.slice(0, 500)
        }
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [trackEvent]);

  // User engagement tracking
  useEffect(() => {
    let engagementTimer: NodeJS.Timeout;
    let scrollDepth = 0;
    let timeOnPage = 0;

    const trackEngagement = () => {
      timeOnPage += 10; // Track every 10 seconds
      
      trackEvent({
        action: 'user_engagement',
        category: 'engagement',
        label: router.asPath,
        value: timeOnPage,
        customParameters: {
          time_on_page: timeOnPage,
          scroll_depth: scrollDepth,
          page_height: document.documentElement.scrollHeight,
          viewport_height: window.innerHeight
        }
      });
    };

    const handleScroll = () => {
      const currentScroll = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      scrollDepth = Math.max(scrollDepth, currentScroll);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(engagementTimer);
      } else {
        engagementTimer = setInterval(trackEngagement, 10000);
      }
    };

    // Start tracking
    engagementTimer = setInterval(trackEngagement, 10000);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(engagementTimer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [router.asPath, trackEvent]);

  // Batch send analytics data
  useEffect(() => {
    const sendBatchAnalytics = () => {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      if (events.length > 0) {
        // In a real implementation, you would send this to your analytics API
        if (enableDebugMode) {
          console.log('📤 Batch sending analytics:', events.length, 'events');
        }
        // Clear sent events
        localStorage.setItem('analytics_events', '[]');
      }
    };

    // Send batch every 5 minutes
    const batchInterval = setInterval(sendBatchAnalytics, 5 * 60 * 1000);

    // Send on page unload
    const handleBeforeUnload = () => {
      sendBatchAnalytics();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(batchInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enableDebugMode]);

  // Real estate specific conversion tracking
  useEffect(() => {
    const trackRealEstateConversions = () => {
      // Track property inquiries
      const propertyInquiryButtons = document.querySelectorAll('[data-track="property-inquiry"]');
      propertyInquiryButtons.forEach(button => {
        button.addEventListener('click', () => {
          trackEvent({
            action: 'property_inquiry',
            category: 'conversion',
            label: button.getAttribute('data-property-id') || 'unknown',
            customParameters: {
              propertyType: button.getAttribute('data-property-type'),
              propertyPrice: button.getAttribute('data-property-price'),
              inquiryType: 'contact_form'
            }
          });
        });
      });

      // Track calculator usage
      const calculatorInputs = document.querySelectorAll('[data-analytics="calculator"] input');
      calculatorInputs.forEach(input => {
        const field = input as HTMLInputElement;
        field.addEventListener('change', () => {
          trackEvent({
            action: 'calculator_interaction',
            category: 'engagement',
            label: field.name || 'calculator_field',
            customParameters: {
              tool: 'mortgage_calculator',
              fieldType: field.type,
              value: field.value
            }
          });
        });
      });

      // Track property gallery interactions
      const galleryImages = document.querySelectorAll('[data-analytics="gallery"] img');
      galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
          trackEvent({
            action: 'gallery_view',
            category: 'engagement',
            label: `image_${index + 1}`,
            customParameters: {
              imageAlt: img.getAttribute('alt'),
              galleryType: 'property_photos'
            }
          });
        });
      });
    };

    // Run after DOM is ready
    if (document.readyState === 'complete') {
      trackRealEstateConversions();
    } else {
      window.addEventListener('load', trackRealEstateConversions);
    }

    return () => window.removeEventListener('load', trackRealEstateConversions);
  }, [trackEvent]);

  // Expose tracking function globally for manual tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.trackAnalyticsEvent = trackEvent;
      window.trackPropertyView = (propertyId: string, propertyData: PropertyViewData) => {
        trackEvent({
          action: 'property_view',
          category: 'property',
          label: propertyId,
          customParameters: {
            propertyType: propertyData.type,
            propertyPrice: propertyData.price,
            propertyBedrooms: propertyData.bedrooms,
            propertyBathrooms: propertyData.bathrooms,
            propertySquareFeet: propertyData.squareFeet
          }
        });
      };
    }
  }, [trackEvent]);

  return null;
};

export default Analytics;
