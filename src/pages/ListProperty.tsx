
import React, { useState } from 'react';
import { MapPin, Upload, Home, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import Header from '../components/Header';
import GoogleMapSelector from '../components/GoogleMapSelector';

const ListProperty = () => {
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
            <p className="text-gray-600 mt-2">Free listing for landlords • Get verified tenants</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`flex items-center ${stepNum < 4 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= stepNum
                        ? 'bg-blue-800 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        step > stepNum ? 'bg-blue-800' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Property Details</span>
              <span>Location</span>
              <span>Photos</span>
              <span>Pricing</span>
            </div>
          </div>

          <Card className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <Home className="h-6 w-6 mr-2 text-blue-800" />
                  Property Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Select Property Type</option>
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>Townhouse</option>
                      <option>Bedspace</option>
                      <option>Partition</option>
                      <option>Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Select Bedrooms</option>
                      <option>Studio</option>
                      <option>1 Bedroom</option>
                      <option>2 Bedrooms</option>
                      <option>3 Bedrooms</option>
                      <option>4+ Bedrooms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Select Bathrooms</option>
                      <option>1 Bathroom</option>
                      <option>2 Bathrooms</option>
                      <option>3 Bathrooms</option>
                      <option>4+ Bathrooms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area (sq ft)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter area in sq ft"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter a descriptive title for your property"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your property, amenities, and nearby facilities"
                  ></textarea>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-blue-800" />
                  Property Location
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emirates
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Select Emirates</option>
                      <option>Dubai</option>
                      <option>Abu Dhabi</option>
                      <option>Sharjah</option>
                      <option>Ajman</option>
                      <option>Fujairah</option>
                      <option>Ras Al Khaimah</option>
                      <option>Umm Al Quwain</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Dubai Marina, Downtown Dubai"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exact Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the complete address"
                  />
                </div>

                <div className="h-96">
                  <GoogleMapSelector onLocationSelect={setSelectedLocation} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <Upload className="h-6 w-6 mr-2 text-blue-800" />
                  Property Photos
                </h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Property Photos</h3>
                  <p className="text-gray-600 mb-4">Add at least 5 high-quality photos to attract tenants</p>
                  <Button variant="outline">Choose Files</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-blue-800" />
                  Pricing & Availability
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Rent (AED)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter monthly rent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Deposit (AED)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter security deposit"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available From
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lease Duration
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Select Duration</option>
                      <option>Monthly</option>
                      <option>6 Months</option>
                      <option>1 Year</option>
                      <option>2 Years</option>
                    </select>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Free Listing Benefits</h3>
                  <ul className="text-green-700 space-y-1">
                    <li>• Verified tenant pool with AED 1/month subscription</li>
                    <li>• Built-in chat system for direct communication</li>
                    <li>• Automated billing and rent collection</li>
                    <li>• Enhanced property visibility</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                Previous
              </Button>
              
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="bg-blue-800 hover:bg-blue-900"
                >
                  Next Step
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700">
                  Publish Property
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
