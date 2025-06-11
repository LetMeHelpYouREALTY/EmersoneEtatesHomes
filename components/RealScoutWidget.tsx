import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    RealScout?: {
      render: (config: any) => void
    }
  }
}

interface RealScoutWidgetProps {
  widgetId?: string
  className?: string
  style?: React.CSSProperties
}

export default function RealScoutWidget({ 
  widgetId = "wid-41bffe03-6aba-4eb9-af5b-ed91bbb686a9", 
  className = "",
  style = {}
}: RealScoutWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !containerRef.current) return

    const loadRealScoutWidget = () => {
      const script = document.createElement('script')
      script.src = 'https://em.realscout.com/js/embed.js'
      script.async = true
      script.onload = () => {
        // Add a small delay to ensure RealScout is fully initialized
        setTimeout(() => {
          setIsLoaded(true)
          if (window.RealScout?.render && containerRef.current) {
            try {
              window.RealScout.render({
                element: containerRef.current,
                widgetId: widgetId,
                height: '600px',
                width: '100%'
              })
            } catch (error) {
              console.error('RealScout widget render error:', error)
            }
          }
        }, 100)
      }
      script.onerror = () => {
        console.error('Failed to load RealScout widget script')
      }
      document.head.appendChild(script)
    }

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://em.realscout.com/js/embed.js"]')
    if (!existingScript) {
      loadRealScoutWidget()
    } else {
      // Script exists, try to render
      setTimeout(() => {
        if (window.RealScout?.render && containerRef.current) {
          try {
            window.RealScout.render({
              element: containerRef.current,
              widgetId: widgetId,
              height: '600px',
              width: '100%'
            })
            setIsLoaded(true)
          } catch (error) {
            console.error('RealScout widget render error:', error)
          }
        }
      }, 100)
    }
  }, [isClient, widgetId])

  // Always return the same structure to prevent hydration mismatches
  return (
    <div 
      ref={containerRef}
      className={`realscout-widget ${className}`}
      style={style}
      data-widget-id={widgetId}
      suppressHydrationWarning={true}
    >
      {!isLoaded && (
        <div 
          style={{ 
            height: '600px', 
            backgroundColor: '#f5f5f5', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <p>Loading property listings...</p>
        </div>
      )}
    </div>
  )
}