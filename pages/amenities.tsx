import type { NextPage } from "next";
import Layout from "../components/Layout";
import ImageGallery from "../components/ImageGallery";
import styles from "../styles/Home.module.css";

const Amenities: NextPage = () => {
  return (
    <Layout 
      title="Amenities - Emerson Estates" 
      description="Discover world-class amenities at Emerson Estates including resort-style pool, fitness center, clubhouse, and more."
    >
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>World-Class Amenities</h1>
            <p className={styles.subtitle}>Resort-Style Living Every Day</p>
            <p className={styles.description}>
              Enjoy luxury amenities designed to enhance your lifestyle and provide 
              endless opportunities for relaxation and recreation.
            </p>
          </div>
        </section>

        <section className={styles.amenitiesList}>
          <h2>Premium Amenities</h2>
          <div className={styles.amenityGrid}>
            <div className={styles.amenityCard}>
              <h3>Resort-Style Pool</h3>
              <p>Sparkling pool with cabanas and poolside service area.</p>
            </div>
            <div className={styles.amenityCard}>
              <h3>Fitness Center</h3>
              <p>State-of-the-art equipment and personal training services.</p>
            </div>
            <div className={styles.amenityCard}>
              <h3>Clubhouse</h3>
              <p>Elegant space for events, meetings, and social gatherings.</p>
            </div>
            <div className={styles.amenityCard}>
              <h3>Security</h3>
              <p>24/7 gated entry with professional security patrol.</p>
            </div>
            <div className={styles.amenityCard}>
              <h3>Landscaping</h3>
              <p>Professionally maintained desert landscaping throughout.</p>
            </div>
            <div className={styles.amenityCard}>
              <h3>Walking Trails</h3>
              <p>Scenic paths perfect for morning walks and evening strolls.</p>
            </div>
          </div>
        </section>

        <ImageGallery
          title="Amenity Showcase"
          images={[
            {
              src: "/design 05_new 2_1749651606209.jpg",
              alt: "Resort-style pool area",
              title: "Resort-Style Pool",
              category: "pool"
            },
            {
              src: "/Best BHHS LOgo_1749650714182.jpg",
              alt: "Modern fitness center",
              title: "State-of-Art Fitness Center",
              category: "fitness"
            },
            {
              src: "/new-logo.jpg",
              alt: "Elegant clubhouse interior",
              title: "Luxury Clubhouse",
              category: "clubhouse"
            }
          ]}
        />
      </div>
    </Layout>
  );
};

export default Amenities;