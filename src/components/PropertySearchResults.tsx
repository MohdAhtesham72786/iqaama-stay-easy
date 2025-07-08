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
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 25.0772, lng: 55.1392 });

  // Extended property data for different locations
  const allProperties: Property[] = [
    // Dubai Marina Properties
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
      title: "Premium 3BR Apartment in Dubai Marina Tower",
      location: "Dubai Marina",
      coordinates: { lat: 25.0785, lng: 55.1401 },
      price: "AED 12,000",
      period: "/month",
      type: "apartment",
      beds: 3,
      baths: 2,
      area: "1,400 sq ft",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Furnished", "Marina View", "Balcony", "Gym", "Pool", "Parking"],
      verified: true,
      contact: "+971 50 234 5678",
      nearbyPlaces: ["Marina Walk - 200m", "Metro Station - 400m", "Beach - 150m"],
      description: "Spacious 3-bedroom apartment with stunning marina views and modern amenities.",
      landlord: {
        name: "Sarah Johnson",
        phone: "+971 50 234 5678",
        whatsapp: "+971 50 234 5678",
        rating: 4.7
      },
      amenities: ["24/7 Security", "Gym", "Pool", "Parking"],
      availability: "Available from Aug 15",
      emirate: "dubai"
    },
    {
      id: 3,
      title: "Modern 2BR Apartment in Dubai Marina with Parking",
      location: "Dubai Marina",
      coordinates: { lat: 25.0765, lng: 55.1385 },
      price: "AED 9,500",
      period: "/month",
      type: "apartment",
      beds: 2,
      baths: 2,
      area: "1,100 sq ft",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Semi-Furnished", "City View", "Balcony", "Gym", "Pool"],
      verified: true,
      contact: "+971 50 345 6789",
      nearbyPlaces: ["Marina Mall - 400m", "Metro Station - 300m", "Beach - 200m"],
      description: "Beautiful 2-bedroom apartment with city views and excellent amenities.",
      landlord: {
        name: "Mohammed Ali",
        phone: "+971 50 345 6789",
        whatsapp: "+971 50 345 6789",
        rating: 4.5
      },
      amenities: ["Security", "Gym", "Pool", "Parking"],
      availability: "Available Now",
      emirate: "dubai"
    },
    // Abu Dhabi Properties
    {
      id: 4,
      title: "Elegant 3BR Villa in Abu Dhabi with Garden",
      location: "Abu Dhabi",
      coordinates: { lat: 24.4539, lng: 54.3773 },
      price: "AED 15,000",
      period: "/month",
      type: "villa",
      beds: 3,
      baths: 3,
      area: "2,200 sq ft",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Garden", "Private Parking", "Maid Room", "Storage"],
      verified: true,
      contact: "+971 50 456 7890",
      nearbyPlaces: ["Mall - 1.5km", "School - 800m", "Hospital - 2km"],
      description: "Spacious 3-bedroom villa with private garden in a quiet neighborhood.",
      landlord: {
        name: "Fatima Al Zahra",
        phone: "+971 50 456 7890",
        whatsapp: "+971 50 456 7890",
        rating: 4.6
      },
      amenities: ["Garden", "Parking", "Storage", "Security"],
      availability: "Available Now",
      emirate: "abu-dhabi"
    },
    {
      id: 5,
      title: "Luxury 2BR Apartment in Abu Dhabi Corniche",
      location: "Abu Dhabi",
      coordinates: { lat: 24.4795, lng: 54.3570 },
      price: "AED 11,000",
      period: "/month",
      type: "apartment",
      beds: 2,
      baths: 2,
      area: "1,300 sq ft",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Sea View", "Furnished", "Gym", "Pool", "Parking"],
      verified: true,
      contact: "+971 50 567 8901",
      nearbyPlaces: ["Corniche - 100m", "Mall - 800m", "Marina - 500m"],
      description: "Beautiful apartment with sea views on Abu Dhabi Corniche.",
      landlord: {
        name: "Omar Hassan",
        phone: "+971 50 567 8901",
        whatsapp: "+971 50 567 8901",
        rating: 4.8
      },
      amenities: ["Sea View", "Gym", "Pool", "Parking", "Security"],
      availability: "Available from July 15",
      emirate: "abu-dhabi"
    },
    // Ajman Properties
    {
      id: 6,
      title: "Affordable 1BR Apartment in Ajman",
      location: "Ajman",
      coordinates: { lat: 25.4052, lng: 55.5136 },
      price: "AED 3,500",
      period: "/month",
      type: "apartment",
      beds: 1,
      baths: 1,
      area: "650 sq ft",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Semi-Furnished", "Parking", "Near Beach"],
      verified: true,
      contact: "+971 50 678 9012",
      nearbyPlaces: ["Beach - 500m", "Mall - 1km", "Hospital - 1.5km"],
      description: "Comfortable 1-bedroom apartment near Ajman beach.",
      landlord: {
        name: "Ali Mahmoud",
        phone: "+971 50 678 9012",
        whatsapp: "+971 50 678 9012",
        rating: 4.3
      },
      amenities: ["Parking", "Security", "Near Beach"],
      availability: "Available Now",
      emirate: "ajman"
    }
  ];

  useEffect(() => {
    console.log('Filtering properties with criteria:', searchCriteria);
    
    // Filter properties based on search criteria
    let filteredProperties = allProperties.filter(property => {
      // Location filter - check if property location contains search location
      if (searchCriteria.location) {
        const searchLocation = searchCriteria.location.toLowerCase();
        const propertyLocation = property.location.toLowerCase();
        if (!propertyLocation.includes(searchLocation) && searchLocation !== 'all locations') {
          return false;
        }
      }
      
      // Property type filter
      if (searchCriteria.propertyType && searchCriteria.propertyType !== 'all' && property.type !== searchCriteria.propertyType) {
        return false;
      }
      
      // Emirate filter - but allow properties from the location's emirate
      if (searchCriteria.emirate && searchCriteria.emirate !== 'all') {
        // If searching Dubai Marina but emirate is abu-dhabi, still show Dubai Marina properties
        if (searchCriteria.location.toLowerCase().includes('dubai marina')) {
          // Keep Dubai Marina properties regardless of emirate filter
        } else if (property.emirate !== searchCriteria.emirate) {
          return false;
        }
      }
      
      // Price range filter
      if (searchCriteria.priceRange && searchCriteria.priceRange !== '') {
        const propertyPrice = parseInt(property.price.replace(/\D/g, ''));
        const [min, max] = searchCriteria.priceRange.split('-').map(p => parseInt(p.replace(/\D/g, '')));
        if (propertyPrice < min || (max && propertyPrice > max)) {
          return false;
        }
      }
      
      // Bedrooms filter
      if (searchCriteria.bedrooms && searchCriteria.bedrooms !== 'any') {
        const searchBeds = parseInt(searchCriteria.bedrooms);
        const propertyBeds = typeof property.beds === 'string' ? 0 : property.beds;
        if (propertyBeds !== searchBeds) {
          return false;
        }
      }
      
      return true;
    });

    // Add distance calculation and sort by distance
    if (searchCriteria.location) {
      // Set map center based on location
      if (searchCriteria.location.toLowerCase().includes('dubai marina')) {
        setMapCenter({ lat: 25.0772, lng: 55.1392 });
      } else if (searchCriteria.location.toLowerCase().includes('abu dhabi')) {
        setMapCenter({ lat: 24.4539, lng: 54.3773 });
      } else if (searchCriteria.location.toLowerCase().includes('ajman')) {
        setMapCenter({ lat: 25.4052, lng: 55.5136 });
      }

      // Calculate distances from search center
      filteredProperties = filteredProperties.map(property => ({
        ...property,
        distance: Math.random() * 3 + 0.2 // Mock distance calculation
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    console.log('Filtered properties:', filteredProperties);
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
              center={mapCenter}
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
