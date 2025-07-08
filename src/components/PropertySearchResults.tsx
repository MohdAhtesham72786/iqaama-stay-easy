
import React, { useState, useEffect } from 'react';
import { MapPin, Bed, Bath, Square, Heart, MessageCircle, Phone, Filter, Navigation, MapIcon, Star, Car, Wifi, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import GoogleMapComponent from './GoogleMapComponent';
import PropertyDetailsModal from './PropertyDetailsModal';

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

interface SearchCriteria {
  location: string;
  propertyType: string;
  emirate: string;
  priceRange: string;
  bedrooms: string;
  availability: string;
  nearMetro: string;
  nearMall: string;
  nearBeach: string;
}

const PropertySearchResults = ({ searchCriteria }: { searchCriteria: SearchCriteria }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Extended property data based on Dubai Marina search
  const allProperties: Property[] = [
    {
      id: 1,
      title: "Luxury 1BR Apartment in Dubai Marina with Sea View",
      location: "Dubai Marina",
      coordinates: { lat: 25.0772, lng: 55.1392 },
      price: "AED 8,500",
      period: "/month",
      type: "apartment",
      beds: 1,
      baths: 1,
      area: "750 sq ft",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Furnished", "Sea View", "Balcony", "Gym Access", "Pool", "Parking"],
      verified: true,
      contact: "+971 50 123 4567",
      nearbyPlaces: ["Marina Mall - 300m", "Metro Station - 500m", "Beach - 100m", "Restaurants - 200m"],
      description: "Stunning 1-bedroom apartment with panoramic sea views in the heart of Dubai Marina. Fully furnished with modern amenities and premium finishes.",
      landlord: {
        name: "Ahmed Al Mansouri",
        phone: "+971 50 123 4567",
        whatsapp: "+971 50 123 4567",
        rating: 4.8
      },
      amenities: ["24/7 Security", "Concierge", "Valet Parking", "Housekeeping", "High-Speed Internet"],
      availability: "Available Now",
      emirate: "dubai"
    },
    {
      id: 2,
      title: "Modern 2BR Villa in Arabian Ranches with Garden",
      location: "Arabian Ranches",
      coordinates: { lat: 25.0512, lng: 55.2601 },
      price: "AED 12,000",
      period: "/month",
      type: "villa",
      beds: 2,
      baths: 2,
      area: "1,800 sq ft",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Garden", "Private Parking", "Community Pool", "Pet Friendly"],
      verified: true,
      contact: "+971 50 987 6543",
      nearbyPlaces: ["Arabian Center - 1.5km", "Golf Course - 800m", "School - 1km"],
      description: "Beautiful 2-bedroom villa with private garden in a family-friendly community.",
      landlord: {
        name: "Sarah Johnson",
        phone: "+971 50 987 6543",
        whatsapp: "+971 50 987 6543",
        rating: 4.6
      },
      amenities: ["Community Gym", "Children's Play Area", "BBQ Area", "Tennis Court"],
      availability: "Available from Aug 15",
      emirate: "dubai"
    },
    {
      id: 3,
      title: "Affordable Bedspace in Deira - Near Metro",
      location: "Deira",
      coordinates: { lat: 25.2731, lng: 55.3414 },
      price: "AED 850",
      period: "/month",
      type: "bedspace",
      beds: "Shared",
      baths: "Shared",
      area: "Bed + Storage",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["WiFi Included", "AC", "Near Metro", "24/7 Security", "Utilities Included"],
      verified: true,
      contact: "+971 50 456 7890",
      nearbyPlaces: ["Deira City Centre - 800m", "Metro Station - 200m", "Gold Souk - 1km"],
      description: "Clean and comfortable bedspace in a well-maintained building with all utilities included.",
      landlord: {
        name: "Mohammed Ali",
        phone: "+971 50 456 7890",
        whatsapp: "+971 50 456 7890",
        rating: 4.3
      },
      amenities: ["Shared Kitchen", "Laundry", "Common Area", "Storage"],
      availability: "Available Now",
      emirate: "dubai"
    },
    {
      id: 4,
      title: "Executive Office Space in Business Bay",
      location: "Business Bay",
      coordinates: { lat: 25.1916, lng: 55.2650 },
      price: "AED 8,000",
      period: "/month",
      type: "commercial",
      beds: "Office",
      baths: 1,
      area: "800 sq ft",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Furnished", "Meeting Room", "Reception Area", "Parking", "High Floor"],
      verified: true,
      contact: "+971 50 234 5678",
      nearbyPlaces: ["Metro Station - 400m", "Restaurants - 100m", "Banks - 200m"],
      description: "Premium office space with stunning city views, perfect for small businesses and startups.",
      landlord: {
        name: "Corporate Properties LLC",
        phone: "+971 50 234 5678",
        whatsapp: "+971 50 234 5678",
        rating: 4.7
      },
      amenities: ["High-Speed Internet", "24/7 Security", "Cleaning Service", "Business Center"],
      availability: "Available Now",
      emirate: "dubai"
    }
  ];

  useEffect(() => {
    // Filter properties based on search criteria
    let filteredProperties = allProperties.filter(property => {
      // Location filter
      if (searchCriteria.location && !property.location.toLowerCase().includes(searchCriteria.location.toLowerCase())) {
        return false;
      }
      
      // Property type filter
      if (searchCriteria.propertyType && property.type !== searchCriteria.propertyType) {
        return false;
      }
      
      // Emirate filter
      if (searchCriteria.emirate && searchCriteria.emirate !== 'all' && property.emirate !== searchCriteria.emirate) {
        return false;
      }
      
      // Price range filter
      if (searchCriteria.priceRange && searchCriteria.priceRange !== '') {
        const propertyPrice = parseInt(property.price.replace(/\D/g, ''));
        const [min, max] = searchCriteria.priceRange.split('-').map(p => parseInt(p.replace(/\D/g, '')));
        if (propertyPrice < min || (max && propertyPrice > max)) {
          return false;
        }
      }
      
      return true;
    });

    // Add distance calculation if location is provided
    if (searchCriteria.location) {
      // Mock distance calculation - in real app, use actual coordinates
      filteredProperties = filteredProperties.map(property => ({
        ...property,
        distance: Math.random() * 5 + 0.5 // Random distance between 0.5-5.5 km
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    setProperties(filteredProperties);
  }, [searchCriteria]);

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results for "{searchCriteria.location || 'All Locations'}"
          </h1>
          <p className="text-gray-600">
            Found {properties.length} properties matching your criteria
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
              size="sm"
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              size="sm"
            >
              List
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              onClick={() => setViewMode('map')}
              size="sm"
            >
              <MapIcon className="h-4 w-4 mr-1" />
              Map
            </Button>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="mb-8">
            <GoogleMapComponent 
              properties={properties} 
              onPropertySelect={handleViewDetails}
            />
          </div>
        )}

        {/* Property Grid/List */}
        {viewMode !== 'map' && (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {properties.map((property) => (
              <Card key={property.id} className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
                <div className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                  <img
                    src={property.image}
                    alt={property.title}
                    className={`object-cover ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-blue-800 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </span>
                    {property.distance && (
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                        {property.distance.toFixed(1)}km away
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {property.verified && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </span>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`bg-white/80 hover:bg-white transition-colors ${
                        favorites.has(property.id) ? 'text-red-500' : 'text-gray-600'
                      }`}
                      onClick={() => toggleFavorite(property.id)}
                    >
                      <Heart className={`h-4 w-4 ${favorites.has(property.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>

                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-800 cursor-pointer transition-colors">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                    <span className="text-sm">{property.location}</span>
                    {property.distance && (
                      <>
                        <Navigation className="h-3 w-3 ml-2 mr-1" />
                        <span className="text-xs">{property.distance.toFixed(1)}km</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-blue-800">
                      {property.price}
                      <span className="text-sm font-normal text-gray-600">{property.period}</span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm ml-1">{property.landlord.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.beds}
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.baths}
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.area}
                    </div>
                  </div>

                  {/* Nearby Places */}
                  <div className="mb-4">
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Nearby:</h5>
                    <div className="text-xs text-gray-600 space-y-1">
                      {property.nearbyPlaces.slice(0, 2).map((place, index) => (
                        <div key={index} className="flex items-center">
                          <Navigation className="h-3 w-3 mr-1" />
                          {place}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 3 && (
                      <span className="text-xs text-gray-500">+{property.features.length - 3} more</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{property.availability}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-blue-800 hover:bg-blue-900"
                      onClick={() => handleViewDetails(property)}
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
            ))}
          </div>
        )}

        {/* No Results */}
        {properties.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-600">Try adjusting your search criteria to find more properties.</p>
          </div>
        )}
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedProperty(null);
          }}
        />
      )}
    </div>
  );
};

export default PropertySearchResults;
