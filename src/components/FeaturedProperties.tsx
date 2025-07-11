
import React, { useState } from 'react';
import { MapPin, Bed, Bath, Square, Heart, MessageCircle, Phone, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const FeaturedProperties = () => {
  const [likedProperties, setLikedProperties] = useState(new Set());

  const properties = [
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
      contact: "+971 50 123 4567",
      landlord: "Ahmed Al Mansouri"
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
      contact: "+971 50 987 6543",
      landlord: "Fatima Hassan"
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
      contact: "+971 50 456 7890",
      landlord: "Sarah Johnson"
    },
    {
      id: 4,
      title: "Private Room in Karama",
      location: "Karama",
      price: "AED 1,200",
      period: "/month",
      type: "Private Room",
      beds: 1,
      baths: "Shared",
      area: "120 sq ft",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Furnished", "WiFi", "Utilities Included"],
      verified: true,
      contact: "+971 50 234 5678",
      landlord: "Mohammed Ali"
    }
  ];

  const handleLike = (propertyId) => {
    setLikedProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
      } else {
        newSet.add(propertyId);
      }
      return newSet;
    });
  };

  const handleContact = (property, method) => {
    if (method === 'phone') {
      window.open(`tel:${property.contact}`, '_self');
    } else if (method === 'chat') {
      // In real app, this would open in-app chat
      alert(`Opening chat with ${property.landlord} for "${property.title}"`);
    }
  };

  const handleViewDetails = (property) => {
    // In real app, this would navigate to property details page
    alert(`Viewing details for "${property.title}" in ${property.location}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover verified listings from trusted landlords across the UAE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`bg-white/80 hover:bg-white transition-colors ${
                      likedProperties.has(property.id) ? 'text-red-500' : 'text-gray-600'
                    }`}
                    onClick={() => handleLike(property.id)}
                  >
                    <Heart className={`h-4 w-4 ${likedProperties.has(property.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-800 cursor-pointer transition-colors">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1 text-blue-600" />
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

                <div className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Landlord:</span> {property.landlord}
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-blue-800 hover:bg-blue-900 transition-colors"
                    onClick={() => handleViewDetails(property)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContact(property, 'chat')}
                    className="hover:bg-blue-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContact(property, 'phone')}
                    className="hover:bg-green-50"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 hover:bg-blue-50 border-blue-200">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
