import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import NearbyAmenitiesJsonLd from '@/components/NearbyAmenitiesJsonLd';
import { EMERSON_ESTATES } from '@/lib/communityConfig';
import { NEARBY_FAQ } from '@/lib/curatedNearbyPlaces';
import { SITE_AGENT } from '@/lib/siteContact';
import styles from '@/styles/Home.module.css';
import mapStyles from '@/components/maps/AmenityMap.module.css';

const AmenityMap = dynamic(() => import('@/components/maps/AmenityMap'), {
  ssr: false,
  loading: () => (
    <div className={mapStyles.mapShell} aria-busy="true">
      <p className={mapStyles.statusMessage} style={{ padding: '1rem' }}>
        Loading interactive map…
      </p>
    </div>
  ),
});

const pageTitle = `Nearby Amenities in ${EMERSON_ESTATES.name}, Las Vegas | Local Guide`;
const pageDescription = `Interactive map and local guide to restaurants, groceries, parks, golf, healthcare, and shopping near ${EMERSON_ESTATES.name} at ${EMERSON_ESTATES.streetAddress}, Las Vegas, NV 89121.`;

const NearbyAmenitiesPage: NextPage = () => {
  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
    >
      <Head>
        <NearbyAmenitiesJsonLd />
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Nearby Amenities in {EMERSON_ESTATES.name}, Las Vegas
            </h1>
            <p className={styles.subtitle}>
              Hyperlocal dining, services, and recreation around{' '}
              {EMERSON_ESTATES.streetAddress}
            </p>
            <p className={styles.description}>
              Use the interactive map to explore verified businesses and destinations
              buyers ask about most — then read category highlights and FAQs below
              (all in plain text for search and AI answers).
            </p>
          </div>
        </section>

        <section className={styles.section} aria-label="Interactive amenity map">
          <h2 className={styles.sectionTitle}>Interactive Amenity Map</h2>
          <p className={styles.sectionDescription}>
            Filter by category to see places near the center of {EMERSON_ESTATES.name}.
            Tap a marker for directions in Google Maps.
          </p>
          <AmenityMap showStaticList />
        </section>

        <section className={styles.section} aria-labelledby="dining-nearby">
          <h2 id="dining-nearby" className={styles.sectionTitle}>
            Dining &amp; Groceries
          </h2>
          <div className={styles.benefitsGrid}>
            <article className={styles.benefitCard}>
              <h3>Grocery</h3>
              <p>
                Albertsons at 2835 S Nellis Blvd (89121) and 7271 S Eastern Ave (89119)
                are established full-service supermarkets serving the southeast Las Vegas
                valley near Emerson Estates.
              </p>
            </article>
            <article className={styles.benefitCard}>
              <h3>Dining &amp; Entertainment</h3>
              <p>
                Boulder Station on Boulder Hwy offers casual dining and entertainment
                options along one of the main corridors east of the Strip.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="parks-golf">
          <h2 id="parks-golf" className={styles.sectionTitle}>
            Parks, Golf &amp; Outdoor Time
          </h2>
          <div className={styles.benefitsGrid}>
            <article className={styles.benefitCard}>
              <h3>Sunset Park</h3>
              <p>
                Sunset Park (2601 E Sunset Rd) is a large Clark County park with walking
                paths, sports fields, and open space — a go-to for outdoor recreation
                near the 89120/89121 area.
              </p>
            </article>
            <article className={styles.benefitCard}>
              <h3>Las Vegas National Golf Club</h3>
              <p>
                Las Vegas National Golf Club on E Desert Inn Rd is the public course
                referenced in Emerson Estates marketing and listing materials for
                convenient golf access.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="healthcare-nearby">
          <h2 id="healthcare-nearby" className={styles.sectionTitle}>
            Healthcare
          </h2>
          <p className={styles.sectionDescription}>
            Major valley hospitals used by east-side and central Las Vegas residents
            include Sunrise Hospital &amp; Medical Center (3186 S Maryland Pkwy) and
            Valley Hospital Medical Center (1028 E Charleston Blvd).
          </p>
        </section>

        <section className={styles.section} aria-labelledby="shopping-commute">
          <h2 id="shopping-commute" className={styles.sectionTitle}>
            Shopping &amp; Commute Highlights
          </h2>
          <div className={styles.benefitsGrid}>
            <article className={styles.benefitCard}>
              <h3>The Boulevard Mall</h3>
              <p>
                The Boulevard Mall on S Maryland Pkwy provides regional shopping and
                services south of the central valley.
              </p>
            </article>
            <article className={styles.benefitCard}>
              <h3>Las Vegas Strip</h3>
              <p>
                From Emerson Estates, the Las Vegas Strip is typically about a 15–25
                minute drive depending on traffic and your destination (approximate).
              </p>
            </article>
            <article className={styles.benefitCard}>
              <h3>Harry Reid International Airport</h3>
              <p>
                Harry Reid International Airport is roughly a 10–20 minute drive via
                I-215 and airport connectors, depending on traffic (approximate).
              </p>
            </article>
            <article className={styles.benefitCard}>
              <h3>Downtown Summerlin</h3>
              <p>
                Downtown Summerlin is on the west side of the valley; plan on a longer
                cross-valley drive from the 89121 area — often 25–40 minutes in typical
                traffic (approximate).
              </p>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="nearby-faq">
          <h2 id="nearby-faq" className={styles.sectionTitle}>
            Frequently Asked Questions
          </h2>
          <dl className={styles.faqList}>
            {NEARBY_FAQ.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <dt className={styles.faqQuestion}>{item.question}</dt>
                <dd className={styles.faqAnswer}>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.section} aria-labelledby="agent-trust">
          <div className={styles.ctaContainer}>
            <h2 id="agent-trust">Your Local Expert for {EMERSON_ESTATES.name}</h2>
            <p>
              {SITE_AGENT.name} with {SITE_AGENT.brokerage} helps buyers and sellers
              navigate {EMERSON_ESTATES.name} and surrounding Las Vegas communities.
              License {SITE_AGENT.license}.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact">
                <button type="button" className={styles.ctaButton}>
                  Contact {SITE_AGENT.name}
                </button>
              </Link>
              <Link href="/homes">
                <button type="button" className={styles.ctaSecondary}>
                  View Available Homes
                </button>
              </Link>
            </div>
            <div className={styles.contactInfo}>
              <p>
                📞 {SITE_AGENT.phoneDisplay} | ✉️ {SITE_AGENT.email}
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default NearbyAmenitiesPage;
