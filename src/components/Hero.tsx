
import React from 'react';
import { Search, MapPin, Users, Shield } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="block text-amber-400">Iqaama</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover rentals, shared accommodations, and properties across the UAE. 
            Your trusted platform for transparent, affordable housing solutions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center text-blue-100">
              <Users className="h-5 w-5 mr-2" />
              <span>397K+ Target Users</span>
            </div>
            <div className="flex items-center text-blue-100">
              <Shield className="h-5 w-5 mr-2" />
              <span>Verified Listings</span>
            </div>
            <div className="flex items-center text-blue-100">
              <MapPin className="h-5 w-5 mr-2" />
              <span>UAE & GCC Coverage</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by location, area, or property name..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <Button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-blue-100">
            <p className="text-lg">
              <span className="font-semibold text-amber-400">AED 1/month</span> tenant subscription
              • <span className="font-semibold">Free</span> for landlords
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
