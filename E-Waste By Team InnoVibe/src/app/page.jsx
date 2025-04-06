"use client";
import React from "react";

function MainComponent() {
  const { data: user, loading } = useUser();
  const [recyclingStats, setRecyclingStats] = useState({
    totalItems: 0,
    totalValue: 0,
    environmentalImpact: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/recycling-records", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "getStats" }),
        });
        const data = await response.json();
        if (data.success) {
          setRecyclingStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch recycling stats:", error);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform E-Waste into Value
            </h1>
            <p className="text-xl mb-8">
              Join our community of eco-conscious recyclers and artists making a
              difference
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/account/signup"
                  className="bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
                >
                  Get Started
                </a>
                <a
                  href="/account/signin"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-green-700 transition-colors text-lg font-semibold"
                >
                  Sign In
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {recyclingStats.totalItems}+
              </div>
              <div className="text-gray-600">Items Recycled</div>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="text-4xl font-bold text-green-600 mb-2">
                ${recyclingStats.totalValue.toLocaleString()}
              </div>
              <div className="text-gray-600">Value Generated</div>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {recyclingStats.environmentalImpact}kg
              </div>
              <div className="text-gray-600">CO2 Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
                <i className="fas fa-calculator text-green-600 text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Get an Estimate</h3>
                <p className="text-gray-600">
                  Use our price estimator to get instant value for your e-waste
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
                <i className="fas fa-map-marker-alt text-green-600 text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Find Centers</h3>
                <p className="text-gray-600">
                  Locate nearby recycling centers and drop off your items
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
                <i className="fas fa-gift text-green-600 text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                <p className="text-gray-600">
                  Get points and track your environmental impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artist Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Artist Marketplace</h2>
            <p className="text-gray-600">
              Discover unique artworks created from recycled electronics by our
              community of artists
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a href="/artist-connect" className="block">
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <i className="fas fa-palette text-green-600 text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">
                  Join as an Artist
                </h3>
                <p className="text-gray-600">
                  Transform e-waste into beautiful art pieces
                </p>
              </div>
            </a>
            <a href="/price-estimator" className="block">
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <i className="fas fa-recycle text-green-600 text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">
                  Recycle Materials
                </h3>
                <p className="text-gray-600">
                  Provide materials for artists and earn rewards
                </p>
              </div>
            </a>
            <a href="/dashboard" className="block">
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <i className="fas fa-chart-line text-green-600 text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Track Impact</h3>
                <p className="text-gray-600">
                  Monitor your contribution to sustainability
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8">
            Join our community and start your recycling journey today
          </p>
          {!user ? (
            <a
              href="/account/signup"
              className="bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold inline-block"
            >
              Get Started Now
            </a>
          ) : (
            <a
              href="/dashboard"
              className="bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold inline-block"
            >
              Go to Dashboard
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;