import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
          <meta name="format-detection" content="telephone=no" />

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

        {/* RealScout Web Components */}
        <script async src="https://em.realscout.com/widgets/realscout-web-components.umd.js" type="module"></script>
        <style dangerouslySetInnerHTML={{
          __html: `
            realscout-office-listings {
              --rs-listing-divider-color: rgb(101, 141, 172);
              width: 100%;
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