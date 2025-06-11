import type { NextPage } from "next";
import Layout from "../components/Layout";
import ImageGallery from "../components/ImageGallery";
import styles from "../styles/Home.module.css";

const Community: NextPage = () => {
  return (
    <Layout 
      title="Community - Emerson Estates" 
      description="Learn about the Emerson Estates community in Las Vegas. Discover our neighborhood, location, and what makes us special."
    >
      <div className={styles.container}>
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

        <section className={styles.communityFeatures}>
          <h2>Community Highlights</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3>Location</h3>
              <p>Strategically located with easy access to shopping, dining, and entertainment.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Lifestyle</h3>
              <p>Resort-style living with luxury amenities at your doorstep.</p>
            </div>
            <div className={styles.featureCard}>
              <h3>Community</h3>
              <p>Vibrant neighborhood with regular events and activities.</p>
            </div>
          </div>
        </section>

        <ImageGallery
          title="Community Gallery"
          images={[
            {
              src: "/design 05_new 2_1749651606209.jpg",
              alt: "Community entrance",
              title: "Grand Entrance",
              category: "exterior"
            },
            {
              src: "/Best BHHS LOgo_1749650714182.jpg",
              alt: "Community landscaping",
              title: "Professional Landscaping",
              category: "exterior"
            },
            {
              src: "/new-logo.jpg",
              alt: "Community amenities",
              title: "Luxury Amenities",
              category: "amenities"
            }
          ]}
        />
      </div>
    </Layout>
  );
};

export default Community;