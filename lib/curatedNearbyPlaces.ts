import type { AmenityCategoryId } from './amenityCategories';

export type CuratedPlace = {
  name: string;
  address: string;
  categories: readonly AmenityCategoryId[];
  schemaType:
    | 'Restaurant'
    | 'CafeOrCoffeeShop'
    | 'GroceryStore'
    | 'Park'
    | 'GolfCourse'
    | 'Hospital'
    | 'Pharmacy'
    | 'ShoppingCenter'
    | 'ExerciseGym'
    | 'School'
    | 'Place';
  note?: string;
};

/** Verified public businesses and destinations — names and addresses from official or retailer listings. */
export const CURATED_NEARBY_PLACES: readonly CuratedPlace[] = [
  {
    name: 'Albertsons',
    address: '2835 S Nellis Blvd, Las Vegas, NV 89121',
    categories: ['grocery'],
    schemaType: 'GroceryStore',
    note: 'Full-service supermarket in the 89121 area.',
  },
  {
    name: 'Albertsons',
    address: '7271 S Eastern Ave, Las Vegas, NV 89119',
    categories: ['grocery'],
    schemaType: 'GroceryStore',
    note: 'Grocery, bakery, and deli on S Eastern Ave.',
  },
  {
    name: 'Sunset Park',
    address: '2601 E Sunset Rd, Las Vegas, NV 89120',
    categories: ['parks'],
    schemaType: 'Park',
    note: 'Large regional park with trails, ponds, and sports fields.',
  },
  {
    name: 'Las Vegas National Golf Club',
    address: '1911 E Desert Inn Rd, Las Vegas, NV 89169',
    categories: ['golf'],
    schemaType: 'GolfCourse',
    note: 'Public golf course noted in Emerson Estates community materials.',
  },
  {
    name: 'Sunrise Hospital & Medical Center',
    address: '3186 S Maryland Pkwy, Las Vegas, NV 89109',
    categories: ['healthcare'],
    schemaType: 'Hospital',
  },
  {
    name: 'Valley Hospital Medical Center',
    address: '1028 E Charleston Blvd, Las Vegas, NV 89104',
    categories: ['healthcare'],
    schemaType: 'Hospital',
  },
  {
    name: 'Boulder Station Hotel & Casino',
    address: '4111 Boulder Hwy, Las Vegas, NV 89121',
    categories: ['restaurants', 'shopping'],
    schemaType: 'Place',
    note: 'Dining and entertainment along Boulder Highway.',
  },
  {
    name: 'The Boulevard Mall',
    address: '3528 S Maryland Pkwy, Las Vegas, NV 89169',
    categories: ['shopping'],
    schemaType: 'ShoppingCenter',
  },
];

export function curatedPlacesForCategory(
  categoryId: AmenityCategoryId,
): readonly CuratedPlace[] {
  return CURATED_NEARBY_PLACES.filter((p) => p.categories.includes(categoryId));
}

export const NEARBY_FAQ = [
  {
    question: 'What grocery stores are near Emerson Estates?',
    answer:
      'Albertsons operates stores at 2835 S Nellis Blvd (Las Vegas, NV 89121) and 7271 S Eastern Ave (Las Vegas, NV 89119), both within a short drive of Emerson Estates.',
  },
  {
    question: 'How far is Emerson Estates from the Las Vegas Strip?',
    answer:
      'From the Emerson Estates area near Regency Cove Court, the Las Vegas Strip is typically about a 15–25 minute drive depending on traffic and your destination on Las Vegas Blvd (approximate).',
  },
  {
    question: 'Are there hospitals near Emerson Estates?',
    answer:
      'Yes. Sunrise Hospital & Medical Center on S Maryland Pkwy and Valley Hospital Medical Center on E Charleston Blvd serve the greater Las Vegas valley and are commonly used by east-side residents.',
  },
  {
    question: 'Is there golf near Emerson Estates?',
    answer:
      'Las Vegas National Golf Club on E Desert Inn Rd is the course most often associated with the Emerson Estates location in builder and listing materials.',
  },
  {
    question: 'Where can I walk or enjoy outdoor space nearby?',
    answer:
      'Sunset Park on E Sunset Rd offers walking paths, open lawns, and recreation areas a few miles from the community.',
  },
  {
    question: 'How do I get to Harry Reid International Airport from Emerson Estates?',
    answer:
      'Harry Reid International Airport is roughly a 10–20 minute drive via I-215 and the airport connector roads, depending on traffic (approximate).',
  },
  {
    question: 'Who can help me buy or sell in Emerson Estates?',
    answer:
      'Dr. Jan Duffy with Berkshire Hathaway HomeServices Nevada Properties specializes in Las Vegas residential real estate and can guide tours, offers, and market analysis for Emerson Estates.',
  },
] as const;
