'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AMENITY_CATEGORIES,
  DEFAULT_AMENITY_CATEGORY,
  getCategoryById,
  type AmenityCategoryId,
} from '@/lib/amenityCategories';
import { EMERSON_ESTATES } from '@/lib/communityConfig';
import {
  getGoogleMapsApiKey,
  getGoogleMapsMapId,
  loadGoogleMapsScript,
} from '@/lib/loadGoogleMaps';
import StaticAmenityList from './StaticAmenityList';
import styles from './AmenityMap.module.css';

type AmenityMapProps = {
  initialCategory?: AmenityCategoryId;
  showStaticList?: boolean;
  staticListTitle?: string;
};

type PlaceResult = {
  id: string;
  name: string;
  address: string;
  rating?: number;
  lat: number;
  lng: number;
};

function buildDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

function buildEmbedUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
}

export default function AmenityMap({
  initialCategory = DEFAULT_AMENITY_CATEGORY,
  showStaticList = true,
  staticListTitle,
}: AmenityMapProps) {
  const apiKey = getGoogleMapsApiKey();
  const mapId = getGoogleMapsMapId();

  const [activeCategory, setActiveCategory] =
    useState<AmenityCategoryId>(initialCategory);
  const [isVisible, setIsVisible] = useState(false);
  const [mapStatus, setMapStatus] = useState<
    'idle' | 'loading' | 'ready' | 'error'
  >('idle');

  const shellRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const communityMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | google.maps.Marker | null>(null);
  const placeMarkersRef = useRef<
    (google.maps.marker.AdvancedMarkerElement | google.maps.Marker)[]
  >([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const node = shellRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px', threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clearPlaceMarkers = useCallback(() => {
    placeMarkersRef.current.forEach((marker) => {
      if ('map' in marker && marker.map) {
        marker.map = null;
      } else if ('setMap' in marker && typeof marker.setMap === 'function') {
        marker.setMap(null);
      }
    });
    placeMarkersRef.current = [];
  }, []);

  const showInfoWindow = useCallback(
    (
      map: google.maps.Map,
      position: google.maps.LatLngLiteral,
      title: string,
      address: string,
      rating?: number,
    ) => {
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }

      const ratingLine =
        rating !== undefined ? `<p style="margin:4px 0 0">Rating: ${rating.toFixed(1)}</p>` : '';
      const directionsUrl = buildDirectionsUrl(position.lat, position.lng);

      infoWindowRef.current.setContent(`
        <div style="max-width:240px;font-family:system-ui,sans-serif">
          <strong>${title}</strong>
          <p style="margin:4px 0 0;font-size:13px">${address}</p>
          ${ratingLine}
          <p style="margin:8px 0 0"><a href="${directionsUrl}" target="_blank" rel="noopener noreferrer">Directions</a></p>
        </div>
      `);
      infoWindowRef.current.setPosition(position);
      infoWindowRef.current.open({ map });
    },
    [],
  );

  const addCommunityMarker = useCallback(
    async (map: google.maps.Map) => {
      const position = {
        lat: EMERSON_ESTATES.center.lat,
        lng: EMERSON_ESTATES.center.lng,
      };

      if (communityMarkerRef.current) {
        if ('map' in communityMarkerRef.current) {
          communityMarkerRef.current.map = null;
        } else {
          communityMarkerRef.current.setMap(null);
        }
        communityMarkerRef.current = null;
      }

      try {
        const markerLib = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary;
        const { AdvancedMarkerElement, PinElement } = markerLib;
        const pin = new PinElement({
          background: '#1e40af',
          borderColor: '#1e3a8a',
          glyphColor: '#ffffff',
        });
        const marker = new AdvancedMarkerElement({
          map,
          position,
          title: EMERSON_ESTATES.name,
          content: pin.element,
        });
        marker.addListener('click', () => {
          showInfoWindow(
            map,
            position,
            EMERSON_ESTATES.name,
            `${EMERSON_ESTATES.streetAddress}, ${EMERSON_ESTATES.city}, ${EMERSON_ESTATES.region} ${EMERSON_ESTATES.postalCode}`,
          );
        });
        communityMarkerRef.current = marker;
      } catch {
        const marker = new google.maps.Marker({
          map,
          position,
          title: EMERSON_ESTATES.name,
          label: 'E',
        });
        marker.addListener('click', () => {
          showInfoWindow(
            map,
            position,
            EMERSON_ESTATES.name,
            `${EMERSON_ESTATES.streetAddress}, ${EMERSON_ESTATES.city}, ${EMERSON_ESTATES.region} ${EMERSON_ESTATES.postalCode}`,
          );
        });
        communityMarkerRef.current = marker;
      }
    },
    [showInfoWindow],
  );

  const renderPlaceMarkers = useCallback(
    async (map: google.maps.Map, places: PlaceResult[]) => {
      clearPlaceMarkers();

      let AdvancedMarkerElement:
        | typeof google.maps.marker.AdvancedMarkerElement
        | undefined;
      try {
        const markerLib = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary;
        AdvancedMarkerElement = markerLib.AdvancedMarkerElement;
      } catch {
        AdvancedMarkerElement = undefined;
      }

      places.forEach((place) => {
        const position = { lat: place.lat, lng: place.lng };
        const open = () =>
          showInfoWindow(map, position, place.name, place.address, place.rating);

        if (AdvancedMarkerElement && mapId) {
          const marker = new AdvancedMarkerElement({
            map,
            position,
            title: place.name,
          });
          marker.addListener('click', open);
          placeMarkersRef.current.push(marker);
        } else {
          const marker = new google.maps.Marker({
            map,
            position,
            title: place.name,
          });
          marker.addListener('click', open);
          placeMarkersRef.current.push(marker);
        }
      });
    },
    [clearPlaceMarkers, mapId, showInfoWindow],
  );

  const fetchPlaces = useCallback(
    async (categoryId: AmenityCategoryId): Promise<PlaceResult[]> => {
      const category = getCategoryById(categoryId);
      const center = EMERSON_ESTATES.center;

      try {
        const placesLib = (await google.maps.importLibrary(
          'places',
        )) as google.maps.PlacesLibrary;

        if ('Place' in placesLib && placesLib.Place?.searchNearby) {
          const { places } = await placesLib.Place.searchNearby({
            fields: [
              'displayName',
              'formattedAddress',
              'location',
              'rating',
              'id',
            ],
            locationRestriction: {
              center,
              radius: EMERSON_ESTATES.searchRadiusMeters,
            },
            includedPrimaryTypes: [...category.placeTypes],
            maxResultCount: 15,
          });

          return places
            .map((place, index) => {
              const loc = place.location;
              if (!loc) {
                return null;
              }
              return {
                id: place.id ?? `place-${index}`,
                name: place.displayName ?? 'Place',
                address: place.formattedAddress ?? 'Las Vegas, NV',
                rating: place.rating ?? undefined,
                lat: loc.lat(),
                lng: loc.lng(),
              };
            })
            .filter((p): p is PlaceResult => p !== null);
        }
      } catch {
        // Fall through to legacy PlacesService
      }

      return new Promise((resolve) => {
        const service = new google.maps.places.PlacesService(
          mapInstanceRef.current ?? document.createElement('div'),
        );
        const type = category.placeTypes[0] ?? 'point_of_interest';
        service.nearbySearch(
          {
            location: center,
            radius: EMERSON_ESTATES.searchRadiusMeters,
            type,
          },
          (results, status) => {
            if (
              status !== google.maps.places.PlacesServiceStatus.OK ||
              !results
            ) {
              resolve([]);
              return;
            }
            const mapped = results
              .map((result, index) => {
                const loc = result.geometry?.location;
                if (!loc) {
                  return null;
                }
                return {
                  id: result.place_id ?? `legacy-${index}`,
                  name: result.name ?? 'Place',
                  address: result.vicinity ?? 'Las Vegas, NV',
                  rating: result.rating ?? undefined,
                  lat: loc.lat(),
                  lng: loc.lng(),
                };
              })
              .filter((p): p is PlaceResult => p !== null);
            resolve(mapped);
          },
        );
      });
    },
    [],
  );

  const initializeMap = useCallback(async () => {
    if (!apiKey || !mapContainerRef.current || mapInstanceRef.current) {
      return;
    }

    setMapStatus('loading');
    try {
      await loadGoogleMapsScript(apiKey);
      await google.maps.importLibrary('maps');
      await google.maps.importLibrary('places');

      const mapOptions: google.maps.MapOptions = {
        center: EMERSON_ESTATES.center,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      };
      if (mapId) {
        mapOptions.mapId = mapId;
      }

      const map = new google.maps.Map(mapContainerRef.current, mapOptions);
      mapInstanceRef.current = map;
      await addCommunityMarker(map);
      setMapStatus('ready');
    } catch {
      setMapStatus('error');
    }
  }, [addCommunityMarker, apiKey, mapId]);

  useEffect(() => {
    if (!isVisible || !apiKey) {
      return;
    }
    void initializeMap();
  }, [apiKey, initializeMap, isVisible]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || mapStatus !== 'ready') {
      return;
    }

    let cancelled = false;

    const run = async () => {
      const places = await fetchPlaces(activeCategory);
      if (!cancelled) {
        await renderPlaceMarkers(map, places);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [activeCategory, fetchPlaces, mapStatus, renderPlaceMarkers]);

  useEffect(() => {
    return () => {
      clearPlaceMarkers();
      if (communityMarkerRef.current) {
        if ('map' in communityMarkerRef.current) {
          communityMarkerRef.current.map = null;
        } else {
          communityMarkerRef.current.setMap(null);
        }
      }
      mapInstanceRef.current = null;
    };
  }, [clearPlaceMarkers]);

  const useInteractiveMap = Boolean(apiKey) && mapStatus !== 'error';
  const embedUrl = buildEmbedUrl(
    EMERSON_ESTATES.center.lat,
    EMERSON_ESTATES.center.lng,
  );

  return (
    <div className={styles.wrapper} ref={shellRef}>
      <div
        className={styles.filters}
        role="tablist"
        aria-label="Filter nearby amenities on the map"
      >
        {AMENITY_CATEGORIES.map((category) => {
          const isActive = category.id === activeCategory;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={category.ariaLabel}
              className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {!apiKey ? (
        <p className={styles.statusMessage}>
          Interactive map loads when{' '}
          <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> is configured. Showing
          map preview and curated nearby places below.
        </p>
      ) : null}

      {apiKey && mapStatus === 'loading' ? (
        <p className={styles.statusMessage}>Loading map…</p>
      ) : null}

      <div className={styles.mapShell} aria-label="Map of nearby amenities">
        {useInteractiveMap ? (
          <div
            ref={mapContainerRef}
            className={styles.mapCanvas}
            role="application"
            aria-label="Interactive Google Map"
          />
        ) : (
          <iframe
            title={`Map centered on ${EMERSON_ESTATES.name}, ${EMERSON_ESTATES.city}`}
            className={styles.fallbackEmbed}
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>

      {showStaticList ? (
        <StaticAmenityList
          categoryId={activeCategory}
          title={staticListTitle}
        />
      ) : null}
    </div>
  );
}
