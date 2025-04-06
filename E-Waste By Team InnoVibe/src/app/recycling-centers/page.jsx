"use client";
import React from "react";

function MainComponent() {
  const [centers, setCenters] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mockCenters = [
      {
        id: 1,
        name: "EcoRecycle Center",
        address: "123 Green Street, San Francisco, CA 94110",
        phone: "(415) 555-0123",
        hours: {
          mon_fri: "8:00 AM - 6:00 PM",
          sat: "9:00 AM - 5:00 PM",
          sun: "Closed",
        },
        services: ["Electronics", "Batteries", "Metal", "Glass", "Paper"],
        rating: 4.5,
        distance: "1.2 miles",
        image: "/recycling-center-1.jpg",
      },
      {
        id: 2,
        name: "Bay Area Recycling Solutions",
        address: "456 Eco Avenue, San Francisco, CA 94107",
        phone: "(415) 555-0456",
        hours: {
          mon_fri: "7:00 AM - 7:00 PM",
          sat_sun: "8:00 AM - 4:00 PM",
        },
        services: ["Electronics", "Appliances", "Plastic", "Metal"],
        rating: 4.8,
        distance: "2.5 miles",
        image: "/recycling-center-2.jpg",
      },
    ];
    setCenters(mockCenters);
    setLoading(false);
  }, []);

  const handleLocationSearch = async (input) => {
    if (!input) {
      setLocationSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `/integrations/google-place-autocomplete/autocomplete/json?input=${input}&radius=500`
      );
      if (!response.ok) throw new Error("Failed to fetch locations");
      const data = await response.json();
      setLocationSuggestions(data.predictions);
    } catch (err) {
      console.error(err);
      setError("Failed to load location suggestions");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading centers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-crimson-text text-center mb-8">
          Find Recycling Centers
        </h1>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your location..."
              className="w-full p-4 border rounded-lg shadow-sm"
              value={searchLocation}
              onChange={(e) => {
                setSearchLocation(e.target.value);
                handleLocationSearch(e.target.value);
              }}
            />
            {locationSuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1">
                {locationSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.place_id}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchLocation(suggestion.description);
                      setLocationSuggestions([]);
                    }}
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {centers.map((center) => (
            <div
              key={center.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={center.image}
                  alt={`${center.name} facility`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full">
                  {center.distance}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-crimson-text">{center.name}</h2>
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    <span>{center.rating}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-green-600 mt-1 mr-3"></i>
                    <span>{center.address}</span>
                  </div>

                  <div className="flex items-start">
                    <i className="fas fa-phone text-green-600 mt-1 mr-3"></i>
                    <span>{center.phone}</span>
                  </div>

                  <div className="flex items-start">
                    <i className="fas fa-clock text-green-600 mt-1 mr-3"></i>
                    <div>
                      <div>Mon-Fri: {center.hours.mon_fri}</div>
                      <div>Sat: {center.hours.sat || center.hours.sat_sun}</div>
                      <div>Sun: {center.hours.sun || center.hours.sat_sun}</div>
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold mb-2">
                      Accepted Materials:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {center.services.map((service) => (
                        <span
                          key={service}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCenter(center)}
                    className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCenter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-2xl font-crimson-text mb-4">
                Get Directions to {selectedCenter.name}
              </h3>
              <p className="mb-4">{selectedCenter.address}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedCenter(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    selectedCenter.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;