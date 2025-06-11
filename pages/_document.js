import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Luxury homes in Las Vegas - Emerson Estates" />
        <link rel="icon" href="/favicon.ico" />
        <script 
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
          type="module"
          async
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            realscout-office-listings {
              --rs-listing-divider-color: rgb(101, 141, 172);
              width: 100%;
            }
          `
        }} />
        {/* Primary Meta Tags */}
        <meta name="title" content="Emerson Estates Homes - Luxury Living in Las Vegas, NV" />
        <meta name="description" content="Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121. Premium properties with modern amenities and community features." />
        <meta name="keywords" content="Emerson Estates, Las Vegas homes, luxury real estate, Nevada properties, Regency Cove Court" />
        <meta name="author" content="Emerson Estates" />

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

        {/* Favicon */}

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}