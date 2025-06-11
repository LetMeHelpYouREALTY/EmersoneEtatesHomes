import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

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