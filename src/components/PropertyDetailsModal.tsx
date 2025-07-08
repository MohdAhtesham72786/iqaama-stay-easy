
import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Square, Star, Phone, MessageCircle, Heart, Car, Wifi, Shield, Clock, CheckCircle, Navigation } from 'lucide-react';
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
  images: string[];
  features: string[];
  verified: boolean;
  contact: string;
  nearbyPlaces: string[];
  distance?: number;
  description: string;
  landlord: {
    name: string;
    phone: string;
    whatsapp: string;
    rating: number;
  };
  amenities: string[];
  availability: string;
  emirate: string;
}

interface PropertyDetailsModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailsModal = ({ property, isOpen, onClose }: PropertyDetailsModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen) return null;

  const handleContact = (method: 'phone' | 'whatsapp') => {
    if (method === 'phone') {
      window.open(`tel:${property.landlord.phone}`, '_self');
    } else {
      window.open(`https://wa.me/${property.landlord.whatsapp}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Property Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                {property.verified && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`bg-white/80 hover:bg-white ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
            
            {/* Image Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title and Price */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-blue-800">
                    {property.price}
                    <span className="text-lg font-normal text-gray-600">{property.period}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="ml-1 font-medium">{property.landlord.rating}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{property.location}</span>
                  {property.distance && (
                    <>
                      <Navigation className="h-4 w-4 ml-3 mr-1" />
                      <span className="text-sm">{property.distance.toFixed(1)}km away</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    <span>{property.beds} {property.beds === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2" />
                    <span>{property.baths} {property.baths === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2" />
                    <span>{property.area}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Places */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Nearby Places</h3>
                <div className="space-y-2">
                  {property.nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <Navigation className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">{place}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Card */}
              <Card className="p-4 mb-6">
                <h3 className="font-semibold mb-3">Contact Landlord</h3>
                <div className="mb-4">
                  <div className="font-medium">{property.landlord.name}</div>
                  <div className="text-sm text-gray-600">{property.landlord.phone}</div>
                  <div className="flex items-center text-yellow-500 text-sm mt-1">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    {property.landlord.rating} rating
                  </div>
                </div>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleContact('whatsapp')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleContact('phone')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </Card>

              {/* Availability */}
              <Card className="p-4 mb-6">
                <h3 className="font-semibold mb-3">Availability</h3>
                <div className="flex items-center text-green-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{property.availability}</span>
                </div>
              </Card>

              {/* Quick Facts */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Quick Facts</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium">{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emirate:</span>
                    <span className="font-medium">{property.emirate.charAt(0).toUpperCase() + property.emirate.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area:</span>
                    <span className="font-medium">{property.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verified:</span>
                    <span className="font-medium text-green-600">
                      {property.verified ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
