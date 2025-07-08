
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
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Default center to Dubai Marina
  const defaultCenter = center || { lat: 25.0772, lng: 55.1392 };

  // Mock Google Map implementation
  useEffect(() => {
    console.log('Map initialized with properties:', properties);
  }, [properties]);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
      {/* Mock Map Background */}
      <div 
        ref={mapRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Button variant="outline" size="sm" className="bg-white shadow">
            +
          </Button>
          <Button variant="outline" size="sm" className="bg-white shadow">
            -
          </Button>
        </div>

        {/* Property Markers */}
        <div className="absolute inset-0">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `${30 + (index * 15) % 60}%`,
                top: `${40 + (index * 10) % 40}%`
              }}
              onClick={() => handlePropertyClick(property)}
            >
              <div className={`relative ${selectedProperty?.id === property.id ? 'scale-110' : ''} transition-transform`}>
                <div className="bg-blue-800 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg hover:bg-blue-900 transition-colors">
                  {property.price.replace('AED ', '')}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-800"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <MapPin className="h-6 w-6 text-red-500" />
        </div>

        {/* Map Labels */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded text-sm font-medium">
            Dubai Marina
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 px-2 py-1 rounded text-sm font-medium">
            Downtown Dubai
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

        {/* Map Info */}
        <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-2 rounded text-xs">
          <div className="flex items-center gap-2">
            <Navigation className="h-3 w-3" />
            <span>{properties.length} properties in this area</span>
          </div>
        </div>
      </div>

      {/* Map Notice */}
      <div className="absolute top-4 left-4 bg-blue-50 text-blue-800 px-3 py-2 rounded text-xs z-10">
        🗺️ Interactive map with real Google Maps coming soon
      </div>
    </div>
  );
};

export default GoogleMapComponent;
