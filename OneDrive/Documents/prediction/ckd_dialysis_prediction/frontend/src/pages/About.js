import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto mt-10 text-center">
      <h2 className="text-3xl text-blue-700 font-bold mb-4">About the Project</h2>
      <p className="text-gray-700 leading-relaxed">
        This CKD Dialysis Prediction System uses a hybrid CNN-LSTM model to analyze patient data
        and predict dialysis needs. Built with React, Tailwind CSS, and FastAPI, it supports
        medical professionals in identifying patients at risk of kidney failure.
      </p>
      <p className="mt-4 text-gray-600">
        Dataset used: Chronic Kidney Disease dataset (UCI / hospital dataset)
      </p>
    </div>
  );
}
