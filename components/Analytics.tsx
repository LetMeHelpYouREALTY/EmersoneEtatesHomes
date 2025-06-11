
import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    ga: (...args: any[]) => void;
  }
}

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
  customParameters?: Record<string, any>;
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
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    
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
  }, [enableDebugMode]);

  // Initialize Google Analytics
  const initializeGoogleAnalytics = (gaId: string) => {
    if (typeof window === 'undefined') return;

    // Load GA script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', gaId, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: trackPageViews
    });
  };

  // Initialize Google Tag Manager
  const initializeGoogleTagManager = (gtmId: string) => {
    if (typeof window === 'undefined') return;

    // GTM script
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script);

    // GTM noscript
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.appendChild(noscript);
  };

  // Initialize custom analytics
  const initializeCustomAnalytics = () => {
    // Track user session
    const sessionId = Date.now().toString();
    sessionStorage.setItem('analytics_session', sessionId);
    
    // Track user agent and device info
    if (typeof window !== 'undefined') {
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
    }
  };

  // Track events
  const trackEvent = useCallback(({
    action,
    category,
    label,
    value,
    customParameters = {}
  }: TrackEventProps) => {
    if (typeof window === 'undefined') return;

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...customParameters
      });
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

    if (document.readyState === 'complete') {
      trackPerformance();
    } else {
      window.addEventListener('load', trackPerformance);
      return () => window.removeEventListener('load', trackPerformance);
    }
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

  // Expose tracking function globally for manual tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).trackAnalyticsEvent = trackEvent;
    }
  }, [trackEvent]);

  return null;
};

export default Analytics;
