
import React from 'react';
import { MessageCircle, Shield, CreditCard, Users, MapPin, Globe } from 'lucide-react';
import { Card } from './ui/card';

const Features = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "In-App Chat",
      description: "Direct communication between tenants and landlords. No more phone tag or missed calls.",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: Shield,
      title: "Verified Listings",
      description: "All properties and landlords are verified for your safety and peace of mind.",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: CreditCard,
      title: "Automated Billing",
      description: "Seamless rent collection with automated reminders and bank transfer options.",
      color: "text-purple-600 bg-purple-50"
    },
    {
      icon: Users,
      title: "Shared Accommodations",
      description: "Find bedspaces, partitions, and private rooms perfect for budget-conscious renters.",
      color: "text-orange-600 bg-orange-50"
    },
    {
      icon: MapPin,
      title: "Proximity Filters",
      description: "Search by distance to metro, malls, schools, and other important locations.",
      color: "text-red-600 bg-red-50"
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Available in English, Arabic, and Hindi to serve the diverse UAE community.",
      color: "text-indigo-600 bg-indigo-50"
    }
  ];

  const stats = [
    { number: "397K+", label: "Target Users", description: "Projected user base within 2-3 years" },
    { number: "AED 1", label: "Monthly Fee", description: "Affordable tenant subscription" },
    { number: "35%", label: "Market Share", description: "Of UAE residents in shared accommodations" },
    { number: "5 Countries", label: "GCC Coverage", description: "UAE, Oman, Qatar, Saudi, Bahrain" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Iqaama?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of property rentals with our innovative features designed for the modern UAE lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Platform by the Numbers
            </h2>
            <p className="text-xl text-blue-100">
              Built for scale, designed for growth in the UAE's dynamic real estate market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-blue-200 text-sm">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Model */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 border border-amber-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Revolutionary Pricing Model
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">FREE</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">For Landlords</div>
                <div className="text-gray-600">List your properties at no cost with verified tenant access</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">AED 1</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">Tenants/Month</div>
                <div className="text-gray-600">Affordable access to verified listings and in-app features</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">AED 100</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">Agents/Month</div>
                <div className="text-gray-600">Professional tools and verified agent status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
