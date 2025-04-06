"use client";
import React from "react";

function MainComponent() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: user, loading } = useUser();
  const [error, setError] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-2xl font-roboto">Loading your dashboard...</div>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/account/signin?callbackUrl=/dashboard";
    return null;
  }

  const mockData = {
    creditPoints: 1250,
    recyclingHistory: [
      {
        id: 1,
        items: ["Plastic Bottles (10)", "Glass Containers (5)"],
        value: 25,
        impact: "2.5 kg CO2 saved",
        date: "2025-03-15",
      },
      {
        id: 2,
        items: ["Cardboard Boxes (3)", "Aluminum Cans (15)"],
        value: 30,
        impact: "3.0 kg CO2 saved",
        date: "2025-03-10",
      },
    ],
    leaderboard: [
      { name: "Sarah J.", points: 2500 },
      { name: "Mike R.", points: 2200 },
      { name: "Lisa M.", points: 1900 },
    ],
    rewards: [
      { id: 1, name: "10% Off Local Store", points: 500 },
      { id: 2, name: "Free Coffee", points: 300 },
    ],
    achievements: [
      {
        name: "Recycling Pioneer",
        description: "Recycled 100 items",
        completed: true,
      },
      {
        name: "Earth Warrior",
        description: "Saved 50kg CO2",
        completed: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#e9ecef] rounded-full flex items-center justify-center">
                <i className="fas fa-user text-2xl text-[#6c757d]"></i>
              </div>
              <div>
                <h1 className="text-2xl font-roboto">{user.name}</h1>
                <p className="text-[#6c757d]">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-[#28a745] text-white px-4 py-2 rounded-lg">
                <span className="font-roboto">
                  {mockData.creditPoints} Points
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-roboto mb-4">Recycling History</h2>
              <div className="space-y-4">
                {mockData.recyclingHistory.map((entry) => (
                  <div key={entry.id} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-roboto">
                          {entry.items.join(", ")}
                        </div>
                        <div className="text-sm text-[#6c757d]">
                          {entry.impact}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-roboto">{entry.value} points</div>
                        <div className="text-sm text-[#6c757d]">
                          {entry.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {user.isArtist && (
              <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                <h2 className="text-xl font-roboto mb-4">Artist Dashboard</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Availability Status</span>
                    <button className="bg-[#28a745] text-white px-4 py-2 rounded">
                      Available for Projects
                    </button>
                  </div>
                  <div>
                    <h3 className="font-roboto mb-2">Contact Requests</h3>
                    <div className="text-[#6c757d]">No pending requests</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-roboto mb-4">Leaderboard</h2>
              <div className="space-y-3">
                {mockData.leaderboard.map((leader, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="font-roboto">{leader.name}</span>
                    <span className="text-[#28a745]">{leader.points}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-roboto mb-4">Available Rewards</h2>
              <div className="space-y-3">
                {mockData.rewards.map((reward) => (
                  <div key={reward.id} className="border-b pb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-roboto">{reward.name}</span>
                      <span className="text-[#6c757d]">
                        {reward.points} points
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-roboto mb-4">Achievements</h2>
              <div className="space-y-3">
                {mockData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <i
                      className={`fas fa-${
                        achievement.completed
                          ? "check-circle text-[#28a745]"
                          : "circle text-[#6c757d]"
                      }`}
                    ></i>
                    <div>
                      <div className="font-roboto">{achievement.name}</div>
                      <div className="text-sm text-[#6c757d]">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;