import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  // Example patient report data
  const [reports] = useState([
    {
      date: "2025-10-25",
      patientId: "P001",
      riskPercent: 85,
      dialysisMonths: 3,
    },
    {
      date: "2025-10-26",
      patientId: "P002",
      riskPercent: 60,
      dialysisMonths: 6,
    },
    {
      date: "2025-10-27",
      patientId: "P003",
      riskPercent: 72,
      dialysisMonths: 5,
    },
    {
      date: "2025-10-28",
      patientId: "P004",
      riskPercent: 95,
      dialysisMonths: 2,
    },
  ]);

  return (
    <div className="mt-10 px-6">
      <h2 className="text-3xl text-center text-blue-700 font-semibold mb-8">
        Graphical Analysis of Patient Reports
      </h2>

      {/* Risk Percentage Bar Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Risk Percentage Comparison
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={reports} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="patientId" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="riskPercent" fill="#2563eb" name="Risk (%)" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Dialysis Timeline Line Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Predicted Dialysis Timeline (Months)
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={reports} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 12]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="dialysisMonths"
              stroke="#f87171"
              strokeWidth={3}
              dot={{ r: 5 }}
              name="Dialysis Prediction (months)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
