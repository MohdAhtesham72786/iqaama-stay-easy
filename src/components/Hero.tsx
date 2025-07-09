
import React, { useState } from 'react';
import { Search, MapPin, Users, Shield, Star } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Search function called with query:', searchQuery);
    if (searchQuery.trim()) {
      console.log('Navigating to search results with query:', searchQuery);
      const params = new URLSearchParams({
        location: searchQuery,
        tab: 'rent'
      });
      navigate(`/search-results?${params.toString()}`);
    } else {
      console.log('Search query is empty');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Modern Dubai Skyline Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1582672060674-bc2bd808a327?ixlib=rb-4.0.3&auto=format&fit=crop&w=2128&q=80" 
          alt="Dubai Modern Skyline" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-indigo-900/90"></div>
      </div>
      
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-center">
        <div className="w-full text-center">
          <div className="mb-6">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-500/30 mb-8">
              <Star className="h-4 w-4 text-amber-400 mr-2" />
              <span className="text-sm text-amber-100">UAE's #1 Property Platform</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Iqaama
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Discover premium rentals, shared accommodations, and luxury properties across the UAE. 
            Your trusted platform for transparent, affordable housing solutions in the heart of the Emirates.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Users className="h-5 w-5 mr-3 text-amber-400" />
              <span className="text-blue-100 font-medium">397K+ Users</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Shield className="h-5 w-5 mr-3 text-green-400" />
              <span className="text-blue-100 font-medium">Verified Listings</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <MapPin className="h-5 w-5 mr-3 text-blue-400" />
              <span className="text-blue-100 font-medium">UAE & GCC</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by location, area, or property name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg font-medium placeholder-gray-500 transition-all"
                  />
                </div>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 text-lg font-medium rounded-xl transition-all transform hover:scale-105 shadow-lg"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Now
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-8 py-4 border border-amber-500/30">
              <span className="text-lg text-amber-100">
                <span className="font-bold text-amber-400 text-xl">AED 1/month</span> tenant subscription
                • <span className="font-bold text-green-400">Free</span> for landlords
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="flex justify-center items-center space-x-6 opacity-60">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Dubai Marina" 
              className="w-10 h-10 object-cover rounded-lg"
            />
          </div>
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Burj Khalifa" 
              className="w-12 h-12 object-cover rounded-lg"
            />
          </div>
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Dubai Downtown" 
              className="w-10 h-10 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
