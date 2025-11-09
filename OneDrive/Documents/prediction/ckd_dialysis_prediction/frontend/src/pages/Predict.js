import React, { useState } from "react";
import ResultCard from "../components/ResultCard";

export default function Predict() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a CSV file!");

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.predictions) {
        setResults(data.predictions);
      } else {
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl font-semibold text-blue-700 mb-4">
        Upload Patient Data for Prediction
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 p-2 border border-gray-400 rounded"
      />
      <br />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {/* Display result cards */}
      {results && results.length > 0 && (
        <div className="mt-8 space-y-6">
          {results.map((r, i) => (
            <ResultCard key={i} result={r} />
          ))}
        </div>
      )}
    </div>
  );
}
