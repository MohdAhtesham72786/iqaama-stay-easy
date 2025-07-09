
import React from 'react';
import { Navigation } from 'lucide-react';

interface MapControlsProps {
  propertyCount: number;
}

const MapControls = ({ propertyCount }: MapControlsProps) => {
  return (
    <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-2 rounded text-xs z-10">
      <div className="flex items-center gap-2">
        <Navigation className="h-3 w-3" />
        <span>{propertyCount} properties in this area</span>
      </div>
    </div>
  );
};

export default MapControls;
