import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Script from "next/script";
import styles from "../styles/Home.module.css";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title = 'Emerson Estates - Luxury Homes in Las Vegas', description = 'Discover luxury homes at Emerson Estates in Las Vegas, Nevada. Located at 2583 Regency Cove Ct, Las Vegas, NV 89121.' }: LayoutProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h2>Emerson Estates</h2>
          </div>
          <ul className={styles.navLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/homes">Available Homes</Link></li>
            <li><Link href="/community">Community</Link></li>
            <li><Link href="/amenities">Amenities</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Emerson Estates. All rights reserved.</p>
      </footer>
    </>
  );
}