
import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  pathname?: string;
}

export default function SEOHead({
  title = "Emerson Estates - Luxury Homes in Las Vegas",
  description = "Discover luxury living at Emerson Estates. Premium homes, world-class amenities, and an exclusive community in Las Vegas, Nevada.",
  keywords = "luxury homes las vegas, emerson estates, real estate nevada, gated community, premium properties",
  ogImage = "/bhhs-logo.jpg",
  pathname = ""
}: SEOHeadProps) {
  const siteUrl = "https://www.emersonestateshomes.com";
  const fullUrl = `${siteUrl}${pathname}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Dr. Duffy - Berkshire Hathaway HomeServices" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Emerson Estates" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Dr. Duffy",
            "image": `${siteUrl}/professional-headshot.jpg`,
            "telephone": "+1-702-555-1234",
            "email": "dr.duffy@emersonestateshomes.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2583 Regency Cove Ct",
              "addressLocality": "Las Vegas",
              "addressRegion": "NV",
              "postalCode": "89121",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "36.1699",
              "longitude": "-115.1398"
            },
            "url": siteUrl,
            "sameAs": [
              "https://www.linkedin.com/in/dr-duffy-realtor",
              "https://www.facebook.com/emersonestateshomes"
            ],
            "knowsAbout": [
              "Luxury Real Estate",
              "Las Vegas Properties",
              "Investment Properties",
              "Gated Communities"
            ]
          })
        }}
      />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Head>
  );
}
