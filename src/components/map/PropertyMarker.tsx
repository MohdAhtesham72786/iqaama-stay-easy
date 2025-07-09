
import React from 'react';

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

interface PropertyMarkerProps {
  property: Property;
  map: any;
  onMarkerClick: (property: Property) => void;
}

export const createPropertyMarker = ({ property, map, onMarkerClick }: PropertyMarkerProps) => {
  if (!window.google || !map) return null;

  try {
    console.log(`Creating marker for property ${property.id}:`, property.title, property.coordinates);
    
    const marker = new window.google.maps.Marker({
      position: property.coordinates,
      map: map,
      title: property.title,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M20 0C8.95 0 0 8.95 0 20c0 15 20 30 20 30s20-15 20-30C40 8.95 31.05 0 20 0z" fill="#1e40af"/>
              <circle cx="20" cy="20" r="8" fill="white"/>
              <text x="20" y="25" text-anchor="middle" fill="#1e40af" font-size="8" font-weight="bold">${property.price.split(' ')[1] || 'N/A'}</text>
            </g>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 50),
        anchor: new window.google.maps.Point(20, 50)
      }
    });

    // Add click listener
    marker.addListener('click', () => {
      console.log('Marker clicked for property:', property.title);
      onMarkerClick(property);
    });

    console.log(`Marker created successfully for property ${property.id}`);
    return marker;
  } catch (error) {
    console.error('Error creating marker for property:', property.id, error);
    return null;
  }
};
