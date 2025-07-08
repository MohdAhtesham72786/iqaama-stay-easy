
import React, { useState } from 'react';
import { Filter, MapPin, Home, Users, Calendar, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import GooglePlacesSearch from './GooglePlacesSearch';

const SearchFilters = ({ activeTab = 'rent' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    propertyType: '',
    emirate: '',
    priceRange: '',
    bedrooms: '',
    availability: '',
    nearMetro: '',
    nearMall: '',
    nearBeach: ''
  });

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment', icon: Home },
    { id: 'villa', label: 'Villa', icon: Home },
    { id: 'bedspace', label: 'Bedspace', icon: Users },
    { id: 'partition', label: 'Partition', icon: Users },
    { id: 'commercial', label: 'Commercial', icon: Home },
  ];

  const tabs = [
    { id: 'rent', label: 'Rent' },
    { id: 'buy', label: 'Buy' },
    { id: 'shared', label: 'Shared' },
    { id: 'daily', label: 'Daily Rentals' },
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    console.log('Selected location:', location);
    // In production, this would update the search results based on location
  };

  const handleSearch = () => {
    const searchData = {
      tab: currentTab,
      location: selectedLocation,
      criteria: searchCriteria,
      timestamp: new Date().toISOString()
    };
    
    console.log('Searching with comprehensive filters:', searchData);
    
    // Save search to localStorage (simulating database save)
    const savedSearches = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    savedSearches.unshift(searchData);
    localStorage.setItem('searchHistory', JSON.stringify(savedSearches.slice(0, 10)));
    
    // In production, this would:
    // 1. Send data to backend API
    // 2. Save to database
    // 3. Trigger property search with location-based results
    // 4. Update property listings based on Google Maps coordinates
  };

  const handleFilterChange = (key, value) => {
    setSearchCriteria(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6 border-0 shadow-lg">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={currentTab === tab.id ? "default" : "outline"}
                onClick={() => setCurrentTab(tab.id)}
                className={currentTab === tab.id ? "bg-blue-800 hover:bg-blue-900" : ""}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Google Places Location Search */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-800" />
              Search Location with Google Maps
            </h3>
            <GooglePlacesSearch 
              onLocationSelect={handleLocationSelect}
              placeholder="Search by area, landmark, or address (e.g., Dubai Marina, JLT, Downtown)"
            />
          </div>

          {/* Property Types */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Home className="h-5 w-5 mr-2 text-blue-800" />
              Property Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {propertyTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Button
                    key={type.id}
                    variant={searchCriteria.propertyType === type.id ? "default" : "outline"}
                    onClick={() => handleFilterChange('propertyType', type.id)}
                    className="flex flex-col items-center p-4 h-auto hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <IconComponent className="h-6 w-6 mb-2 text-blue-700" />
                    <span className="text-sm">{type.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Emirates
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchCriteria.emirate}
                onChange={(e) => handleFilterChange('emirate', e.target.value)}
              >
                <option value="">All Emirates</option>
                <option value="dubai">Dubai</option>
                <option value="abu-dhabi">Abu Dhabi</option>
                <option value="sharjah">Sharjah</option>
                <option value="ajman">Ajman</option>
                <option value="fujairah">Fujairah</option>
                <option value="rak">Ras Al Khaimah</option>
                <option value="uaq">Umm Al Quwain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range (AED)
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchCriteria.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              >
                <option value="">Any Price</option>
                <option value="0-2000">Under 2,000</option>
                <option value="2000-5000">2,000 - 5,000</option>
                <option value="5000-10000">5,000 - 10,000</option>
                <option value="10000-20000">10,000 - 20,000</option>
                <option value="20000+">Above 20,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchCriteria.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              >
                <option value="">Any</option>
                <option value="studio">Studio</option>
                <option value="1">1 BR</option>
                <option value="2">2 BR</option>
                <option value="3">3 BR</option>
                <option value="4+">4+ BR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Availability
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchCriteria.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
              />
            </div>
          </div>

          {/* Distance Filters */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Proximity Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Near Metro Station
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={searchCriteria.nearMetro}
                  onChange={(e) => handleFilterChange('nearMetro', e.target.value)}
                >
                  <option value="">Any Distance</option>
                  <option value="500m">Within 500m</option>
                  <option value="1km">Within 1km</option>
                  <option value="2km">Within 2km</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Near Shopping Mall
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={searchCriteria.nearMall}
                  onChange={(e) => handleFilterChange('nearMall', e.target.value)}
                >
                  <option value="">Any Distance</option>
                  <option value="1km">Within 1km</option>
                  <option value="2km">Within 2km</option>
                  <option value="5km">Within 5km</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Near Beach
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={searchCriteria.nearBeach}
                  onChange={(e) => handleFilterChange('nearBeach', e.target.value)}
                >
                  <option value="">Any Distance</option>
                  <option value="1km">Within 1km</option>
                  <option value="5km">Within 5km</option>
                  <option value="10km">Within 10km</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleSearch}
              className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3"
            >
              <Filter className="h-5 w-5 mr-2" />
              Search Properties with Location
            </Button>
          </div>

          {/* Search Summary */}
          {selectedLocation && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Current Search:</h4>
              <div className="text-sm text-blue-700">
                <div>Location: {selectedLocation.name}</div>
                <div>Property Type: {currentTab}</div>
                {searchCriteria.priceRange && <div>Price: AED {searchCriteria.priceRange}</div>}
              </div>
            </div>
          )}

          {/* Google Maps Integration Note */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>🗺️ Location search powered by Google Places API for accurate results</p>
            <p className="text-xs mt-1">Search data automatically saved for better recommendations</p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SearchFilters;
