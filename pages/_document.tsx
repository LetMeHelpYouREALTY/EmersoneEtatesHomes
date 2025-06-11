
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Meta Tags */}
        <meta name="description" content="Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121. Premium properties with modern amenities and community features." />
        <meta name="keywords" content="Emerson Estates, luxury homes, Las Vegas real estate, Nevada homes, premium properties" />
        <meta name="author" content="Emerson Estates" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Emerson Estates Homes - Luxury Living in Las Vegas, NV" />
        <meta property="og:description" content="Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121. Premium properties with modern amenities and community features." />
        <meta property="og:site_name" content="Emerson Estates" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Emerson Estates Homes - Luxury Living in Las Vegas, NV" />
        <meta property="twitter:description" content="Discover luxury homes at Emerson Estates, located at 2583 Regency Cove Ct, Las Vegas, NV 89121. Premium properties with modern amenities and community features." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
