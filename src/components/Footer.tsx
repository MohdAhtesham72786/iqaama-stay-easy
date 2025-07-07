
import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              iqaama
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming the UAE's real estate market with innovative technology and transparent pricing. 
              Find your perfect iqaama (residence) across the UAE and GCC.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                <span>One Tower, Dubai, UAE</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <span>+971-XX-XXXXXXX</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-blue-400" />
                <span>info@iqaama.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find Rental</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Buy Property</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shared Accommodation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Daily Rentals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">List Property</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Coverage</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <Globe className="h-4 w-4 mr-2 text-blue-400" />
                <span>UAE (Primary)</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Globe className="h-4 w-4 mr-2 text-blue-400" />
                <span>Oman</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Globe className="h-4 w-4 mr-2 text-blue-400" />
                <span>Qatar</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Globe className="h-4 w-4 mr-2 text-blue-400" />
                <span>Saudi Arabia</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Globe className="h-4 w-4 mr-2 text-blue-400" />
                <span>Bahrain</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2025 Iqaama LLC. All rights reserved.</p>
              <p className="text-sm mt-1">Licensed by Dubai Economic Department</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>

        {/* Launch Countdown */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-lg p-4">
            <p className="text-blue-100 mb-2">Platform Launch</p>
            <p className="text-2xl font-bold text-amber-400">Day 100 Countdown Active</p>
            <p className="text-blue-200 text-sm mt-1">Rapid deployment and market entry strategy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
