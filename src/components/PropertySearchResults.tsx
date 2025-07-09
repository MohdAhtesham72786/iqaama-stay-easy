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
  country: string;
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

  // Extended property data for all GCC countries
  const allProperties: Property[] = [
    // UAE - Dubai Marina Properties
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
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: ["Furnished", "Sea View", "Balcony", "Gym Access", "Pool", "Parking"],
      verified: true,
      contact: "+971 50 123 4567",
      nearbyPlaces: ["Marina Mall - 300m", "Metro Station - 500m", "Beach - 100m"],
      description: "Stunning 1-bedroom apartment with panoramic sea views in Dubai Marina.",
      landlord: {
        name: "Ahmed Al Mansouri",
        phone: "+971 50 123 4567",
        whatsapp: "+971 50 123 4567",
        rating: 4.8
      },
      amenities: ["24/7 Security", "Concierge", "Valet Parking", "Housekeeping"],
      availability: "Available Now",
      emirate: "dubai",
      country: "uae"
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
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["Furnished", "Marina View", "Balcony", "Gym", "Pool", "Parking"],
      verified: true,
      contact: "+971 50 234 5678",
      nearbyPlaces: ["Marina Walk - 200m", "Metro Station - 400m", "Beach - 150m"],
      description: "Spacious 3-bedroom apartment with stunning marina views.",
      landlord: {
        name: "Sarah Johnson",
        phone: "+971 50 234 5678",
        whatsapp: "+971 50 234 5678",
        rating: 4.7
      },
      amenities: ["24/7 Security", "Gym", "Pool", "Parking"],
      availability: "Available from Aug 15",
      emirate: "dubai",
      country: "uae"
    },
    {
      id: 11,
      title: "Modern Studio in Downtown Dubai",
      location: "Downtown Dubai",
      coordinates: { lat: 25.1972, lng: 55.2744 },
      price: "AED 6,500",
      period: "/month",
      type: "apartment",
      beds: "Studio",
      baths: 1,
      area: "550 sq ft",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["Furnished", "City View", "Gym", "Pool"],
      verified: true,
      contact: "+971 50 345 6789",
      nearbyPlaces: ["Dubai Mall - 1km", "Burj Khalifa - 800m", "Metro - 300m"],
      description: "Modern studio apartment in the heart of Downtown Dubai.",
      landlord: {
        name: "Omar Al Zaabi",
        phone: "+971 50 345 6789",
        whatsapp: "+971 50 345 6789",
        rating: 4.6
      },
      amenities: ["Gym", "Pool", "Security", "Concierge"],
      availability: "Available Now",
      emirate: "dubai",
      country: "uae"
    },
    // Oman Properties
    {
      id: 3,
      title: "Traditional Villa in Muscat with Mountain View",
      location: "Muscat",
      coordinates: { lat: 23.5880, lng: 58.3829 },
      price: "OMR 600",
      period: "/month",
      type: "villa",
      beds: 4,
      baths: 3,
      area: "2,500 sq ft",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["Garden", "Mountain View", "Traditional Architecture", "Parking"],
      verified: true,
      contact: "+968 9123 4567",
      nearbyPlaces: ["Muscat Mall - 2km", "Sultan Qaboos Mosque - 3km", "Beach - 5km"],
      description: "Beautiful traditional villa with stunning mountain views in Muscat.",
      landlord: {
        name: "Abdullah Al Hinai",
        phone: "+968 9123 4567",
        whatsapp: "+968 9123 4567",
        rating: 4.6
      },
      amenities: ["Garden", "Parking", "Traditional Design", "Security"],
      availability: "Available Now",
      emirate: "muscat",
      country: "oman"
    },
    {
      id: 4,
      title: "Modern 2BR Apartment in Muscat Hills",
      location: "Muscat Hills",
      coordinates: { lat: 23.6105, lng: 58.5416 },
      price: "OMR 450",
      period: "/month",
      type: "apartment",
      beds: 2,
      baths: 2,
      area: "1,200 sq ft",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["Modern Design", "Hills View", "Gym", "Pool"],
      verified: true,
      contact: "+968 9234 5678",
      nearbyPlaces: ["Mall - 1.5km", "Hospital - 2km", "School - 1km"],
      description: "Modern apartment with beautiful hills view in Muscat.",
      landlord: {
        name: "Fatima Al Zahra",
        phone: "+968 9234 5678",
        whatsapp: "+968 9234 5678",
        rating: 4.5
      },
      amenities: ["Gym", "Pool", "Security", "Parking"],
      availability: "Available Now",
      emirate: "muscat",
      country: "oman"
    },
    {
      id: 12,
      title: "Waterfront Apartment in Oman",
      location: "Muscat Waterfront",
      coordinates: { lat: 23.5859, lng: 58.4059 },
      price: "OMR 700",
      period: "/month",
      type: "apartment",
      beds: 3,
      baths: 2,
      area: "1,600 sq ft",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["Sea View", "Balcony", "Parking", "Modern"],
      verified: true,
      contact: "+968 9345 6789",
      nearbyPlaces: ["Corniche - 100m", "Shopping Mall - 1km", "Airport - 15km"],
      description: "Beautiful waterfront apartment with sea views in Muscat.",
      landlord: {
        name: "Said Al Busaidi",
        phone: "+968 9345 6789",
        whatsapp: "+968 9345 6789",
        rating: 4.7
      },
      amenities: ["Sea View", "Parking", "Security", "Modern Facilities"],
      availability: "Available Now",
      emirate: "muscat",
      country: "oman"
    },
    // Qatar Properties
    {
      id: 5,
      title: "Luxury 2BR Apartment in West Bay, Doha",
      location: "West Bay, Doha",
      coordinates: { lat: 25.3548, lng: 51.5326 },
      price: "QAR 8,000",
      period: "/month",
      type: "apartment",
      beds: 2,
      baths: 2,
      area: "1,300 sq ft",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6bbf914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1539650116574-75c0c6bbf914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["City View", "Furnished", "Gym", "Pool", "Concierge"],
      verified: true,
      contact: "+974 5123 4567",
      nearbyPlaces: ["City Center Mall - 1km", "Corniche - 500m", "Metro - 800m"],
      description: "Luxury apartment in the heart of Doha's West Bay district.",
      landlord: {
        name: "Mohammed Al Thani",
        phone: "+974 5123 4567",
        whatsapp: "+974 5123 4567",
        rating: 4.9
      },
      amenities: ["Concierge", "Gym", "Pool", "Valet Parking"],
      availability: "Available Now",
      emirate: "doha",
      country: "qatar"
    },
    {
      id: 6,
      title: "Spacious Villa in Al Rayyan, Qatar",
      location: "Al Rayyan",
      coordinates: { lat: 25.2854, lng: 51.4240 },
      price: "QAR 12,000",
      period: "/month",
      type: "villa",
      beds: 5,
      baths: 4,
      area: "3,000 sq ft",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["Private Garden", "Maid Room", "Driver Room", "Garage"],
      verified: true,
      contact: "+974 5234 5678",
      nearbyPlaces: ["Mall of Qatar - 3km", "Education City - 5km", "Stadium - 2km"],
      description: "Spacious family villa in prestigious Al Rayyan area.",
      landlord: {
        name: "Ali Al Kuwari",
        phone: "+974 5234 5678",
        whatsapp: "+974 5234 5678",
        rating: 4.7
      },
      amenities: ["Private Garden", "Security", "Parking", "Storage"],
      availability: "Available from July 20",
      emirate: "al-rayyan",
      country: "qatar"
    },
    // Saudi Arabia Properties
    {
      id: 7,
      title: "Modern 3BR Apartment in Riyadh",
      location: "Riyadh",
      coordinates: { lat: 24.7136, lng: 46.6753 },
      price: "SAR 3,500",
      period: "/month",
      type: "apartment",
      beds: 3,
      baths: 2,
      area: "1,500 sq ft",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["Modern Design", "City View", "Gym", "Pool"],
      verified: true,
      contact: "+966 5123 4567",
      nearbyPlaces: ["Riyadh Gallery Mall - 2km", "King Fahd Road - 1km", "Metro - 500m"],
      description: "Modern apartment in central Riyadh with excellent amenities.",
      landlord: {
        name: "Khalid Al Saud",
        phone: "+966 5123 4567",
        whatsapp: "+966 5123 4567",
        rating: 4.6
      },
      amenities: ["Gym", "Pool", "Security", "Parking"],
      availability: "Available Now",
      emirate: "riyadh",
      country: "saudi-arabia"
    },
    {
      id: 8,
      title: "Luxury Villa in Jeddah with Sea View",
      location: "Jeddah",
      coordinates: { lat: 21.3099, lng: 39.1925 },
      price: "SAR 8,000",
      period: "/month",
      type: "villa",
      beds: 4,
      baths: 3,
      area: "2,800 sq ft",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["Sea View", "Private Beach Access", "Garden", "Pool"],
      verified: true,
      contact: "+966 5234 5678",
      nearbyPlaces: ["Red Sea Mall - 3km", "Corniche - 500m", "Airport - 20km"],
      description: "Stunning villa with private beach access in Jeddah.",
      landlord: {
        name: "Omar Al Rashid",
        phone: "+966 5234 5678",
        whatsapp: "+966 5234 5678",
        rating: 4.8
      },
      amenities: ["Sea View", "Private Beach", "Pool", "Garden"],
      availability: "Available Now",
      emirate: "jeddah",
      country: "saudi-arabia"
    },
    // Bahrain Properties
    {
      id: 9,
      title: "Waterfront 2BR Apartment in Manama",
      location: "Manama",
      coordinates: { lat: 26.2235, lng: 50.5876 },
      price: "BHD 450",
      period: "/month",
      type: "apartment",
      beds: 2,
      baths: 2,
      area: "1,100 sq ft",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["Waterfront View", "Furnished", "Gym", "Pool"],
      verified: true,
      contact: "+973 3123 4567",
      nearbyPlaces: ["Bahrain City Centre - 2km", "Financial District - 1km", "Marina - 300m"],
      description: "Beautiful waterfront apartment in the heart of Manama.",
      landlord: {
        name: "Ahmed Al Khalifa",
        phone: "+973 3123 4567",
        whatsapp: "+973 3123 4567",
        rating: 4.7
      },
      amenities: ["Waterfront View", "Gym", "Pool", "Security"],
      availability: "Available Now",
      emirate: "manama",
      country: "bahrain"
    },
    {
      id: 10,
      title: "Modern Villa in Riffa, Bahrain",
      location: "Riffa",
      coordinates: { lat: 26.1300, lng: 50.5550 },
      price: "BHD 800",
      period: "/month",
      type: "villa",
      beds: 4,
      baths: 3,
      area: "2,200 sq ft",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"],
      features: ["Garden", "Modern Design", "Garage", "Security"],
      verified: true,
      contact: "+973 3234 5678",
      nearbyPlaces: ["Riffa Views - 1km", "Golf Course - 2km", "School - 500m"],
      description: "Modern family villa in the prestigious Riffa area.",
      landlord: {
        name: "Fatima Al Zayani",
        phone: "+973 3234 5678",
        whatsapp: "+973 3234 5678",
        rating: 4.5
      },
      amenities: ["Garden", "Security", "Parking", "Modern Design"],
      availability: "Available from Aug 1",
      emirate: "riffa",
      country: "bahrain"
    }
  ];

  useEffect(() => {
    console.log('PropertySearchResults - Search criteria received:', searchCriteria);
    
    // Filter properties based on search criteria
    let filteredProperties = allProperties;
    
    // Location filtering - much more flexible approach
    if (searchCriteria.location && searchCriteria.location.trim() !== '') {
      const searchLocation = searchCriteria.location.toLowerCase().trim();
      console.log('Filtering by location:', searchLocation);
      
      filteredProperties = allProperties.filter(property => {
        const propertyLocation = property.location.toLowerCase();
        const propertyCountry = property.country.toLowerCase();
        const propertyEmirate = property.emirate.toLowerCase();
        
        // Direct location matching
        const directMatch = propertyLocation.includes(searchLocation) || 
                           propertyEmirate.includes(searchLocation) ||
                           searchLocation.includes(propertyLocation) ||
                           searchLocation.includes(propertyEmirate);
        
        // Country-based matching
        let countryMatch = false;
        if (searchLocation.includes('oman') || searchLocation.includes('muscat')) {
          countryMatch = propertyCountry === 'oman';
        } else if (searchLocation.includes('qatar') || searchLocation.includes('doha')) {
          countryMatch = propertyCountry === 'qatar';
        } else if (searchLocation.includes('saudi') || searchLocation.includes('riyadh') || searchLocation.includes('jeddah')) {
          countryMatch = propertyCountry === 'saudi-arabia';
        } else if (searchLocation.includes('bahrain') || searchLocation.includes('manama')) {
          countryMatch = propertyCountry === 'bahrain';
        } else if (searchLocation.includes('dubai') || searchLocation.includes('uae') || searchLocation.includes('emirates')) {
          countryMatch = propertyCountry === 'uae';
        }
        
        const matches = directMatch || countryMatch;
        console.log(`Property: ${property.title}, Location: ${propertyLocation}, Country: ${propertyCountry}, Matches: ${matches}`);
        return matches;
      });
    }
    
    // Property type filter
    if (searchCriteria.propertyType && searchCriteria.propertyType !== 'all' && searchCriteria.propertyType !== '') {
      filteredProperties = filteredProperties.filter(property => property.type === searchCriteria.propertyType);
    }
    
    // Bedrooms filter
    if (searchCriteria.bedrooms && searchCriteria.bedrooms !== 'any' && searchCriteria.bedrooms !== '') {
      filteredProperties = filteredProperties.filter(property => {
        const searchBeds = searchCriteria.bedrooms.toLowerCase();
        const propertyBeds = typeof property.beds === 'string' ? property.beds.toLowerCase() : property.beds.toString();
        return searchBeds === 'any' || propertyBeds === searchBeds;
      });
    }

    // Set map center based on location
    if (searchCriteria.location) {
      const searchLoc = searchCriteria.location.toLowerCase();
      if (searchLoc.includes('oman') || searchLoc.includes('muscat')) {
        setMapCenter({ lat: 23.5880, lng: 58.3829 });
      } else if (searchLoc.includes('qatar') || searchLoc.includes('doha')) {
        setMapCenter({ lat: 25.3548, lng: 51.5326 });
      } else if (searchLoc.includes('saudi') || searchLoc.includes('riyadh')) {
        setMapCenter({ lat: 24.7136, lng: 46.6753 });
      } else if (searchLoc.includes('jeddah')) {
        setMapCenter({ lat: 21.3099, lng: 39.1925 });
      } else if (searchLoc.includes('bahrain') || searchLoc.includes('manama')) {
        setMapCenter({ lat: 26.2235, lng: 50.5876 });
      } else if (searchLoc.includes('dubai') || searchLoc.includes('marina')) {
        setMapCenter({ lat: 25.0772, lng: 55.1392 });
      }

      // Calculate distances from search center (mock calculation)
      filteredProperties = filteredProperties.map(property => ({
        ...property,
        distance: Math.random() * 5 + 0.5
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    console.log(`PropertySearchResults - Total filtered properties: ${filteredProperties.length}`);
    console.log('PropertySearchResults - Filtered properties:', filteredProperties.map(p => p.title));
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
            Search Results {searchCriteria.location && `for "${searchCriteria.location}"`}
          </h1>
          <p className="text-gray-600">
            Found {properties.length} properties matching your criteria across GCC countries
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
        {viewMode !== 'map' && properties.length > 0 && (
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
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                      {property.country.toUpperCase()}
                    </span>
                    {property.distance && (
                      <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs">
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
            <p className="text-gray-600">
              Try searching for specific locations like Dubai, Muscat, Doha, Riyadh, or Manama to find properties.
            </p>
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
