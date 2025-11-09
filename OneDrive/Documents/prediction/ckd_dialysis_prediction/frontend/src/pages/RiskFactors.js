import React from "react";

export default function RiskFactors() {
  const factors = [
    { name: "Serum Creatinine", desc: "Indicates kidney filtration rate", range: "0.6–1.3 mg/dL" },
    { name: "Blood Urea", desc: "Measures waste buildup", range: "7–20 mg/dL" },
    { name: "Blood Pressure", desc: "High BP harms kidneys", range: "80–120 mmHg" },
    { name: "Albumin", desc: "Low levels may indicate kidney damage", range: "3.5–5.5 g/dL" },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Key Risk Factors</h2>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-blue-100">
            <th className="border px-4 py-2">Risk Factor</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Normal Range</th>
          </tr>
        </thead>
        <tbody>
          {factors.map((f, i) => (
            <tr key={i} className="hover:bg-blue-50">
              <td className="border px-4 py-2">{f.name}</td>
              <td className="border px-4 py-2">{f.desc}</td>
              <td className="border px-4 py-2">{f.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
