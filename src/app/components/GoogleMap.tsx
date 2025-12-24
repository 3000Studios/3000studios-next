/**
 * Google Maps Component
 * Interactive map showing business location in Atlanta, Georgia
 */

'use client';

import { useEffect, useRef } from 'react';

<<<<<<< HEAD
// Declare global google types
declare global {
  interface Window {
    google: any;
=======
// Type declaration for Google Maps API
declare global {
  interface Window {
    google?: typeof google;
  }
  namespace google {
    namespace maps {
      enum MapTypeControlStyle {
        DEFAULT,
        HORIZONTAL_BAR,
        DROPDOWN_MENU
      }
      enum ControlPosition {
        TOP_LEFT,
        TOP_CENTER,
        TOP_RIGHT,
        LEFT_TOP,
        LEFT_CENTER,
        LEFT_BOTTOM,
        RIGHT_TOP,
        RIGHT_CENTER,
        RIGHT_BOTTOM,
        BOTTOM_LEFT,
        BOTTOM_CENTER,
        BOTTOM_RIGHT
      }
      enum Animation {
        BOUNCE = 1,
        DROP = 2
      }
      enum SymbolPath {
        CIRCLE,
        FORWARD_CLOSED_ARROW,
        FORWARD_OPEN_ARROW,
        BACKWARD_CLOSED_ARROW,
        BACKWARD_OPEN_ARROW
      }
      interface MapOptions {
        center: { lat: number; lng: number };
        zoom: number;
        mapTypeId?: string;
        styles?: object[];
        mapTypeControl?: boolean;
        mapTypeControlOptions?: object;
        zoomControl?: boolean;
        streetViewControl?: boolean;
        fullscreenControl?: boolean;
      }
      interface MarkerOptions {
        position: { lat: number; lng: number };
        map: Map;
        title?: string;
        animation?: Animation;
        icon?: object;
      }
      class Map {
        constructor(mapDiv: Element | null, opts?: MapOptions);
      }
      class Marker {
        constructor(opts?: MarkerOptions);
        addListener(eventName: string, handler: () => void): void;
      }
      class InfoWindow {
        constructor(opts?: { content: string });
        open(map: Map, marker: Marker): void;
      }
      namespace event {
        function clearInstanceListeners(instance: object): void;
      }
    }
>>>>>>> origin/copilot/update-best-options
  }
}

<<<<<<< HEAD
=======
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
interface GoogleMapProps {
  apiKey: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
}

export default function GoogleMap({ 
  apiKey, 
  center = { lat: 33.7490, lng: -84.3880 }, // Atlanta, Georgia
  zoom = 12,
  mapType = 'satellite'
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
      console.error('Google Maps API key not configured');
      return;
    }

    const loadGoogleMaps = () => {
      if (typeof window !== 'undefined' && (window as any).google) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      script.onerror = () => console.error('Failed to load Google Maps');
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      const mapOptions: google.maps.MapOptions = {
        center,
        zoom,
        mapTypeId: mapType,
        styles: [
          {
            featureType: 'all',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ],
        mapTypeControl: true,
        mapTypeControlOptions: {
<<<<<<< HEAD
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.TOP_RIGHT,
<<<<<<< HEAD
<<<<<<< HEAD
=======
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT,
>>>>>>> origin/copilot/resolve-git-conflicts
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
=======
=======
          style: ((window as any).google).maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: ((window as any).google).maps.ControlPosition.TOP_RIGHT,
>>>>>>> origin/copilot/prepare-production-readiness
>>>>>>> origin/copilot/update-main-with-all-branches
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
        },
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      };

<<<<<<< HEAD
      const map = new google.maps.Map(mapRef.current, mapOptions);
=======
<<<<<<< HEAD
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
>>>>>>> origin/copilot/update-main-with-all-branches
      mapInstanceRef.current = map;

      // Add marker for location
      new google.maps.Marker({
        position: center,
        map,
        title: '3000 Studios - Atlanta, Georgia',
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/copilot/resolve-merge-conflicts-and-deploy
        animation: window.google.maps.Animation.DROP,
=======
        animation: google.maps.Animation.DROP,
>>>>>>> origin/copilot/resolve-git-conflicts
        icon: {
<<<<<<< HEAD
          path: google.maps.SymbolPath.CIRCLE,
=======
          path: window.google.maps.SymbolPath.CIRCLE,
=======
      const map = new ((window as any).google).maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      // Add marker for location
      new ((window as any).google).maps.Marker({
        position: center,
        map,
        title: '3000 Studios - Atlanta, Georgia',
        animation: ((window as any).google).maps.Animation.DROP,
        icon: {
          path: ((window as any).google).maps.SymbolPath.CIRCLE,
>>>>>>> origin/copilot/prepare-production-readiness
>>>>>>> origin/copilot/update-main-with-all-branches
          scale: 10,
          fillColor: '#FFD700',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#FFFFFF'
        }
      });

      // Add info window
<<<<<<< HEAD
      const infoWindow = new google.maps.InfoWindow({
=======
<<<<<<< HEAD
      const infoWindow = new window.google.maps.InfoWindow({
=======
      const infoWindow = new ((window as any).google).maps.InfoWindow({
>>>>>>> origin/copilot/prepare-production-readiness
>>>>>>> origin/copilot/update-main-with-all-branches
        content: `
          <div style="padding: 10px; color: #000;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #000;">3000 Studios</h3>
            <p style="margin: 0; color: #666;">Atlanta, Georgia</p>
            <p style="margin: 4px 0 0 0; color: #666;">Serving clients worldwide</p>
          </div>
        `,
      });

<<<<<<< HEAD
      const marker = new google.maps.Marker({
=======
<<<<<<< HEAD
      const marker = new window.google.maps.Marker({
=======
      const marker = new ((window as any).google).maps.Marker({
>>>>>>> origin/copilot/prepare-production-readiness
>>>>>>> origin/copilot/update-main-with-all-branches
        position: center,
        map,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
<<<<<<< HEAD
      if (mapInstanceRef.current) {
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
=======
<<<<<<< HEAD
      if (mapInstanceRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(mapInstanceRef.current);
=======
      if (mapInstanceRef.current) {
        ((window as any).google).maps.event.clearInstanceListeners(mapInstanceRef.current);
>>>>>>> origin/copilot/prepare-production-readiness
>>>>>>> origin/copilot/update-main-with-all-branches
      }
    };
  }, [apiKey, center, zoom, mapType]);

  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,215,0,0.1)_0%,_transparent_50%)]"></div>
        <div className="text-center relative z-10 p-8">
          <div className="text-gold text-6xl mb-4">🗺️</div>
          <p className="text-gray-400 font-semibold text-lg mb-2">Google Maps API Key Required</p>
          <p className="text-gray-600 text-sm">Please add your NEXT_PUBLIC_MAPS_API key to .env.local</p>
          <p className="text-gray-700 text-xs mt-4">Location: Atlanta, Georgia</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
