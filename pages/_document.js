
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Real Estate Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Emerson Estates",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "2583 Regency Cove Ct",
                "addressLocality": "Las Vegas",
                "addressRegion": "NV",
                "postalCode": "89121",
                "addressCountry": "US"
              },
              "areaServed": "Las Vegas, Nevada",
              "description": "Luxury real estate homes in Las Vegas, Nevada"
            })
          }}
        />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Preload RealScout Widget Script */}
        <link 
          rel="preload" 
          href="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
          as="script" 
          crossOrigin="anonymous"
        />
        
        {/* RealScout Widget Script - Required once for all widgets */}
        <script 
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
          type="module"
          defer
          crossOrigin="anonymous"
        ></script>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            realscout-office-listings {
              --rs-listing-divider-color: rgb(101, 141, 172);
              width: 100%;
              display: block;
              min-height: 400px;
              opacity: 0;
              transition: opacity 0.3s ease-in-out;
            }
            
            realscout-office-listings:defined {
              opacity: 1;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            /* Prevent layout shift */
            .realscout-container {
              min-height: 400px;
              position: relative;
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
