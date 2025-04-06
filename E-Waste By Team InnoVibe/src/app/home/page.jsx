"use client";
import React from "react";

function MainComponent() {
  const { data: user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-2xl font-roboto">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-roboto text-[#2c3e50] mb-4">
            E-Waste Recycling Platform
          </h1>
          <p className="text-xl text-[#34495e] mb-8">
            Turn your electronic waste into value while helping the environment
          </p>
        </div>

        {!user ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-roboto text-[#2c3e50] mb-6">
                Join Our Recycling Community
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-recycle text-green-600 text-2xl mr-4"></i>
                  <p>Get instant price estimates for your e-waste</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-hand-holding-usd text-green-600 text-2xl mr-4"></i>
                  <p>Earn rewards for responsible recycling</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-globe-americas text-green-600 text-2xl mr-4"></i>
                  <p>Make a positive environmental impact</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/account/signin"
                  className="bg-[#4a90e2] text-white px-8 py-3 rounded-lg hover:bg-[#357abd] transition-colors text-center"
                >
                  Sign In
                </a>
                <a
                  href="/account/signup"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-roboto text-[#2c3e50] mb-6">
                Welcome back, {user.name}!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="/price-estimator"
                  className="bg-white border-2 border-[#4a90e2] rounded-lg p-6 hover:bg-blue-50 transition-colors"
                >
                  <i className="fas fa-calculator text-[#4a90e2] text-3xl mb-4"></i>
                  <h3 className="text-xl font-roboto mb-2">Price Estimator</h3>
                  <p className="text-[#6c757d]">
                    Get instant value estimates for your e-waste
                  </p>
                </a>
                <a
                  href="/dashboard"
                  className="bg-white border-2 border-green-600 rounded-lg p-6 hover:bg-green-50 transition-colors"
                >
                  <i className="fas fa-chart-line text-green-600 text-3xl mb-4"></i>
                  <h3 className="text-xl font-roboto mb-2">Your Dashboard</h3>
                  <p className="text-[#6c757d]">
                    Track your recycling impact and rewards
                  </p>
                </a>
                {user.isArtist && (
                  <a
                    href="/artist-connect"
                    className="bg-white border-2 border-purple-600 rounded-lg p-6 hover:bg-purple-50 transition-colors"
                  >
                    <i className="fas fa-palette text-purple-600 text-3xl mb-4"></i>
                    <h3 className="text-xl font-roboto mb-2">Artist Connect</h3>
                    <p className="text-[#6c757d]">
                      Manage your artist profile and projects
                    </p>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <i className="fas fa-leaf text-green-600 text-4xl mb-4"></i>
              <h3 className="text-xl font-roboto mb-2">Environmental Impact</h3>
              <p className="text-[#6c757d]">Reduce e-waste footprint</p>
            </div>
            <div className="text-center">
              <i className="fas fa-dollar-sign text-green-600 text-4xl mb-4"></i>
              <h3 className="text-xl font-roboto mb-2">Fair Value</h3>
              <p className="text-[#6c757d]">
                Get the best price for your e-waste
              </p>
            </div>
            <div className="text-center">
              <i className="fas fa-sync text-green-600 text-4xl mb-4"></i>
              <h3 className="text-xl font-roboto mb-2">Circular Economy</h3>
              <p className="text-[#6c757d]">Support sustainable practices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;