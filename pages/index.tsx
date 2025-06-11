
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Emerson Estates Homes - Las Vegas Real Estate</title>
        <meta name="description" content="Discover luxury homes in Emerson Estates, Las Vegas. Your premier destination for upscale living in Nevada." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h2>Emerson Estates</h2>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#homes">Available Homes</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#amenities">Amenities</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Welcome to Emerson Estates</h1>
            <p className={styles.subtitle}>Luxury Living in the Heart of Las Vegas</p>
            <p className={styles.description}>
              Discover your dream home in one of Las Vegas&apos; most prestigious communities. 
              Emerson Estates offers elegant residences with modern amenities and stunning desert views.
            </p>
            <button className={styles.ctaButton}>View Available Homes</button>
          </div>
        </section>

        <section id="homes" className={styles.section}>
          <h2 className={styles.sectionTitle}>Featured Properties</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardImage}></div>
              <h3>The Valencia</h3>
              <p className={styles.price}>$750,000</p>
              <ul className={styles.features}>
                <li>4 Bedrooms, 3 Bathrooms</li>
                <li>2,850 sq ft</li>
                <li>2-Car Garage</li>
                <li>Mountain Views</li>
              </ul>
              <button className={styles.viewButton}>View Details</button>
            </div>

            <div className={styles.card}>
              <div className={styles.cardImage}></div>
              <h3>The Sedona</h3>
              <p className={styles.price}>$825,000</p>
              <ul className={styles.features}>
                <li>5 Bedrooms, 4 Bathrooms</li>
                <li>3,200 sq ft</li>
                <li>3-Car Garage</li>
                <li>Pool & Spa Ready</li>
              </ul>
              <button className={styles.viewButton}>View Details</button>
            </div>

            <div className={styles.card}>
              <div className={styles.cardImage}></div>
              <h3>The Tuscan</h3>
              <p className={styles.price}>$950,000</p>
              <ul className={styles.features}>
                <li>6 Bedrooms, 5 Bathrooms</li>
                <li>4,100 sq ft</li>
                <li>3-Car Garage</li>
                <li>Premium Lot</li>
              </ul>
              <button className={styles.viewButton}>View Details</button>
            </div>
          </div>
        </section>

        <section id="community" className={styles.section}>
          <h2 className={styles.sectionTitle}>Community Highlights</h2>
          <div className={styles.communityGrid}>
            <div className={styles.communityCard}>
              <h3>Prime Location</h3>
              <p>Minutes from the Las Vegas Strip, premium shopping, and top-rated schools. Easy access to I-215 and major highways.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>Gated Security</h3>
              <p>24/7 gated community with professional security ensuring peace of mind for all residents.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>Desert Landscape</h3>
              <p>Beautiful desert landscaping with walking trails and preserved natural areas throughout the community.</p>
            </div>
          </div>
        </section>

        <section id="amenities" className={styles.section}>
          <h2 className={styles.sectionTitle}>World-Class Amenities</h2>
          <div className={styles.amenitiesList}>
            <div className={styles.amenityItem}>
              <h4>Community Center</h4>
              <p>State-of-the-art fitness center and event spaces</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Resort-Style Pool</h4>
              <p>Heated pool and spa with cabanas</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Tennis Courts</h4>
              <p>Two professional-grade tennis courts</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Children&apos;s Playground</h4>
              <p>Safe and modern play areas for families</p>
            </div>
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <div className={styles.contactInfo}>
            <div className={styles.contactCard}>
              <h3>Sales Office</h3>
              <p>123 Emerson Estates Blvd<br />Las Vegas, NV 89123</p>
              <p>Phone: (702) 555-HOMES</p>
              <p>Email: info@emersonestates.com</p>
            </div>
            <div className={styles.contactCard}>
              <h3>Hours</h3>
              <p>Monday - Saturday: 9 AM - 6 PM<br />Sunday: 10 AM - 5 PM</p>
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

export default Home;
