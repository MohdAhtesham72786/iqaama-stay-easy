
import React from 'react';

const MapLoadingSpinner = () => {
  return (
    <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Google Maps...</p>
      </div>
    </div>
  );
};

export default MapLoadingSpinner;
