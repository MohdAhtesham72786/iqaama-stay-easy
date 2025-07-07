
import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';

const GoogleMapSelector = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Mock map implementation - in real app, use Google Maps API
  const mockLocations = [
    { id: 1, name: 'Dubai Marina', lat: 25.0772, lng: 55.1392 },
    { id: 2, name: 'Downtown Dubai', lat: 25.1972, lng: 55.2744 },
    { id: 3, name: 'Jumeirah Lake Towers', lat: 25.0693, lng: 55.1392 },
    { id: 4, name: 'Business Bay', lat: 25.1916, lng: 55.2650 },
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 bg-gray-100 rounded-lg relative overflow-hidden">
        {/* Mock map interface */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive Map</h3>
            <p className="text-gray-600 mb-4">Click on suggested locations or search above</p>
            
            <div className="space-y-2">
              {mockLocations
                .filter(loc => loc.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(location => (
                  <Button
                    key={location.id}
                    variant={selectedLocation?.id === location.id ? "default" : "outline"}
                    onClick={() => handleLocationSelect(location)}
                    className="block w-full"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {location.name}
                  </Button>
                ))}
            </div>
          </div>
        </div>

        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
            <h4 className="font-semibold text-gray-900">Selected Location</h4>
            <p className="text-gray-600">{selectedLocation.name}</p>
            <p className="text-sm text-gray-500">
              Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>💡 In production, this will use Google Maps API for real location selection</p>
      </div>
    </div>
  );
};

export default GoogleMapSelector;
