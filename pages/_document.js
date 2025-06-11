
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Emerson Estates" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121. Premium properties with modern amenities and community features." />
        <meta name="keywords" content="luxury homes, Las Vegas real estate, Emerson Estates, premium properties, Nevada homes" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Emerson Estates Homes - Luxury Living in Las Vegas, NV" />
        <meta property="og:description" content="Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121. Premium properties with modern amenities and community features." />
        <meta property="og:url" content="https://www.emersonestateshomes.com" />
        <meta property="og:site_name" content="Emerson Estates" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Emerson Estates Homes - Luxury Living in Las Vegas, NV" />
        <meta property="twitter:description" content="Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121. Premium properties with modern amenities and community features." />

        {/* RealScout Web Components - Load with proper error handling */}
        <script 
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
          type="module" 
          async
          onError="console.warn('RealScout widget failed to load')"
        />
        
        {/* RealScout Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            realscout-office-listings {
              --rs-listing-divider-color: rgb(101, 141, 172);
              width: 100%;
              display: block;
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
