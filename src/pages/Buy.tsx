
import React from 'react';
import Header from '../components/Header';
import SearchFilters from '../components/SearchFilters';
import PropertyListings from '../components/PropertyListings';
import Footer from '../components/Footer';

const Buy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        <div className="bg-blue-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">Properties for Sale</h1>
            <p className="text-blue-100 mt-2">Find your dream property in the UAE</p>
          </div>
        </div>
        <SearchFilters activeTab="buy" />
        <PropertyListings type="buy" />
      </div>
      <Footer />
    </div>
  );
};

export default Buy;
