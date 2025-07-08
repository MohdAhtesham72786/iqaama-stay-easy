
import React, { useState, useEffect } from 'react';
import { MapPin, Bed, Bath, Square, Heart, MessageCircle, Phone, Filter, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const PropertyListings = ({ type }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);

  useEffect(() => {
    // Load saved search location from localStorage
    const savedSearch = JSON.parse(localStorage.getItem('searchHistory') || '[]')[0];
    if (savedSearch?.location) {
      setSearchLocation(savedSearch.location);
    }
  }, []);

  const getPropertiesForType = (propertyType) => {
    const baseProperties = [
      {
        id: 1,
        title: "Modern 1BR Apartment in Dubai Marina",
        location: "Dubai Marina",
        coordinates: { lat: 25.0772, lng: 55.1392 },
        price: "AED 4,500",
        period: "/month",
        type: "Apartment",
        beds: 1,
        baths: 1,
        area: "650 sq ft",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Furnished", "Balcony", "Gym Access", "Near Metro"],
        verified: true,
        contact: "+971 XX XXX XXXX",
        nearbyPlaces: ["Marina Mall - 500m", "Metro Station - 300m", "Beach - 200m"]
      },
      {
        id: 2,
        title: "Shared Bedspace in Deira",
        location: "Deira",
        coordinates: { lat: 25.2731, lng: 55.3414 },
        price: "AED 800",
        period: "/month",
        type: "Bedspace",
        beds: "Shared",
        baths: "Shared",
        area: "Private bed",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["WiFi Included", "AC", "Near Metro", "24/7 Security"],
        verified: true,
        contact: "+971 XX XXX XXXX",
        nearbyPlaces: ["Deira City Centre - 1km", "Gold Souk - 800m", "Metro - 400m"]
      },
      {
        id: 3,
        title: "Luxury Villa in Arabian Ranches",
        location: "Arabian Ranches",
        coordinates: { lat: 25.0512, lng: 55.2601 },
        price: "AED 15,000",
        period: "/month",
        type: "Villa",
        beds: 4,
        baths: 3,
        area: "2,800 sq ft",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Garden", "Maid's Room", "Pool Access", "Parking"],
        verified: true,
        contact: "+971 XX XXX XXXX",
        nearbyPlaces: ["Arabian Center - 2km", "Golf Course - 1km", "School - 1.5km"]
      },
      {
        id: 4,
        title: "Commercial Office in Business Bay",
        location: "Business Bay",
        coordinates: { lat: 25.1916, lng: 55.2650 },
        price: "AED 120,000",
        period: "/year",
        type: "Commercial",
        beds: "Office",
        baths: 2,
        area: "1,200 sq ft",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Furnished", "Parking", "24/7 Security", "High Speed Internet"],
        verified: true,
        contact: "+971 XX XXX XXXX",
        nearbyPlaces: ["Metro Station - 600m", "Mall - 1km", "Banks - 300m"]
      },
      {
        id: 5,
        title: "Cozy Studio in JLT",
        location: "Jumeirah Lake Towers",
        coordinates: { lat: 25.0693, lng: 55.1392 },
        price: "AED 3,200",
        period: "/month",
        type: "Studio",
        beds: "Studio",
        baths: 1,
        area: "450 sq ft",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Furnished", "Lake View", "Gym", "Pool"],
        verified: true,
        contact: "+971 XX XXX XXXX",
        nearbyPlaces: ["JLT Metro - 200m", "Marina Walk - 1km", "Restaurants - 100m"]
      },
      {
        id: 6,
        title: "Family Apartment in Downtown",
        location: "Downtown Dubai",
        coordinates: { lat: 25.1972, lng: 55.2744 },
        price: "AED 8,500",
        period: "/month",
        type: "Apartment",
        beds: 2,
        baths: 2,
        area: "1,100 sq ft",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Burj Khalifa View", "Dubai Mall Access", "Pool", "Concierge"],
        verified: true,
        contact: "+971 XX XXX XXXX",
        nearbyPlaces: ["Dubai Mall - 300m", "Burj Khalifa - 400m", "Metro - 800m"]
      }
    ];

    // Filter properties based on type and location
    let filteredProperties = baseProperties.filter(property => {
      switch (propertyType) {
        case 'rent':
          return ['Apartment', 'Villa', 'Studio'].includes(property.type);
        case 'buy':
          return ['Apartment', 'Villa', 'Studio'].includes(property.type);
        case 'shared':
          return ['Bedspace', 'Partition'].includes(property.type);
        case 'commercial':
          return property.type === 'Commercial';
        case 'daily':
          return ['Apartment', 'Studio'].includes(property.type);
        default:
          return true;
      }
    });

    // Sort by distance if location is selected
    if (searchLocation?.geometry?.location) {
      filteredProperties = filteredProperties.map(property => {
        const distance = calculateDistance(
          searchLocation.geometry.location.lat,
          searchLocation.geometry.location.lng,
          property.coordinates.lat,
          property.coordinates.lng
        );
        return { ...property, distance };
      }).sort((a, b) => a.distance - b.distance);
    }

    // Adjust prices for buy type
    if (propertyType === 'buy') {
      filteredProperties = filteredProperties.map(p => ({ 
        ...p, 
        price: `AED ${(parseInt(p.price.replace(/\D/g, '')) * 12 * 8).toLocaleString()}`, 
        period: '' 
      }));
    }

    if (propertyType === 'daily') {
      filteredProperties = filteredProperties.map(p => ({ 
        ...p, 
        price: `AED ${Math.round(parseInt(p.price.replace(/\D/g, '')) / 30)}`, 
        period: '/night' 
      }));
    }

    return filteredProperties;
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const properties = getPropertiesForType(type);

  const savePropertyInteraction = (propertyId, action) => {
    const interaction = {
      propertyId,
      action,
      timestamp: new Date().toISOString(),
      userId: 'user123', // In production, get from auth
      location: searchLocation?.formatted_address || 'Unknown'
    };
    
    // Save to localStorage (simulating database save)
    const interactions = JSON.parse(localStorage.getItem('propertyInteractions') || '[]');
    interactions.unshift(interaction);
    localStorage.setItem('propertyInteractions', JSON.stringify(interactions.slice(0, 100)));
    
    console.log('Property interaction saved:', interaction);
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {properties.length} Properties Found
            </h2>
            <p className="text-gray-600">
              {searchLocation ? 
                `Near ${searchLocation.name} - Showing verified listings` : 
                'Showing verified listings in UAE'
              }
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <select 
              value={viewMode} 
              onChange={(e) => setViewMode(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <Card className="p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>Sort by Distance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>All Locations</option>
                <option>Dubai Marina</option>
                <option>Downtown Dubai</option>
                <option>Business Bay</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>All Verified</option>
                <option>Recently Added</option>
                <option>With Photos</option>
              </select>
              <Button className="bg-blue-800 hover:bg-blue-900">Apply Filters</Button>
            </div>
          </Card>
        )}

        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {properties.map((property) => (
            <Card key={property.id} className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
              <div className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                <img
                  src={property.image}
                  alt={property.title}
                  className={`object-cover ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-blue-800 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {property.type}
                  </span>
                  {property.distance && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                      {property.distance.toFixed(1)}km away
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  {property.verified && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      ✓ Verified
                    </span>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="bg-white/80 hover:bg-white"
                    onClick={() => savePropertyInteraction(property.id, 'favorite')}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
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
                {property.nearbyPlaces && (
                  <div className="mb-4">
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Nearby:</h5>
                    <div className="text-xs text-gray-600">
                      {property.nearbyPlaces.slice(0, 2).map((place, index) => (
                        <div key={index}>{place}</div>
                      ))}
                    </div>
                  </div>
                )}

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

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-blue-800 hover:bg-blue-900"
                    onClick={() => savePropertyInteraction(property.id, 'view_details')}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => savePropertyInteraction(property.id, 'message')}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => savePropertyInteraction(property.id, 'call')}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3">
            Load More Properties
          </Button>
        </div>

        {/* Location-based insights */}
        {searchLocation && (
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Location Insights</h3>
            <div className="text-sm text-gray-700">
              <div>📍 Showing properties near {searchLocation.name}</div>
              <div>🏠 {properties.length} verified listings in this area</div>
              <div>💾 Search preferences automatically saved</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyListings;
