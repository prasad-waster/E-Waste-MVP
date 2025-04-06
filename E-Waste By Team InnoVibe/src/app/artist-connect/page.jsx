"use client";
import React from "react";

function MainComponent() {
  const [artists, setArtists] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [contactFormVisible, setContactFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const artStyles = [
    "Digital",
    "Traditional",
    "Mixed Media",
    "Photography",
    "Sculpture",
  ];
  const [selectedStyle, setSelectedStyle] = useState("");

  useEffect(() => {
    const mockArtists = [
      {
        id: 1,
        name: "Sarah Chen",
        image: "/placeholder-profile.jpg",
        bio: "Contemporary artist specializing in upcycled electronics into digital art",
        styles: ["Digital", "Mixed Media"],
        location: "San Francisco, CA",
        isAvailable: true,
        gallery: ["/art1.jpg", "/art2.jpg", "/art3.jpg"],
        materials: ["Circuit boards", "LCD screens", "Computer parts"],
      },
      {
        id: 2,
        name: "Marcus Rodriguez",
        image: "/placeholder-profile.jpg",
        bio: "Sculptor transforming e-waste into modern art pieces",
        styles: ["Sculpture", "Mixed Media"],
        location: "Austin, TX",
        isAvailable: true,
        gallery: ["/art4.jpg", "/art5.jpg", "/art6.jpg"],
        materials: ["Old phones", "Computer cases", "Wiring"],
      },
      {
        id: 3,
        name: "Emma Wilson",
        image: "/placeholder-profile.jpg",
        bio: "Photographer documenting the beauty in electronic waste",
        styles: ["Photography", "Digital"],
        location: "Portland, OR",
        isAvailable: false,
        gallery: ["/art7.jpg", "/art8.jpg", "/art9.jpg"],
        materials: ["Camera parts", "Vintage electronics", "LED components"],
      },
    ];
    setArtists(mockArtists);
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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactFormVisible(false);
  };

  const filteredArtists = artists.filter((artist) => {
    const matchesStyle =
      !selectedStyle || artist.styles.includes(selectedStyle);
    const matchesLocation =
      !selectedLocation || artist.location.includes(selectedLocation);
    const matchesSearch =
      !searchQuery ||
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStyle && matchesLocation && matchesSearch;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <i className="fas fa-spinner fa-spin text-4xl text-green-600"></i>
      </div>
    );
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            Artist Marketplace
          </h1>
          <p className="text-center text-xl mb-8">
            Discover unique artworks created from recycled electronics
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search artists or artwork..."
              className="p-3 rounded-lg border flex-1 focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              className="p-3 rounded-lg border focus:ring-2 focus:ring-green-500"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              <option value="">All Art Styles</option>
              {artStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>

            <div className="relative">
              <input
                type="text"
                placeholder="Search location..."
                className="p-3 rounded-lg border focus:ring-2 focus:ring-green-500 w-full"
                onChange={(e) => handleLocationSearch(e.target.value)}
              />
              {locationSuggestions.length > 0 && (
                <div className="absolute z-10 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto w-full mt-1">
                  {locationSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.place_id}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedLocation(suggestion.description);
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={artist.image}
                alt={`${artist.name}'s profile`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {artist.name}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      artist.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {artist.isAvailable ? "Available" : "Busy"}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{artist.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {artist.styles.map((style) => (
                    <span
                      key={style}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {style}
                    </span>
                  ))}
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    Materials Used:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.materials.map((material, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {artist.location}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {artist.gallery.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Artwork ${index + 1} by ${artist.name}`}
                      className="w-full h-24 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedArtist(artist);
                    setContactFormVisible(true);
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Contact Artist
                </button>
              </div>
            </div>
          ))}
        </div>

        {contactFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-6">
                Contact {selectedArtist?.name}
              </h3>
              <form onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-green-500"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setContactFormVisible(false)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;