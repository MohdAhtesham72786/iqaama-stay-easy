
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Phone, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

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
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Default center to Dubai Marina
  const defaultCenter = center || { lat: 25.0772, lng: 55.1392 };

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsLoaded(true);
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWTgHz8KD0x5Y&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
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
    if (!isLoaded || !mapRef.current) return;

    try {
      // Initialize map
      const map = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
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
      console.log('Google Map initialized successfully');
    } catch (error) {
      console.error('Error initializing Google Map:', error);
    }
  }, [isLoaded, defaultCenter]);

  // Update markers when properties change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    console.log('Adding markers for properties:', properties);

    // Add markers for each property
    properties.forEach((property, index) => {
      try {
        const marker = new google.maps.Marker({
          position: property.coordinates,
          map: mapInstanceRef.current,
          title: property.title,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M20 0C8.95 0 0 8.95 0 20c0 15 20 30 20 30s20-15 20-30C40 8.95 31.05 0 20 0z" fill="#1e40af"/>
                  <circle cx="20" cy="20" r="8" fill="white"/>
                  <text x="20" y="25" text-anchor="middle" fill="#1e40af" font-size="10" font-weight="bold">${property.price.replace('AED ', '').split(',')[0]}</text>
                </g>
              </svg>
            `),
            scaledSize: new google.maps.Size(40, 50),
            anchor: new google.maps.Point(20, 50)
          }
        });

        // Add click listener
        marker.addListener('click', () => {
          setSelectedProperty(property);
          mapInstanceRef.current?.panTo(property.coordinates);
        });

        markersRef.current.push(marker);
      } catch (error) {
        console.error('Error creating marker for property:', property.id, error);
      }
    });

    // Adjust map bounds to show all markers
    if (properties.length > 0 && mapInstanceRef.current) {
      const bounds = new google.maps.LatLngBounds();
      properties.forEach(property => {
        bounds.extend(property.coordinates);
      });
      
      if (properties.length === 1) {
        mapInstanceRef.current.setCenter(properties[0].coordinates);
        mapInstanceRef.current.setZoom(15);
      } else {
        mapInstanceRef.current.fitBounds(bounds);
      }
    }
  }, [properties, isLoaded]);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(property.coordinates);
    }
  };

  if (!isLoaded) {
    return (
      <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
      {/* Google Map Container */}
      <div ref={mapRef} className="absolute inset-0" />

      {/* Map Info */}
      <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-2 rounded text-xs z-10">
        <div className="flex items-center gap-2">
          <Navigation className="h-3 w-3" />
          <span>{properties.length} properties in this area</span>
        </div>
      </div>

      {/* Selected Property Info Card */}
      {selectedProperty && (
        <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-80 z-30 shadow-xl">
          <div className="p-4">
            <div className="flex gap-3">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                  {selectedProperty.title}
                </h4>
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="text-xs">{selectedProperty.location}</span>
                </div>
                <div className="text-blue-800 font-bold">
                  {selectedProperty.price}
                  <span className="text-xs font-normal text-gray-600">{selectedProperty.period}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button 
                size="sm" 
                className="flex-1 bg-blue-800 hover:bg-blue-900"
                onClick={() => onPropertySelect(selectedProperty)}
              >
                View Details
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`https://wa.me/${selectedProperty.landlord.whatsapp}`, '_blank')}
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`tel:${selectedProperty.landlord.phone}`, '_self')}
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default GoogleMapComponent;
