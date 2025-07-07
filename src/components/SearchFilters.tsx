
import React, { useState } from 'react';
import { Filter, MapPin, Home, Users, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const SearchFilters = () => {
  const [activeTab, setActiveTab] = useState('rent');

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

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6 border-0 shadow-lg">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? "bg-blue-800 hover:bg-blue-900" : ""}
              >
                {tab.label}
              </Button>
            ))}
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
                    className="flex flex-col items-center p-4 h-auto hover:bg-blue-50 hover:border-blue-300"
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
                Location
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Select Location</option>
                <option>Dubai</option>
                <option>Abu Dhabi</option>
                <option>Sharjah</option>
                <option>Ajman</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Any Price</option>
                <option>Under AED 2,000</option>
                <option>AED 2,000 - 5,000</option>
                <option>AED 5,000 - 10,000</option>
                <option>Above AED 10,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Any</option>
                <option>Studio</option>
                <option>1 BR</option>
                <option>2 BR</option>
                <option>3+ BR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Move-in Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <Button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3">
              <Filter className="h-5 w-5 mr-2" />
              Search Properties
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SearchFilters;
