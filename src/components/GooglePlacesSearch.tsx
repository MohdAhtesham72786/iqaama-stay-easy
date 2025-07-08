
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Location {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const GooglePlacesSearch = ({ onLocationSelect, placeholder = "Search for location in UAE..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Mock Google Places API - In production, replace with actual Google Places API
  const mockUAELocations: Location[] = [
    {
      place_id: '1',
      name: 'Dubai Marina',
      formatted_address: 'Dubai Marina, Dubai, UAE',
      geometry: { location: { lat: 25.0772, lng: 55.1392 } }
    },
    {
      place_id: '2',
      name: 'Downtown Dubai',
      formatted_address: 'Downtown Dubai, Dubai, UAE',
      geometry: { location: { lat: 25.1972, lng: 55.2744 } }
    },
    {
      place_id: '3',
      name: 'Jumeirah Lake Towers',
      formatted_address: 'JLT, Dubai, UAE',
      geometry: { location: { lat: 25.0693, lng: 55.1392 } }
    },
    {
      place_id: '4',
      name: 'Business Bay',
      formatted_address: 'Business Bay, Dubai, UAE',
      geometry: { location: { lat: 25.1916, lng: 55.2650 } }
    },
    {
      place_id: '5',
      name: 'Deira',
      formatted_address: 'Deira, Dubai, UAE',
      geometry: { location: { lat: 25.2731, lng: 55.3414 } }
    },
    {
      place_id: '6',
      name: 'Abu Dhabi Marina',
      formatted_address: 'Marina, Abu Dhabi, UAE',
      geometry: { location: { lat: 24.4539, lng: 54.3773 } }
    },
    {
      place_id: '7',
      name: 'Sharjah City Centre',
      formatted_address: 'Sharjah, UAE',
      geometry: { location: { lat: 25.3373, lng: 55.4209 } }
    },
    {
      place_id: '8',
      name: 'Al Ain',
      formatted_address: 'Al Ain, Abu Dhabi, UAE',
      geometry: { location: { lat: 24.2070, lng: 55.7456 } }
    }
  ];

  const searchLocations = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // Mock API call - replace with actual Google Places API
    setTimeout(() => {
      const filtered = mockUAELocations.filter(location =>
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.formatted_address.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchLocations(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setSearchTerm(location.name);
    setSuggestions([]);
    onLocationSelect(location);
    
    // Save to localStorage for recent searches
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const updatedSearches = [location, ...recentSearches.filter(item => item.place_id !== location.place_id)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation: Location = {
            place_id: 'current',
            name: 'Current Location',
            formatted_address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            geometry: { location: { lat: latitude, lng: longitude } }
          };
          handleLocationSelect(currentLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute right-2 top-2 flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={getCurrentLocation}
            className="px-2"
          >
            <Navigation className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={() => searchLocations(searchTerm)}
            className="bg-blue-800 hover:bg-blue-900"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {(suggestions.length > 0 || isLoading) && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching locations...</div>
          ) : (
            <div className="py-2">
              {suggestions.map((location) => (
                <button
                  key={location.place_id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-start gap-3 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">{location.name}</div>
                    <div className="text-sm text-gray-500">{location.formatted_address}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2 mt-3">
        {['Dubai Marina', 'Downtown Dubai', 'JLT', 'Business Bay', 'Deira', 'Abu Dhabi'].map((area) => (
          <Button
            key={area}
            variant="outline"
            size="sm"
            onClick={() => {
              const location = mockUAELocations.find(loc => loc.name.includes(area));
              if (location) handleLocationSelect(location);
            }}
            className="text-xs"
          >
            {area}
          </Button>
        ))}
      </div>

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <div>
              <div className="font-medium text-blue-900">{selectedLocation.name}</div>
              <div className="text-sm text-blue-600">{selectedLocation.formatted_address}</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 text-xs text-gray-500">
        💡 Real Google Places API integration available in production
      </div>
    </div>
  );
};

export default GooglePlacesSearch;
