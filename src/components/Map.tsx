'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    title: string;
    description?: string;
    onClick?: () => void;
  }>;
  interactive?: boolean;
  className?: string;
}

export default function Map({
  center = [-1.2864, 36.8172],
  zoom = 10,
  markers = [],
  interactive = true,
  className = ""
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!token) {
      console.warn('Mapbox token not found. Please set NEXT_PUBLIC_MAPBOX_TOKEN in your environment variables.');
      return;
    }

    if (!mapRef.current || mapInstanceRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: center,
      zoom: zoom,
      interactive: interactive,
    });

    mapInstanceRef.current = map;

    map.on('load', () => {
      setIsLoaded(true);

      // Add markers
      markers.forEach((marker) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = '100%';
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-semibold text-gray-900">${marker.title}</h3>
              ${marker.description ? `<p class="text-sm text-gray-600 mt-1">${marker.description}</p>` : ''}
            </div>
          `);

        new mapboxgl.Marker(el)
          .setLngLat(marker.position)
          .setPopup(popup)
          .addTo(map);

        if (marker.onClick) {
          el.addEventListener('click', marker.onClick);
        }
      });

      // Add navigation controls if interactive
      if (interactive) {
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, markers, interactive]);

  // Update markers when they change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // Clear existing markers (simplified - in production you'd track them)
    const map = mapInstanceRef.current;

    // This is a simplified approach - in production you'd manage marker instances
    markers.forEach((marker) => {
      const existingMarker = document.querySelector(`[data-marker-id="${marker.id}"]`);
      if (!existingMarker) {
        const el = document.createElement('div');
        el.setAttribute('data-marker-id', marker.id);
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = '100%';
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-semibold text-gray-900">${marker.title}</h3>
              ${marker.description ? `<p class="text-sm text-gray-600 mt-1">${marker.description}</p>` : ''}
            </div>
          `);

        new mapboxgl.Marker(el)
          .setLngLat(marker.position)
          .setPopup(popup)
          .addTo(map);

        if (marker.onClick) {
          el.addEventListener('click', marker.onClick);
        }
      }
    });
  }, [markers, isLoaded]);

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (
      <div className={`w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">Interactive Map</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Mapbox token required for full functionality
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`w-full h-96 rounded-lg overflow-hidden ${className}`}
      style={{ position: 'relative' }}
    />
  );
}