import React from "react";

export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6 text-left border border-blue-200">
      <h3 className="text-2xl font-bold text-blue-700 mb-3">
        Prediction Summary
      </h3>
      <p className="text-gray-700 mb-2">
        <strong>Dialysis Need:</strong> {result.Dialysis_Need_Prediction || "N/A"}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Risk Percentage:</strong> {result.Risk_Percentage || "N/A"}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Risk Level:</strong> {result.Risk_Level || "N/A"}
      </p>

      {result.Risk_Factors?.length > 0 && (
        <div className="mt-3">
          <strong className="text-gray-800">Risk Factors:</strong>
          <ul className="list-disc list-inside text-gray-600">
            {result.Risk_Factors.map((rf, i) => (
              <li key={i}>{rf}</li>
            ))}
          </ul>
        </div>
      )}

      {result.Possible_Comorbidities?.length > 0 && (
        <div className="mt-3">
          <strong className="text-gray-800">Possible Comorbidities:</strong>
          <ul className="list-disc list-inside text-gray-600">
            {result.Possible_Comorbidities.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
