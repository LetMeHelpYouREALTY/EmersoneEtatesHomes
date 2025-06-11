import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import RealScoutWidget from "../components/RealScoutWidget";
import styles from "../styles/Home.module.css";
import PropertyCalculator from "../components/PropertyCalculator";

const Homes: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Available Homes - Emerson Estates</title>
        <meta name="description" content="Browse available luxury homes in Emerson Estates, Las Vegas. Find your perfect home today." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            <RealScoutWidget />
          </div>
        </section>

        <PropertyCalculator />

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
    </Layout>
  );
};

export default Homes;