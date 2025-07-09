
import React from 'react';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

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

interface MapInfoCardProps {
  property: Property;
  onPropertySelect: (property: Property) => void;
}

const MapInfoCard = ({ property, onPropertySelect }: MapInfoCardProps) => {
  return (
    <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-80 z-30 shadow-xl">
      <div className="p-4">
        <div className="flex gap-3">
          <img
            src={property.image}
            alt={property.title}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1 line-clamp-2">
              {property.title}
            </h4>
            <div className="flex items-center text-gray-600 mb-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="text-xs">{property.location}</span>
            </div>
            <div className="text-blue-800 font-bold">
              {property.price}
              <span className="text-xs font-normal text-gray-600">{property.period}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Button 
            size="sm" 
            className="flex-1 bg-blue-800 hover:bg-blue-900"
            onClick={() => onPropertySelect(property)}
          >
            View Details
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(`https://wa.me/${property.landlord.whatsapp}`, '_blank')}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(`tel:${property.landlord.phone}`, '_self')}
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MapInfoCard;
