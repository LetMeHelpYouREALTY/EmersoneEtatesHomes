import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import RealScoutWidget from "../components/RealScoutWidget";
import AgentProfile from "../components/AgentProfile";
import MarketStats from "../components/MarketStats";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Emerson Estates - Luxury Homes in Las Vegas</title>
        <meta name="description" content="Discover luxury living at Emerson Estates. Premium homes, world-class amenities, and an exclusive community in Las Vegas, Nevada." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Welcome to Emerson Estates</h1>
            <p className={styles.subtitle}>Luxury Living in the Heart of Las Vegas</p>
            <p className={styles.description}>
              Discover your dream home in one of Las Vegas&apos; most prestigious communities. 
              Emerson Estates offers elegant residences with modern amenities and stunning desert views.
            </p>
            <Link href="/homes">
              <button className={styles.ctaButton}>View Available Homes</button>
            </Link>
          </div>
        </section>

        <AgentProfile />

        <MarketStats />

        <section id="homes" className={styles.section}>
          <h2 className={styles.sectionTitle}>Featured Properties</h2>
          <div className={styles.widgetContainer}>
            <RealScoutWidget />
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
              <p>2583 Regency Cove Ct<br />Las Vegas, NV 89121</p>
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
    </Layout>
  );
};

export default Home;