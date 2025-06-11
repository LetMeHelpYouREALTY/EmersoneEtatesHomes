
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Amenities: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Amenities - Emerson Estates</title>
        <meta name="description" content="Explore the world-class amenities at Emerson Estates including pools, fitness center, tennis courts, and more." />
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
            <h1 className={styles.title}>World-Class Amenities</h1>
            <p className={styles.subtitle}>Resort-Style Living Every Day</p>
            <p className={styles.description}>
              Experience luxury amenities designed to enhance your lifestyle and provide 
              endless opportunities for recreation, fitness, and relaxation.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recreation & Fitness</h2>
          <div className={styles.amenitiesList}>
            <div className={styles.amenityItem}>
              <h4>Community Center</h4>
              <p>State-of-the-art fitness center with modern equipment, group exercise classes, and personal training available</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Resort-Style Pool</h4>
              <p>Heated swimming pool and spa with cabanas, lounge areas, and poolside service during summer months</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Tennis Courts</h4>
              <p>Two professional-grade tennis courts with night lighting and equipment rental available</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Walking Trails</h4>
              <p>Miles of paved walking and jogging trails throughout the community with beautiful desert scenery</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Family & Social</h2>
          <div className={styles.amenitiesList}>
            <div className={styles.amenityItem}>
              <h4>Children&apos;s Playground</h4>
              <p>Safe and modern play areas designed for different age groups with shade structures and safety surfacing</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Event Pavilion</h4>
              <p>Covered outdoor space perfect for community events, birthday parties, and social gatherings</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>BBQ Areas</h4>
              <p>Multiple barbecue and picnic areas throughout the community with tables and grills for family gatherings</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Community Events</h4>
              <p>Regular social events, holiday celebrations, and activities organized by our community association</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Convenience & Services</h2>
          <div className={styles.amenitiesList}>
            <div className={styles.amenityItem}>
              <h4>24/7 Security</h4>
              <p>Gated entry with professional security personnel and regular community patrols for peace of mind</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Landscaping Services</h4>
              <p>Professional landscape maintenance of all common areas and community spaces included in HOA fees</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Package Services</h4>
              <p>Secure package receiving and notification system for all residents through the community office</p>
            </div>
            <div className={styles.amenityItem}>
              <h4>Concierge Services</h4>
              <p>On-site management and concierge services to assist with community needs and information</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Future Amenities</h2>
          <div className={styles.communityGrid}>
            <div className={styles.communityCard}>
              <h3>Golf Course</h3>
              <p>Plans for an 18-hole championship golf course designed by a renowned golf architect, scheduled to break ground in 2025.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>Shopping Village</h3>
              <p>A planned retail and dining village within the community featuring boutique shops, restaurants, and services.</p>
            </div>
            <div className={styles.communityCard}>
              <h3>Spa & Wellness Center</h3>
              <p>Future full-service spa and wellness center offering massage therapy, yoga classes, and health services.</p>
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

export default Amenities;
