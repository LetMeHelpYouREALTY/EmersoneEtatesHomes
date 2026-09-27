import Link from 'next/link';
import dynamic from 'next/dynamic';
import { EMERSON_ESTATES } from '@/lib/communityConfig';
import styles from '@/styles/Home.module.css';
import mapStyles from '@/components/maps/AmenityMap.module.css';

const AmenityMap = dynamic(() => import('@/components/maps/AmenityMap'), {
  ssr: false,
  loading: () => (
    <div className={mapStyles.mapShell} aria-busy="true" aria-label="Loading map">
      <div className={mapStyles.statusMessage} style={{ padding: '1rem' }}>
        Loading nearby map…
      </div>
    </div>
  ),
});

type NearbyAmenitiesSectionProps = {
  id?: string;
  heading?: string;
  description?: string;
  compact?: boolean;
};

export default function NearbyAmenitiesSection({
  id = 'whats-nearby',
  heading = `Life Near ${EMERSON_ESTATES.name}`,
  description = `Explore dining, groceries, parks, golf, healthcare, and everyday services within a short drive of ${EMERSON_ESTATES.name} in ${EMERSON_ESTATES.city}.`,
  compact = false,
}: NearbyAmenitiesSectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className={styles.sectionTitle}>
        {heading}
      </h2>
      <p className={styles.sectionDescription}>{description}</p>
      <AmenityMap showStaticList={!compact} />
      <div className={styles.sectionFooter}>
        <Link href="/nearby-amenities" className={styles.viewAllLink}>
          View full nearby amenities guide →
        </Link>
      </div>
    </section>
  );
}
