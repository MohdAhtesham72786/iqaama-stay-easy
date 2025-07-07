
import React, { useState } from 'react';
import { Menu, X, User, Globe } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                iqaama
              </h1>
              <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">UAE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-800 font-medium">Buy</a>
            <a href="#" className="text-gray-700 hover:text-blue-800 font-medium">Rent</a>
            <a href="#" className="text-gray-700 hover:text-blue-800 font-medium">Shared</a>
            <a href="#" className="text-gray-700 hover:text-blue-800 font-medium">Commercial</a>
            <a href="#" className="text-gray-700 hover:text-blue-800 font-medium">Daily Rentals</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Globe className="h-4 w-4 mr-2" />
              EN | AR
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button className="bg-blue-800 hover:bg-blue-900 text-white">
              List Property
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-800">Buy</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-800">Rent</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-800">Shared</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-800">Commercial</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-800">Daily Rentals</a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Button variant="ghost" className="w-full text-left">Sign In</Button>
                <Button className="w-full mt-2 bg-blue-800 hover:bg-blue-900">List Property</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
