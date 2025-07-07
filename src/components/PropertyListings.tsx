
import React, { useState } from 'react';
import { MapPin, Bed, Bath, Square, Heart, MessageCircle, Phone, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const PropertyListings = ({ type }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const getPropertiesForType = (propertyType) => {
    const baseProperties = [
      {
        id: 1,
        title: "Modern 1BR Apartment in Dubai Marina",
        location: "Dubai Marina",
        price: "AED 4,500",
        period: "/month",
        type: "Apartment",
        beds: 1,
        baths: 1,
        area: "650 sq ft",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Furnished", "Balcony", "Gym Access"],
        verified: true,
        contact: "+971 XX XXX XXXX"
      },
      {
        id: 2,
        title: "Shared Bedspace in Deira",
        location: "Deira",
        price: "AED 800",
        period: "/month",
        type: "Bedspace",
        beds: "Shared",
        baths: "Shared",
        area: "Private bed",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["WiFi Included", "AC", "Near Metro"],
        verified: true,
        contact: "+971 XX XXX XXXX"
      },
      {
        id: 3,
        title: "Luxury Villa in Arabian Ranches",
        location: "Arabian Ranches",
        price: "AED 15,000",
        period: "/month",
        type: "Villa",
        beds: 4,
        baths: 3,
        area: "2,800 sq ft",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Garden", "Maid's Room", "Pool Access"],
        verified: true,
        contact: "+971 XX XXX XXXX"
      },
      {
        id: 4,
        title: "Commercial Office in Business Bay",
        location: "Business Bay",
        price: "AED 120,000",
        period: "/year",
        type: "Commercial",
        beds: "Office",
        baths: 2,
        area: "1,200 sq ft",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: ["Furnished", "Parking", "24/7 Security"],
        verified: true,
        contact: "+971 XX XXX XXXX"
      }
    ];

    // Filter properties based on type
    switch (propertyType) {
      case 'rent':
        return baseProperties.filter(p => ['Apartment', 'Villa', 'Townhouse'].includes(p.type));
      case 'buy':
        return baseProperties.map(p => ({ ...p, price: p.price.replace('AED', 'AED').replace('/month', ''), period: '' }));
      case 'shared':
        return baseProperties.filter(p => ['Bedspace', 'Partition'].includes(p.type));
      case 'commercial':
        return baseProperties.filter(p => p.type === 'Commercial');
      case 'daily':
        return baseProperties.map(p => ({ ...p, price: p.price.replace('/month', '/night'), period: '/night' }));
      default:
        return baseProperties;
    }
  };

  const properties = getPropertiesForType(type);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {properties.length} Properties Found
            </h2>
            <p className="text-gray-600">Showing verified listings in your area</p>
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
                <option>Price Range</option>
                <option>Under AED 2,000</option>
                <option>AED 2,000 - 5,000</option>
                <option>AED 5,000+</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>Bedrooms</option>
                <option>Studio</option>
                <option>1 BR</option>
                <option>2+ BR</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg">
                <option>Area</option>
                <option>Dubai Marina</option>
                <option>Downtown</option>
                <option>Business Bay</option>
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
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-800 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {property.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  {property.verified && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      ✓ Verified
                    </span>
                  )}
                  <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
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

                <div className="flex flex-wrap gap-1 mb-4">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-800 hover:bg-blue-900">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
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
      </div>
    </section>
  );
};

export default PropertyListings;
