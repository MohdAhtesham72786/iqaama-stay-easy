
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertySearchResults from '../components/PropertySearchResults';

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
  tab: string;
}

const SearchResults = () => {
  const location = useLocation();
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    location: '',
    propertyType: '',
    emirate: '',
    priceRange: '',
    bedrooms: '',
    availability: '',
    nearMetro: '',
    nearMall: '',
    nearBeach: '',
    tab: 'rent'
  });

  useEffect(() => {
    // Get search criteria from URL params or localStorage
    const urlParams = new URLSearchParams(location.search);
    const savedSearch = JSON.parse(localStorage.getItem('searchHistory') || '[]')[0];
    
    const criteria: SearchCriteria = {
      location: urlParams.get('location') || savedSearch?.location?.name || '',
      propertyType: urlParams.get('type') || savedSearch?.criteria?.propertyType || '',
      emirate: urlParams.get('emirate') || savedSearch?.criteria?.emirate || '',
      priceRange: urlParams.get('price') || savedSearch?.criteria?.priceRange || '',
      bedrooms: urlParams.get('beds') || savedSearch?.criteria?.bedrooms || '',
      availability: urlParams.get('availability') || savedSearch?.criteria?.availability || '',
      nearMetro: urlParams.get('metro') || savedSearch?.criteria?.nearMetro || '',
      nearMall: urlParams.get('mall') || savedSearch?.criteria?.nearMall || '',
      nearBeach: urlParams.get('beach') || savedSearch?.criteria?.nearBeach || '',
      tab: urlParams.get('tab') || savedSearch?.tab || 'rent'
    };

    console.log('SearchResults - Setting criteria:', criteria);
    setSearchCriteria(criteria);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PropertySearchResults searchCriteria={searchCriteria} />
      <Footer />
    </div>
  );
};

export default SearchResults;
