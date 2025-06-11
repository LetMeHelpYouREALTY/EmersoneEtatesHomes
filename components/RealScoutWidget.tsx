import { useEffect, useRef } from 'react'

interface RealScoutWidgetProps {
  type?: 'search' | 'listings' | 'featured'
  className?: string
}

declare global {
  interface Window {
    RealScout?: {
      render: (element: HTMLElement, config: any) => void
    }
  }
}

export default function RealScoutWidget({ 
  type = 'listings', 
  className = '' 
}: RealScoutWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadRealScoutScript = () => {
      if (typeof window === 'undefined') return

      // Check if script already exists
      if (document.querySelector('script[src*="realscout"]')) {
        initializeWidget()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://em.realscout.com/js/widgets.js'
      script.async = true
      script.onload = initializeWidget
      script.onerror = () => {
        console.warn('Failed to load RealScout widget script')
      }

      document.head.appendChild(script)
    }

    const initializeWidget = () => {
      if (!widgetRef.current || typeof window === 'undefined') return

      try {
        if (window.RealScout?.render) {
          window.RealScout.render(widgetRef.current, {
            type: type,
            theme: 'modern',
            showFilters: true
          })
        } else {
          // Fallback content
          if (widgetRef.current) {
            widgetRef.current.innerHTML = `
              <div style="padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 8px;">
                <h3>Property Listings</h3>
                <p>Loading property information...</p>
                <p>For the latest available homes, please contact our sales team.</p>
              </div>
            `
          }
        }
      } catch (error) {
        console.warn('RealScout widget initialization failed:', error)
      }
    }

    loadRealScoutScript()
  }, [type])

  return (
    <div 
      ref={widgetRef}
      className={`realscout-widget ${className}`}
      style={{ minHeight: '400px' }}
    />
  )
}