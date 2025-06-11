
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import PropertyCalculator from "../components/PropertyCalculator";
import styles from "../styles/Home.module.css";

const Calculator: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Mortgage Calculator - Emerson Estates</title>
        <meta name="description" content="Calculate your monthly mortgage payments for luxury homes in Las Vegas. Free mortgage calculator with taxes, insurance, and HOA fees." />
        <meta name="keywords" content="mortgage calculator, Las Vegas homes, luxury real estate calculator, home loan calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Mortgage Payment Calculator</h1>
            <p className={styles.subtitle}>Calculate Your Monthly Payments</p>
            <p className={styles.description}>
              Use our comprehensive mortgage calculator to estimate your monthly payments 
              for luxury homes in Las Vegas. Include taxes, insurance, and HOA fees for accurate results.
            </p>
          </div>
        </section>

        <PropertyCalculator />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Understanding Your Mortgage</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>🏦 Pre-Approval Benefits</h3>
              <p>Get pre-approved to strengthen your offer and show sellers you're serious about purchasing.</p>
            </div>
            <div className={styles.infoCard}>
              <h3>💰 Down Payment Options</h3>
              <p>Learn about different down payment options, from conventional 20% to luxury loan programs.</p>
            </div>
            <div className={styles.infoCard}>
              <h3>📈 Interest Rate Factors</h3>
              <p>Understand how credit score, loan term, and market conditions affect your interest rate.</p>
            </div>
            <div className={styles.infoCard}>
              <h3>🏠 Luxury Home Financing</h3>
              <p>Explore jumbo loans and specialized financing options for high-value properties.</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Calculator;
