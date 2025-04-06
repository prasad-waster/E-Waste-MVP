"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [upload, { loading: uploadLoading }] = useUpload();
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: user } = useUser();
  const [manualMode, setManualMode] = useState(false);
  const [formData, setFormData] = useState({
    deviceType: "",
    condition: "good",
    age: "",
    weight: "",
  });

  const analyzeImage = async (imageUrl) => {
    setLoading(true);
    setError(null);
    try {
      const visionResponse = await fetch("/integrations/gpt-vision/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this e-waste image. Identify the type of device, its components, and estimate the precious metals content. Format your response as a JSON object with fields: deviceType, components, condition, estimatedAge, preciousMetals.",
                },
                {
                  type: "image_url",
                  image_url: { url: imageUrl },
                },
              ],
            },
          ],
        }),
      });

      if (!visionResponse.ok) throw new Error("Vision analysis failed");
      const visionData = await visionResponse.json();
      const visionAnalysis = JSON.parse(visionData.choices[0].message.content);

      const gptResponse = await fetch(
        "/integrations/chat-gpt/conversationgpt4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `Based on this analysis: ${JSON.stringify(
                  visionAnalysis
                )}, provide a detailed price estimate and environmental impact. Include current market rates for precious metals.`,
              },
            ],
          }),
        }
      );

      if (!gptResponse.ok) throw new Error("Price estimation failed");
      const gptData = await gptResponse.json();
      const priceEstimate = JSON.parse(gptData.choices[0].message.content);

      setAnalysis({
        ...visionAnalysis,
        ...priceEstimate,
      });
    } catch (err) {
      setError(
        "Failed to analyze image. Please try again or use manual input."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setFile(file);
      const { url, error } = await upload({ file });
      if (error) throw new Error(error);
      setImageUrl(url);
      await analyzeImage(url);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error(err);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const gptResponse = await fetch(
        "/integrations/chat-gpt/conversationgpt4",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `Provide a price estimate and environmental impact for: ${JSON.stringify(
                  formData
                )}`,
              },
            ],
          }),
        }
      );

      if (!gptResponse.ok) throw new Error("Estimation failed");
      const gptData = await gptResponse.json();
      setAnalysis(JSON.parse(gptData.choices[0].message.content));
    } catch (err) {
      setError("Failed to generate estimate. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          E-Waste Price Estimator
        </h1>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => setManualMode(false)}
              className={`mr-2 rounded-lg px-4 py-2 ${
                !manualMode
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Image Upload
            </button>
            <button
              onClick={() => setManualMode(true)}
              className={`rounded-lg px-4 py-2 ${
                manualMode
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Manual Input
            </button>
          </div>

          {!manualMode ? (
            <div className="text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="mb-4 inline-block cursor-pointer rounded-lg border-2 border-dashed border-green-600 p-8 text-gray-600 hover:bg-green-50"
              >
                <i className="fas fa-cloud-upload-alt mb-2 text-3xl text-green-600"></i>
                <p>Click to upload an image of your e-waste</p>
              </label>
              {imageUrl && (
                <div className="mt-4">
                  <img
                    src={imageUrl}
                    alt="Uploaded e-waste"
                    className="mx-auto max-h-64 rounded-lg"
                  />
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Device Type
                </label>
                <input
                  type="text"
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={(e) =>
                    setFormData({ ...formData, deviceType: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  placeholder="e.g., Smartphone, Laptop, TV"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age (years)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                {loading ? "Analyzing..." : "Get Estimate"}
              </button>
            </form>
          )}

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {analysis && (
            <div className="mt-8 space-y-6">
              <div className="rounded-lg bg-green-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  Estimated Value Range
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  ${analysis.minValue} - ${analysis.maxValue}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-800">
                    Precious Metals Content
                  </h3>
                  <ul className="space-y-2">
                    {analysis.preciousMetals &&
                      Object.entries(analysis.preciousMetals).map(
                        ([metal, amount]) => (
                          <li key={metal} className="flex justify-between">
                            <span className="capitalize">{metal}</span>
                            <span>{amount}</span>
                          </li>
                        )
                      )}
                  </ul>
                </div>

                <div className="rounded-lg bg-purple-50 p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-800">
                    Environmental Impact
                  </h3>
                  <ul className="space-y-2">
                    {analysis.environmentalImpact &&
                      Object.entries(analysis.environmentalImpact).map(
                        ([impact, value]) => (
                          <li key={impact} className="flex justify-between">
                            <span className="capitalize">
                              {impact.replace("_", " ")}
                            </span>
                            <span>{value}</span>
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;