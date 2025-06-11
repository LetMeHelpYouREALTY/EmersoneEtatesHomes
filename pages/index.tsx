
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { memo, useMemo } from "react";
import Layout from "../components/Layout";
import RealScoutWidget from "../components/RealScoutWidget";
import styles from "../styles/Home.module.css";

const Home: NextPage = memo(() => {
  const quickLinks = useMemo(() => [
    {
      href: "/community",
      icon: "🏘️",
      title: "Our Community",
      description: "Discover the luxury lifestyle and prime location that makes Emerson Estates special."
    },
    {
      href: "/amenities",
      icon: "🏊",
      title: "World-Class Amenities",
      description: "Resort-style pool, fitness center, tennis courts, and more exclusive amenities."
    },
    {
      href: "/about",
      icon: "👤",
      title: "Meet Your Agent",
      description: "Get to know Dr. Jan Duffy, your trusted Las Vegas luxury real estate expert."
    },
    {
      href: "/market-insights",
      icon: "📊",
      title: "Market Insights",
      description: "Stay informed with the latest Las Vegas luxury real estate market trends and data."
    },
    {
      href: "/calculator",
      icon: "🧮",
      title: "Payment Calculator",
      description: "Calculate monthly payments and see what you can afford with our mortgage tool."
    },
    {
      href: "/neighborhoods",
      icon: "🗺️",
      title: "Neighborhoods",
      description: "Explore Las Vegas neighborhoods and find the perfect area for your lifestyle."
    }
  ], []);

  const benefits = useMemo(() => [
    {
      icon: "📍",
      title: "Prime Location",
      description: "Minutes from the Las Vegas Strip, premium shopping, and top-rated schools. Easy access to I-215 and major highways."
    },
    {
      icon: "🔒",
      title: "Gated Security",
      description: "24/7 gated community with professional security ensuring peace of mind for all residents."
    },
    {
      icon: "🌵",
      title: "Desert Landscape",
      description: "Beautiful desert landscaping with walking trails and preserved natural areas throughout the community."
    },
    {
      icon: "💎",
      title: "Luxury Finishes",
      description: "Premium materials, modern designs, and high-end appliances in every home."
    }
  ], []);

  return (
    <Layout>
      <Head>
        <title>Emerson Estates - Luxury Homes in Las Vegas</title>
        <meta name="description" content="Discover luxury living at Emerson Estates. Premium homes, world-class amenities, and an exclusive community in Las Vegas, Nevada." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero} key="hero-section">
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

        {/* Featured Properties */}
        <section id="featured-homes" className={styles.section} key="featured-section">
          <h2 className={styles.sectionTitle}>Featured Properties</h2>
          <p className={styles.sectionDescription}>
            Browse our exclusive collection of luxury homes. Click on any property to view detailed information.
          </p>
          <div className={styles.widgetContainer} key="widget-container">
            <RealScoutWidget />
          </div>
          <div className={styles.sectionFooter}>
            <Link href="/homes" className={styles.viewAllLink}>
              View All Available Homes →
            </Link>
          </div>
        </section>

        {/* Quick Links */}
        <section id="quick-links" className={styles.section} key="quick-links-section">
          <h2 className={styles.sectionTitle}>Explore Emerson Estates</h2>
          <div className={styles.quickLinksGrid}>
            {quickLinks.map((link, index) => (
              <Link 
                key={`quick-link-${index}-${link.href}`} 
                href={link.href} 
                className={styles.quickLinkCard}
              >
                <div className={styles.cardIcon}>{link.icon}</div>
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section id="why-choose" className={styles.section} key="benefits-section">
          <h2 className={styles.sectionTitle}>Why Choose Emerson Estates?</h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div key={`benefit-${index}-${benefit.title}`} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact-cta" className={styles.section} key="cta-section">
          <div className={styles.ctaContainer}>
            <h2>Ready to Find Your Dream Home?</h2>
            <p>Let&apos;s start your journey to luxury living in Las Vegas.</p>
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
});

Home.displayName = 'HomePage';

export default Home;
