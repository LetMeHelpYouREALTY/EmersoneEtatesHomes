
import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import styles from "../styles/Home.module.css";

const Homes: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Available Homes - Emerson Estates</title>
        <meta name="description" content="Browse available luxury homes in Emerson Estates, Las Vegas. Find your perfect home today." />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          realscout-office-listings {
            --rs-listing-divider-color: rgb(101, 141, 172);
            width: 100%;
          }
        `}</style>
      </Head>

      <Script 
        src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
        strategy="beforeInteractive"
      />

      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h2>Emerson Estates</h2>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="/">Home</a></li>
            <li><a href="/homes">Available Homes</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/amenities">Amenities</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Available Homes</h1>
            <p className={styles.subtitle}>Find Your Dream Home in Emerson Estates</p>
            <p className={styles.description}>
              Explore our collection of luxury homes featuring modern designs, premium finishes, 
              and stunning views of the Las Vegas valley and surrounding mountains.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Current Listings</h2>
          <div className={styles.widgetContainer}>
            <realscout-office-listings 
              agent-encoded-id="QWdlbnQtMjI1MDUw" 
              sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
              listing-status="For Sale" 
              property-types="SFR,MF">
            </realscout-office-listings>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Home Features</h2>
          <div className={styles.amenitiesList}>
            <div className={styles.amenityItem}>
              <h4>Open Floor Plans</h4>
              <p>Spacious layouts perfect for modern living and entertaining</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Gourmet Kitchens</h4>
              <p>Premium appliances, granite countertops, and custom cabinetry</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Master Suites</h4>
              <p>Luxurious bedrooms with walk-in closets and spa-like bathrooms</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Outdoor Living</h4>
              <p>Covered patios and spaces designed for desert entertaining</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Emerson Estates. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homes;
