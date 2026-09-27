import { EMERSON_ESTATES } from '@/lib/communityConfig';
import {
  CURATED_NEARBY_PLACES,
  NEARBY_FAQ,
} from '@/lib/curatedNearbyPlaces';
import { SITE_AGENT } from '@/lib/siteContact';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emersonestateshomes.com';

export default function NearbyAmenitiesJsonLd() {
  const pageUrl = `${siteUrl}/nearby-amenities`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: NEARBY_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Nearby amenities around ${EMERSON_ESTATES.name}`,
    itemListElement: CURATED_NEARBY_PLACES.map((place, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': place.schemaType,
        name: place.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: place.address.split(',')[0]?.trim(),
          addressLocality: EMERSON_ESTATES.city,
          addressRegion: EMERSON_ESTATES.region,
          addressCountry: EMERSON_ESTATES.country,
        },
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Nearby Amenities',
        item: pageUrl,
      },
    ],
  };

  const communityPlaceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: EMERSON_ESTATES.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: EMERSON_ESTATES.streetAddress,
      addressLocality: EMERSON_ESTATES.city,
      addressRegion: EMERSON_ESTATES.region,
      postalCode: EMERSON_ESTATES.postalCode,
      addressCountry: EMERSON_ESTATES.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: EMERSON_ESTATES.center.lat,
      longitude: EMERSON_ESTATES.center.lng,
    },
  };

  const agentSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE_AGENT.name,
    telephone: SITE_AGENT.phoneTel,
    email: SITE_AGENT.email,
    image: `${siteUrl}/professional-headshot.jpg`,
    areaServed: {
      '@type': 'Place',
      name: EMERSON_ESTATES.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: EMERSON_ESTATES.city,
        addressRegion: EMERSON_ESTATES.region,
        postalCode: EMERSON_ESTATES.postalCode,
        addressCountry: EMERSON_ESTATES.country,
      },
    },
    worksFor: {
      '@type': 'Organization',
      name: SITE_AGENT.brokerage,
    },
    identifier: SITE_AGENT.license,
    url: siteUrl,
  };

  const schemas = [
    faqSchema,
    itemListSchema,
    breadcrumbSchema,
    communityPlaceSchema,
    agentSchema,
  ];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema['@type'] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
