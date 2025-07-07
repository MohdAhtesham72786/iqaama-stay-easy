
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import FeaturedProperties from '../components/FeaturedProperties';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <SearchFilters />
      <FeaturedProperties />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
