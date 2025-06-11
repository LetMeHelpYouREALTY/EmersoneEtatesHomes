
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Community: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Community - Emerson Estates</title>
        <meta name="description" content="Learn about the Emerson Estates community in Las Vegas. Discover our neighborhood, location, and what makes us special." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            <h1 className={styles.title}>Our Community</h1>
            <p className={styles.subtitle}>Where Luxury Meets Lifestyle</p>
            <p className={styles.description}>
              Emerson Estates is more than just a place to live - it&apos;s a community where 
              neighbors become friends and every day feels like a vacation.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Community Highlights</h2>
          <div className={styles.communityGrid}>
            <div className={styles.communityCard}>
              <h3>Prime Location</h3>
              <p>Minutes from the Las Vegas Strip, premium shopping, and top-rated schools. Easy access to I-215 and major highways for convenient commuting throughout the valley.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>Gated Security</h3>
              <p>24/7 gated community with professional security ensuring peace of mind for all residents. Controlled access and regular patrols maintain our safe environment.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>Desert Landscape</h3>
              <p>Beautiful desert landscaping with walking trails and preserved natural areas throughout the community. Environmentally conscious design that embraces our Nevada setting.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>Family Friendly</h3>
              <p>Safe neighborhoods with sidewalks, parks, and recreational areas perfect for families. Close proximity to excellent schools and youth programs.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>Mountain Views</h3>
              <p>Stunning views of the surrounding mountain ranges and Las Vegas valley. Many homes feature panoramic vistas that showcase Nevada&apos;s natural beauty.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>Investment Value</h3>
              <p>Strong property values and appreciation potential in one of Las Vegas&apos; most desirable master-planned communities.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Nearby Attractions</h2>
          <div className={styles.amenitiesList}>
            <div className={styles.amenityItem}>
              <h4>Shopping & Dining</h4>
              <p>Town Square Las Vegas, The District at Green Valley Ranch, and countless restaurants within minutes</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Recreation</h4>
              <p>Multiple golf courses, Red Rock Canyon, Lake Las Vegas, and outdoor adventure opportunities</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Entertainment</h4>
              <p>Quick access to the Las Vegas Strip, concerts, shows, and world-class entertainment venues</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Education</h4>
              <p>Top-rated schools in the Clark County School District and nearby private school options</p>
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

export default Community;
