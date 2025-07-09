
import React, { useEffect, useRef, useState } from 'react';
import { createPropertyMarker } from './map/PropertyMarker';
import MapInfoCard from './map/MapInfoCard';
import MapLoadingSpinner from './map/MapLoadingSpinner';
import MapControls from './map/MapControls';

interface Property {
  id: number;
  title: string;
  location: string;
  coordinates: { lat: number; lng: number };
  price: string;
  period: string;
  type: string;
  beds: number | string;
  baths: number | string;
  area: string;
  image: string;
  distance?: number;
  landlord: {
    name: string;
    phone: string;
    whatsapp: string;
    rating: number;
  };
}

interface GoogleMapComponentProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  center?: { lat: number; lng: number };
}

const GoogleMapComponent = ({ properties, onPropertySelect, center }: GoogleMapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Default center to Dubai Marina
  const defaultCenter = center || { lat: 25.0772, lng: 55.1392 };

  console.log('GoogleMapComponent - Received properties:', properties);
  console.log('GoogleMapComponent - Center:', center || defaultCenter);

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        console.log('Google Maps API already loaded');
        setIsLoaded(true);
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWTgHz8KD0x5Y&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps API loaded successfully');
        setIsLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setIsLoaded(false);
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return;

    try {
      // Initialize map
      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 10,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'poi.medical',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      mapInstanceRef.current = map;
      console.log('Google Map initialized successfully with center:', defaultCenter);
    } catch (error) {
      console.error('Error initializing Google Map:', error);
    }
  }, [isLoaded, defaultCenter]);

  // Update markers when properties change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded || !window.google) {
      console.log('Map not ready for markers:', { 
        mapInstance: !!mapInstanceRef.current, 
        isLoaded, 
        googleMaps: !!window.google 
      });
      return;
    }

    // Clear existing markers
    console.log('Clearing existing markers:', markersRef.current.length);
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    console.log('Adding markers for properties:', properties.length);

    if (properties.length === 0) {
      console.log('No properties to display on map');
      return;
    }

    // Add markers for each property
    properties.forEach((property) => {
      const marker = createPropertyMarker({
        property,
        map: mapInstanceRef.current,
        onMarkerClick: handleMarkerClick
      });

      if (marker) {
        markersRef.current.push(marker);
      }
    });

    // Adjust map bounds to show all markers
    if (properties.length > 0 && mapInstanceRef.current && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      properties.forEach(property => {
        bounds.extend(property.coordinates);
      });
      
      if (properties.length === 1) {
        mapInstanceRef.current.setCenter(properties[0].coordinates);
        mapInstanceRef.current.setZoom(15);
      } else {
        mapInstanceRef.current.fitBounds(bounds);
        // Add some padding to the bounds
        setTimeout(() => {
          if (mapInstanceRef.current) {
            const currentZoom = mapInstanceRef.current.getZoom();
            if (currentZoom > 15) {
              mapInstanceRef.current.setZoom(15);
            }
          }
        }, 100);
      }
      console.log('Map bounds adjusted for', properties.length, 'properties');
    }
  }, [properties, isLoaded]);

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(property.coordinates);
    }
  };

  if (!isLoaded) {
    return <MapLoadingSpinner />;
  }

  return (
    <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
      {/* Google Map Container */}
      <div ref={mapRef} className="absolute inset-0" />

      {/* Map Controls */}
      <MapControls propertyCount={properties.length} />

      {/* Selected Property Info Card */}
      {selectedProperty && (
        <MapInfoCard 
          property={selectedProperty}
          onPropertySelect={onPropertySelect}
        />
      )}
    </div>
  );
};

export default GoogleMapComponent;
