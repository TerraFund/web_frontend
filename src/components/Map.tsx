'use client';

import { useEffect, useRef } from 'react';

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    title: string;
    onClick?: () => void;
  }>;
}

export default function Map({ center = [-1.2864, 36.8172], zoom = 10, markers = [] }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock map implementation - in real app would use Mapbox GL JS
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div style="width: 100%; height: 400px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
          <div style="text-align: center;">
            <div style="font-size: 48px; color: #0B6E4F;">🗺️</div>
            <p style="color: #666; margin-top: 10px;">Interactive Map</p>
            <p style="color: #999; font-size: 14px;">Center: ${center[0]}, ${center[1]} | Zoom: ${zoom}</p>
            <p style="color: #999; font-size: 14px;">Markers: ${markers.length}</p>
          </div>
        </div>
      `;
    }
  }, [center, zoom, markers]);

  return <div ref={mapRef} className="w-full h-96 rounded-lg overflow-hidden" />;
}