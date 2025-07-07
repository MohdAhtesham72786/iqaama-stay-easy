
import React, { useState } from 'react';
import { Menu, X, User, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'AR' : 'EN');
  };

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                iqaama
              </h1>
              <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">UAE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/buy" 
              className={`font-medium transition-colors ${
                isActivePath('/buy') ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-700 hover:text-blue-800'
              }`}
            >
              Buy
            </Link>
            <Link 
              to="/rent" 
              className={`font-medium transition-colors ${
                isActivePath('/rent') ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-700 hover:text-blue-800'
              }`}
            >
              Rent
            </Link>
            <Link 
              to="/shared" 
              className={`font-medium transition-colors ${
                isActivePath('/shared') ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-700 hover:text-blue-800'
              }`}
            >
              Shared
            </Link>
            <Link 
              to="/commercial" 
              className={`font-medium transition-colors ${
                isActivePath('/commercial') ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-700 hover:text-blue-800'
              }`}
            >
              Commercial
            </Link>
            <Link 
              to="/daily-rentals" 
              className={`font-medium transition-colors ${
                isActivePath('/daily-rentals') ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-700 hover:text-blue-800'
              }`}
            >
              Daily Rentals
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-700"
              onClick={toggleLanguage}
            >
              <Globe className="h-4 w-4 mr-2" />
              {language} | {language === 'EN' ? 'AR' : 'EN'}
            </Button>
            <Link to="/signin">
              <Button variant="ghost" size="sm" className="text-gray-700">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link to="/list-property">
              <Button className="bg-blue-800 hover:bg-blue-900 text-white">
                List Property
              </Button>
            </Link>
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
              <Link 
                to="/buy" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Buy
              </Link>
              <Link 
                to="/rent" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Rent
              </Link>
              <Link 
                to="/shared" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Shared
              </Link>
              <Link 
                to="/commercial" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Commercial
              </Link>
              <Link 
                to="/daily-rentals" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Daily Rentals
              </Link>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-left mb-2">Sign In</Button>
                </Link>
                <Link to="/list-property" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-800 hover:bg-blue-900">List Property</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
