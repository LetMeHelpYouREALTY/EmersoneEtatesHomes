import type { AmenityCategoryId } from '@/lib/amenityCategories';
import { curatedPlacesForCategory } from '@/lib/curatedNearbyPlaces';
import styles from './AmenityMap.module.css';

type StaticAmenityListProps = {
  categoryId: AmenityCategoryId;
  title?: string;
};

export default function StaticAmenityList({
  categoryId,
  title = 'Featured nearby places',
}: StaticAmenityListProps) {
  const places = curatedPlacesForCategory(categoryId);
  const allPlaces =
    places.length > 0 ? places : curatedPlacesForCategory('grocery');

  return (
    <div className={styles.staticList}>
      <h3>{title}</h3>
      <ul>
        {allPlaces.map((place) => (
          <li key={`${place.name}-${place.address}`}>
            <div className={styles.placeName}>{place.name}</div>
            <div className={styles.placeAddress}>{place.address}</div>
            {place.note ? (
              <div className={styles.placeNote}>{place.note}</div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
