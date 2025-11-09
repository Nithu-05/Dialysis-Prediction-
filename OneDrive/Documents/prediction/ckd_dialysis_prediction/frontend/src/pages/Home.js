import React from "react";

export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-blue-800">
        Welcome to CKD Dialysis Risk Prediction
      </h1>
      <p className="mt-4 text-gray-600 text-lg">
        Upload your clinical dataset to predict the need for dialysis within the next 6–12 months.
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
        alt="kidney"
        className="mx-auto w-48 mt-10 opacity-90"
      />
    </div>
  );
}
