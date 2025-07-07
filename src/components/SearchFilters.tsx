
import React, { useState } from 'react';
import { Filter, MapPin, Home, Users, Calendar, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const SearchFilters = ({ activeTab = 'rent' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [searchLocation, setSearchLocation] = useState('');

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

  const handleSearch = () => {
    console.log('Searching with filters...', {
      tab: currentTab,
      location: searchLocation,
    });
    // In real app, this would trigger search with Google Places API
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

          {/* Location Search with Google Places */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-800" />
              Search Location
            </h3>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search by area, landmark, or address (e.g., Dubai Marina, JLT, Downtown)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-2 top-2">
                <Button
                  size="sm"
                  onClick={handleSearch}
                  className="bg-blue-800 hover:bg-blue-900"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Quick location suggestions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['Dubai Marina', 'Downtown Dubai', 'JLT', 'Business Bay', 'Deira'].map((area) => (
                <Button
                  key={area}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchLocation(area)}
                  className="text-xs"
                >
                  {area}
                </Button>
              ))}
            </div>
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
                    variant="outline"
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
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Emirates</option>
                <option>Dubai</option>
                <option>Abu Dhabi</option>
                <option>Sharjah</option>
                <option>Ajman</option>
                <option>Fujairah</option>
                <option>Ras Al Khaimah</option>
                <option>Umm Al Quwain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range (AED)
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Any Price</option>
                <option>Under 2,000</option>
                <option>2,000 - 5,000</option>
                <option>5,000 - 10,000</option>
                <option>10,000 - 20,000</option>
                <option>Above 20,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Any</option>
                <option>Studio</option>
                <option>1 BR</option>
                <option>2 BR</option>
                <option>3 BR</option>
                <option>4+ BR</option>
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
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Any Distance</option>
                  <option>Within 500m</option>
                  <option>Within 1km</option>
                  <option>Within 2km</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Near Shopping Mall
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Any Distance</option>
                  <option>Within 1km</option>
                  <option>Within 2km</option>
                  <option>Within 5km</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Near Beach
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Any Distance</option>
                  <option>Within 1km</option>
                  <option>Within 5km</option>
                  <option>Within 10km</option>
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

          {/* Google Maps Integration Note */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>🗺️ Location search powered by Google Places API for accurate results</p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SearchFilters;
