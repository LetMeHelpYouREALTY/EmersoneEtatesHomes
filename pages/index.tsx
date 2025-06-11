
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import RealScoutWidget from "../components/RealScoutWidget";
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
            <div className={styles.heroButtons}>
              <Link href="/homes">
                <button className={styles.ctaButton}>View Available Homes</button>
              </Link>
              <Link href="/contact">
                <button className={styles.ctaSecondary}>Schedule a Tour</button>
              </Link>
            </div>
          </div>
        </section>

        <section id="featured-homes" className={styles.section}>
          <h2 className={styles.sectionTitle}>Featured Properties</h2>
          <p className={styles.sectionDescription}>
            Browse our exclusive collection of luxury homes. Click on any property to view detailed information.
          </p>
          <div className={styles.widgetContainer}>
            <RealScoutWidget />
          </div>
          <div className={styles.sectionFooter}>
            <Link href="/homes" className={styles.viewAllLink}>
              View All Available Homes →
            </Link>
          </div>
        </section>

        <section id="quick-links" className={styles.section}>
          <h2 className={styles.sectionTitle}>Explore Emerson Estates</h2>
          <div className={styles.quickLinksGrid}>
            <Link href="/community" className={styles.quickLinkCard}>
              <div className={styles.cardIcon}>🏘️</div>
              <h3>Our Community</h3>
              <p>Discover the luxury lifestyle and prime location that makes Emerson Estates special.</p>
            </Link>
            
            <Link href="/amenities" className={styles.quickLinkCard}>
              <div className={styles.cardIcon}>🏊</div>
              <h3>World-Class Amenities</h3>
              <p>Resort-style pool, fitness center, tennis courts, and more exclusive amenities.</p>
            </Link>
            
            <Link href="/about" className={styles.quickLinkCard}>
              <div className={styles.cardIcon}>👤</div>
              <h3>Meet Your Agent</h3>
              <p>Get to know Dr. Jan Duffy, your trusted Las Vegas luxury real estate expert.</p>
            </Link>
            
            <Link href="/market-insights" className={styles.quickLinkCard}>
              <div className={styles.cardIcon}>📊</div>
              <h3>Market Insights</h3>
              <p>Stay informed with the latest Las Vegas luxury real estate market trends and data.</p>
            </Link>
            
            <Link href="/calculator" className={styles.quickLinkCard}>
              <div className={styles.cardIcon}>🧮</div>
              <h3>Payment Calculator</h3>
              <p>Calculate monthly payments and see what you can afford with our mortgage tool.</p>
            </Link>
            
            <Link href="/neighborhoods" className={styles.quickLinkCard}>
              <div className={styles.cardIcon}>🗺️</div>
              <h3>Neighborhoods</h3>
              <p>Explore Las Vegas neighborhoods and find the perfect area for your lifestyle.</p>
            </Link>
          </div>
        </section>

        <section id="why-choose" className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Choose Emerson Estates?</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>📍</div>
              <h3>Prime Location</h3>
              <p>Minutes from the Las Vegas Strip, premium shopping, and top-rated schools. Easy access to I-215 and major highways.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🔒</div>
              <h3>Gated Security</h3>
              <p>24/7 gated community with professional security ensuring peace of mind for all residents.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🌵</div>
              <h3>Desert Landscape</h3>
              <p>Beautiful desert landscaping with walking trails and preserved natural areas throughout the community.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>💎</div>
              <h3>Luxury Finishes</h3>
              <p>Premium materials, modern designs, and high-end appliances in every home.</p>
            </div>
          </div>
        </section>

        <section id="contact-cta" className={styles.section}>
          <div className={styles.ctaContainer}>
            <h2>Ready to Find Your Dream Home?</h2>
            <p>Let's start your journey to luxury living in Las Vegas.</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact">
                <button className={styles.ctaButton}>Get Started Today</button>
              </Link>
              <Link href="/homes">
                <button className={styles.ctaSecondary}>Browse Homes</button>
              </Link>
            </div>
            <div className={styles.contactInfo}>
              <p>📞 (702) 555-HOMES | 📧 info@emersonestates.com</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
